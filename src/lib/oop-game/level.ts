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
  switch (levelId) {
    case 'level1':
      return {
        id: 'level1',
        name: 'The First Challenge: Objects and Methods',
        gridSize: { width: 7, height: 5 },
        playerStart: { x: 1, y: 1 },
        objects: [
          new Key('key1', { x: 5, y: 1 }),
          new Door('door1', { x: 3, y: 4 }),
          ...createBoundaryWalls(7, 5, { doorX: 3, doorY: 4 }),
          new Wall('wall1', { x: 0, y: 2 }),
          new Wall('wall2', { x: 1, y: 2 }),
          new Wall('wall3', { x: 2, y: 2 }),
          new Wall('wall4', { x: 3, y: 2 }),
          new Wall('wall5', { x: 4, y: 2 }),
        ],
        goalMessage: "Congratulations! You've used objects and methods to open the door!"
      };

    case 'level2':
      return {
        id: 'level2',
        name: 'Inheritance and Polymorphism',
        gridSize: { width: 8, height: 6 },
        playerStart: { x: 1, y: 1 },
        objects: [
          new Key('key1', { x: 6, y: 4 }),
          new Door('door1', { x: 5, y: 5 }),
          ...createBoundaryWalls(8, 6, { doorX: 5, doorY: 5 }),
          // Add more complex wall arrangements
          ...Array.from({ length: 3 }, (_, i) => new Wall(`wall_mid_${i}`, { x: 3, y: 2 + i })),
          ...Array.from({ length: 2 }, (_, i) => new Wall(`wall_side_${i}`, { x: 6, y: 1 + i })),
        ],
        goalMessage: "Great! You've navigated through inheritance and polymorphism!"
      };

    case 'level3':
      return {
        id: 'level3',
        name: 'Encapsulation and Complex Interactions',
        gridSize: { width: 9, height: 7 },
        playerStart: { x: 1, y: 1 },
        objects: [
          new Key('key1', { x: 7, y: 5 }),
          new Door('door1', { x: 6, y: 6 }),
          ...createBoundaryWalls(9, 7, { doorX: 6, doorY: 6 }),
          // More intricate wall layout
          ...Array.from({ length: 4 }, (_, i) => new Wall(`wall_complex_${i}`, { x: 4, y: 2 + i })),
          ...Array.from({ length: 3 }, (_, i) => new Wall(`wall_side_${i}`, { x: 7, y: 1 + i })),
        ],
        goalMessage: "Excellent! You've mastered encapsulation and complex object interactions!"
      };

    default:
      throw new Error(`Level ${levelId} not found.`);
  }
}

// Helper function to create boundary walls with a door gap
function createBoundaryWalls(width: number, height: number, doorPosition?: { doorX: number, doorY: number }): Wall[] {
  const walls: Wall[] = [];

  // Top and bottom walls
  for (let x = 0; x < width; x++) {
    if (!doorPosition || x !== doorPosition.doorX || 0 !== doorPosition.doorY) {
      walls.push(new Wall(`wall_top_${x}`, { x, y: 0 }));
    }
    if (!doorPosition || x !== doorPosition.doorX || height - 1 !== doorPosition.doorY) {
      walls.push(new Wall(`wall_bottom_${x}`, { x, y: height - 1 }));
    }
  }

  // Left and right walls
  for (let y = 0; y < height; y++) {
    walls.push(new Wall(`wall_left_${y}`, { x: 0, y }));
    walls.push(new Wall(`wall_right_${y}`, { x: width - 1, y }));
  }

  return walls;
}
