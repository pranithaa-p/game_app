'use client';

import React from 'react';
import { CardType } from '../hooks/useMemoryGame';

interface CardProps {
  card: CardType;
  onClick: () => void;
  isBoardLocked: boolean;
}

export default function Card({ card, onClick, isBoardLocked }: CardProps) {
  const { symbol, name, color, bgColor, isFlipped, isMatched } = card;

  const handleClick = () => {
    if (!isFlipped && !isMatched && !isBoardLocked) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-full aspect-[3/4] cursor-pointer group perspective-1000 select-none ${
        isMatched ? 'cursor-default pointer-events-none' : ''
      }`}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped || isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD BACK (Face Down) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-cyan-500/20 bg-slate-950 flex flex-col items-center justify-center p-3 shadow-lg shadow-cyan-950/10 group-hover:border-cyan-400 group-hover:shadow-cyan-500/20 group-hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden">
          {/* Cyber circuit/grid background pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Glow backdrop */}
          <div className="absolute w-12 h-12 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/25 transition-all duration-300"></div>

          {/* Cybernetic geometric center */}
          <div className="z-10 w-12 h-12 rounded-lg border border-cyan-500/30 flex items-center justify-center bg-slate-900 shadow-inner group-hover:border-cyan-400/70 transition duration-300">
            <span className="text-cyan-400 text-lg font-mono font-bold animate-pulse">?</span>
          </div>

          <div className="z-10 mt-3 text-[10px] text-cyan-500/40 font-mono tracking-widest uppercase">
            System Locked
          </div>
        </div>

        {/* CARD FRONT (Face Up & Matched) */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 flex flex-col items-center justify-center p-2 shadow-neon transition-all duration-300 rotate-y-180 bg-slate-900/90 ${bgColor} ${color} ${
            isMatched ? 'border-green-500/60 shadow-green-500/20 opacity-80 scale-[0.98]' : 'scale-100'
          }`}
        >
          {/* Cyber grid overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />

          {/* Holographic light reflection band */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 rounded-xl" />

          {/* Animal Emoji Symbol */}
          <div className={`z-10 text-4xl sm:text-5xl transition-transform ${isMatched ? 'scale-100' : 'scale-110 animate-bounce'}`}>
            {symbol}
          </div>

          {/* Neon Text Label */}
          <div className="z-10 mt-3 text-[9px] font-bold font-mono tracking-wider text-center select-none uppercase truncate max-w-full px-1">
            {isMatched ? 'SECURED' : name}
          </div>

          {/* Hologram horizontal scanner line */}
          <div className="absolute left-0 right-0 h-[2px] bg-white/20 animate-scanner pointer-events-none opacity-20" />
        </div>
      </div>
    </div>
  );
}
