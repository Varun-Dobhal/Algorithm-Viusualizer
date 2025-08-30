import React, { useRef, useEffect } from 'react';
import { TrashIcon } from './Icons';

interface ConsoleProps {
  output: string[];
  onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({ output, onClear }) => {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
        <h2 className="text-lg font-medium">Console Output</h2>
        <button
          className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          onClick={onClear}
          title="Clear console"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div 
        ref={consoleRef}
        className="p-3 bg-gray-900 text-gray-300 font-mono text-sm max-h-[200px] overflow-y-auto"
      >
        {output.length === 0 ? (
          <div className="text-gray-500 italic">Run your code to see output here</div>
        ) : (
          output.map((line, index) => (
            <div key={index} className="leading-6 mb-1">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Console;