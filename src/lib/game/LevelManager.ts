import type { Level } from '@/types/game';
import { loadLevel } from '@/lib/oop-game/level';

export interface LevelProgress {
  levelId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  achievements: string[];
}

export class LevelManager {
  private levels: Map<string, Level> = new Map();
  private progress: Map<string, LevelProgress> = new Map();
  private currentLevelId: string | null = null;

  constructor() {
    this.initializeLevels();
  }

  private initializeLevels(): void {
    // Load all available levels
    const levelIds = ['level1', 'level2', 'level3']; // Add more levels as needed
    levelIds.forEach(id => {
      const level = loadLevel(id);
      this.levels.set(id, level);
      this.progress.set(id, {
        levelId: id,
        completed: false,
        score: 0,
        timeSpent: 0,
        achievements: []
      });
    });
  }

  getLevel(levelId: string): Level | null {
    return this.levels.get(levelId) || null;
  }

  getCurrentLevel(): Level | null {
    return this.currentLevelId ? this.levels.get(this.currentLevelId) || null : null;
  }

  setCurrentLevel(levelId: string): boolean {
    if (!this.levels.has(levelId)) return false;
    this.currentLevelId = levelId;
    return true;
  }

  getLevelProgress(levelId: string): LevelProgress | null {
    return this.progress.get(levelId) || null;
  }

  updateLevelProgress(levelId: string, progress: Partial<LevelProgress>): void {
    const currentProgress = this.progress.get(levelId);
    if (currentProgress) {
      this.progress.set(levelId, {
        ...currentProgress,
        ...progress
      });
    }
  }

  isLevelUnlocked(levelId: string): boolean {
    if (levelId === 'level1') return true; // First level is always unlocked
    
    const levelIndex = Array.from(this.levels.keys()).indexOf(levelId);
    if (levelIndex <= 0) return true;

    // Check if previous level is completed
    const previousLevelId = Array.from(this.levels.keys())[levelIndex - 1];
    const previousProgress = this.progress.get(previousLevelId);
    return previousProgress?.completed || false;
  }

  getNextLevel(): string | null {
    if (!this.currentLevelId) return 'level1';
    
    const levelIds = Array.from(this.levels.keys());
    const currentIndex = levelIds.indexOf(this.currentLevelId);
    
    if (currentIndex === -1 || currentIndex === levelIds.length - 1) {
      return null;
    }
    
    return levelIds[currentIndex + 1];
  }

  getPreviousLevel(): string | null {
    if (!this.currentLevelId) return null;
    
    const levelIds = Array.from(this.levels.keys());
    const currentIndex = levelIds.indexOf(this.currentLevelId);
    
    if (currentIndex <= 0) {
      return null;
    }
    
    return levelIds[currentIndex - 1];
  }

  getTotalScore(): number {
    return Array.from(this.progress.values()).reduce((total, progress) => total + progress.score, 0);
  }

  getCompletedLevels(): string[] {
    return Array.from(this.progress.entries())
      .filter(([_, progress]) => progress.completed)
      .map(([levelId]) => levelId);
  }

  getUnlockedLevels(): string[] {
    return Array.from(this.levels.keys())
      .filter(levelId => this.isLevelUnlocked(levelId));
  }

  resetProgress(): void {
    this.progress.forEach((progress, levelId) => {
      this.progress.set(levelId, {
        levelId,
        completed: false,
        score: 0,
        timeSpent: 0,
        achievements: []
      });
    });
  }
}

// Create and export a singleton instance
export const levelManager = new LevelManager(); 