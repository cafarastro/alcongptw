import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Frame } from '../types.ts';
import { Button } from './Button.tsx';

interface CanvasComposerProps {
  userImageFile: File;
  selectedFrame: Frame;
  onBack: () => void;
  onComplete: (dataUrl: string) => void;
}

export const CanvasComposer: React.FC<CanvasComposerProps> = ({ userImageFile, selectedFrame, onBack, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Draw the canvas
  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Dimensions (Square for social media)
    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    // 1. Clear
    ctx.clearRect(0, 0, size, size);

    try {
      // 2. Load & Draw User Image (Cover Fit)
      const img = new Image();
      img.src = URL.createObjectURL(userImageFile);
      await new Promise((resolve, reject) => { 
        img.onload = resolve;
        img.onerror = () => reject(new Error("Failed to load user image"));
      });

      // Calculate "Cover" logic
      const scale = Math.max(size / img.width, size / img.height);
      const x = (size / 2) - (img.width / 2) * scale;
      const y = (size / 2) - (img.height / 2) * scale;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // 3. Load & Draw Frame
      const frameImg = new Image();
      // Note: Removed crossOrigin="anonymous" to avoid issues with local serving if not configured correctly.
      // If serving from a CDN in production, you might need it back.
      frameImg.src = selectedFrame.src;
      
      await new Promise((resolve, reject) => { 
          frameImg.onload = resolve;
          frameImg.onerror = () => reject(new Error(`Failed to load frame: ${selectedFrame.name}`));
      });
      
      // Only draw if loaded successfully
      ctx.drawImage(frameImg, 0, 0, size, size);

      // 4. Save state
      setDataUrl(canvas.toDataURL('image/png'));
      setError(null);

    } catch (err) {
      console.error("Composition error:", err);
      setError("Erro ao processar a imagem. Verifique se os arquivos estão corretos.");
    }

  }, [userImageFile, selectedFrame]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleContinue = () => {
    if (dataUrl) {
      onComplete(dataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6 animate-fade-in">
      
      {/* Canvas Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
        {error && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4 text-center text-red-400 text-sm font-semibold">
             {error}
           </div>
        )}
      </div>

      {/* Actions */}
      <div className="w-full grid grid-cols-2 gap-3">
        <Button onClick={onBack} variant="outline" className="w-full">
          Voltar
        </Button>
        <Button onClick={handleContinue} variant="primary" className="w-full" disabled={!dataUrl || !!error}>
          Próximo
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </div>
  );
};