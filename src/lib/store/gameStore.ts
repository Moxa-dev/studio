import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Level, Character, WorldObject, GameMessage } from '@/types/game';
import { loadLevel } from '@/lib/oop-game/level';

interface GameState {
  currentLevel: Level | null;
  player: Character | null;
  objects: WorldObject[];
  message: GameMessage | null;
  gameOver: boolean;
  score: number;
  achievements: string[];
  // Actions
  initializeLevel: (levelId: string) => void;
  movePlayer: (dx: number, dy: number) => void;
  interactWithObject: (objectId: string) => void;
  addScore: (points: number) => void;
  unlockAchievement: (achievement: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        currentLevel: null,
        player: null,
        objects: [],
        message: null,
        gameOver: false,
        score: 0,
        achievements: [],

        initializeLevel: (levelId: string) => {
          const levelData = loadLevel(levelId);
          set({
            currentLevel: levelData,
            player: new Character("Player", levelData.playerStart),
            objects: levelData.objects,
            message: { text: `Welcome to ${levelData.name}!`, type: 'info' },
            gameOver: false,
          });
        },

        movePlayer: (dx: number, dy: number) => {
          const { player, currentLevel, objects } = get();
          if (!player || !currentLevel) return;

          const targetPos = { 
            x: player.position.x + dx, 
            y: player.position.y + dy 
          };

          // Check for collisions
          const wallAtTarget = objects.find(
            obj => obj.position.x === targetPos.x && 
                  obj.position.y === targetPos.y && 
                  obj.name === "Wall"
          );

          if (wallAtTarget) {
            set({ message: { text: "You can't move through a wall!", type: 'error' } });
            return;
          }

          // Move player if within bounds
          if (targetPos.x >= 0 && targetPos.x < currentLevel.gridSize.width &&
              targetPos.y >= 0 && targetPos.y < currentLevel.gridSize.height) {
            const newPlayer = new Character(player.name, targetPos);
            set({ 
              player: newPlayer,
              message: null
            });
          }
        },

        interactWithObject: (objectId: string) => {
          const { player, objects } = get();
          if (!player) return;

          const object = objects.find(obj => obj.id === objectId);
          if (!object || !object.isInteractable) return;

          const result = object.interact(player);
          set({ 
            message: result,
            objects: objects.map(obj => 
              obj.id === objectId ? object : obj
            )
          });
        },

        addScore: (points: number) => {
          set(state => ({ score: state.score + points }));
        },

        unlockAchievement: (achievement: string) => {
          set(state => ({
            achievements: [...state.achievements, achievement],
            message: {
              text: `Achievement Unlocked: ${achievement}!`,
              type: 'success'
            }
          }));
        },

        resetGame: () => {
          set({
            currentLevel: null,
            player: null,
            objects: [],
            message: null,
            gameOver: false,
            score: 0,
            achievements: []
          });
        }
      }),
      {
        name: 'game-storage',
        partialize: (state) => ({
          score: state.score,
          achievements: state.achievements
        })
      }
    )
  )
); 