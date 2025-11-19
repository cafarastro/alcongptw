import React, { useCallback } from 'react';
import { Button } from './Button.tsx';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/20 rounded-3xl bg-white/5 text-center space-y-6 animate-fade-in-up">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">Tire uma Foto</h3>
        <p className="text-slate-400 max-w-xs mx-auto">
          Carregue uma foto da galeria ou tire uma nova agora.
        </p>
      </div>

      <div className="relative w-full max-w-xs">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Carregar Foto"
        />
        <Button className="w-full">
          Abrir Câmera / Galeria
        </Button>
      </div>
    </div>
  );
};