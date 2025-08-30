import { ArrayData, ParserOutput } from '../types';

export function parseArray(lines: string[]): ParserOutput {
  const MAX_ARRAY_SIZE = 100;
  let arrayData: ArrayData = {
    values: [],
    name: '',
    size: 0
  };
  
  const variables: { [key: string]: number } = {};
  const output: string[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }
    
    // Array declaration: int arr[5];
    if (line.includes('int') && line.includes('[')) {
      const match = line.match(/int\s+(\w+)\[(\d+)\];/);
      if (match && match[1] && match[2]) {
        const name = match[1];
        const size = parseInt(match[2], 10);
        
        if (size <= 0 || size > MAX_ARRAY_SIZE) {
          output.push(`Array size must be between 1 and ${MAX_ARRAY_SIZE}`);
        } else {
          arrayData = {
            values: Array(size).fill(null),
            name,
            size
          };
          output.push(`Detected array '${name}' of size ${size}`);
        }
      } else {
        output.push(`Invalid array declaration: ${line}`);
      }
    }
    // Array assignment: arr[i] = 5;
    else if (line.includes('[') && line.includes('=')) {
      const match = line.match(/(\w+)\[([^\]]+)\]\s*=\s*([^;]+);/);
      if (match && match[1] && match[2] && match[3]) {
        const arrName = match[1];
        const indexExpr = match[2].trim();
        const valueExpr = match[3].trim();
        
        if (arrName !== arrayData.name) {
          output.push(`Unknown array: ${arrName}`);
        } else {
          const index = evaluateExpression(indexExpr, variables);
          const value = evaluateExpression(valueExpr, variables);
          
          if (index >= 0 && index < arrayData.size) {
            arrayData.values[index] = value;
            output.push(`Assigned: ${arrName}[${index}] = ${value}`);
          } else {
            output.push(`Index ${index} out of bounds for array ${arrName}`);
          }
        }
      } else {
        output.push(`Invalid assignment: ${line}`);
      }
    }
    // Manual input command
    else if (line === 'input') {
      if (arrayData.size > 0) {
        for (let j = 0; j < arrayData.size; j++) {
          arrayData.values[j] = j + 1;  // Simulate input with sequential values
        }
        output.push(`Manually input ${arrayData.size} values for array '${arrayData.name}'`);
      } else {
        output.push('Array not declared yet.');
      }
    }
    // Sort command
    else if (line === 'sort') {
      if (arrayData.size > 0) {
        const validValues = arrayData.values.filter(v => v !== null) as number[];
        validValues.sort((a, b) => a - b);
        
        for (let j = 0; j < validValues.length; j++) {
          arrayData.values[j] = validValues[j];
        }
        
        output.push('Array sorted.');
      } else {
        output.push('Array not declared yet.');
      }
    }
    // For loop
    else if (line.startsWith('for')) {
      const forMatch = line.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)\s*;\s*\w+\+\+\s*\)/);
      if (forMatch && i + 1 < lines.length) {
        const varName = forMatch[1];
        const startVal = parseInt(forMatch[2], 10);
        const endVal = parseInt(forMatch[3], 10);
        const bodyLine = lines[i + 1].trim();
        
        for (let j = startVal; j < endVal; j++) {
          variables[varName] = j;
          
          const bodyMatch = bodyLine.match(/(\w+)\[([^\]]+)\]\s*=\s*([^;]+);/);
          if (bodyMatch && bodyMatch[1] && bodyMatch[2] && bodyMatch[3]) {
            const arrName = bodyMatch[1];
            const indexExpr = bodyMatch[2].trim();
            const valueExpr = bodyMatch[3].trim();
            
            if (arrName === arrayData.name) {
              const index = evaluateExpression(indexExpr, variables);
              const value = evaluateExpression(valueExpr, variables);
              
              if (index >= 0 && index < arrayData.size) {
                arrayData.values[index] = value;
                output.push(`Assigned: ${arrName}[${index}] = ${value}`);
              }
            }
          }
        }
        
        i++;
      } else {
        output.push(`Invalid for loop: ${line}`);
      }
    }
    else if (line !== '') {
      output.push(`Unknown command: ${line}`);
    }
    
    i++;
  }
  
  return { output, data: arrayData };
}

function evaluateExpression(expr: string, variables: { [key: string]: number }): number {
  // Simple number
  if (/^\d+$/.test(expr)) {
    return parseInt(expr, 10);
  }
  
  // Variable
  if (/^\w+$/.test(expr)) {
    return variables[expr] || 0;
  }
  
  // Simple arithmetic
  const match = expr.match(/^(\w+|\d+)\s*([\+\-\*\/])\s*(\w+|\d+)$/);
  if (match) {
    const left = /^\d+$/.test(match[1]) 
      ? parseInt(match[1], 10) 
      : (variables[match[1]] || 0);
    
    const right = /^\d+$/.test(match[3]) 
      ? parseInt(match[3], 10) 
      : (variables[match[3]] || 0);
    
    switch (match[2]) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return right !== 0 ? Math.floor(left / right) : 0;
      default: return 0;
    }
  }
  
  return 0;
}