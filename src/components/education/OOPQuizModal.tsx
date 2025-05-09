import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OOPQuiz from './OOPQuiz';

interface OOPQuizModalProps {
  open: boolean;
  conceptId: string;
  onClose: () => void;
  onPass: () => void;
}

const OOPQuizModal: React.FC<OOPQuizModalProps> = ({ open, conceptId, onClose, onPass }) => {
  const handleComplete = (score: number) => {
    if (score >= 80) {
      onPass();
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quiz Challenge</DialogTitle>
        </DialogHeader>
        <OOPQuiz conceptId={conceptId} onComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
};

export default OOPQuizModal; 