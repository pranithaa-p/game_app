'use client';

import React from 'react';
import { useMemoryGame, Difficulty } from '../hooks/useMemoryGame';
import Board from '../components/Board';
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import WinModal from '../components/WinModal';

export default function Home() {
  const {
    difficulty,
    cards,
    moves,
    time,
    isWon,
    isBoardLocked,
    handleCardClick,
    startNewGame,
  } = useMemoryGame();

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    startNewGame(newDifficulty);
  };

  const handleRestart = () => {
    startNewGame(difficulty);
  };

  return (
    <main className="min-h-screen py-8 px-4 flex flex-col items-center justify-between text-slate-100 relative selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Grid Lines decorative */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-1.5 z-10 mb-6">
        {/* Glow Header Label */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-950/20 text-[10px] font-mono tracking-widest text-teal-400 uppercase select-none animate-pulse">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          System Status: Online
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight uppercase select-none mt-2 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse">
          Neon Matcher
        </h1>

        <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-1">
          Decrypt holographic animal nodes. Align paired matching matrices.
        </div>
      </header>

      {/* CORE BOARD AND STATS SECTION */}
      <section className="w-full max-w-4xl mx-auto flex-1 flex flex-col gap-6 justify-center z-10">
        {/* Stats Dashboard */}
        <Stats moves={moves} time={time} />

        {/* Playfield Grid */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-950/30 p-2 md:p-6 backdrop-blur-sm shadow-2xl">
          {/* Decorative Corner brackets standard in cyberpunk UIs */}
          <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          {/* Cards board */}
          {cards.length > 0 ? (
            <Board
              cards={cards}
              difficulty={difficulty}
              isBoardLocked={isBoardLocked}
              onCardClick={handleCardClick}
            />
          ) : (
            <div className="flex text-center items-center justify-center h-64 font-mono text-cyan-400 animate-pulse">
              [INITIATING NODE MATRIX SHUFFLE...]
            </div>
          )}
        </div>

        {/* Configurations Dashboard */}
        <Settings
          currentDifficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onReset={handleRestart}
        />
      </section>

      {/* FOOTER METADATA */}
      <footer className="w-full max-w-4xl mx-auto text-center mt-8 text-[10px] font-mono text-slate-600 tracking-wider z-10 border-t border-slate-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 select-none">
        <span>GRID DECRYPTOR v1.0.4 - App Router Matrix</span>
        <span>Build approved for GitHub & Vercel deploy</span>
      </footer>

      {/* SUCCESS WIN REPORT DIALOG */}
      <WinModal
        isOpen={isWon}
        moves={moves}
        time={time}
        onPlayAgain={handleRestart}
      />
    </main>
  );
}
