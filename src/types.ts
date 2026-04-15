export type Tool = 'pen' | 'eraser' | 'fill';

export interface AIStyle {
  id: string;
  name: string;
  icon: string;
  prompt: string;
  color: string;
}

export const AI_STYLES: AIStyle[] = [
  { id: 'cartoon', name: 'Hoạt hình', icon: '🎨', prompt: 'cute colorful cartoon style, high quality, 3d render look', color: 'bg-pastel-pink' },
  { id: 'princess', name: 'Công chúa', icon: '👑', prompt: 'magical princess fairy tale style, glitter, pastel colors', color: 'bg-pastel-purple' },
  { id: 'superhero', name: 'Siêu anh hùng', icon: '🦸', prompt: 'dynamic superhero comic book style, bold lines, vibrant colors', color: 'bg-pastel-blue' },
  { id: 'animal', name: 'Động vật', icon: '🐱', prompt: 'cute fluffy animals, soft textures, friendly faces', color: 'bg-pastel-green' },
  { id: 'fairy', name: 'Cổ tích', icon: '🧚', prompt: 'enchanted forest fairy tale style, magical glow, whimsical', color: 'bg-pastel-yellow' },
  { id: 'ocean', name: 'Thế giới biển', icon: '🌊', prompt: 'underwater ocean world, colorful fish, corals, blue tones', color: 'bg-blue-100' },
  { id: 'dinosaur', name: 'Khủng long', icon: '🦖', prompt: 'friendly dinosaurs in a prehistoric jungle, colorful', color: 'bg-green-100' },
  { id: 'space', name: 'Vũ trụ', icon: '🚀', prompt: 'outer space adventure, stars, planets, cute aliens', color: 'bg-indigo-100' },
  { id: 'house', name: 'Ngôi nhà', icon: '🏠', prompt: 'dream house with garden and flowers, cozy and warm', color: 'bg-pastel-orange' },
];

export const PALETTE_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#008000', '#800000', '#008080', '#000080', '#FFC0CB', '#A52A2A',
  '#808080', '#C0C0C0', '#F0E68C', '#E6E6FA', '#FFFACD', '#B0E0E6', '#98FB98', '#FFDAB9'
];
