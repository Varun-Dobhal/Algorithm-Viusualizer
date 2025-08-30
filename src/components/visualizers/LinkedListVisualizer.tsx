import React from 'react';
import { ListNode } from '../../types';

interface LinkedListVisualizerProps {
  data: ListNode;
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ data }) => {
  const renderLinkedList = () => {
    const elements: JSX.Element[] = [];
    let currentNode: ListNode | null = data;
    let i = 0;
    const nodeWidth = 60;
    const nodeHeight = 40;
    const arrowWidth = 40;
    
    while (currentNode) {
      const x = i * (nodeWidth + arrowWidth);
      
      // Add node
      elements.push(
        <g key={`node-${i}`} className="transition-transform duration-300 hover:scale-105">
          <rect 
            x={x} 
            y={0} 
            width={nodeWidth} 
            height={nodeHeight} 
            rx={6} 
            fill="#3B82F6" 
          />
          <text 
            x={x + nodeWidth / 2} 
            y={nodeHeight / 2} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill="white" 
            fontSize="14px"
          >
            {currentNode.data}
          </text>
        </g>
      );
      
      // Add arrow if not the last node
      if (currentNode.next) {
        elements.push(
          <g key={`arrow-${i}`}>
            <line 
              x1={x + nodeWidth} 
              y1={nodeHeight / 2} 
              x2={x + nodeWidth + arrowWidth - 10} 
              y2={nodeHeight / 2}
              stroke="#4B5563"
              strokeWidth="2"
            />
            <polygon 
              points={`${x + nodeWidth + arrowWidth - 10},${nodeHeight / 2 - 5} ${x + nodeWidth + arrowWidth},${nodeHeight / 2} ${x + nodeWidth + arrowWidth - 10},${nodeHeight / 2 + 5}`}
              fill="#4B5563"
            />
          </g>
        );
      } else {
        // Add NULL marker for the last node
        elements.push(
          <g key="null-marker">
            <line 
              x1={x + nodeWidth} 
              y1={nodeHeight / 2} 
              x2={x + nodeWidth + arrowWidth - 10} 
              y2={nodeHeight / 2}
              stroke="#4B5563"
              strokeWidth="2"
            />
            <text 
              x={x + nodeWidth + arrowWidth} 
              y={nodeHeight / 2} 
              dominantBaseline="middle" 
              fill="#F87171" 
              fontSize="14px"
              fontFamily="monospace"
            >
              NULL
            </text>
          </g>
        );
      }
      
      currentNode = currentNode.next;
      i++;
    }
    
    return elements;
  };

  if (!data) {
    return <div className="text-gray-500">No linked list data available</div>;
  }

  const nodeWidth = 60;
  const nodeHeight = 40;
  const arrowWidth = 40;
  
  // Count nodes to determine width
  let count = 0;
  let current: ListNode | null = data;
  while (current) {
    count++;
    current = current.next;
  }
  
  const svgWidth = count * (nodeWidth + arrowWidth) + 50;
  const svgHeight = 100;

  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto">
      <svg width={svgWidth} height={svgHeight}>
        <g transform="translate(10, 30)">
          {renderLinkedList()}
        </g>
      </svg>
    </div>
  );
};

export default LinkedListVisualizer;