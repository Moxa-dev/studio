import type { WorldObject } from '@/types/game';
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GameObjectViewProps {
  object: WorldObject;
  isAdjacent: boolean;
  onInteract: () => void;
}

const GameObjectView: React.FC<GameObjectViewProps> = ({ object, isAdjacent, onInteract }) => {
  if(object.position.x < 0 || object.position.y < 0) return null; // Don't render if off-map (e.g. picked up)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "absolute flex items-center justify-center text-xl md:text-2xl rounded-md transition-all duration-200",
              object.isInteractable ? "cursor-pointer hover:bg-accent/30" : "cursor-default",
              isAdjacent && object.isInteractable && "ring-2 ring-accent shadow-lg",
              object.name === "Wall" ? "text-gray-500 bg-gray-100" : "bg-secondary text-secondary-foreground"
            )}
            style={{
              left: `calc(${object.position.x} * (100% / var(--grid-width)))`,
              top: `calc(${object.position.y} * (100% / var(--grid-height)))`,
              width: `calc(100% / var(--grid-width))`,
              height: `calc(100% / var(--grid-height))`,
            }}
            onClick={object.isInteractable && isAdjacent ? onInteract : undefined}
            onKeyPress={object.isInteractable && isAdjacent ? (e) => e.key === 'Enter' && onInteract() : undefined}
            tabIndex={object.isInteractable && isAdjacent ? 0 : -1}
            aria-label={`${object.name} at ${object.position.x}, ${object.position.y}. ${object.description}`}
            role="button"
          >
            {object.charRepresentation}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-background border-border shadow-lg rounded-md p-2 text-sm">
          <p className="font-semibold">{object.name}</p>
          <p>{object.description}</p>
          {isAdjacent && object.isInteractable && <p className="text-xs text-muted-foreground mt-1">Click or Press Enter to interact</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GameObjectView;
