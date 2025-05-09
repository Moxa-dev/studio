import { useGameStore } from '../store/gameStore';

export class GameLoop {
  private lastFrameTime: number = 0;
  private targetFPS: number = 60;
  private frameInterval: number = 1000 / 60;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private subscribers: Set<(deltaTime: number) => void> = new Set();

  constructor(targetFPS: number = 60) {
    this.targetFPS = targetFPS;
    this.frameInterval = 1000 / targetFPS;
  }

  subscribe(callback: (deltaTime: number) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.tick();
  }

  stop(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private tick(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;

    if (deltaTime >= this.frameInterval) {
      this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);
      this.update(deltaTime);
    }

    this.animationFrameId = requestAnimationFrame(() => this.tick());
  }

  private update(deltaTime: number): void {
    // Update all subscribers
    this.subscribers.forEach(callback => callback(deltaTime));
  }
}

// Animation system
export class Animation {
  private frames: number = 0;
  private currentFrame: number = 0;
  private frameDuration: number = 0;
  private elapsed: number = 0;
  private isPlaying: boolean = false;
  private onComplete?: () => void;

  constructor(frames: number, frameDuration: number) {
    this.frames = frames;
    this.frameDuration = frameDuration;
  }

  play(onComplete?: () => void): void {
    this.isPlaying = true;
    this.currentFrame = 0;
    this.elapsed = 0;
    this.onComplete = onComplete;
  }

  stop(): void {
    this.isPlaying = false;
  }

  update(deltaTime: number): number {
    if (!this.isPlaying) return this.currentFrame;

    this.elapsed += deltaTime;
    if (this.elapsed >= this.frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % this.frames;
      this.elapsed = 0;

      if (this.currentFrame === 0 && this.onComplete) {
        this.onComplete();
      }
    }

    return this.currentFrame;
  }
}

// Animation manager
export class AnimationManager {
  private animations: Map<string, Animation> = new Map();
  private gameLoop: GameLoop;

  constructor(gameLoop: GameLoop) {
    this.gameLoop = gameLoop;
  }

  createAnimation(id: string, frames: number, frameDuration: number): Animation {
    const animation = new Animation(frames, frameDuration);
    this.animations.set(id, animation);
    return animation;
  }

  playAnimation(id: string, onComplete?: () => void): void {
    const animation = this.animations.get(id);
    if (animation) {
      animation.play(onComplete);
    }
  }

  stopAnimation(id: string): void {
    const animation = this.animations.get(id);
    if (animation) {
      animation.stop();
    }
  }

  getCurrentFrame(id: string): number {
    const animation = this.animations.get(id);
    return animation ? animation.update(0) : 0;
  }
}

// Create and export a singleton instance
export const gameLoop = new GameLoop();
export const animationManager = new AnimationManager(gameLoop); 