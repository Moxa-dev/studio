export interface Position {
  x: number;
  y: number;
}

export interface OOPTip {
  concept: string;
  explanation: string;
  codeExample?: string;
}

export interface GameMessage {
  text: string;
  type: 'info' | 'success' | 'error' | 'oop';
  tip?: OOPTip; // Optional: directly attach OOP tip to a message
}

// Base class for all interactive objects in the game
export abstract class WorldObject {
  id: string;
  name: string;
  description: string;
  position: Position;
  charRepresentation: string; // e.g., 'K' for Key, 'D' for Door
  isInteractable: boolean = true;
  oopTip?: OOPTip;

  constructor(id: string, name: string, description: string, position: Position, charRepresentation: string, oopTip?: OOPTip) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.position = position;
    this.charRepresentation = charRepresentation;
    this.oopTip = oopTip;
  }

  // Abstract method to be implemented by subclasses
  abstract interact(character: Character): GameMessage;

  // Common method to provide info about the object
  getInfo(): string {
    return `${this.name}: ${this.description}`;
  }
}

// Character class
export class Character {
  name: string;
  position: Position;
  inventory: WorldObject[];
  charRepresentation: string = 'P'; // P for Player

  constructor(name: string, initialPosition: Position) {
    this.name = name;
    this.position = initialPosition;
    this.inventory = [];
  }

  move(dx: number, dy: number, worldBoundary: { width: number, height: number }): boolean {
    const newX = this.position.x + dx;
    const newY = this.position.y + dy;

    if (newX >= 0 && newX < worldBoundary.width && newY >= 0 && newY < worldBoundary.height) {
      this.position = { x: newX, y: newY };
      return true;
    }
    return false; // Movement out of bounds
  }

  pickUp(item: WorldObject): void {
    this.inventory.push(item);
    item.isInteractable = false; // Item is picked up, no longer on map
  }

  hasItem(itemName: string): WorldObject | undefined {
    return this.inventory.find(item => item.name.toLowerCase() === itemName.toLowerCase());
  }
}

export interface Level {
  id: string;
  name: string;
  gridSize: { width: number; height: number };
  playerStart: Position;
  objects: WorldObject[];
  goalMessage?: string;
  learningObjectives?: string[]; // Add optional learning objectives
}
