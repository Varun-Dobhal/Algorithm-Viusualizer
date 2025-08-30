import React from 'react';
import { TreeNode } from '../../types';

interface TreeVisualizerProps {
  data: TreeNode;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ data }) => {
  const renderTree = (node: TreeNode | null, x: number, y: number, level: number, maxWidth: number): JSX.Element[] => {
    if (!node) return [];

    const nodeRadius = 20;
    const levelHeight = 70;
    const elements: JSX.Element[] = [];
    
    // Calculate width of each node at this level
    const width = maxWidth / Math.pow(2, level);
    
    // Add the current node
    elements.push(
      <g key={`node-${x}-${y}`}>
        <circle 
          cx={x} 
          cy={y} 
          r={nodeRadius} 
          fill="#3B82F6" 
          className="transition-all duration-300 hover:fill-blue-400"
        />
        <text 
          x={x} 
          y={y} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill="white" 
          fontSize="12px"
        >
          {node.data}
        </text>
      </g>
    );
    
    // Draw left child and connecting line
    if (node.left) {
      const leftX = x - width / 2;
      const leftY = y + levelHeight;
      
      elements.push(
        <line 
          key={`line-${x}-${y}-${leftX}-${leftY}`}
          x1={x} 
          y1={y + nodeRadius} 
          x2={leftX} 
          y2={leftY - nodeRadius}
          stroke="#4B5563"
          strokeWidth="1.5"
        />
      );
      
      elements.push(...renderTree(node.left, leftX, leftY, level + 1, maxWidth));
    }
    
    // Draw right child and connecting line
    if (node.right) {
      const rightX = x + width / 2;
      const rightY = y + levelHeight;
      
      elements.push(
        <line 
          key={`line-${x}-${y}-${rightX}-${rightY}`}
          x1={x} 
          y1={y + nodeRadius} 
          x2={rightX} 
          y2={rightY - nodeRadius}
          stroke="#4B5563"
          strokeWidth="1.5"
        />
      );
      
      elements.push(...renderTree(node.right, rightX, rightY, level + 1, maxWidth));
    }
    
    return elements;
  };

  if (!data) {
    return <div className="text-gray-500">No tree data available</div>;
  }

  const svgWidth = 500;
  const svgHeight = 400;
  const maxWidth = 400;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${svgWidth / 2 - maxWidth / 2}, 40)`}>
          {renderTree(data, maxWidth / 2, 30, 0, maxWidth)}
        </g>
      </svg>
    </div>
  );
};

export default TreeVisualizer;