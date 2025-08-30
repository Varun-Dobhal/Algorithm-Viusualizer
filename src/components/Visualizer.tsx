import React from 'react';
import { ParserType, TreeNode, ListNode, ArrayData, GraphData } from '../types';
import TreeVisualizer from './visualizers/TreeVisualizer';
import LinkedListVisualizer from './visualizers/LinkedListVisualizer';
import ArrayVisualizer from './visualizers/ArrayVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';

interface VisualizerProps {
  type: ParserType;
  data: any;
}

const Visualizer: React.FC<VisualizerProps> = ({ type, data }) => {
  const renderVisualizer = () => {
    if (!data) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 italic">Run your code to see visualization</p>
        </div>
      );
    }

    switch (type) {
      case ParserType.BinaryTree:
        return <TreeVisualizer data={data as TreeNode} />;
      case ParserType.LinkedList:
        return <LinkedListVisualizer data={data as ListNode} />;
      case ParserType.Array:
        return <ArrayVisualizer data={data as ArrayData} />;
      case ParserType.Graph:
        return <GraphVisualizer data={data as GraphData} />;
      default:
        return <div>Unknown parser type</div>;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
      <div className="px-4 py-2 bg-gray-700">
        <h2 className="text-lg font-medium">Visualization</h2>
      </div>
      
      <div className="bg-gray-900 min-h-[300px] flex items-center justify-center p-4">
        {renderVisualizer()}
      </div>
    </div>
  );
};

export default Visualizer;