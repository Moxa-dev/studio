
import type { Position, OOPTip, GameMessage } from '@/types/game';
import { WorldObject, Character } from '@/types/game';

export class Key extends WorldObject {
  constructor(id: string, position: Position) {
    const oopTip: OOPTip = {
      concept: "Objects & Classes",
      explanation: "This key is an 'object', an instance of the 'Key' class. A class is like a blueprint, and an object is a specific thing created from that blueprint. This key has its own properties (like its position) and can perform actions (like being picked up).",
      codeExample: `// Blueprint for keys\nclass Key {\n  constructor(id, position) { /* ... */ }\n}\n\n// Creating a specific key object\nconst goldenKey = new Key("key1", {x:1, y:1});`
    };
    super(id, "Golden Key", "A shiny golden key. It might open something.", position, "🔑", oopTip);
  }

  interact(character: Character): GameMessage {
    character.pickUp(this);
    this.position = {x: -1, y: -1}; // Move off map
    return {
      text: `You picked up the ${this.name}.`,
      type: 'success',
      tip: this.oopTip,
    };
  }
}

export class Door extends WorldObject {
  isLocked: boolean;
  isOpened: boolean;

  constructor(id: string, position: Position, isLocked: boolean = true) {
    const oopTip: OOPTip = {
      concept: "Methods & State",
      explanation: "This door has a state (locked/unlocked, opened/closed) and methods (like 'unlock' or 'open'). Interacting with the door calls one of its methods, potentially changing its state if conditions are met (e.g., you have the key).",
      codeExample: `class Door {\n  isLocked = true;\n  open(key) {\n    if (this.isLocked && key) {\n      this.isLocked = false;\n      // ... open the door ...\n    }\n  }\n}\n\nmyDoor.open(playerKey);`
    };
    super(id, "Mysterious Door", "A sturdy door. It seems locked.", position, "🚪", oopTip);
    this.isLocked = isLocked;
    this.isOpened = false;
    this.charRepresentation = isLocked ? '🚪' : '🔓';
  }

  interact(character: Character): GameMessage {
    if (this.isOpened) {
      return { text: "The door is already open.", type: 'info' };
    }

    if (this.isLocked) {
      const key = character.hasItem("Golden Key");
      if (key) {
        this.isLocked = false;
        this.isOpened = true;
        this.charRepresentation = '🔓'; // Or some open door representation
        this.description = "The door is now open!";
        // Remove key from inventory as it's used
        character.inventory = character.inventory.filter(item => item.id !== key.id);
        return {
          text: `You used the ${key.name} to unlock and open the ${this.name}.`,
          type: 'success',
          tip: this.oopTip,
        };
      } else {
        return {
          text: `The ${this.name} is locked. You need a key.`,
          type: 'error',
          tip: {
            concept: "Encapsulation",
            explanation: "The door's internal locking mechanism is hidden (encapsulated). You interact with it through its 'interact' method, without needing to know exactly how it checks for a key.",
            codeExample: `// Door's internal check is private\nclass Door {\n  #isLocked = true; // Private field\n\n  interact(character) {\n    if (this.#isLocked && character.hasItem('key')) {\n      // ... unlock ...\n    }\n  }\n}`
          }
        };
      }
    } else {
      // If not locked, but not yet opened (e.g. two-step interaction)
      this.isOpened = true;
      this.description = "The door is now open!";
      this.charRepresentation = '🔓';
      return {
        text: `You opened the ${this.name}.`,
        type: 'success',
        tip: this.oopTip,
      };
    }
  }
}

export class Wall extends WorldObject {
    constructor(id: string, position: Position) {
        super(id, "Wall", "An impassable wall.", position, "🧱");
        this.isInteractable = false;
    }

    interact(): GameMessage {
        return { text: "It's a solid wall.", type: 'info' };
    }
}
