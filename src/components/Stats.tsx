'use client';

import React from 'react';

interface StatsProps {
  moves: number;
  time: number;
}

export default function Stats({ moves, time }: StatsProps) {
  // Helper to format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-2 gap-4 px-4 py-2">
      {/* TIME METER */}
      <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 flex flex-col items-center justify-center shadow-lg shadow-cyan-950/20 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-500 opacity-60">System Timer</span>
        <span className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] mt-1 tracking-widest">
          {formatTime(time)}
        </span>
      </div>

      {/* MOVE COUNTER */}
      <div className="relative overflow-hidden rounded-xl border border-pink-500/30 bg-slate-950/70 p-4 flex flex-col items-center justify-center shadow-lg shadow-pink-950/20 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-pink-500 opacity-60">Match Attempts</span>
        <span className="text-3xl sm:text-4xl font-mono font-bold text-pink-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)] mt-1 tracking-widest">
          {moves.toString().padStart(3, '0')}
        </span>
      </div>
    </div>
  );
}
