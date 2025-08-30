import React from 'react';
import { ArrayData } from '../../types';

interface ArrayVisualizerProps {
  data: ArrayData;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ data }) => {
  if (!data || !data.values) {
    return <div className="text-gray-500">No array data available</div>;
  }
  
  const { values, name, size } = data;
  const cellWidth = 60;
  const cellHeight = 40;
  const cellSpacing = 4;
  
  // Adjust for responsiveness
  const containerWidth = (cellWidth + cellSpacing) * size;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h3 className="text-gray-300 mb-4 font-mono">
        {name}[{size}]
      </h3>
      
      <div className="overflow-x-auto w-full">
        <div style={{ minWidth: containerWidth }} className="flex justify-center">
          <div className="flex">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center mx-[2px] transition-transform duration-200 hover:scale-105"
              >
                <div className="text-xs text-gray-500 mb-1">{index}</div>
                <div
                  style={{ width: cellWidth, height: cellHeight }}
                  className={`
                    flex items-center justify-center
                    ${value !== null 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-400'}
                    rounded border border-gray-600
                  `}
                >
                  {value !== null ? value : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;