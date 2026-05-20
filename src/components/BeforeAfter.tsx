import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { cacheBustImageUrl } from '../utils/image';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
}

export default function BeforeAfter({ beforeImage, afterImage, title }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchAndMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleTouchAndMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleTouchAndMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {title && (
        <h4 className="text-sm font-mono tracking-wider text-[#C9A14A] uppercase mb-4">
          {title}
        </h4>
      )}

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] max-h-[500px] overflow-hidden rounded-xl border border-white/10 select-none cursor-ew-resize group"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER IMAGE (Background, always showing on right) */}
        <img
          src={cacheBustImageUrl(afterImage, afterImage)}
          alt="Transformed Space"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 px-3 py-1 bg-[#C9A14A] text-[#0B0B0F] text-xs font-mono font-bold uppercase rounded-md shadow-md">
          After
        </div>

        {/* BEFORE IMAGE (Clipped on left based on slider position) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={cacheBustImageUrl(beforeImage, beforeImage)}
            alt="Original Space"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 bottom-4 px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/20 text-xs font-mono font-bold uppercase rounded-md">
            Before
          </div>
        </div>

        {/* SLIDER HANDLE LINE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#C9A14A] shadow-[0_0_10px_#C9A14A] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* DRAG KNOB */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-[14px] w-8 h-8 rounded-full bg-[#0B0B0F] border-2 border-[#C9A14A] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-grab">
            <svg
              className="w-4 h-4 text-[#C9A14A]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 font-mono mt-3 select-none">
        ← Drag or slide across the frame to compare →
      </p>
    </div>
  );
}
