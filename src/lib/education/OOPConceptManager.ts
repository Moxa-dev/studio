import type { OOPTip } from '@/types/game';

export interface OOPConcept {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  codeExample: string;
  realWorldExample: string;
  relatedConcepts: string[];
  exercises: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export class OOPConceptManager {
  private concepts: Map<string, OOPConcept> = new Map();
  private userProgress: Map<string, {
    completed: boolean;
    score: number;
    lastAttempt: Date;
  }> = new Map();

  constructor() {
    this.initializeConcepts();
  }

  private initializeConcepts(): void {
    // Basic OOP Concepts
    this.addConcept({
      id: 'objects-classes',
      name: 'Objects & Classes',
      description: 'Learn how objects are instances of classes, and how classes serve as blueprints for creating objects.',
      difficulty: 'beginner',
      codeExample: `class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return 'Woof!';
  }
}

const myDog = new Dog('Rex');`,
      realWorldExample: 'Think of a class as a blueprint for a house, and objects as the actual houses built from that blueprint.',
      relatedConcepts: ['encapsulation', 'methods'],
      exercises: [
        {
          question: 'What is the relationship between a class and an object?',
          options: [
            'A class is an instance of an object',
            'An object is an instance of a class',
            'They are the same thing',
            'They are unrelated'
          ],
          correctAnswer: 1,
          explanation: 'An object is an instance of a class. The class defines the structure and behavior, while objects are specific instances created from that class.'
        }
      ]
    });

    // Inheritance
    this.addConcept({
      id: 'inheritance',
      name: 'Inheritance',
      description: 'Learn how classes can inherit properties and methods from other classes.',
      difficulty: 'intermediate',
      codeExample: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return 'Some sound';
  }
}

class Dog extends Animal {
  speak() {
    return 'Woof!';
  }
}`,
      realWorldExample: 'Just like children inherit traits from their parents, classes can inherit properties and methods from parent classes.',
      relatedConcepts: ['polymorphism', 'objects-classes'],
      exercises: [
        {
          question: 'What is the main benefit of inheritance?',
          options: [
            'It makes code run faster',
            'It allows code reuse and establishes relationships between classes',
            'It reduces memory usage',
            'It makes debugging easier'
          ],
          correctAnswer: 1,
          explanation: 'Inheritance allows code reuse and establishes a relationship between classes, making the code more organized and maintainable.'
        }
      ]
    });

    // Add more concepts...
  }

  private addConcept(concept: OOPConcept): void {
    this.concepts.set(concept.id, concept);
    this.userProgress.set(concept.id, {
      completed: false,
      score: 0,
      lastAttempt: new Date()
    });
  }

  getConcept(id: string): OOPConcept | null {
    return this.concepts.get(id) || null;
  }

  getAllConcepts(): OOPConcept[] {
    return Array.from(this.concepts.values());
  }

  getConceptsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): OOPConcept[] {
    return this.getAllConcepts().filter(concept => concept.difficulty === difficulty);
  }

  getRelatedConcepts(conceptId: string): OOPConcept[] {
    const concept = this.concepts.get(conceptId);
    if (!concept) return [];
    
    return concept.relatedConcepts
      .map(id => this.concepts.get(id))
      .filter((concept): concept is OOPConcept => concept !== null);
  }

  updateProgress(conceptId: string, score: number): void {
    const progress = this.userProgress.get(conceptId);
    if (progress) {
      this.userProgress.set(conceptId, {
        completed: score >= 80, // Consider completed if score is 80% or higher
        score: Math.max(progress.score, score),
        lastAttempt: new Date()
      });
    }
  }

  getProgress(conceptId: string) {
    return this.userProgress.get(conceptId);
  }

  getOverallProgress(): {
    total: number;
    completed: number;
    averageScore: number;
  } {
    const progress = Array.from(this.userProgress.values());
    return {
      total: progress.length,
      completed: progress.filter(p => p.completed).length,
      averageScore: progress.reduce((sum, p) => sum + p.score, 0) / progress.length
    };
  }

  generateTip(conceptId: string): OOPTip | null {
    const concept = this.concepts.get(conceptId);
    if (!concept) return null;

    return {
      concept: concept.name,
      explanation: concept.description,
      codeExample: concept.codeExample
    };
  }
}

// Create and export a singleton instance
export const oopConceptManager = new OOPConceptManager(); 