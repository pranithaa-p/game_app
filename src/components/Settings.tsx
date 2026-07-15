'use client';

import React from 'react';
import { Difficulty } from '../hooks/useMemoryGame';

interface SettingsProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
}

export default function Settings({
  currentDifficulty,
  onDifficultyChange,
  onReset,
}: SettingsProps) {
  const difficulties: { value: Difficulty; label: string; desc: string; color: string }[] = [
    { value: 'easy', label: 'EASY', desc: '4x4 Grid', color: 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10' },
    { value: 'medium', label: 'MEDIUM', desc: '6x6 Grid', color: 'border-purple-500 text-purple-400 hover:bg-purple-500/10' },
    { value: 'hard', label: 'HARD', desc: '6x8 Grid', color: 'border-pink-500 text-pink-400 hover:bg-pink-500/10' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/40 backdrop-blur-md">
      {/* DIFFICULTY SELECTION */}
      <div className="flex flex-col gap-1.5 w-full md:w-auto">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase px-1">
          Grid resolution
        </span>
        <div className="grid grid-cols-3 gap-2">
          {difficulties.map((diff) => {
            const isActive = currentDifficulty === diff.value;
            return (
              <button
                key={diff.value}
                onClick={() => onDifficultyChange(diff.value)}
                className={`px-3 py-2 rounded-lg border font-mono text-xs tracking-wider transition-all duration-300 flex flex-col items-center justify-center ${
                  isActive
                    ? diff.value === 'easy'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-neon-cyan shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : diff.value === 'medium'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-neon-purple shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                      : 'bg-pink-500/20 border-pink-400 text-pink-200 shadow-neon-pink shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                    : `bg-slate-905 border-slate-800 opacity-60 hover:opacity-100 ${diff.color}`
                }`}
              >
                <span className="font-bold">{diff.label}</span>
                <span className="text-[9px] opacity-60 mt-0.5">{diff.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GAME RESET BUTTON */}
      <button
        onClick={onReset}
        className="w-full md:w-auto px-5 py-3.5 rounded-lg border-2 border-red-500 text-red-500 font-mono text-sm font-bold tracking-widest hover:bg-red-500/15 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 transition-all duration-300 uppercase cursor-pointer"
      >
        Reboot Grid
      </button>
    </div>
  );
}
