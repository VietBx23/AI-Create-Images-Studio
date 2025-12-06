import React from 'react';
import { AspectRatio } from '../types';

export type InputMode = 'preset' | 'social' | 'custom';

interface AspectRatioSelectorProps {
  mode: InputMode;
  setMode: (mode: InputMode) => void;
  selectedRatio: AspectRatio;
  onRatioChange: (ratio: AspectRatio) => void;
  width: number;
  height: number;
  onDimensionChange: (width: number, height: number) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ 
  mode, 
  setMode, 
  selectedRatio, 
  onRatioChange,
  width,
  height,
  onDimensionChange
}) => {
  
  const presets = [
    { value: AspectRatio.SQUARE, label: "Vuông", sub: "1:1", icon: "aspect-square" },
    { value: AspectRatio.PORTRAIT, label: "Dọc", sub: "3:4", icon: "aspect-[3/4]" },
    { value: AspectRatio.LANDSCAPE, label: "Ngang", sub: "4:3", icon: "aspect-[4/3]" },
    { value: AspectRatio.WIDE_PORTRAIT, label: "Story", sub: "9:16", icon: "aspect-[9/16]" },
    { value: AspectRatio.WIDE_LANDSCAPE, label: "Cinema", sub: "16:9", icon: "aspect-video" },
  ];

  const socialPresets = [
    { value: AspectRatio.IG_PORTRAIT, label: "IG Post", sub: "4:5" },
    { value: AspectRatio.IG_STORY, label: "Story", sub: "9:16" },
    { value: AspectRatio.FB_COVER, label: "FB Cover", sub: "Cover" },
    { value: AspectRatio.YT_THUMBNAIL, label: "Youtube", sub: "16:9" },
    { value: AspectRatio.TWITTER_HEADER, label: "X Header", sub: "3:1" },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
           <span className="p-1 rounded bg-pink-100 text-pink-600">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
           </span>
           Kích thước
        </label>
        
        {/* Segmented Control */}
        <div className="flex bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto border border-slate-200">
          {[
             { id: 'preset', label: 'Cơ bản' },
             { id: 'social', label: 'Social' },
             { id: 'custom', label: 'Tùy chọn' }
          ].map((tab) => (
             <button 
                key={tab.id}
                onClick={() => setMode(tab.id as InputMode)} 
                className={`
                   flex-1 sm:flex-none px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300
                   ${mode === tab.id ? 'bg-white text-indigo-600 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
                `}
             >
                {tab.label}
             </button>
          ))}
        </div>
      </div>

      {mode === 'preset' && (
        <div className="grid grid-cols-5 gap-2">
          {presets.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => onRatioChange(ratio.value)}
              className={`
                group flex flex-col items-center justify-center p-2 rounded-2xl border transition-all duration-200 h-20 relative overflow-hidden
                ${selectedRatio === ratio.value
                  ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-500'
                  : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50 text-slate-600 shadow-sm'}
              `}
            >
              <div className={`w-6 border-2 border-current rounded-sm mb-1.5 opacity-60 ${ratio.icon} ${selectedRatio === ratio.value ? 'opacity-100' : 'group-hover:opacity-80'}`}></div>
              <span className="text-[10px] font-bold">{ratio.label}</span>
              <span className="text-[9px] opacity-60 font-mono">{ratio.sub}</span>
            </button>
          ))}
        </div>
      )}

      {mode === 'social' && (
        <div className="grid grid-cols-5 gap-2">
          {socialPresets.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => onRatioChange(ratio.value)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-2xl border transition-all duration-200 h-20
                ${selectedRatio === ratio.value
                  ? 'border-pink-500 bg-pink-50/50 text-pink-700 ring-1 ring-pink-500'
                  : 'border-slate-100 bg-white hover:border-pink-200 hover:bg-slate-50 text-slate-600 shadow-sm'}
              `}
            >
              <span className="text-[10px] font-bold text-center leading-tight">{ratio.label}</span>
              <span className="text-[9px] opacity-60 mt-1 font-mono">{ratio.sub}</span>
            </button>
          ))}
        </div>
      )}

      {mode === 'custom' && (
        <div className="bg-slate-50/50 p-4 rounded-2xl border border-dashed border-slate-300">
          <div className="flex items-end gap-3">
            <div className="flex-1 group">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Rộng (W)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => onDimensionChange(parseInt(e.target.value) || 0, height)}
                className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold text-center p-2.5 transition-all group-hover:border-indigo-300"
              />
            </div>
            <div className="pb-3 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="flex-1 group">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Cao (H)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => onDimensionChange(width, parseInt(e.target.value) || 0)}
                className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold text-center p-2.5 transition-all group-hover:border-indigo-300"
              />
            </div>
          </div>
          <div className="mt-3 text-center">
             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                <span>Tỷ lệ hiện tại:</span>
                <span className="font-mono text-xs">{Number((width / height).toFixed(2))}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AspectRatioSelector;