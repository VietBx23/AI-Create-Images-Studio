
export enum AspectRatio {
  SQUARE = "1:1",
  PORTRAIT = "3:4",
  LANDSCAPE = "4:3",
  WIDE_PORTRAIT = "9:16",
  WIDE_LANDSCAPE = "16:9",
  // Social Standards
  FB_COVER = "2.63:1", // 820x312
  YT_THUMBNAIL = "16:9",
  IG_STORY = "9:16",
  IG_PORTRAIT = "4:5",
  TWITTER_HEADER = "3:1"
}

export type FrameStyle =
  // --- BASIC (20) ---
  | 'none' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' 
  | 'circle' | 'oval-h' | 'oval-v' | 'squircle' | 'pill' | 'teardrop-tl' | 'teardrop-tr' | 'teardrop-bl' | 'teardrop-br'
  | 'leaf-tl' | 'leaf-tr' | 'leaf-bl' | 'leaf-br'

  // --- GEOMETRIC & POLYGONS (30) ---
  | 'triangle-up' | 'triangle-down' | 'triangle-left' | 'triangle-right'
  | 'pentagon' | 'hexagon' | 'heptagon' | 'octagon' | 'nonagon' | 'decagon' | 'dodecagon'
  | 'diamond' | 'rhombus' | 'trapezoid' | 'parallelogram-l' | 'parallelogram-r'
  | 'star-4' | 'star-5' | 'star-6' | 'star-8' | 'star-12' | 'star-curved' | 'star-fat' | 'star-thin'
  | 'cross' | 'plus' | 'x-shape' | 'arrow-u' | 'arrow-d' | 'arrow-l' | 'arrow-r'

  // --- DECORATIVE & BORDERS (25) ---
  | 'border-simple' | 'border-double' | 'border-triple' | 'border-dashed' | 'border-dotted'
  | 'outline-offset' | 'outline-heavy' | 'frame-groove' | 'frame-ridge' | 'frame-inset' | 'frame-outset'
  | 'corner-bracket' | 'corner-line' | 'corner-dot' | 'corner-tape'
  | 'gradient-sun' | 'gradient-cool' | 'gradient-neon' | 'rainbow-ring' | 'gold-luxury'
  | 'wood-dark' | 'wood-light' | 'metal-silver' | 'metal-rusty' | 'marble'

  // --- SOCIAL MEDIA UI (20) ---
  | 'ui-insta-post' | 'ui-insta-story' | 'ui-insta-grid'
  | 'ui-fb-post' | 'ui-twitter-tweet' | 'ui-youtube-player' | 'ui-tiktok'
  | 'ui-message-ios' | 'ui-message-android' | 'ui-whatsapp'
  | 'ui-notification-stack' | 'ui-music-player' | 'ui-voice-note'
  | 'ui-profile-circle' | 'ui-live-badge'

  // --- DEVICE MOCKUPS (15) ---
  | 'device-iphone-14' | 'device-pixel' | 'device-browser-mac' | 'device-browser-win'
  | 'device-laptop' | 'device-monitor' | 'device-tablet' | 'device-watch'
  | 'device-tv-flat' | 'device-tv-retro' | 'device-gameboy' | 'device-switch'
  | 'device-camcorder' | 'device-polaroid-camera'

  // --- ARTISTIC & GRUNGE (30) ---
  | 'art-brush-1' | 'art-brush-2' | 'art-brush-3' | 'art-ink-splash' | 'art-watercolor'
  | 'grunge-noise' | 'grunge-scratch' | 'grunge-paper-1' | 'grunge-paper-2' | 'grunge-tape'
  | 'torn-paper-top' | 'torn-paper-bottom' | 'torn-paper-all' | 'paper-folded' | 'paper-crumpled'
  | 'canvas-texture' | 'stamp-edge' | 'ticket-stub' | 'receipt' | 'notepad'

  // --- FILM & RETRO (25) ---
  | 'film-strip-v' | 'film-strip-h' | 'film-slide-kodak' | 'film-slide-fuji'
  | 'vhs-glitch' | 'vhs-overlay' | 'crt-screen' | 'scanlines'
  | 'retro-windows-95' | 'retro-mac-os' | 'retro-terminal' | 'retro-vaporwave'
  | 'halftone-dots' | 'pixelate-border' | 'blueprint'

  // --- 3D & SHADOWS (20) ---
  | 'shadow-drop-sm' | 'shadow-drop-md' | 'shadow-drop-lg' | 'shadow-drop-xl'
  | 'shadow-float' | 'shadow-inner' | 'shadow-neumorphism-flat' | 'shadow-neumorphism-pressed'
  | '3d-isometric-l' | '3d-isometric-r' | '3d-perspective-t' | '3d-perspective-b'
  | 'glass-card' | 'glass-frosted' | 'glass-border'

  // --- MISC & FUN (15) ---
  | 'shape-blob-1' | 'shape-blob-2' | 'shape-blob-3' | 'shape-splat'
  | 'pattern-grid' | 'pattern-dots' | 'pattern-lines'
  | 'badge-award' | 'badge-verified' | 'sticker-outline';

export interface GeneratedImageResult {
  imageUrl: string;
  prompt: string;
  ratio: AspectRatio;
}

export interface ImageGenerationState {
  isLoading: boolean;
  error: string | null;
  result: GeneratedImageResult | null;
}
