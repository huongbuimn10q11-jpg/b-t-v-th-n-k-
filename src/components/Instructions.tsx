import React from 'react';

const STEPS = [
  { id: 1, text: 'Vẽ', icon: '✏️', color: 'bg-pastel-pink' },
  { id: 2, text: 'Chọn AI', icon: '🤖', color: 'bg-pastel-blue' },
  { id: 3, text: 'Mô tả', icon: '📝', color: 'bg-pastel-green' },
  { id: 4, text: 'Sáng tạo', icon: '✨', color: 'bg-pastel-purple' },
];

export const Instructions: React.FC = () => {
  return (
    <div className="flex items-center justify-around w-full">
      {STEPS.map((step) => (
        <div key={step.id} className="flex items-center gap-2 font-sans font-bold text-sm text-text-main">
          <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs">
            {step.id}
          </div>
          <span className="hidden sm:inline">{step.text}</span>
          <span className="sm:hidden">{step.icon}</span>
        </div>
      ))}
    </div>
  );
};
