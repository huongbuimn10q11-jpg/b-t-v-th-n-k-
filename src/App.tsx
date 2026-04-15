import React, { useState, useRef, useCallback } from 'react';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { AIPanel } from './components/AIPanel';
import { Instructions } from './components/Instructions';
import { Tool, AI_STYLES } from './types';
import { Save, Trash2, RotateCcw, X, Download } from 'lucide-react';
import { generateMagicArt } from './lib/gemini';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#FF0000');
  const [brushSize] = useState(8);
  const [selectedStyle, setSelectedStyle] = useState(AI_STYLES[0].id);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [magicResult, setMagicResult] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'buc-tranh-cua-be.png';
      link.href = canvas.toDataURL();
      link.click();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD1DC', '#B3E5FC', '#C8E6C9', '#FFFACD']
      });
    }
  };

  const handleGenerateAI = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    const base64Image = canvas.toDataURL('image/png');
    const style = AI_STYLES.find(s => s.id === selectedStyle);
    
    const result = await generateMagicArt(
      base64Image,
      style?.prompt || '',
      description
    );

    if (result) {
      setMagicResult(result);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD1DC', '#B3E5FC', '#C8E6C9', '#E1BEE7']
      });
    } else {
      alert("Ôi, phép thuật đang bận một chút. Bé thử lại nhé!");
    }
    setIsGenerating(false);
  };

  const downloadMagicResult = () => {
    if (magicResult) {
      const link = document.createElement('a');
      link.download = 'phep-thuat-ai.png';
      link.href = magicResult;
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 gap-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center gap-1">
        <h1 className="font-sans font-black text-4xl sm:text-5xl text-primary drop-shadow-[2px_2px_0px_#fff] tracking-wider">
          ✨ BÚT VẼ THẦN KÌ ✨
        </h1>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[200px_1fr_260px] gap-6">
        {/* Left Toolbar */}
        <aside className="card-kid p-4 order-2 lg:order-1 border-[#FFEBE6]">
          <Toolbar 
            currentTool={tool} 
            setTool={setTool} 
            currentColor={color} 
            setColor={setColor} 
          />
        </aside>

        {/* Center Canvas Area */}
        <section className="flex flex-col gap-6 order-1 lg:order-2">
          <div className="card-kid p-2 flex-1 min-h-[400px] relative border-white shadow-inner">
            <Canvas 
              tool={tool} 
              color={color} 
              brushSize={brushSize} 
              canvasRef={canvasRef}
              onCanvasChange={() => {}}
            />
          </div>
          
          <div className="card-kid p-4 bg-white border-[#E0F2FE]">
            <Instructions />
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={handleSave} className="action-btn-pill bg-[#60A5FA]">
              <Save size={24} />
              <span>Lưu ảnh</span>
            </button>
            <button onClick={handleClear} className="action-btn-pill bg-[#F87171]">
              <Trash2 size={24} />
              <span>Xóa tranh</span>
            </button>
            <button onClick={() => { handleClear(); setDescription(''); }} className="action-btn-pill bg-[#A78BFA]">
              <RotateCcw size={24} />
              <span>Bắt đầu lại</span>
            </button>
          </div>
        </section>

        {/* Right AI Panel */}
        <aside className="card-kid p-4 order-3 border-[#F0FDFA]">
          <AIPanel 
            selectedStyle={selectedStyle}
            setStyle={setSelectedStyle}
            description={description}
            setDescription={setDescription}
            onGenerate={handleGenerateAI}
            isGenerating={isGenerating}
          />
        </aside>
      </main>

      {/* Magic Result Modal */}
      <AnimatePresence>
        {magicResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="card-kid max-w-2xl w-full bg-white p-8 relative flex flex-col items-center gap-6"
            >
              <button 
                onClick={() => setMagicResult(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="font-display font-bold text-3xl text-purple-600">✨ TÁC PHẨM KỲ DIỆU ✨</h2>
              
              <div className="w-full aspect-square rounded-3xl overflow-hidden border-8 border-pastel-purple shadow-inner">
                <img 
                  src={magicResult} 
                  alt="Magic Art" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={downloadMagicResult}
                  className="flex-1 py-4 rounded-2xl bg-pastel-blue text-blue-700 font-bold flex items-center justify-center gap-2 hover:brightness-105 transition-all"
                >
                  <Download size={24} />
                  <span>TẢI VỀ MÁY</span>
                </button>
                <button 
                  onClick={() => setMagicResult(null)}
                  className="flex-1 py-4 rounded-2xl bg-pastel-pink text-pink-700 font-bold flex items-center justify-center gap-2 hover:brightness-105 transition-all"
                >
                  <span>VẼ TIẾP THÔI</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center py-4 text-gray-400 font-medium text-sm">
        © 2026 Bút Vẽ Thần Kì - Dành cho bé yêu sáng tạo
      </footer>
    </div>
  );
}
