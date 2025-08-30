import { GraphData, ParserOutput } from '../types';

export function parseGraph(lines: string[]): ParserOutput {
  const MAX_VERTICES = 100;
  const adjacencyMatrix: number[][] = Array(MAX_VERTICES).fill(0).map(() => Array(MAX_VERTICES).fill(0));
  let numVertices = 0;
  let lastOperation: { type: 'dfs' | 'bfs'; start: number; path: number[] } | undefined;
  
  const output: string[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith('add_vertex')) {
      const match = trimmedLine.match(/add_vertex\((\d+)\);/);
      if (match && match[1]) {
        const vertex = parseInt(match[1], 10);
        if (vertex >= numVertices) {
          numVertices = vertex + 1;
        }
        output.push(`Vertex ${vertex} added.`);
      } else {
        output.push(`Invalid add_vertex syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine.startsWith('add_edge')) {
      const match = trimmedLine.match(/add_edge\((\d+),\s*(\d+)\);/);
      if (match && match[1] && match[2]) {
        const u = parseInt(match[1], 10);
        const v = parseInt(match[2], 10);
        
        if (u >= numVertices) numVertices = u + 1;
        if (v >= numVertices) numVertices = v + 1;
        
        adjacencyMatrix[u][v] = 1;
        adjacencyMatrix[v][u] = 1; // Undirected graph
        
        output.push(`Edge added between ${u} and ${v}`);
      } else {
        output.push(`Invalid add_edge syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine.startsWith('delete_edge')) {
      const match = trimmedLine.match(/delete_edge\((\d+),\s*(\d+)\);/);
      if (match && match[1] && match[2]) {
        const u = parseInt(match[1], 10);
        const v = parseInt(match[2], 10);
        
        if (u < numVertices && v < numVertices) {
          adjacencyMatrix[u][v] = 0;
          adjacencyMatrix[v][u] = 0;
          output.push(`Edge deleted between ${u} and ${v}`);
        } else {
          output.push(`Invalid vertices in delete_edge: ${u}, ${v}`);
        }
      } else {
        output.push(`Invalid delete_edge syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine.startsWith('dfs')) {
      const match = trimmedLine.match(/dfs\((\d+)\);/);
      if (match && match[1]) {
        const start = parseInt(match[1], 10);
        
        if (start < numVertices) {
          const visited = Array(numVertices).fill(false);
          const path: number[] = [];
          
          output.push(`DFS from ${start}:`);
          dfs(adjacencyMatrix, visited, start, numVertices, path);
          output.push(path.join(' '));
          
          lastOperation = { type: 'dfs', start, path };
        } else {
          output.push(`Invalid start vertex for DFS: ${start}`);
        }
      } else {
        output.push(`Invalid dfs syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine.startsWith('bfs')) {
      const match = trimmedLine.match(/bfs\((\d+)\);/);
      if (match && match[1]) {
        const start = parseInt(match[1], 10);
        
        if (start < numVertices) {
          const path = bfs(adjacencyMatrix, start, numVertices);
          
          output.push(`BFS from ${start}:`);
          output.push(path.join(' '));
          
          lastOperation = { type: 'bfs', start, path };
        } else {
          output.push(`Invalid start vertex for BFS: ${start}`);
        }
      } else {
        output.push(`Invalid bfs syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine === 'visualize') {
      output.push('\nGraph Adjacency Matrix:');
      for (let i = 0; i < numVertices; i++) {
        const row: string[] = [];
        for (let j = 0; j < numVertices; j++) {
          row.push(adjacencyMatrix[i][j].toString());
        }
        output.push(row.join(' '));
      }
    } else if (trimmedLine !== '') {
      output.push(`Unknown command: ${trimmedLine}`);
    }
  }
  
  const graphData: GraphData = {
    vertices: numVertices,
    adjacencyMatrix: adjacencyMatrix.slice(0, numVertices).map(row => row.slice(0, numVertices)),
    lastOperation
  };
  
  return { output, data: graphData };
}

function dfs(
  adjacencyMatrix: number[][], 
  visited: boolean[], 
  vertex: number, 
  numVertices: number, 
  path: number[]
) {
  visited[vertex] = true;
  path.push(vertex);
  
  for (let i = 0; i < numVertices; i++) {
    if (adjacencyMatrix[vertex][i] && !visited[i]) {
      dfs(adjacencyMatrix, visited, i, numVertices, path);
    }
  }
}

function bfs(adjacencyMatrix: number[][], start: number, numVertices: number): number[] {
  const visited = Array(numVertices).fill(false);
  const queue: number[] = [];
  const path: number[] = [];
  
  visited[start] = true;
  queue.push(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift()!;
    path.push(vertex);
    
    for (let i = 0; i < numVertices; i++) {
      if (adjacencyMatrix[vertex][i] && !visited[i]) {
        visited[i] = true;
        queue.push(i);
      }
    }
  }
  
  return path;
}