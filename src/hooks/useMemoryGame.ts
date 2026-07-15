'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface CardType {
  id: string;
  symbol: string;
  name: string;
  color: string;
  bgColor: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyConfig {
  rows: number;
  cols: number;
  pairs: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { rows: 4, cols: 4, pairs: 8 },
  medium: { rows: 6, cols: 6, pairs: 18 },
  hard: { rows: 6, cols: 8, pairs: 24 },
};

// Preset Cyberpunk Holographic Animals list.
// Colors represent cyber/neon themes compatible with Tailwind.
const CYBER_ANIMALS = [
  { symbol: '👾', name: 'CYBER-OCTO', color: 'text-cyan-400 border-cyan-500/50 shadow-cyan-500/20', bgColor: 'bg-cyan-950/30' },
  { symbol: '🐱', name: 'NEON-NEKO', color: 'text-pink-400 border-pink-500/50 shadow-pink-500/20', bgColor: 'bg-pink-950/30' },
  { symbol: '🦊', name: 'HOLO-KITSUNE', color: 'text-orange-400 border-orange-500/50 shadow-orange-500/20', bgColor: 'bg-orange-950/30' },
  { symbol: '🐉', name: 'LASER-RYU', color: 'text-lime-400 border-lime-500/50 shadow-lime-500/20', bgColor: 'bg-lime-950/30' },
  { symbol: '🦄', name: 'SYNTH-CORN', color: 'text-purple-400 border-purple-500/50 shadow-purple-500/20', bgColor: 'bg-purple-950/30' },
  { symbol: '🦈', name: 'PLASMA-SHARK', color: 'text-blue-400 border-blue-500/50 shadow-blue-500/20', bgColor: 'bg-blue-950/30' },
  { symbol: '🤖', name: 'MECH-BEAR', color: 'text-emerald-400 border-emerald-500/50 shadow-emerald-500/20', bgColor: 'bg-emerald-950/30' },
  { symbol: '🦅', name: 'VOLT-HAWK', color: 'text-yellow-400 border-yellow-500/50 shadow-yellow-500/20', bgColor: 'bg-yellow-950/30' },
  { symbol: '🦉', name: 'CYBER-OWL', color: 'text-violet-400 border-violet-500/50 shadow-violet-500/20', bgColor: 'bg-violet-950/30' },
  { symbol: '🐯', name: 'NEON-TIGER', color: 'text-rose-400 border-rose-500/50 shadow-rose-500/20', bgColor: 'bg-rose-950/30' },
  { symbol: '🦋', name: 'HOLO-FLUTTER', color: 'text-teal-400 border-teal-500/50 shadow-teal-500/20', bgColor: 'bg-teal-950/30' },
  { symbol: '🐍', name: 'LASER-VIPER', color: 'text-green-400 border-green-500/50 shadow-green-500/20', bgColor: 'bg-green-950/30' },
  { symbol: '🦖', name: 'MECH-REX', color: 'text-red-400 border-red-500/50 shadow-red-500/20', bgColor: 'bg-red-950/30' },
  { symbol: '🦚', name: 'NEO-PEACOCK', color: 'text-indigo-400 border-indigo-500/50 shadow-indigo-500/20', bgColor: 'bg-indigo-950/30' },
  { symbol: '🦍', name: 'CYBER-KONG', color: 'text-sky-400 border-sky-500/50 shadow-sky-500/20', bgColor: 'bg-sky-950/30' },
  { symbol: '🐺', name: 'VOLT-WOLF', color: 'text-amber-400 border-amber-500/50 shadow-amber-500/20', bgColor: 'bg-amber-950/30' },
  { symbol: '🦁', name: 'CYBER-LION', color: 'text-orange-500 border-orange-600/50 shadow-orange-600/20', bgColor: 'bg-orange-950/30' },
  { symbol: '🐆', name: 'HOLO-LEO', color: 'text-amber-300 border-amber-400/50 shadow-amber-400/20', bgColor: 'bg-amber-950/20' },
  { symbol: '🐬', name: 'WAVE-DOLPHIN', color: 'text-cyan-300 border-cyan-400/50 shadow-cyan-400/20', bgColor: 'bg-cyan-950/20' },
  { symbol: '🦞', name: 'PLASMA-CLAW', color: 'text-red-500 border-red-600/50 shadow-red-600/20', bgColor: 'bg-red-950/30' },
  { symbol: '🐢', name: 'CYBER-SHELL', color: 'text-lime-500 border-lime-600/50 shadow-lime-600/20', bgColor: 'bg-lime-950/30' },
  { symbol: '🐝', name: 'SYNTH-WASP', color: 'text-yellow-300 border-yellow-400/50 shadow-yellow-400/20', bgColor: 'bg-yellow-950/20' },
  { symbol: '🕷️', name: 'HOLO-SPIDER', color: 'text-fuchsia-400 border-fuchsia-500/50 shadow-fuchsia-500/20', bgColor: 'bg-fuchsia-950/30' },
  { symbol: '🦜', name: 'VOLT-PARROT', color: 'text-teal-300 border-teal-400/50 shadow-teal-400/20', bgColor: 'bg-teal-950/20' },
];

export function useMemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isBoardLocked, setIsBoardLocked] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and shuffle card board based on difficulty
  const startNewGame = useCallback((selectedDifficulty: Difficulty = difficulty) => {
    const config = DIFFICULTY_CONFIGS[selectedDifficulty];
    const totalPairs = config.pairs;

    // Pick subset of animals
    const pool = CYBER_ANIMALS.slice(0, totalPairs);
    
    // Duplicate symbols to create matching pairs
    const initialPairs = [...pool, ...pool];
    
    // Fisher-Yates shuffle
    const shuffled = initialPairs
      .map((item, idx) => ({ item, sort: Math.random(), idx }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }, index) => ({
        id: `card-${index}-${item.symbol}`,
        symbol: item.symbol,
        name: item.name,
        color: item.color,
        bgColor: item.bgColor,
        isFlipped: false,
        isMatched: false,
      }));

    // Reset all game state variables
    setDifficulty(selectedDifficulty);
    setCards(shuffled);
    setSelectedIndices([]);
    setMoves(0);
    setTime(0);
    setIsTimerRunning(false);
    setIsWon(false);
    setIsBoardLocked(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [difficulty]);

  // Game timer side effect
  useEffect(() => {
    if (isTimerRunning && !isWon) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning, isWon]);

  // Click card function
  const handleCardClick = useCallback((index: number) => {
    // Prevent actions if board is locked, or if index is invalid
    if (isBoardLocked || isWon) return;

    const clickedCard = cards[index];

    // Card should not be already flipped or matched
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Start timer on first interaction
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    // Flip the clicked card immediately
    setCards((prevCards) => {
      const updated = [...prevCards];
      updated[index] = { ...updated[index], isFlipped: true };
      return updated;
    });

    const activeFlipped = [...selectedIndices, index];

    if (activeFlipped.length === 1) {
      // First card flipped in current match attempt
      setSelectedIndices(activeFlipped);
    } else if (activeFlipped.length === 2) {
      // Second card flipped in current match attempt
      setSelectedIndices([]);
      setMoves((prev) => prev + 1);

      const firstIndex = activeFlipped[0];
      const secondIndex = activeFlipped[1];
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.symbol === secondCard.symbol) {
        // MATCH DETECTED
        setCards((prevCards) => {
          const updated = [...prevCards];
          updated[firstIndex] = { ...updated[firstIndex], isMatched: true };
          updated[secondIndex] = { ...updated[secondIndex], isMatched: true };
          
          // Check if all cards matched now
          const gameFinished = updated.every((c) => c.isMatched);
          if (gameFinished) {
            setIsWon(true);
            setIsTimerRunning(false);
          }
          return updated;
        });
      } else {
        // MISMATCH: Lock board, show cards, then flip back
        setIsBoardLocked(true);
        setTimeout(() => {
          setCards((prevCards) => {
            const updated = [...prevCards];
            updated[firstIndex] = { ...updated[firstIndex], isFlipped: false };
            updated[secondIndex] = { ...updated[secondIndex], isFlipped: false };
            return updated;
          });
          setIsBoardLocked(false);
        }, 1000);
      }
    }
  }, [cards, selectedIndices, isTimerRunning, isBoardLocked, isWon]);

  // Autostart game on hook mount if cards are empty
  useEffect(() => {
    if (cards.length === 0) {
      startNewGame('easy');
    }
  }, [cards.length, startNewGame]);

  return {
    difficulty,
    cards,
    moves,
    time,
    isTimerRunning,
    isWon,
    isBoardLocked,
    handleCardClick,
    startNewGame,
  };
}
