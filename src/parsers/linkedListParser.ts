import { ListNode, ParserOutput } from '../types';

export function parseLinkedList(lines: string[]): ParserOutput {
  let head: ListNode | null = null;
  const output: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;

    if (trimmedLine.includes('Node*') && trimmedLine.includes('head')) {
      head = null;
      output.push('Declared linked list head.');
    } else if (trimmedLine.startsWith('insert')) {
      const match = trimmedLine.match(/insert\((\d+)\);/);
      if (match && match[1]) {
        const value = parseInt(match[1], 10);
        head = insertNode(head, value);
        output.push(`Inserted ${value} into linked list.`);
      } else {
        output.push(`Invalid insert syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine !== '') {
      output.push(`Unknown command: ${trimmedLine}`);
    }

    // Add visualization output
    output.push('\nLinked List Visualization:');
    let current = head;
    let listStr = '';
    while (current) {
      listStr += `[ ${current.data} ] -> `;
      current = current.next;
    }
    listStr += 'NULL';
    output.push(listStr);
  }

  return { output, data: head };
}

function createNode(value: number): ListNode {
  return {
    data: value,
    next: null
  };
}

function insertNode(head: ListNode | null, value: number): ListNode {
  const newNode = createNode(value);
  
  if (head === null) {
    return newNode;
  }
  
  let current = head;
  while (current.next) {
    current = current.next;
  }
  current.next = newNode;
  
  return head;
}