import React, { useState } from 'react';
import { AppStep, Frame } from './types.ts';
import { FRAMES } from './constants.ts';
import { ImageUploader } from './components/ImageUploader.tsx';
import { FrameSelector } from './components/FrameSelector.tsx';
import { CanvasComposer } from './components/CanvasComposer.tsx';
import { ResultView } from './components/ResultView.tsx';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame>(FRAMES[0]);
  const [finalImage, setFinalImage] = useState<string>("");

  const handleImageSelect = (file: File) => {
    setUserImage(file);
    setStep(AppStep.EDITOR);
  };

  const handleBackToUpload = () => {
    setStep(AppStep.UPLOAD);
    setUserImage(null);
    setFinalImage("");
  };

  const handleComposerComplete = (dataUrl: string) => {
    setFinalImage(dataUrl);
    setStep(AppStep.RESULT);
  };

  return (
    <div className="min-h-screen selection:bg-white selection:text-blue-900" style={{ backgroundColor: '#233f8c', color: 'white' }}>
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Alcon Logo */}
            <img src="./Alcon.png" alt="Alcon" className="h-10 w-auto object-contain" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 max-w-md mx-auto min-h-screen flex flex-col">
        
        {/* Heading */}
        <div className="text-center mb-8">
           {step === AppStep.UPLOAD && (
             <>
               <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                 Alcon é GPTW
               </h1>
               <p className="text-blue-100 text-lg leading-relaxed">
                 Crie sua imagem personalizada para postar nas redes. É só subir a sua foto, escolher a moldura e postar nas redes com a hashtag <strong>#SomosGPTW</strong>
               </p>
             </>
           )}
           {step === AppStep.EDITOR && (
             <>
               <h1 className="text-2xl font-bold mb-1">Escolha a Moldura</h1>
               <p className="text-blue-200 text-sm">Selecione o modelo abaixo</p>
             </>
           )}
           {step === AppStep.RESULT && (
             <>
               <h1 className="text-2xl font-bold mb-1">Sua imagem está pronta!</h1>
               <p className="text-blue-200 text-sm">Baixe e compartilhe agora</p>
             </>
           )}
        </div>

        {/* Step 1: Upload */}
        {step === AppStep.UPLOAD && (
          <div className="flex-1 flex items-center justify-center">
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        )}

        {/* Step 2: Editor */}
        {step === AppStep.EDITOR && userImage && (
          <div className="space-y-6 flex-1">
             {/* Frame Selector */}
             <FrameSelector 
              selectedFrameId={selectedFrame.id}
              onSelectFrame={setSelectedFrame}
            />

            {/* Composer Preview */}
            <CanvasComposer 
              userImageFile={userImage}
              selectedFrame={selectedFrame}
              onBack={handleBackToUpload}
              onComplete={handleComposerComplete}
            />
          </div>
        )}

        {/* Step 3: Result */}
        {step === AppStep.RESULT && finalImage && (
          <ResultView 
            imageSrc={finalImage}
            onReset={handleBackToUpload}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-blue-300 text-xs opacity-60">
        <p>Uso Interno Alcon</p>
      </footer>
    </div>
  );
};

export default App;