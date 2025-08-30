import { TreeNode, ParserOutput } from '../types';

export function parseBinaryTree(lines: string[]): ParserOutput {
  let root: TreeNode | null = null;
  const output: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    if (trimmedLine.includes('Node*') && trimmedLine.includes('root')) {
      root = null;
      output.push('Declared binary tree root.');
    } else if (trimmedLine.startsWith('insert')) {
      const match = trimmedLine.match(/insert\((\d+)\);/);
      if (match && match[1]) {
        const value = parseInt(match[1], 10);
        root = insertNode(root, value);
        output.push(`Inserted ${value}`);
      } else {
        output.push(`Invalid insert syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine.startsWith('delete')) {
      const match = trimmedLine.match(/delete\((\d+)\);/);
      if (match && match[1]) {
        const value = parseInt(match[1], 10);
        const result = deleteNode(root, value);
        if (result.deleted) {
          root = result.node;
          output.push(`Deleted ${value}`);
        } else {
          output.push(`Value ${value} not found`);
        }
      } else {
        output.push(`Invalid delete syntax: ${trimmedLine}`);
      }
    } else if (trimmedLine === 'inorder' || trimmedLine === 'preorder' || trimmedLine === 'postorder') {
      output.push(`\nTree ${trimmedLine} traversal:`);
      if (!root) {
        output.push('Tree is empty.');
      } else {
        const values: number[] = [];
        switch (trimmedLine) {
          case 'inorder':
            inorderTraversal(root, values);
            break;
          case 'preorder':
            preorderTraversal(root, values);
            break;
          case 'postorder':
            postorderTraversal(root, values);
            break;
        }
        output.push(values.map(v => `[ ${v} ]`).join(' '));
      }
    } else if (trimmedLine !== '') {
      output.push(`Unknown command: ${trimmedLine}`);
    }
  }

  return { output, data: root };
}

function createNode(value: number): TreeNode {
  return {
    data: value,
    left: null,
    right: null
  };
}

function insertNode(node: TreeNode | null, value: number): TreeNode {
  if (node === null) {
    return createNode(value);
  }

  if (value < node.data) {
    node.left = insertNode(node.left, value);
  } else if (value > node.data) {
    node.right = insertNode(node.right, value);
  }

  return node;
}

function findMinValueNode(node: TreeNode): TreeNode {
  let current = node;
  while (current.left !== null) {
    current = current.left;
  }
  return current;
}

function deleteNode(node: TreeNode | null, value: number): { node: TreeNode | null; deleted: boolean } {
  if (node === null) {
    return { node: null, deleted: false };
  }

  if (value < node.data) {
    const result = deleteNode(node.left, value);
    node.left = result.node;
    return { node, deleted: result.deleted };
  } else if (value > node.data) {
    const result = deleteNode(node.right, value);
    node.right = result.node;
    return { node, deleted: result.deleted };
  }

  // Node with only one child or no child
  if (node.left === null) {
    return { node: node.right, deleted: true };
  } else if (node.right === null) {
    return { node: node.left, deleted: true };
  }

  // Node with two children
  const temp = findMinValueNode(node.right);
  node.data = temp.data;
  const result = deleteNode(node.right, temp.data);
  node.right = result.node;
  return { node, deleted: true };
}

function inorderTraversal(node: TreeNode, values: number[]) {
  if (node.left) inorderTraversal(node.left, values);
  values.push(node.data);
  if (node.right) inorderTraversal(node.right, values);
}

function preorderTraversal(node: TreeNode, values: number[]) {
  values.push(node.data);
  if (node.left) preorderTraversal(node.left, values);
  if (node.right) preorderTraversal(node.right, values);
}

function postorderTraversal(node: TreeNode, values: number[]) {
  if (node.left) postorderTraversal(node.left, values);
  if (node.right) postorderTraversal(node.right, values);
  values.push(node.data);
}