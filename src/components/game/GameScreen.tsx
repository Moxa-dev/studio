
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

  const initializeLevel = useCallback((levelId: string) => {
    const levelData = loadLevel(levelId);
    setCurrentLevel(levelData);
    const newPlayer = new Character("Player", levelData.playerStart);
    setPlayer(newPlayer);
    // Create new instances of objects for the level to ensure fresh state on reset
    const newObjects = loadLevel(levelId).objects.map(objData => {
      // This relies on loadLevel returning fresh objects or re-instantiating them.
      // If loadLevel caches, we need deep cloning or re-instantiation here.
      // Assuming loadLevel always gives new instances from classes.
      return objData; 
    });
    setObjects(newObjects);
    setMessage({ text: `Welcome to ${levelData.name}! Use controls to move and interact.`, type: 'info' });
    setGameOver(false);
  }, []);

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
        return;
    }

    const moved = player.move(dx, dy, currentLevel.gridSize);
    if (moved) {
      setPlayer(new Character(player.name, player.position)); // Create new instance for react state update
      setMessage(null); // Clear previous message on successful move
    } else {
      setMessage({ text: "You can't move out of bounds!", type: 'error' });
    }
  };

  const handleInteract = (): void => {
    if (!player || !adjacentInteractableObject || gameOver) return;

    const interactionResult = adjacentInteractableObject.interact(player);
    setMessage(interactionResult);

    // Update player state (inventory might have changed)
    setPlayer(new Character(player.name, player.position));
    player.inventory = [...player.inventory]; // ensure re-render if inventory changed by interaction

    // Update object state (e.g., door opened, key picked up)
    setObjects(prevObjects => prevObjects.map(obj => 
      obj.id === adjacentInteractableObject.id ? adjacentInteractableObject : obj
    ));

    // Check for win condition
    if (adjacentInteractableObject instanceof Door && !adjacentInteractableObject.isLocked && adjacentInteractableObject.isOpened && currentLevel?.goalMessage) {
      setMessage({ text: currentLevel.goalMessage, type: 'success', tip: adjacentInteractableObject.oopTip });
      setGameOver(true);
    }
  };
  
  const isObjectAdjacent = useCallback((objectPos: Position): boolean => {
    if (!player) return false;
    const dx = Math.abs(player.position.x - objectPos.x);
    const dy = Math.abs(player.position.y - objectPos.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
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
            <h3 className="text-xl font-bold text-accent mb-4">Level Complete!</h3>
            <Button onClick={() => initializeLevel('level1')} variant="default">
              <RefreshCw className="mr-2 h-4 w-4" /> Play Again
            </Button>
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
