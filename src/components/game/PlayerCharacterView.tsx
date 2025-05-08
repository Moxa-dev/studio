
import type { Character } from '@/types/game';
import React from 'react';

interface PlayerCharacterViewProps {
  character: Character;
}

const PlayerCharacterView: React.FC<PlayerCharacterViewProps> = ({ character }) => {
  return (
    <div
      className="absolute transition-all duration-300 ease-in-out flex items-center justify-center text-2xl md:text-3xl"
      style={{
        left: `calc(${character.position.x} * (100% / var(--grid-width)))`,
        top: `calc(${character.position.y} * (100% / var(--grid-height)))`,
        width: `calc(100% / var(--grid-width))`,
        height: `calc(100% / var(--grid-height))`,
      }}
      aria-label={`Player ${character.name} at position ${character.position.x}, ${character.position.y}`}
      role="img"
    >
      {character.charRepresentation}
    </div>
  );
};

export default PlayerCharacterView;
