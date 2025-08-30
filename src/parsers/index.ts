import { ParserType, ParserOutput } from '../types';
import { parseBinaryTree } from './binaryTreeParser';
import { parseLinkedList } from './linkedListParser';
import { parseArray } from './arrayParser';
import { parseGraph } from './graphParser';

export function executeCode(type: ParserType, code: string): ParserOutput {
  // Split code into lines and trim each line
  const lines = code.split('\n').map(line => line.trim()).filter(line => line);
  
  // Execute appropriate parser based on type
  switch (type) {
    case ParserType.BinaryTree:
      return parseBinaryTree(lines);
    case ParserType.LinkedList:
      return parseLinkedList(lines);
    case ParserType.Array:
      return parseArray(lines);
    case ParserType.Graph:
      return parseGraph(lines);
    default:
      return {
        output: ['Unknown parser type'],
        data: null
      };
  }
}