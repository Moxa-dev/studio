
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hand } from 'lucide-react';

interface ControlsProps {
  onMove: (dx: number, dy: number) => void;
  onInteract: () => void;
  canInteract: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onMove, onInteract, canInteract }) => {
  return (
    <div className="p-4 bg-card rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-center text-card-foreground">Controls</h3>
      <div className="grid grid-cols-3 gap-2 items-center justify-items-center max-w-xs mx-auto">
        <div></div> {/* Empty cell for grid alignment */}
        <Button variant="outline" size="lg" onClick={() => onMove(0, -1)} aria-label="Move Up">
          <ArrowUp />
        </Button>
        <div></div> {/* Empty cell for grid alignment */}
        
        <Button variant="outline" size="lg" onClick={() => onMove(-1, 0)} aria-label="Move Left">
          <ArrowLeft />
        </Button>
        <Button 
            variant="default" 
            size="lg" 
            onClick={onInteract} 
            disabled={!canInteract} 
            aria-label="Interact with object"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Hand className="mr-2 h-5 w-5" /> Interact
        </Button>
        <Button variant="outline" size="lg" onClick={() => onMove(1, 0)} aria-label="Move Right">
          <ArrowRight />
        </Button>
        
        <div></div> {/* Empty cell for grid alignment */}
        <Button variant="outline" size="lg" onClick={() => onMove(0, 1)} aria-label="Move Down">
          <ArrowDown />
        </Button>
        <div></div> {/* Empty cell for grid alignment */}
      </div>
    </div>
  );
};

export default Controls;
