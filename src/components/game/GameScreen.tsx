"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Level, GameMessage, Position } from '@/types/game';
import { Character, WorldObject as WorldObjectType } from '@/types/game';
import { loadLevel } from '@/lib/oop-game/level';
import LevelDisplay from './LevelDisplay';
import Controls from './Controls';
import OOPTipDisplay from './OOPTipDisplay';
import { Door } from '@/lib/oop-game/objects'; // To check for win condition
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const GameScreen: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [player, setPlayer] = useState<Character | null>(null);
  const [objects, setObjects] = useState<WorldObjectType[]>([]);
  const [message, setMessage] = useState<GameMessage | null>(null);
  const [adjacentInteractableObject, setAdjacentInteractableObject] = useState<WorldObjectType | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [currentLevelId, setCurrentLevelId] = useState<string>('level1');
  const [levelProgress, setLevelProgress] = useState<string[]>(['level1']);
  const [learningMessage, setLearningMessage] = useState<string | null>(null);
  const [learningMessageIndex, setLearningMessageIndex] = useState<number>(0);

  // Predefined learning messages for different actions
  const movementLearningTips = [
    "Each move updates the player's position - a key concept in object-oriented state management!",
    "Movement demonstrates how objects can change their state through methods.",
    "The player object encapsulates movement logic, hiding implementation details.",
    "Grid-based movement shows how objects interact with their environment."
  ];

  const interactionLearningTips = {
    'Door': [
      "Interaction methods can change object states, like unlocking a door!",
      "Encapsulation allows objects to manage their internal state privately.",
      "Objects can have complex interaction logic hidden from the user."
    ],
    'Key': [
      "Picking up items demonstrates object composition and inventory management.",
      "Objects can transfer between collections, a key OOP concept.",
      "Inventory shows how objects can be collected and managed."
    ],
    'default': [
      "Every interaction is a method call on an object!",
      "Objects respond to interactions based on their defined behaviors.",
      "Polymorphism allows different objects to respond uniquely to the same method."
    ]
  };

  const initializeLevel = useCallback((levelId: string) => {
    const levelData = loadLevel(levelId);
    setCurrentLevel(levelData);
    const newPlayer = new Character("Player", levelData.playerStart);
    setPlayer(newPlayer);
    const newObjects = loadLevel(levelId).objects.map(objData => objData);
    setObjects(newObjects);
    setMessage({ text: `Welcome to ${levelData.name}! Use controls to move and interact.`, type: 'info' });
    setGameOver(false);
    setCurrentLevelId(levelId);
  }, []);

  const handleLevelComplete = useCallback(() => {
    const availableLevels = ['level1', 'level2', 'level3']; // Add more levels as needed
    const currentIndex = availableLevels.indexOf(currentLevelId);
    const nextLevelIndex = currentIndex + 1;

    if (nextLevelIndex < availableLevels.length) {
      const nextLevel = availableLevels[nextLevelIndex];
      setLevelProgress(prev => [...new Set([...prev, nextLevel])]);
      initializeLevel(nextLevel);
    } else {
      setMessage({ 
        text: "Congratulations! You've completed all levels and mastered OOP concepts!", 
        type: 'success',
        tip: {
          concept: "OOP Journey Complete",
          explanation: "You've learned key Object-Oriented Programming principles through an interactive game!",
          codeExample: `// Reflect on your learning journey\nclass OOPLearner {\n  skills = [\n    'Objects & Classes',\n    'Inheritance',\n    'Polymorphism',\n    'Encapsulation'\n  ];\n}`
        }
      });
      setGameOver(true);
    }
  }, [currentLevelId, initializeLevel]);

  useEffect(() => {
    initializeLevel('level1');
  }, [initializeLevel]);

  const findAdjacentInteractableObject = useCallback(() => {
    if (!player || !objects) return null;
    const directions = [{dx:0,dy:1}, {dx:0,dy:-1}, {dx:1,dy:0}, {dx:-1,dy:0}];
    for (const dir of directions) {
      const checkPos = { x: player.position.x + dir.dx, y: player.position.y + dir.dy };
      const obj = objects.find(o => o.position.x === checkPos.x && o.position.y === checkPos.y && o.isInteractable);
      if (obj) return obj;
    }
    return null;
  }, [player, objects]);

  useEffect(() => {
    setAdjacentInteractableObject(findAdjacentInteractableObject());
  }, [player?.position, objects, findAdjacentInteractableObject]);


  const handleMove = (dx: number, dy: number): void => {
    if (!player || !currentLevel || gameOver) return;
    
    const targetPos = { x: player.position.x + dx, y: player.position.y + dy };
    const wallAtTarget = objects.find(obj => obj.position.x === targetPos.x && obj.position.y === targetPos.y && obj.name === "Wall");

    if (wallAtTarget) {
      setMessage({ text: "You can't move through a wall!", type: 'error' });
      
      // Cycle through movement tips
      setLearningMessage(movementLearningTips[learningMessageIndex % movementLearningTips.length]);
      setLearningMessageIndex(prev => prev + 1);
      return;
    }

    const moved = player.move(dx, dy, currentLevel.gridSize);
    if (moved) {
      setPlayer(new Character(player.name, player.position));
      setMessage(null);
      
      // Cycle through movement tips
      setLearningMessage(movementLearningTips[learningMessageIndex % movementLearningTips.length]);
      setLearningMessageIndex(prev => prev + 1);
    } else {
      setMessage({ text: "You can't move out of bounds!", type: 'error' });
      setLearningMessage("Boundary checks prevent objects from moving outside their defined space.");
    }
  };

  const handleInteract = (): void => {
    if (!player || !adjacentInteractableObject || gameOver) return;

    console.log('Attempting to interact with:', adjacentInteractableObject);
    console.log('Player position:', player.position);
    console.log('Adjacent object position:', adjacentInteractableObject.position);

    try {
      const interactionResult = adjacentInteractableObject.interact(player);
      console.log('Interaction result:', interactionResult);
      setMessage(interactionResult);

      // Special guidance for key and door interactions
      if (adjacentInteractableObject.name === "Golden Key") {
        console.log('Key picked up, current inventory:', player.inventory);
        setLearningMessage("Great! You found a key. Look for a door to unlock!");
      } else if (adjacentInteractableObject.name === "Mysterious Door") {
        if (interactionResult.type === 'error') {
          setLearningMessage("Hint: You need to find the golden key to unlock this door!");
        }
      }

      setPlayer(new Character(player.name, player.position));
      player.inventory = [...player.inventory];

      setObjects(prevObjects => {
        const updatedObjects = prevObjects.map(obj => 
          obj.id === adjacentInteractableObject.id ? adjacentInteractableObject : obj
        );
        console.log('Updated objects:', updatedObjects);
        return updatedObjects;
      });

      if (adjacentInteractableObject instanceof Door && !adjacentInteractableObject.isLocked && adjacentInteractableObject.isOpened && currentLevel?.goalMessage) {
        setMessage({ text: currentLevel.goalMessage, type: 'success', tip: adjacentInteractableObject.oopTip });
        handleLevelComplete();
      }
    } catch (error) {
      console.error('Error during interaction:', error);
      setMessage({ 
        text: `Interaction error: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        type: 'error' 
      });
    }
  };
  
  const isObjectAdjacent = useCallback((objectPos: Position): boolean => {
    if (!player) return false;
    const dx = Math.abs(player.position.x - objectPos.x);
    const dy = Math.abs(player.position.y - objectPos.y);
    
    // Precise adjacency check (directly next to the player)
    const isAdjacent = (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    
    // Additional logging for debugging
    if (isAdjacent) {
      console.log('Adjacent object detected:', {
        playerPos: player.position, 
        objectPos, 
        dx, 
        dy
      });
    }
    
    return isAdjacent;
  }, [player]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return;
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          handleMove(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          handleMove(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          handleMove(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          handleMove(1, 0);
          break;
        case 'Enter':
        case 'e':
          if (adjacentInteractableObject) handleInteract();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, adjacentInteractableObject, gameOver, handleMove, handleInteract]); // Make sure all dependencies are included

  if (!currentLevel || !player) {
    return <div className="p-8 text-center">Loading level...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-8 items-start max-w-6xl mx-auto">
      <div className="lg:flex-grow w-full lg:w-2/3">
        <LevelDisplay
          character={player}
          objects={objects}
          gridSize={currentLevel.gridSize}
          onObjectInteract={handleInteract} // We use the main interact button, direct click interaction is visual cue
          isObjectAdjacent={isObjectAdjacent}
        />
      </div>
      <div className="w-full lg:w-1/3 space-y-6">
        <OOPTipDisplay message={message} />
        {!gameOver && (
          <Controls 
            onMove={handleMove} 
            onInteract={handleInteract} 
            canInteract={!!adjacentInteractableObject}
          />
        )}
        {gameOver && (
          <div className="p-4 bg-card rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold text-accent mb-4">
              {message?.text || "Level Complete!"}
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center space-x-2">
                {['level1', 'level2', 'level3'].map((level) => (
                  <Button 
                    key={level} 
                    onClick={() => initializeLevel(level)}
                    variant={levelProgress.includes(level) ? 'default' : 'outline'}
                    disabled={!levelProgress.includes(level)}
                    className="min-w-[100px]"
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={() => initializeLevel('level1')} 
                variant="secondary"
                className="self-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Restart Game
              </Button>
            </div>
          </div>
        )}
        {learningMessage && !gameOver && (
          <div className="p-4 bg-green-50 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🧠 OOP Learning Moment</h3>
            <p className="text-green-700">{learningMessage}</p>
          </div>
        )}
         <div className="p-4 bg-card rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">Inventory</h3>
            {player.inventory.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your inventory is empty.</p>
            ) : (
              <ul className="list-disc list-inside text-sm text-card-foreground">
                {player.inventory.map(item => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>
      </div>
    </div>
  );
};

export default GameScreen;
