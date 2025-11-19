import React from 'react';
import { Frame } from '../types.ts';
import { FRAMES } from '../constants.ts';

interface FrameSelectorProps {
  selectedFrameId: string;
  onSelectFrame: (frame: Frame) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({ selectedFrameId, onSelectFrame }) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
       <div className="flex gap-4 px-2 justify-center min-w-max md:min-w-0">
        {FRAMES.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame)}
            className={`relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 transition-all duration-300 ${
              selectedFrameId === frame.id 
                ? 'border-purple-500 scale-110 shadow-xl shadow-purple-500/30 z-10' 
                : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
            }`}
          >
            {/* Preview of frame on a generic background */}
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                <img 
                    src={frame.src} 
                    alt={frame.name} 
                    className="w-full h-full object-contain" 
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] md:text-xs text-white py-1 text-center truncate px-1">
              {frame.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};