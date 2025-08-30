export enum ParserType {
  BinaryTree = 'binaryTree',
  LinkedList = 'linkedList',
  Array = 'array',
  Graph = 'graph'
}

export interface TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface ListNode {
  data: number;
  next: ListNode | null;
}

export interface ArrayData {
  values: (number | null)[];
  name: string;
  size: number;
}

export interface GraphData {
  vertices: number;
  adjacencyMatrix: number[][];
  lastOperation?: {
    type: 'dfs' | 'bfs';
    start: number;
    path: number[];
  };
}

export interface ParserOutput {
  output: string[];
  data: TreeNode | ListNode | ArrayData | GraphData | null;
}