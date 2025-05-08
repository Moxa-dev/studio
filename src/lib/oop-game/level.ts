
import type { Position, WorldObject as WorldObjectType } from '@/types/game';
import { Character } from '@/types/game';
import { Key, Door, Wall } from './objects';

export interface Level {
  id: string;
  name: string;
  gridSize: { width: number; height: number };
  playerStart: Position;
  objects: WorldObjectType[];
  goalMessage?: string;
}

export function loadLevel(levelId: string): Level {
  // For now, we only have one level
  if (levelId === 'level1') {
    const gridSize = { width: 7, height: 5 };
    const objects: WorldObjectType[] = [
      new Key('key1', { x: 5, y: 1 }),
      new Door('door1', { x: 3, y: 4 }),
      new Wall('wall1', { x: 0, y: 2 }),
      new Wall('wall2', { x: 1, y: 2 }),
      new Wall('wall3', { x: 2, y: 2 }),
      new Wall('wall4', { x: 3, y: 2 }),
      new Wall('wall5', { x: 4, y: 2 }),
      // Add some boundary walls for clarity
      ...Array.from({ length: gridSize.width }, (_, i) => new Wall(`wall_top_${i}`, { x: i, y: 0 })).filter(w => w.position.x !== 3), // Wall with gap for door
      ...Array.from({ length: gridSize.height }, (_, i) => new Wall(`wall_left_${i}`, { x: 0, y: i })),
      ...Array.from({ length: gridSize.height }, (_, i) => new Wall(`wall_right_${i}`, { x: gridSize.width -1, y: i })),
      ...Array.from({ length: gridSize.width }, (_, i) => new Wall(`wall_bottom_${i}`, { x: i, y: gridSize.height - 1 })).filter(w => w.position.x !== 3 || w.position.y !== gridSize.height -1) , // Allow door passage
    ];
    
    // Filter out walls that would block the door
    const doorPos = {x: 3, y: 4};
    const finalObjects = objects.filter(obj => {
        if (obj instanceof Wall) {
            if (obj.position.x === doorPos.x && obj.position.y === doorPos.y) return false; // Don't place wall on door
            if (obj.position.x === 3 && obj.position.y === 0) return false; // Remove top wall at door entrance if any
        }
        return true;
    });


    return {
      id: 'level1',
      name: 'The First Challenge: Objects and Methods',
      gridSize,
      playerStart: { x: 1, y: 1 },
      objects: finalObjects,
      goalMessage: "Congratulations! You've used objects and methods to open the door and complete the level!"
    };
  }
  throw new Error(`Level ${levelId} not found.`);
}
