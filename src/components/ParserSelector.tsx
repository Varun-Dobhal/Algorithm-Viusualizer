import React from 'react';
import { ParserType } from '../types';
import { TreeIcon, ListIcon, ArrayIcon, GraphIcon } from './Icons';

interface ParserSelectorProps {
  selectedParser: ParserType;
  onParserChange: (parser: ParserType) => void;
}

const ParserSelector: React.FC<ParserSelectorProps> = ({ 
  selectedParser, 
  onParserChange 
}) => {
  const parsers = [
    { 
      type: ParserType.BinaryTree, 
      name: 'Binary Tree', 
      icon: <TreeIcon className="w-5 h-5" /> 
    },
    { 
      type: ParserType.LinkedList, 
      name: 'Linked List', 
      icon: <ListIcon className="w-5 h-5" /> 
    },
    { 
      type: ParserType.Array, 
      name: 'Array', 
      icon: <ArrayIcon className="w-5 h-5" /> 
    },
    { 
      type: ParserType.Graph, 
      name: 'Graph', 
      icon: <GraphIcon className="w-5 h-5" /> 
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-2 flex flex-wrap">
      {parsers.map((parser) => (
        <button
          key={parser.type}
          className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 mr-2 mb-2 sm:mb-0 ${
            selectedParser === parser.type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onParserChange(parser.type)}
        >
          <span className="mr-2">{parser.icon}</span>
          {parser.name}
        </button>
      ))}
    </div>
  );
};

export default ParserSelector;