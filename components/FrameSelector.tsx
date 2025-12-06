import React, { useState } from 'react';
import { FrameStyle } from '../types';

interface FrameSelectorProps {
  selectedFrame: FrameStyle;
  onFrameChange: (frame: FrameStyle) => void;
}

// Categories
const CATEGORIES = [
  { id: 'basic', label: 'Cơ bản', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'geo', label: 'Hình khối', icon: 'M12 2L2 7l10 5 10-5-10-5zm0 9l2-10 10 5-10 5-2 10z' },
  { id: 'device', label: 'Thiết bị', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { id: 'social', label: 'Mạng XH', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'decor', label: 'Viền Decor', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'retro', label: 'Retro Film', icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' },
  { id: 'art', label: 'Nghệ thuật', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  { id: 'shadow', label: 'Hiệu ứng 3D', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
];

const FRAMES_DATA: Record<string, {id: FrameStyle, label: string}[]> = {
  basic: [
    { id: 'none', label: 'Nguyên bản' }, { id: 'rounded-sm', label: 'Bo nhỏ' }, { id: 'rounded-md', label: 'Bo vừa' },
    { id: 'rounded-lg', label: 'Bo lớn' }, { id: 'rounded-xl', label: 'Bo XL' }, { id: 'rounded-2xl', label: 'Bo 2XL' },
    { id: 'rounded-3xl', label: 'Bo cực đại' }, { id: 'circle', label: 'Hình tròn' }, { id: 'squircle', label: 'iOS Icon' },
    { id: 'pill', label: 'Viên thuốc' }, { id: 'oval-h', label: 'Bầu dục N' }, { id: 'oval-v', label: 'Bầu dục D' },
    { id: 'leaf-tr', label: 'Lá cây 1' }, { id: 'leaf-tl', label: 'Lá cây 2' }, { id: 'teardrop-bl', label: 'Giọt nước' },
    { id: 'teardrop-br', label: 'Cánh hoa' }
  ],
  geo: [
    { id: 'triangle-up', label: 'Tam giác' }, { id: 'triangle-down', label: 'Tam giác ngược' },
    { id: 'diamond', label: 'Kim cương' }, { id: 'rhombus', label: 'Thoi' },
    { id: 'pentagon', label: 'Ngũ giác' }, { id: 'hexagon', label: 'Lục giác' },
    { id: 'heptagon', label: 'Thất giác' }, { id: 'octagon', label: 'Bát giác' },
    { id: 'star-4', label: 'Sao 4' }, { id: 'star-5', label: 'Sao 5' }, { id: 'star-6', label: 'Sao 6' },
    { id: 'star-8', label: 'Sao 8' }, { id: 'star-12', label: 'Sao 12' }, { id: 'star-curved', label: 'Hoa' },
    { id: 'cross', label: 'Thập' }, { id: 'plus', label: 'Cộng' }, { id: 'x-shape', label: 'Nhân' },
    { id: 'arrow-r', label: 'Mũi tên' }, { id: 'trapezoid', label: 'Hình thang' }, { id: 'parallelogram-r', label: 'Nghiêng' }
  ],
  device: [
    { id: 'device-iphone-14', label: 'iPhone 15' }, { id: 'device-pixel', label: 'Pixel' },
    { id: 'device-browser-mac', label: 'Safari UI' }, { id: 'device-browser-win', label: 'Chrome UI' },
    { id: 'device-laptop', label: 'MacBook' }, { id: 'device-monitor', label: 'iMac' },
    { id: 'device-gameboy', label: 'GameBoy' }, { id: 'device-switch', label: 'Switch' },
    { id: 'device-polaroid-camera', label: 'Máy ảnh' }, { id: 'device-tv-retro', label: 'TV Cổ' },
    { id: 'device-tv-flat', label: 'Smart TV' }, { id: 'device-watch', label: 'SmartWatch' }
  ],
  social: [
    { id: 'ui-insta-post', label: 'Insta Post' }, { id: 'ui-insta-story', label: 'Insta Story' },
    { id: 'ui-tiktok', label: 'TikTok UI' }, { id: 'ui-youtube-player', label: 'Youtube' },
    { id: 'ui-fb-post', label: 'Facebook' }, { id: 'ui-twitter-tweet', label: 'Tweet' },
    { id: 'ui-message-ios', label: 'iMessage' }, { id: 'ui-message-android', label: 'Chat' },
    { id: 'ui-notification-stack', label: 'Thông báo' }, { id: 'ui-music-player', label: 'Music App' },
    { id: 'ui-voice-note', label: 'Voice' }, { id: 'ui-profile-circle', label: 'Avatar Pro' }
  ],
  decor: [
    { id: 'border-simple', label: 'Viền đơn' }, { id: 'border-double', label: 'Viền kép' },
    { id: 'border-dashed', label: 'Nét đứt' }, { id: 'border-dotted', label: 'Chấm bi' },
    { id: 'gradient-neon', label: 'Đèn Neon' }, { id: 'gradient-sun', label: 'Nắng ấm' },
    { id: 'gold-luxury', label: 'Khung Vàng' }, { id: 'corner-tape', label: 'Băng dính' },
    { id: 'corner-bracket', label: 'Ngoặc vuông' }, { id: 'wood-light', label: 'Khung gỗ' },
    { id: 'frame-inset', label: 'Chìm sâu' }, { id: 'outline-offset', label: 'Viền lệch' },
    { id: 'frame-groove', label: 'Rãnh' }, { id: 'frame-ridge', label: 'Gờ nổi' }
  ],
  retro: [
    { id: 'film-strip-v', label: 'Phim dọc' }, { id: 'film-strip-h', label: 'Phim ngang' },
    { id: 'film-slide-kodak', label: 'Slide Film' }, { id: 'vhs-glitch', label: 'Lỗi Glitch' },
    { id: 'retro-windows-95', label: 'Win 95' }, { id: 'retro-mac-os', label: 'Mac OS' },
    { id: 'retro-terminal', label: 'Terminal' }, { id: 'crt-screen', label: 'Màn hình CRT' },
    { id: 'halftone-dots', label: 'Truyện tranh' }, { id: 'blueprint', label: 'Bản vẽ' }
  ],
  art: [
    { id: 'art-brush-1', label: 'Nét cọ 1' }, { id: 'art-brush-2', label: 'Nét cọ 2' },
    { id: 'art-ink-splash', label: 'Mực loang' }, { id: 'art-watercolor', label: 'Màu nước' },
    { id: 'torn-paper-all', label: 'Giấy rách' }, { id: 'torn-paper-top', label: 'Rách trên' },
    { id: 'paper-crumpled', label: 'Giấy nhàu' }, { id: 'paper-folded', label: 'Gấp nếp' },
    { id: 'ticket-stub', label: 'Vé xe' }, { id: 'stamp-edge', label: 'Tem thư' },
    { id: 'canvas-texture', label: 'Vải Canvas' }, { id: 'notepad', label: 'Sổ tay' }
  ],
  shadow: [
    { id: 'shadow-drop-sm', label: 'Bóng nhỏ' }, { id: 'shadow-drop-xl', label: 'Bóng lớn' },
    { id: 'shadow-float', label: 'Nổi bật' }, { id: 'shadow-inner', label: 'Bóng trong' },
    { id: 'shadow-neumorphism-flat', label: 'Soft UI' }, { id: 'glass-card', label: 'Kính mờ' },
    { id: '3d-isometric-l', label: '3D Trái' }, { id: '3d-isometric-r', label: '3D Phải' },
    { id: '3d-perspective-t', label: '3D Nghiêng' }, { id: 'glass-border', label: 'Viền kính' }
  ],
};

const FrameSelector: React.FC<FrameSelectorProps> = ({ selectedFrame, onFrameChange }) => {
  const [activeTab, setActiveTab] = useState('basic');

  // --- RENDER MINIATURE PREVIEWS ---
  // Using generic CSS/SVG logic to make thumbnails crisp
  const renderThumbnail = (style: FrameStyle) => {
    // 1. Shapes (Using Clip Path & Radius)
    if (['basic', 'geo'].includes(activeTab)) {
        const css: React.CSSProperties = { 
            background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.3)' // Sharp inner border
        };
        
        // Radius Logic
        if (style.includes('rounded')) {
            if (style === 'rounded-sm') css.borderRadius = '2px';
            else if (style === 'rounded-md') css.borderRadius = '4px';
            else if (style === 'rounded-lg') css.borderRadius = '6px';
            else if (style === 'rounded-xl') css.borderRadius = '8px';
            else if (style === 'rounded-2xl') css.borderRadius = '10px';
            else if (style === 'rounded-3xl') css.borderRadius = '14px';
        }
        if (style === 'circle') css.borderRadius = '50%';
        if (style === 'pill') css.borderRadius = '99px';
        if (style === 'squircle') css.borderRadius = '22%';
        if (style === 'leaf-tr') css.borderRadius = '0 50% 0 50%';
        if (style === 'leaf-tl') css.borderRadius = '50% 0 50% 0';
        if (style === 'teardrop-bl') css.borderRadius = '50% 50% 0 50%';
        if (style === 'teardrop-br') css.borderRadius = '50% 50% 50% 0';
        if (style === 'oval-h') css.borderRadius = '50% / 25%';
        if (style === 'oval-v') css.borderRadius = '25% / 50%';
        
        // Polygon Logic
        if (style === 'triangle-up') css.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        if (style === 'triangle-down') css.clipPath = 'polygon(50% 100%, 0% 0%, 100% 0%)';
        if (style === 'diamond' || style === 'rhombus') css.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
        if (style === 'hexagon') css.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        if (style === 'octagon') css.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
        if (style === 'pentagon') css.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
        if (style === 'star-5') css.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        if (style === 'star-12') css.clipPath = 'polygon(50% 0%, 63% 20%, 85% 10%, 80% 33%, 100% 45%, 85% 65%, 95% 90%, 70% 85%, 50% 100%, 30% 85%, 5% 90%, 15% 65%, 0% 45%, 20% 33%, 15% 10%, 37% 20%)';
        if (style === 'star-curved') css.clipPath = 'path("M 50,0 C 40,20 25,25 0,25 C 25,25 40,30 50,50 C 60,30 75,25 100,25 C 75,25 60,20 50,0 Z")'; 
        if (style === 'cross' || style === 'plus') css.clipPath = 'polygon(20% 0%, 20% 20%, 0% 20%, 0% 80%, 20% 80%, 20% 100%, 80% 100%, 80% 80%, 100% 80%, 100% 20%, 80% 20%, 80% 0%)';
        if (style === 'arrow-r') css.clipPath = 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)';
        if (style === 'trapezoid') css.clipPath = 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)';
        if (style === 'parallelogram-r') { css.transform = 'skewX(-10deg) scale(0.8)'; css.transformOrigin = 'center'; }

        return <div className="w-full h-full" style={css}></div>;
    }

    // 2. Devices (Detailed rendering)
    if (style.startsWith('device-')) {
        if (style === 'device-iphone-14') return (
            <div className="w-8 h-full bg-slate-900 rounded-[6px] mx-auto border-[1px] border-slate-700 relative flex flex-col overflow-hidden">
                <div className="w-3 h-1 bg-black absolute top-1 left-1/2 -translate-x-1/2 rounded-b-[2px] z-10"></div>
                <div className="flex-1 bg-indigo-50"></div>
                <div className="h-0.5 w-4 bg-white/30 rounded-full mx-auto mb-0.5"></div>
            </div>
        );
        if (style === 'device-gameboy') return (
            <div className="w-8 h-full bg-slate-300 rounded-b-[6px] border border-slate-400 mx-auto p-0.5 flex flex-col gap-0.5 shadow-sm">
                <div className="w-full h-1/2 bg-slate-600 rounded-[2px] border border-slate-700"></div>
                <div className="flex justify-between px-0.5 mt-1"><div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div><div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div></div>
            </div>
        );
        if (style === 'device-browser-mac') return (
            <div className="w-full h-8 bg-white border border-slate-200 rounded-[4px] overflow-hidden flex flex-col shadow-sm">
                <div className="h-2 bg-slate-50 flex items-center px-1 gap-[2px] border-b border-slate-100">
                    <div className="w-[3px] h-[3px] rounded-full bg-red-400"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-yellow-400"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-indigo-50/50"></div>
            </div>
        );
        if (style === 'device-laptop') return (
            <div className="flex flex-col items-center justify-center h-full pt-1">
                <div className="w-10 h-6 bg-slate-800 rounded-t-[2px] border border-slate-600 relative"><div className="absolute inset-[1px] bg-indigo-900/80"></div></div>
                <div className="w-12 h-[3px] bg-slate-300 rounded-b-[2px]"></div>
            </div>
        );
        if (style === 'device-tv-retro') return (
            <div className="w-10 h-8 bg-amber-800 rounded-[4px] p-[2px] border border-amber-900 flex items-center gap-[2px]">
                 <div className="flex-1 h-full bg-black rounded-[2px] opacity-80"></div>
                 <div className="w-1.5 flex flex-col gap-[1px]">
                     <div className="w-1 h-1 rounded-full bg-amber-200"></div>
                     <div className="w-1 h-1 rounded-full bg-amber-200"></div>
                 </div>
            </div>
        );
        if (style === 'device-watch') return (
            <div className="w-6 h-8 bg-slate-800 rounded-[6px] border border-slate-600 mx-auto relative shadow-sm">
                 <div className="absolute inset-[2px] border border-slate-600 rounded-[4px]"></div>
            </div>
        );
    }

    // 3. Social UI
    if (style.startsWith('ui-')) {
        if (style === 'ui-insta-post') return (
            <div className="w-full h-full bg-white border border-slate-200 flex flex-col p-[2px] rounded-[2px]">
                <div className="flex items-center gap-[2px] mb-[2px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"></div>
                    <div className="w-3 h-[2px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-100 rounded-[1px]"></div>
            </div>
        );
        if (style === 'ui-insta-story') return (
            <div className="w-7 h-full mx-auto border-[1.5px] border-pink-500 rounded-[6px] p-[1px]">
                <div className="w-full h-full bg-slate-50 rounded-[4px]"></div>
            </div>
        );
        if (style === 'ui-youtube-player') return (
            <div className="w-full h-7 bg-black rounded-[3px] flex items-center justify-center border border-slate-800">
                 <div className="w-0 h-0 border-t-[2px] border-t-transparent border-l-[4px] border-l-red-600 border-b-[2px] border-b-transparent ml-[1px]"></div>
            </div>
        );
        if (style === 'ui-message-ios') return (
            <div className="w-full h-full flex flex-col justify-center gap-1 p-1">
                 <div className="w-3/4 h-3 bg-slate-200 rounded-lg rounded-tl-none self-start"></div>
                 <div className="w-3/4 h-3 bg-blue-500 rounded-lg rounded-br-none self-end"></div>
            </div>
        );
    }

    // 4. Decor & Retro
    if (style === 'film-strip-v') return (
        <div className="w-7 h-full bg-black mx-auto flex flex-col justify-between py-[2px] px-[1px]">
            <div className="w-full h-3.5 bg-indigo-900/40 border-[0.5px] border-white/20"></div>
            <div className="w-full h-3.5 bg-indigo-900/40 border-[0.5px] border-white/20"></div>
        </div>
    );
    if (style === 'gold-luxury') return (
        <div className="w-full h-full border-[3px] border-yellow-500 bg-white relative">
            <div className="absolute inset-[1px] border border-yellow-200"></div>
        </div>
    );
    if (style === 'gradient-neon') return (
        <div className="w-full h-full bg-black rounded-[4px] p-[1px] shadow-[0_0_4px_rgba(236,72,153,0.8)]">
             <div className="w-full h-full bg-slate-900 rounded-[3px]"></div>
        </div>
    );
     if (style === 'wood-light') return (
        <div className="w-full h-full bg-[#d4c5a5] border-[3px] border-[#8b5a2b] shadow-inner" style={{backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 50%, transparent 50%)', backgroundSize: '4px 4px'}}></div>
    );
     if (style === 'corner-tape') return (
        <div className="w-full h-full bg-white border border-slate-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-3 h-1.5 bg-yellow-300/60 transform rotate-45 translate-x-0.5 -translate-y-0.5"></div>
             <div className="absolute bottom-0 left-0 w-3 h-1.5 bg-yellow-300/60 transform rotate-45 -translate-x-0.5 translate-y-0.5"></div>
        </div>
    );

    // 5. Shadows & 3D
    if (style.startsWith('shadow-')) {
         return <div className={`w-6 h-6 bg-white mx-auto mt-1 rounded-[2px] ${style === 'shadow-drop-xl' ? 'shadow-lg' : 'shadow-sm'}`}></div>
    }
    if (style === '3d-isometric-l') return (
        <div className="w-6 h-6 bg-indigo-100 mx-auto mt-2 transform rotate-x-60 rotate-z-45 border border-white shadow-md rounded-[1px]"></div>
    );

    // Default fallback - Simple Crisp Box
    return <div className="w-full h-full bg-slate-100 rounded-[2px] border border-slate-300"></div>;
  };

  return (
    <div className="glass-panel rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden flex flex-col h-[520px]">
      
      {/* Header & Tabs */}
      <div className="p-5 border-b border-slate-100 bg-white/40 backdrop-blur-md z-10">
         <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="p-1 rounded bg-teal-100 text-teal-600">
                   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </span>
                Kho Khung hình & Mockup
             </h3>
             <span className="text-[10px] font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-500">200+ Kiểu</span>
         </div>
         
         {/* Scrollable Tabs */}
         <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar-x -mx-1 px-1">
            {CATEGORIES.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`
                        flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all border shrink-0
                        ${activeTab === cat.id 
                            ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200 transform scale-105' 
                            : 'bg-white/60 text-slate-500 border-transparent hover:bg-white hover:border-slate-200 hover:text-slate-800'}
                    `}
                >
                    <svg className={`w-3.5 h-3.5 ${activeTab === cat.id ? 'text-indigo-300' : 'opacity-60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.icon} />
                    </svg>
                    {cat.label}
                </button>
            ))}
         </div>
      </div>

      {/* Grid Content */}
      <div className="p-5 bg-slate-50/30 flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4">
              {FRAMES_DATA[activeTab]?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onFrameChange(item.id)}
                    className="group flex flex-col items-center gap-2"
                  >
                      <div className={`
                        w-full aspect-square rounded-2xl flex items-center justify-center bg-white shadow-sm overflow-hidden transition-all duration-300 relative p-3
                        ${selectedFrame === item.id 
                            ? 'ring-2 ring-indigo-500 ring-offset-2 transform scale-105 shadow-md z-10' 
                            : 'border border-slate-200 group-hover:border-indigo-300 group-hover:shadow-md group-hover:-translate-y-1'}
                      `}>
                          {/* Render Sharp Thumbnail */}
                          {renderThumbnail(item.id)}
                          
                          {/* Checkmark Overlay */}
                          {selectedFrame === item.id && (
                              <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center backdrop-blur-[1px] z-20">
                                  <div className="bg-indigo-600 rounded-full p-1 shadow-sm">
                                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                  </div>
                              </div>
                          )}
                      </div>
                      <span className={`text-[10px] text-center leading-tight font-semibold transition-colors ${selectedFrame === item.id ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-800'}`}>
                          {item.label}
                      </span>
                  </button>
              ))}
          </div>
          <div className="mt-8 mb-2 text-center">
             <div className="inline-block h-1 w-12 bg-slate-200 rounded-full"></div>
          </div>
      </div>
    </div>
  );
};

export default FrameSelector;