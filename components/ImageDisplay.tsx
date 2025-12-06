import React, { useRef, useState } from 'react';
import { ImageGenerationState, FrameStyle } from '../types';
import html2canvas from 'html2canvas';

interface ImageDisplayProps {
  state: ImageGenerationState;
  frameStyle: FrameStyle;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ state, frameStyle }) => {
  const { isLoading, error, result } = state;
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!printRef.current || !result) return;
    
    setIsDownloading(true);
    
    try {
      const element = printRef.current;
      
      const canvas = await html2canvas(element, {
        backgroundColor: null, 
        scale: 3, 
        logging: false,
        useCORS: true, 
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY, 
        onclone: (documentClone) => {
            // Optional tweaks for download capture
        }
      });

      const image = canvas.toDataURL("image/png", 1.0);
      
      const link = document.createElement('a');
      link.href = image;
      link.download = `gemini-studio-${frameStyle}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Không thể tải ảnh. Vui lòng thử lại.");
    } finally {
      setIsDownloading(false);
    }
  };

  // --- RENDER LOGIC START ---
  
  // 1. Simple CSS Shape Frames (Clip-path & Radius)
  const getShapeStyle = (): React.CSSProperties => {
      const s: React.CSSProperties = {
          // Sharp image rendering for pixel art or clean lines
          imageRendering: 'auto' 
      };
      
      // Radius
      if (frameStyle === 'rounded-sm') s.borderRadius = '4px';
      if (frameStyle === 'rounded-md') s.borderRadius = '8px';
      if (frameStyle === 'rounded-lg') s.borderRadius = '16px';
      if (frameStyle === 'rounded-xl') s.borderRadius = '24px';
      if (frameStyle === 'rounded-2xl') s.borderRadius = '32px';
      if (frameStyle === 'rounded-3xl') s.borderRadius = '48px';
      if (frameStyle === 'circle') s.borderRadius = '50%';
      if (frameStyle === 'pill') s.borderRadius = '9999px';
      if (frameStyle === 'leaf-tr') s.borderRadius = '0 50% 0 50%';
      if (frameStyle === 'leaf-tl') s.borderRadius = '50% 0 50% 0';
      if (frameStyle === 'teardrop-bl') s.borderRadius = '50% 50% 0 50%';
      if (frameStyle === 'teardrop-br') s.borderRadius = '50% 50% 50% 0';
      if (frameStyle === 'squircle') s.borderRadius = '22%';
      if (frameStyle === 'oval-h') s.borderRadius = '50% / 25%';
      if (frameStyle === 'oval-v') s.borderRadius = '25% / 50%';
      
      // Polygons
      if (frameStyle === 'triangle-up') s.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      if (frameStyle === 'triangle-down') s.clipPath = 'polygon(50% 100%, 0% 0%, 100% 0%)';
      if (frameStyle === 'hexagon') s.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      if (frameStyle === 'heptagon') s.clipPath = 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)';
      if (frameStyle === 'octagon') s.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
      if (frameStyle === 'diamond' || frameStyle === 'rhombus') s.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      if (frameStyle === 'pentagon') s.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
      
      // Stars
      if (frameStyle === 'star-4') s.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'; // Reusing 5 for now or adjust
      if (frameStyle === 'star-5') s.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      if (frameStyle === 'star-6') s.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      if (frameStyle === 'star-12') s.clipPath = 'polygon(50% 0%, 63% 20%, 85% 10%, 80% 33%, 100% 45%, 85% 65%, 95% 90%, 70% 85%, 50% 100%, 30% 85%, 5% 90%, 15% 65%, 0% 45%, 20% 33%, 15% 10%, 37% 20%)';
      if (frameStyle === 'star-curved') s.clipPath = 'path("M 100,0 C 80,40 50,50 0,50 C 50,50 80,60 100,100 C 120,60 150,50 200,50 C 150,50 120,40 100,0 Z")';
      
      // Misc
      if (frameStyle === 'arrow-r') s.clipPath = 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)';
      if (frameStyle === 'cross' || frameStyle === 'plus') s.clipPath = 'polygon(20% 0%, 20% 20%, 0% 20%, 0% 80%, 20% 80%, 20% 100%, 80% 100%, 80% 80%, 100% 80%, 100% 20%, 80% 20%, 80% 0%)';
      if (frameStyle === 'trapezoid') s.clipPath = 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)';
      
      // Art
      if (frameStyle === 'art-brush-1') s.maskImage = 'url(https://assets.codepen.io/13471/watercolor-blob.png)'; // Example mask approach
      if (frameStyle === 'torn-paper-all') s.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 95% 92%, 90% 100%, 85% 92%, 80% 100%, 75% 92%, 70% 100%, 65% 92%, 60% 100%, 55% 92%, 50% 100%, 45% 92%, 40% 100%, 35% 92%, 30% 100%, 25% 92%, 20% 100%, 15% 92%, 10% 100%, 5% 92%, 0% 100%)';

      return s;
  }

  // 2. Complex HTML Wrappers
  const renderComplexFrame = () => {
    if (!result) return null;

    // --- DEVICE MOCKUPS ---
    if (frameStyle === 'device-iphone-14') {
        return (
            <div className="relative border-[14px] border-slate-900 rounded-[50px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-black h-full overflow-hidden w-full max-w-[340px] mx-auto ring-1 ring-slate-800">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-3xl z-20"></div>
                <img src={result.imageUrl} alt="iPhone" className="w-full h-full object-cover rounded-[38px]" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white/40 rounded-full backdrop-blur-sm"></div>
            </div>
        )
    }

    if (frameStyle === 'device-browser-mac') {
        return (
            <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200/50 bg-white w-full">
                <div className="bg-slate-100/80 backdrop-blur px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]"></div>
                    </div>
                    <div className="flex-1 text-center mx-4">
                         <div className="bg-white rounded-md h-6 shadow-sm border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-medium">
                            <span className="text-green-500 mr-1">🔒</span> gemini.google.com
                         </div>
                    </div>
                </div>
                <img src={result.imageUrl} className="w-full h-auto" />
            </div>
        )
    }

    if (frameStyle === 'device-gameboy') {
        return (
            <div className="bg-[#c0c0c0] p-4 rounded-t-xl rounded-b-[50px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] border-b-8 border-[#a0a0a0] w-[320px] relative">
                <div className="bg-[#555] rounded-t-lg rounded-b-[40px] p-6 pb-10 mb-6 border-2 border-[#444] shadow-inner relative overflow-hidden">
                    <div className="bg-[#8b9245] border-4 border-[#333] shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] p-2 rounded-sm relative">
                         <div className="absolute top-1/2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse z-10 shadow-[0_0_8px_red]"></div>
                         <img src={result.imageUrl} className="w-full aspect-square object-cover opacity-90 mix-blend-multiply grayscale contrast-125 brightness-90" style={{ filter: 'sepia(60%) hue-rotate(40deg)' }} />
                         <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.08)_2px)] bg-[length:100%_3px] pointer-events-none"></div>
                    </div>
                    <div className="text-center text-[12px] font-bold italic text-white mt-2 tracking-[0.2em] font-serif opacity-60">NINTENDO</div>
                </div>
                
                {/* Controls Area */}
                <div className="flex justify-between items-end px-4 mb-8">
                    <div className="w-24 h-24 relative">
                         <div className="absolute top-8 left-8 w-8 h-8 bg-[#222] rounded shadow-sm"></div>
                         <div className="absolute top-4 left-8 w-8 h-8 bg-[#222] rounded shadow-sm"></div>
                         <div className="absolute top-8 left-4 w-8 h-8 bg-[#222] rounded shadow-sm"></div>
                         <div className="absolute top-8 left-12 w-8 h-8 bg-[#222] rounded shadow-sm"></div>
                         <div className="absolute top-8 left-8 w-8 h-8 bg-[#333] rounded-full inset-shadow"></div>
                    </div>
                    <div className="flex gap-4 rotate-[-15deg] mb-4">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#8f1c3d] shadow-[0_3px_0_#500,0_5px_5px_rgba(0,0,0,0.3)] active:translate-y-1 mb-1"></div>
                            <span className="text-[12px] font-bold text-[#8f1c3d]">B</span>
                        </div>
                         <div className="flex flex-col items-center mt-6">
                            <div className="w-12 h-12 rounded-full bg-[#8f1c3d] shadow-[0_3px_0_#500,0_5px_5px_rgba(0,0,0,0.3)] active:translate-y-1 mb-1"></div>
                            <span className="text-[12px] font-bold text-[#8f1c3d]">A</span>
                        </div>
                    </div>
                </div>
                
                 <div className="flex justify-center gap-4 mb-4">
                     <div className="w-12 h-3 bg-[#999] rounded-full transform rotate-[-25deg] shadow-inner border border-[#888]"></div>
                     <div className="w-12 h-3 bg-[#999] rounded-full transform rotate-[-25deg] shadow-inner border border-[#888]"></div>
                </div>
            </div>
        )
    }

    if (frameStyle === 'device-tv-retro') {
        return (
            <div className="bg-[#4a3b2a] p-4 rounded-lg shadow-2xl border-b-8 border-[#2a2015] w-[340px] relative">
                <div className="flex gap-2">
                    <div className="flex-1 bg-black rounded-lg border-4 border-[#333] overflow-hidden relative shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                         <img src={result.imageUrl} className="w-full h-full object-cover contrast-125 brightness-110" style={{mixBlendMode: 'screen'}} />
                         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
                         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 pointer-events-none"></div>
                    </div>
                    <div className="w-12 bg-[#2a2015] rounded flex flex-col items-center py-2 gap-2 border border-[#55402a]">
                        <div className="w-8 h-8 rounded-full bg-[#111] shadow-md border border-[#444] relative">
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-[#555] transform rotate-45"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#111] shadow-md border border-[#444] relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-[#555] transform rotate-12"></div>
                        </div>
                        <div className="mt-auto w-full px-1">
                             {[1,2,3,4].map(i => <div key={i} className="w-full h-1 bg-black/50 mb-1 rounded-full"></div>)}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-2 px-2">
                    <div className="text-[#8b7355] font-bold text-xs font-serif tracking-widest">GEMINI COLOR</div>
                </div>
            </div>
        )
    }

    // --- SOCIAL MOCKUPS ---
    if (frameStyle === 'ui-insta-post') {
        return (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden">
                <div className="p-3 flex items-center justify-between border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                            <div className="w-full h-full bg-white rounded-full p-[2px]">
                                <img src="https://ui-avatars.com/api/?name=AI&background=random" className="w-full h-full rounded-full" />
                            </div>
                        </div>
                        <div className="flex flex-col leading-none gap-1">
                             <span className="text-sm font-semibold text-slate-900">gemini_creative</span>
                             <span className="text-[10px] text-slate-400">Sponsored</span>
                        </div>
                    </div>
                    <span className="text-slate-400 font-bold">•••</span>
                </div>
                <img src={result.imageUrl} className="w-full" />
                <div className="p-4">
                    <div className="flex justify-between mb-3 text-2xl text-slate-800">
                        <div className="flex gap-4">
                           <span className="hover:text-red-500 transition-colors cursor-pointer">♥</span>
                           <span className="cursor-pointer">💬</span>
                           <span className="cursor-pointer">✈️</span>
                        </div>
                        <span className="cursor-pointer">🔖</span>
                    </div>
                    <p className="text-xs font-bold mb-1">42,893 likes</p>
                    <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">gemini_creative</span> {result.prompt.substring(0, 60)}... <span className="text-slate-400">more</span></p>
                </div>
            </div>
        )
    }

    // --- ARTISTIC & RETRO ---
    if (frameStyle === 'film-strip-v') {
        return (
            <div className="bg-[#1a1a1a] py-6 px-3 flex flex-col gap-6 shadow-2xl border-x-8 border-[#111] max-w-xs">
                {[1,2,3].map(i => (
                    <div key={i} className="relative aspect-[4/3] bg-black">
                        <img src={result.imageUrl} className="w-full h-full object-cover opacity-90" style={{ filter: i===2 ? 'none' : 'grayscale(30%) contrast(120%)' }} />
                        {/* Sprocket holes */}
                        <div className="absolute left-[-16px] top-0 bottom-0 w-6 flex flex-col justify-between py-2 px-1">
                             {[...Array(5)].map((_,x) => <div key={x} className="w-3 h-4 bg-white/10 rounded-[2px]"></div>)}
                        </div>
                        <div className="absolute right-[-16px] top-0 bottom-0 w-6 flex flex-col justify-between py-2 px-1 items-end">
                             {[...Array(5)].map((_,x) => <div key={x} className="w-3 h-4 bg-white/10 rounded-[2px]"></div>)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (frameStyle === 'device-polaroid-camera') {
         return (
             <div className="bg-white p-4 pb-16 shadow-[0_15px_30px_rgba(0,0,0,0.1)] rotate-[-2deg] max-w-sm">
                 <div className="bg-slate-50 w-full aspect-square overflow-hidden mb-5 border border-slate-100 shadow-inner">
                     <img src={result.imageUrl} className="w-full h-full object-cover filter contrast-110 brightness-105" />
                 </div>
                 <div className="font-handwriting text-slate-500 text-center transform -rotate-1 text-xl opacity-80" style={{ fontFamily: 'cursive' }}>
                     #GeminiMoments
                 </div>
             </div>
         )
    }

    // --- DECOR ---
    if (frameStyle === 'gold-luxury') {
        return (
            <div className="relative p-8 bg-gradient-to-br from-yellow-100 via-yellow-500 to-yellow-800 shadow-2xl rounded-sm ring-1 ring-yellow-900/20">
                <div className="absolute inset-2 border border-yellow-200/50"></div>
                <div className="absolute inset-3 border border-yellow-800/20"></div>
                <div className="bg-white p-2 shadow-xl relative z-10">
                    <img src={result.imageUrl} className="w-full" />
                </div>
            </div>
        )
    }

    if (frameStyle === 'gradient-neon') {
        return (
             <div className="p-1 rounded-3xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 animate-gradient-xy shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                 <div className="bg-slate-900 rounded-[22px] p-2 overflow-hidden h-full">
                     <img src={result.imageUrl} className="rounded-xl w-full h-full object-cover" />
                 </div>
             </div>
        )
    }
    
    // --- 3D ---
    if (frameStyle === '3d-isometric-l') {
        return (
            <div className="transform rotate-x-[60deg] rotate-z-[35deg] rotate-y-[-10deg] shadow-[-30px_40px_60px_rgba(0,0,0,0.3)] hover:transform-none transition-transform duration-1000 ease-out group">
                <div className="relative">
                    <img src={result.imageUrl} className="w-full border-[6px] border-white rounded-lg" />
                    {/* Fake thickness */}
                    <div className="absolute top-1 left-1 w-full h-full bg-slate-900 -z-10 rounded-lg translate-x-[-5px] translate-y-[5px] group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-1000"></div>
                     <div className="absolute top-1 left-1 w-full h-full bg-slate-900/50 -z-20 rounded-lg translate-x-[-10px] translate-y-[10px] blur-sm group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-1000"></div>
                </div>
            </div>
        )
    }

    // Default Fallback
    return (
        <img 
            src={result.imageUrl} 
            alt={result.prompt}
            className="max-w-full max-h-[600px] object-contain shadow-2xl rounded-sm"
            style={getShapeStyle()}
        />
    );
  };

  return (
    <div className="w-full h-full min-h-[600px] glass-panel rounded-3xl overflow-hidden flex flex-col relative group">
      
      {/* Background decoration - Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Idle State */}
      {!isLoading && !result && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 text-center">
          <div className="w-28 h-28 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_20px_50px_-12px_rgba(99,102,241,0.3)] transform rotate-6 hover:rotate-0 transition-transform duration-500 border border-indigo-50">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-inner">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Studio Sáng Tạo</h3>
          <p className="text-slate-500 max-w-md text-lg leading-relaxed">Nơi ý tưởng của bạn trở thành tác phẩm nghệ thuật. Hãy bắt đầu bằng một mô tả đơn giản.</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-xl flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-8">
             <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full animate-ping opacity-30"></div>
             <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-600 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-800 font-bold text-2xl tracking-tight">Đang Vẽ Tranh...</p>
          <p className="text-slate-500 mt-2 font-medium animate-pulse">Gemini đang suy nghĩ ý tưởng</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-8 bg-white/80 backdrop-blur-sm">
           <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-red-50 max-w-md animate-bounce-in">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                 </svg>
              </div>
              <p className="font-bold text-xl text-slate-800">Đã xảy ra lỗi</p>
              <p className="text-sm mt-2 text-slate-500 leading-relaxed">{error}</p>
           </div>
        </div>
      )}

      {/* Success State */}
      {result && !isLoading && (
        <div className="relative w-full h-full flex flex-col items-center z-10 animate-fade-in">
          
          {/* Main Rendering Area - Ref to capture */}
          <div className="flex-1 flex items-center justify-center w-full p-10 overflow-y-auto custom-scrollbar">
              <div ref={printRef} className="inline-block transition-transform duration-500 ease-out hover:scale-[1.01]">
                {renderComplexFrame()}
              </div>
          </div>
          
          {/* Actions Bar */}
          <div className="w-full p-5 bg-white/80 backdrop-blur-md border-t border-white flex justify-center items-center gap-4 shadow-sm z-20">
             <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`
                group relative flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5
                ${isDownloading ? 'bg-slate-400 cursor-wait' : 'bg-slate-900'}
              `}
            >
              {isDownloading ? (
                <svg className="animate-spin h-5 w-5 text-white/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              <span className="tracking-wide text-sm">{isDownloading ? 'Đang Xử Lý...' : 'Tải Về Máy'}</span>
            </button>
            
            <div className="h-8 w-px bg-slate-300 mx-2"></div>
            
             <button className="p-3.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors" title="Chia sẻ">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;