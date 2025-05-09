import type { Position, WorldObject } from '@/types/game';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class CollisionSystem {
  private grid: Map<string, Set<WorldObject>> = new Map();
  private cellSize: number;
  private worldSize: { width: number; height: number };

  constructor(cellSize: number, worldSize: { width: number; height: number }) {
    this.cellSize = cellSize;
    this.worldSize = worldSize;
  }

  private getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }

  private getObjectCells(object: WorldObject): string[] {
    const cells: string[] = [];
    const { x, y } = object.position;
    
    // Get all cells that the object might occupy
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    
    // Check surrounding cells for large objects
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = cellX + dx;
        const newY = cellY + dy;
        if (newX >= 0 && newX < Math.ceil(this.worldSize.width / this.cellSize) &&
            newY >= 0 && newY < Math.ceil(this.worldSize.height / this.cellSize)) {
          cells.push(`${newX},${newY}`);
        }
      }
    }
    
    return cells;
  }

  addObject(object: WorldObject): void {
    const cells = this.getObjectCells(object);
    cells.forEach(cellKey => {
      if (!this.grid.has(cellKey)) {
        this.grid.set(cellKey, new Set());
      }
      this.grid.get(cellKey)!.add(object);
    });
  }

  removeObject(object: WorldObject): void {
    const cells = this.getObjectCells(object);
    cells.forEach(cellKey => {
      const cell = this.grid.get(cellKey);
      if (cell) {
        cell.delete(object);
        if (cell.size === 0) {
          this.grid.delete(cellKey);
        }
      }
    });
  }

  updateObject(object: WorldObject, oldPosition: Position): void {
    this.removeObject(object);
    this.addObject(object);
  }

  checkCollision(position: Position, objectType?: string): WorldObject | null {
    const cellKey = this.getCellKey(position.x, position.y);
    const cell = this.grid.get(cellKey);
    
    if (!cell) return null;

    for (const object of cell) {
      if (object.position.x === position.x && 
          object.position.y === position.y &&
          (!objectType || object.name === objectType)) {
        return object;
      }
    }

    return null;
  }

  getNearbyObjects(position: Position, radius: number): WorldObject[] {
    const nearby: WorldObject[] = [];
    const cellRadius = Math.ceil(radius / this.cellSize);
    const centerCellX = Math.floor(position.x / this.cellSize);
    const centerCellY = Math.floor(position.y / this.cellSize);

    for (let dx = -cellRadius; dx <= cellRadius; dx++) {
      for (let dy = -cellRadius; dy <= cellRadius; dy++) {
        const cellKey = `${centerCellX + dx},${centerCellY + dy}`;
        const cell = this.grid.get(cellKey);
        if (cell) {
          for (const object of cell) {
            const distance = Math.sqrt(
              Math.pow(object.position.x - position.x, 2) +
              Math.pow(object.position.y - position.y, 2)
            );
            if (distance <= radius) {
              nearby.push(object);
            }
          }
        }
      }
    }

    return nearby;
  }

  clear(): void {
    this.grid.clear();
  }
}

// Create and export a singleton instance
export const collisionSystem = new CollisionSystem(1, { width: 20, height: 20 }); 