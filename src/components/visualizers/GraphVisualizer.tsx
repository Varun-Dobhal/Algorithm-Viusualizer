import React, { useEffect, useRef } from 'react';
import { GraphData } from '../../types';

interface GraphVisualizerProps {
  data: GraphData;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!data || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const vertexRadius = 20;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - vertexRadius - 10;
    
    // Draw edges first
    for (let i = 0; i < data.vertices; i++) {
      for (let j = i + 1; j < data.vertices; j++) {
        if (data.adjacencyMatrix[i][j]) {
          const angle1 = (i / data.vertices) * Math.PI * 2;
          const angle2 = (j / data.vertices) * Math.PI * 2;
          
          const x1 = centerX + radius * Math.cos(angle1);
          const y1 = centerY + radius * Math.sin(angle1);
          const x2 = centerX + radius * Math.cos(angle2);
          const y2 = centerY + radius * Math.sin(angle2);
          
          // Draw edge
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = '#4B5563';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }
    
    // Check if there's a traversal operation
    const highlightedNodes = new Set<number>();
    if (data.lastOperation) {
      data.lastOperation.path.forEach(node => highlightedNodes.add(node));
    }
    
    // Draw vertices
    for (let i = 0; i < data.vertices; i++) {
      const angle = (i / data.vertices) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Determine vertex color based on if it's in a path
      const isHighlighted = highlightedNodes.has(i);
      const fillColor = isHighlighted ? '#10B981' : '#3B82F6';
      
      // Draw vertex
      ctx.beginPath();
      ctx.arc(x, y, vertexRadius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
      
      // Draw vertex label
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), x, y);
    }
    
    // Draw path animation (if there's a traversal)
    if (data.lastOperation) {
      const { path, type } = data.lastOperation;
      
      // Display traversal type
      ctx.font = '14px Arial';
      ctx.fillStyle = '#F59E0B';
      ctx.textAlign = 'left';
      ctx.fillText(`${type.toUpperCase()} traversal: ${path.join(' → ')}`, 20, 20);
    }
  }, [data]);

  if (!data) {
    return <div className="text-gray-500">No graph data available</div>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={400} 
        className="border border-gray-700 rounded"
      />
    </div>
  );
};

export default GraphVisualizer;