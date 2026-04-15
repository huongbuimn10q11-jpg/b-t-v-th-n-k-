import React from 'react';
import { Tool, PALETTE_COLORS } from '../types';
import { Pencil, Eraser, PaintBucket } from 'lucide-react';
import { cn } from '../lib/utils';

interface ToolbarProps {
  currentTool: Tool;
  setTool: (tool: Tool) => void;
  currentColor: string;
  setColor: (color: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ currentTool, setTool, currentColor, setColor }) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setTool('pen')}
          className={cn(
            "btn-kid bg-[#F3F4F6] text-[#4B5563] aspect-square",
            currentTool === 'pen' && "bg-primary text-white shadow-inner"
          )}
        >
          <Pencil size={32} />
          <span className="text-[10px] font-bold mt-1">Bút vẽ</span>
        </button>
        
        <button
          onClick={() => setTool('eraser')}
          className={cn(
            "btn-kid bg-[#F3F4F6] text-[#4B5563] aspect-square",
            currentTool === 'eraser' && "bg-primary text-white shadow-inner"
          )}
        >
          <Eraser size={32} />
          <span className="text-[10px] font-bold mt-1">Tẩy</span>
        </button>
        
        <button
          onClick={() => setTool('fill')}
          className={cn(
            "btn-kid bg-[#F3F4F6] text-[#4B5563] aspect-square",
            currentTool === 'fill' && "bg-primary text-white shadow-inner"
          )}
        >
          <PaintBucket size={32} />
          <span className="text-[10px] font-bold mt-1">Đổ màu</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-center font-sans font-bold text-text-main text-sm uppercase tracking-wider">Màu sắc</h3>
        <div className="grid grid-cols-4 gap-2 overflow-y-auto pr-1 custom-scrollbar">
          {PALETTE_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setColor(color)}
              className={cn(
                "w-full aspect-square rounded-full border-2 transition-transform active:scale-90 shadow-sm",
                currentColor === color ? "border-text-main scale-115" : "border-white"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
