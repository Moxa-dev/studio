
import type { Character as CharacterType, WorldObject as WorldObjectType, Position } from '@/types/game';
import React from 'react';
import PlayerCharacterView from './PlayerCharacterView';
import GameObjectView from './GameObjectView';
import { cn } from '@/lib/utils';

interface LevelDisplayProps {
  character: CharacterType;
  objects: WorldObjectType[];
  gridSize: { width: number; height: number };
  onObjectInteract: (object: WorldObjectType) => void;
  isObjectAdjacent: (objectPos: Position) => boolean;
}

const LevelDisplay: React.FC<LevelDisplayProps> = ({
  character,
  objects,
  gridSize,
  onObjectInteract,
  isObjectAdjacent,
}) => {
  const gridCells = [];
  for (let y = 0; y < gridSize.height; y++) {
    for (let x = 0; x < gridSize.width; x++) {
      gridCells.push(
        <div
          key={`cell-${x}-${y}`}
          className="border border-primary/20"
          aria-hidden="true"
        />
      );
    }
  }

  return (
    <div
      className="relative bg-primary/10 aspect-video w-full max-w-2xl mx-auto shadow-xl rounded-lg overflow-hidden border-2 border-primary"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize.width}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize.height}, 1fr)`,
        ['--grid-width' as string]: gridSize.width,
        ['--grid-height' as string]: gridSize.height,
      }}
      role="grid"
      aria-label={`Game level grid ${gridSize.width} by ${gridSize.height}`}
    >
      {gridCells}
      {objects.map((obj) => (
        <GameObjectView
          key={obj.id}
          object={obj}
          isAdjacent={isObjectAdjacent(obj.position)}
          onInteract={() => onObjectInteract(obj)}
        />
      ))}
      <PlayerCharacterView character={character} />
    </div>
  );
};

export default LevelDisplay;
