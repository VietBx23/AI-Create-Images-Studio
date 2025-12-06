import React, { useState } from 'react';
import { generateImageFromText } from './services/geminiService';
import AspectRatioSelector, { InputMode } from './components/AspectRatioSelector';
import FrameSelector from './components/FrameSelector';
import ImageDisplay from './components/ImageDisplay';
import { AspectRatio, ImageGenerationState, FrameStyle } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  
  // Settings State
  const [inputMode, setInputMode] = useState<InputMode>('preset');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);
  const [selectedFrame, setSelectedFrame] = useState<FrameStyle>('none');

  const [appState, setAppState] = useState<ImageGenerationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const getEffectiveAspectRatio = (): AspectRatio => {
    if (inputMode === 'preset' || inputMode === 'social') {
      return aspectRatio;
    }

    const targetRatio = customWidth / customHeight;
    const ratioValues = Object.values(AspectRatio);
    let bestMatch = AspectRatio.SQUARE;
    let minDiff = Number.MAX_VALUE;

    for (const r of ratioValues) {
      if (typeof r !== 'string' || !r.includes(':')) continue;
      const parts = r.split(':').map(Number);
      const val = parts[0] / parts[1];
      const diff = Math.abs(targetRatio - val);
      
      if (diff < minDiff) {
        minDiff = diff;
        bestMatch = r as AspectRatio;
      }
    }
    return bestMatch;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setAppState({ isLoading: true, error: null, result: null });
    const finalRatio = getEffectiveAspectRatio();

    try {
      const imageUrl = await generateImageFromText(prompt, finalRatio);
      setAppState({
        isLoading: false,
        error: null,
        result: { imageUrl, prompt, ratio: finalRatio },
      });
    } catch (err: any) {
      setAppState({
        isLoading: false,
        error: err.message || "Lỗi hệ thống.",
        result: null,
      });
    }
  };

  const handleClear = () => {
    setPrompt('');
    setAppState({ isLoading: false, error: null, result: null });
  };

  const handleDimensionChange = (w: number, h: number) => {
    setCustomWidth(w);
    setCustomHeight(h);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 w-full h-full bg-slate-50">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-white/40 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 h-18 flex items-center justify-between py-3">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative w-full h-full bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-inner border border-white/20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                 </svg>
               </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-slate-800 leading-tight">
                AI Creative Studio
              </h1>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">Powered by Gemini 2.5</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-600">Sẵn sàng</span>
             </div>
             <button className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-120px)] min-h-[850px]">
          
          {/* Left Panel: Configuration */}
          <div className="lg:col-span-4 flex flex-col gap-5 h-full overflow-y-auto pr-1 pb-24 lg:pb-10 custom-scrollbar">
            
            {/* Prompt Section */}
            <div className="glass-panel p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="flex justify-between items-center mb-3">
                 <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                   <span className="p-1 rounded bg-indigo-100 text-indigo-600">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                   </span>
                   Ý tưởng sáng tạo
                 </label>
                 <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors">
                    ✨ Auto Enhance
                 </span>
              </div>
              <div className="relative group/input">
                <textarea
                  rows={4}
                  className="block w-full rounded-2xl bg-slate-50/50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-[3px] focus:ring-indigo-500/10 text-slate-800 text-sm leading-relaxed p-4 resize-none transition-all placeholder:text-slate-400"
                  placeholder="Ví dụ: Một chú mèo phi hành gia đang lướt ván trên vành đai sao Thổ, phong cách Cyberpunk neon..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  {prompt && (
                      <button onClick={handleClear} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors" title="Xóa">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                  )}
                </div>
              </div>
            </div>

            {/* Aspect Ratio */}
            <AspectRatioSelector 
              mode={inputMode} setMode={setInputMode}
              selectedRatio={aspectRatio} onRatioChange={setAspectRatio}
              width={customWidth} height={customHeight} onDimensionChange={handleDimensionChange}
            />

            {/* Frames */}
            <FrameSelector selectedFrame={selectedFrame} onFrameChange={setSelectedFrame} />

            {/* Generate Button (Floating on Mobile) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-40 lg:static lg:bg-transparent lg:p-0 lg:border-none">
              <button
                onClick={handleGenerate}
                disabled={appState.isLoading || !prompt.trim()}
                className={`
                  relative w-full py-4 px-6 rounded-2xl font-bold text-white text-lg tracking-wide overflow-hidden
                  transition-all duration-300 transform active:scale-[0.98] group
                  ${appState.isLoading || !prompt.trim() 
                    ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1'}
                `}
              >
                {/* Shine effect */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine"></div>

                <div className="relative flex items-center justify-center gap-2">
                  {appState.isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Đang sáng tạo...</span>
                      </>
                  ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        <span>Tạo Tuyệt Phẩm</span>
                      </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Right Panel: Display */}
          <div className="lg:col-span-8 h-full min-h-[500px]">
            <ImageDisplay state={appState} frameStyle={selectedFrame} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;