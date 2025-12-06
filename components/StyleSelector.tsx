import React from 'react';

export interface ImageStyle {
  id: string;
  label: string;
  value: string;
  description: string;
  color: string;
}

export const styles: ImageStyle[] = [
  { 
    id: 'none', 
    label: 'Mặc định', 
    value: '', 
    description: 'Tự nhiên, theo mô tả',
    color: 'bg-gray-100'
  },
  { 
    id: '3d-render', 
    label: '3D Render', 
    value: '3d render, unreal engine 5, pixar style, disney style, c4d, octane render, high quality, 8k', 
    description: 'Đồ họa 3D, icon, game',
    color: 'bg-purple-100'
  },
  { 
    id: 'cinematic', 
    label: 'Điện ảnh', 
    value: 'cinematic lighting, highly detailed, dramatic atmosphere, 8k resolution, movie poster style, realistic', 
    description: 'Ánh sáng phim, kịch tính',
    color: 'bg-blue-100'
  },
  { 
    id: 'anime', 
    label: 'Anime', 
    value: 'anime style, studio ghibli style, vibrant colors, detailed background, makoto shinkai style', 
    description: 'Hoạt hình Nhật Bản',
    color: 'bg-pink-100'
  },
  { 
    id: 'digital-art', 
    label: 'Digital Art', 
    value: 'digital art, concept art, trending on artstation, highly detailed, smooth, illustration', 
    description: 'Vẽ kỹ thuật số, hiện đại',
    color: 'bg-indigo-100'
  },
   { 
    id: 'cyberpunk', 
    label: 'Cyberpunk', 
    value: 'cyberpunk style, neon lights, futuristic city, high tech, sci-fi, retrowave, synthwave', 
    description: 'Tương lai, đèn neon',
    color: 'bg-cyan-100'
  },
  { 
    id: 'oil-painting', 
    label: 'Sơn dầu', 
    value: 'oil painting style, textured canvas, thick brushstrokes, classic art, impressionism', 
    description: 'Nghệ thuật cổ điển',
    color: 'bg-amber-100'
  },
  { 
    id: 'watercolor', 
    label: 'Màu nước', 
    value: 'watercolor painting, soft edges, pastel colors, artistic, dreamy, wet on wet', 
    description: 'Nhẹ nhàng, mơ mộng',
    color: 'bg-teal-100'
  },
  { 
    id: 'sketch', 
    label: 'Phác thảo', 
    value: 'pencil sketch, graphite drawing, rough lines, black and white, hand drawn, charcoal', 
    description: 'Vẽ chì, đen trắng',
    color: 'bg-stone-100'
  },
   { 
    id: 'papercut', 
    label: 'Cắt giấy', 
    value: 'papercut art style, layered paper, shadow box, craft style, depth of field', 
    description: 'Nghệ thuật cắt giấy',
    color: 'bg-orange-100'
  },
];

interface StyleSelectorProps {
  selectedStyleId: string;
  onStyleChange: (id: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onStyleChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Phong cách nghệ thuật
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onStyleChange(style.id)}
            className={`
              relative flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 overflow-hidden group
              ${selectedStyleId === style.id
                ? 'border-indigo-600 ring-2 ring-indigo-600 ring-opacity-50 bg-white'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 bg-white'}
            `}
          >
            {/* Background color blob */}
            <div className={`absolute inset-0 opacity-20 ${style.color} transition-opacity group-hover:opacity-40`}></div>
            
            {/* Checkmark for selected */}
             {selectedStyleId === style.id && (
                <div className="absolute top-2 right-2 text-indigo-600 bg-white rounded-full p-0.5 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
             )}
             
            <span className={`relative z-10 text-sm font-bold ${selectedStyleId === style.id ? 'text-indigo-800' : 'text-gray-800'}`}>
              {style.label}
            </span>
            <span className="relative z-10 text-xs text-gray-500 mt-1 line-clamp-2 leading-tight">
              {style.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
