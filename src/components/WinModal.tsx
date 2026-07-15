'use client';

import React from 'react';

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  time: number;
  onPlayAgain: () => void;
}

export default function WinModal({ isOpen, moves, time, onPlayAgain }: WinModalProps) {
  if (!isOpen) return null;

  // Helper to format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}m ${remainingSecs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" />

      {/* Modal Content */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-4 border-green-500 bg-slate-900 px-6 py-8 text-center shadow-[0_0_35px_rgba(34,197,94,0.3)] animate-scale-up z-10 flex flex-col items-center">
        {/* Neon green stripes top overlay */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 animate-pulse" />

        {/* Glitch Grid Secured Display */}
        <div className="w-16 h-16 rounded-full border-2 border-green-400 flex items-center justify-center bg-green-500/10 text-green-400 text-3xl animate-bounce mb-4">
          🔓
        </div>

        {/* Playful & fun victory heads */}
        <h2 className="text-3xl font-black font-mono tracking-tighter text-green-400 animate-pulse uppercase drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
          Grid Secured!
        </h2>
        <p className="text-slate-400 text-xs font-mono tracking-widest mt-2 uppercase">
          mainframe fully synchronized
        </p>

        {/* Detailed Stats */}
        <div className="grid grid-cols-2 gap-4 w-full my-6 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
              Time Elapsed
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.3)] mt-1">
              {formatTime(time)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
              Flips Used
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-pink-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.3)] mt-1">
              {moves} Pairs
            </span>
          </div>
        </div>

        <p className="text-green-500/80 font-mono text-xs mb-6 max-w-xs leading-relaxed">
          🐾 Holographic animal matrices decoded successfully. Ready for the next encryption sequence?
        </p>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="w-full py-3.5 rounded-lg bg-green-500 hover:bg-green-400 text-slate-950 font-mono font-extrabold text-sm tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] cursor-pointer hover:scale-[1.02] active:scale-95 uppercase"
        >
          Initialize Sync Again
        </button>
      </div>
    </div>
  );
}
