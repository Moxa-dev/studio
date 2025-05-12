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
  learningObjectives: string[];
}

export function loadLevel(levelId: string): Level {
  switch (levelId) {
    case 'level1':
      return {
        id: 'level1',
        name: 'Введение в объекты и методы (Introduction to Objects and Methods)',
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
        goalMessage: "Поздравляем! Вы изучили основы объектов и методов! (Congratulations! You've learned the basics of objects and methods!)",
        learningObjectives: [
          "Понять, что такое объект (Understand what an object is)",
          "Изучить методы взаимодействия объектов (Learn about object interaction methods)",
          "Исследовать состояние объектов (Explore object states)"
        ]
      };

    case 'level2':
      return {
        id: 'level2',
        name: 'Наследование и полиморфизм (Inheritance and Polymorphism)',
        gridSize: { width: 8, height: 6 },
        playerStart: { x: 1, y: 1 },
        objects: [
          new Key('key1', { x: 6, y: 4 }),
          new Door('door1', { x: 5, y: 5 }),
          ...createBoundaryWalls(8, 6, { doorX: 5, doorY: 5 }),
          ...Array.from({ length: 3 }, (_, i) => new Wall(`wall_mid_${i}`, { x: 3, y: 2 + i })),
          ...Array.from({ length: 2 }, (_, i) => new Wall(`wall_side_${i}`, { x: 6, y: 1 + i })),
        ],
        goalMessage: "Отлично! Вы освоили наследование и полиморфизм! (Great! You've mastered inheritance and polymorphism!)",
        learningObjectives: [
          "Изучить концепцию наследования (Learn the concept of inheritance)",
          "Понять полиморфизм через разные типы объектов (Understand polymorphism through different object types)",
          "Исследовать переопределение методов (Explore method overriding)"
        ]
      };

    case 'level3':
      return {
        id: 'level3',
        name: 'Инкапсуляция и сложные взаимодействия (Encapsulation and Complex Interactions)',
        gridSize: { width: 9, height: 7 },
        playerStart: { x: 1, y: 1 },
        objects: [
          new Key('key1', { x: 7, y: 5 }),
          new Door('door1', { x: 6, y: 6 }),
          ...createBoundaryWalls(9, 7, { doorX: 6, doorY: 6 }),
          ...Array.from({ length: 4 }, (_, i) => new Wall(`wall_complex_${i}`, { x: 4, y: 2 + i })),
          ...Array.from({ length: 3 }, (_, i) => new Wall(`wall_side_${i}`, { x: 7, y: 1 + i })),
        ],
        goalMessage: "Превосходно! Вы постигли инкапсуляцию! (Excellent! You've mastered encapsulation!)",
        learningObjectives: [
          "Понять принцип инкапсуляции (Understand the principle of encapsulation)",
          "Изучить скрытие внутренней реализации (Learn about hiding internal implementation)",
          "Исследовать взаимодействие объектов через интерфейсы (Explore object interactions through interfaces)"
        ]
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
