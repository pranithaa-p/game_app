'use client';

import React from 'react';
import { CardType, Difficulty } from '../hooks/useMemoryGame';
import Card from './Card';

interface BoardProps {
  cards: CardType[];
  difficulty: Difficulty;
  isBoardLocked: boolean;
  onCardClick: (index: number) => void;
}

export default function Board({ cards, difficulty, isBoardLocked, onCardClick }: BoardProps) {
  // Grid column styles based on difficulty configurations
  const getGridColsClass = () => {
    switch (difficulty) {
      case 'easy':
        return 'grid-cols-4 max-w-md';
      case 'medium':
        return 'grid-cols-6 max-w-2xl';
      case 'hard':
        return 'grid-cols-6 md:grid-cols-8 max-w-4xl';
      default:
        return 'grid-cols-4 max-w-md';
    }
  };

  return (
    <div className="w-full flex justify-center px-2 py-4">
      <div className={`grid gap-3 w-full justify-center ${getGridColsClass()}`}>
        {cards.map((card, idx) => (
          <Card
            key={card.id}
            card={card}
            isBoardLocked={isBoardLocked}
            onClick={() => onCardClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
