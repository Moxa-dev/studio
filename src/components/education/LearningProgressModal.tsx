import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LearningProgress from './LearningProgress';

const LearningProgressModal = ({ open, onClose }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Start your OOP Journey</DialogTitle>
      </DialogHeader>
      <LearningProgress />
    </DialogContent>
  </Dialog>
);

export default LearningProgressModal; 