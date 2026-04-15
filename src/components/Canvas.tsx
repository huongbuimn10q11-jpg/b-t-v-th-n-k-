import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Tool } from '../types';

interface CanvasProps {
  tool: Tool;
  color: string;
  brushSize: number;
  onCanvasChange: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const Canvas: React.FC<CanvasProps> = ({ tool, color, brushSize, onCanvasChange, canvasRef }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent && canvas.width !== parent.clientWidth) {
        // Save current content
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

        // Resize
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        // Restore content
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (context) {
          context.lineCap = 'round';
          context.lineJoin = 'round';
          context.fillStyle = 'white';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(tempCanvas, 0, 0);
          contextRef.current = context;
        }
      }
    };

    // Initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { offsetX, offsetY } = getCoordinates(e);
    
    if (tool === 'fill') {
      handleFloodFill(offsetX, offsetY);
      return;
    }

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || tool === 'fill') return;
    const { offsetX, offsetY } = getCoordinates(e);

    if (contextRef.current) {
      if (tool === 'eraser') {
        contextRef.current.strokeStyle = 'white';
      } else {
        contextRef.current.strokeStyle = color;
      }
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current?.closePath();
      setIsDrawing(false);
      onCanvasChange();
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top
    };
  };

  const handleFloodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const targetColor = getPixelColor(data, startX, startY, canvas.width);
    const fillColor = hexToRgb(color);

    if (colorsMatch(targetColor, fillColor)) return;

    const stack: [number, number][] = [[Math.floor(startX), Math.floor(startY)]];
    const visited = new Uint8Array(canvas.width * canvas.height);

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      const idx = y * canvas.width + x;
      if (visited[idx]) continue;

      const currentColor = getPixelColor(data, x, y, canvas.width);
      if (colorsMatch(currentColor, targetColor)) {
        setPixelColor(data, x, y, canvas.width, fillColor);
        visited[idx] = 1;

        stack.push([x + 1, y]);
        stack.push([x - 1, y]);
        stack.push([x, y + 1]);
        stack.push([x, y - 1]);
      }
    }

    contextRef.current.putImageData(imageData, 0, 0);
    onCanvasChange();
  };

  const getPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number) => {
    const idx = (y * width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  const setPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number, color: number[]) => {
    const idx = (y * width + x) * 4;
    data[idx] = color[0];
    data[idx + 1] = color[1];
    data[idx + 2] = color[2];
    data[idx + 3] = 255;
  };

  const colorsMatch = (c1: number[], c2: number[]) => {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full touch-none"
      />
    </div>
  );
};
