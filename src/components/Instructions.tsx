import React from 'react';
import { ParserType } from '../types';
import { CodeIcon } from './Icons';

interface InstructionsProps {
  type: ParserType;
}

const Instructions: React.FC<InstructionsProps> = ({ type }) => {
  const getInstructions = () => {
    switch (type) {
      case ParserType.BinaryTree:
        return {
          title: 'Binary Tree Parser',
          description: 'Parse and visualize Binary Search Tree operations.',
          commands: [
            'Node* root; - Initialize a new BST',
            'insert(value); - Insert a node with the given value',
            'delete(value); - Delete a node with the given value',
            'inorder - Perform in-order traversal',
            'preorder - Perform pre-order traversal',
            'postorder - Perform post-order traversal'
          ],
          example: 'Node* root;\ninsert(10);\ninsert(5);\ninsert(15);\ninsert(3);\ninsert(7);\ninorder;'
        };
      case ParserType.LinkedList:
        return {
          title: 'Linked List Parser',
          description: 'Parse and visualize Linked List operations.',
          commands: [
            'Node* head; - Initialize a new linked list',
            'insert(value); - Insert a node at the end of the list'
          ],
          example: 'Node* head;\ninsert(10);\ninsert(20);\ninsert(30);\ninsert(40);'
        };
      case ParserType.Array:
        return {
          title: 'Array Parser',
          description: 'Parse and visualize Array operations and manipulations.',
          commands: [
            'int arr[size]; - Declare an array of given size',
            'arr[index] = value; - Assign a value to an array element',
            'for (int i=0; i<n; i++) - Loop through array elements',
            'input - Manually input array values',
            'sort - Sort the array using bubble sort'
          ],
          example: 'int nums[5];\ninput;\nnums[2] = 99;\nsort;'
        };
      case ParserType.Graph:
        return {
          title: 'Graph Parser',
          description: 'Parse and visualize Graph operations and traversals.',
          commands: [
            'add_vertex(v); - Add a vertex to the graph',
            'add_edge(u, v); - Add an edge between vertices u and v',
            'delete_edge(u, v); - Delete an edge between vertices u and v',
            'dfs(start); - Perform depth-first search starting from vertex',
            'bfs(start); - Perform breadth-first search starting from vertex',
            'visualize - Show the adjacency matrix'
          ],
          example: 'add_vertex(0);\nadd_vertex(1);\nadd_vertex(2);\nadd_edge(0, 1);\nadd_edge(1, 2);\nadd_edge(0, 2);\nbfs(0);'
        };
      default:
        return {
          title: 'Parser Instructions',
          description: 'Select a parser to see instructions.',
          commands: [],
          example: ''
        };
    }
  };

  const instructions = getInstructions();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-700">
        <h2 className="text-lg font-medium">{instructions.title} Instructions</h2>
      </div>
      
      <div className="p-4 bg-gray-900 text-gray-300 text-sm">
        <p className="mb-3">{instructions.description}</p>
        
        <div className="mb-3">
          <h3 className="text-white font-medium mb-2">Supported Commands:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {instructions.commands.map((command, index) => (
              <li key={index}><code className="bg-gray-800 px-1 py-0.5 rounded">{command}</code></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-medium mb-2 flex items-center">
            <CodeIcon className="w-4 h-4 mr-1" />
            Example:
          </h3>
          <pre className="bg-gray-800 p-2 rounded font-mono text-xs whitespace-pre-wrap">
            {instructions.example}
          </pre>
          <p className="mt-2 text-xs text-gray-400">
            Click the "Run" button to execute your code and see the visualization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;