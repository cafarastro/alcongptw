import React from 'react';
import { Button } from './Button';

interface ResultViewProps {
  imageSrc: string;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ imageSrc, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `celebration-${Date.now()}.png`;
    link.href = imageSrc;
    link.click();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6 animate-fade-in">
      
      {/* Final Result Preview */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800 group">
        <img src={imageSrc} alt="Resultado Final" className="w-full h-full object-contain" />
      </div>

      {/* Actions */}
      <div className="w-full space-y-3">
        <Button onClick={handleDownload} className="w-full shadow-purple-500/25 text-lg py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Baixar Imagem
        </Button>

        <Button onClick={onReset} variant="outline" className="w-full">
            Início
        </Button>
      </div>
    </div>
  );
};