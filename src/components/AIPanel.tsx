import React from 'react';
import { AIStyle, AI_STYLES } from '../types';
import { cn } from '../lib/utils';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIPanelProps {
  selectedStyle: string;
  setStyle: (id: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  selectedStyle,
  setStyle,
  description,
  setDescription,
  onGenerate,
  isGenerating
}) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-center font-sans font-bold text-text-main text-sm uppercase tracking-wider">🎭 Phong cách AI</h3>
        <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 custom-scrollbar">
          {AI_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setStyle(style.id)}
              className={cn(
                "flex flex-col items-center p-2 rounded-xl transition-all border-2 bg-[#F9FAFB]",
                selectedStyle === style.id ? "bg-[#E0F2FE] border-secondary shadow-sm scale-105" : "border-transparent"
              )}
            >
              <span className="text-2xl mb-1">{style.icon}</span>
              <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{style.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-sans font-bold text-text-main text-xs uppercase tracking-wider">✏️ Bé muốn vẽ gì?</h3>
          <div className="bg-white p-3 rounded-xl border-2 border-[#E5E7EB]">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ví dụ: Con mèo màu hồng đang bay trên cầu vồng..."
              className="w-full h-16 bg-transparent resize-none outline-none text-xs font-medium text-gray-600 placeholder:text-gray-300"
            />
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={cn(
            "w-full py-4 rounded-2xl font-sans font-black text-lg flex items-center justify-center gap-2 transition-all shadow-[0_6px_0_#E56A88] active:translate-y-1 active:shadow-[0_2px_0_#E56A88] uppercase tracking-wider",
            isGenerating 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none translate-y-1" 
              : "bg-gradient-to-br from-primary to-[#FFB1C1] text-white"
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" />
              <span>ĐANG BIẾN HÓA...</span>
            </>
          ) : (
            <>
              <span>VẼ AI THẦN KÌ</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
