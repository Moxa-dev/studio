'use client'
import React, { useState } from 'react';
import GameScreen from '@/components/game/GameScreen';
import { Toaster } from '@/components/ui/toaster';
import LearningProgressModal from '@/components/education/LearningProgressModal';

export default function Home() {
  const [showProgress, setShowProgress] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary tracking-tight">OOP Adventure</h1>
        <p className="text-lg text-foreground/80">Learn Object-Oriented Programming by playing!</p>
        <button
          className="mt-4 px-4 py-2 bg-accent text-accent-foreground rounded shadow"
          onClick={() => setShowProgress(true)}
        >
          View Learning Progress
        </button>
      </header>

      <GameScreen />

      <LearningProgressModal open={showProgress} onClose={() => setShowProgress(false)} />

      <Toaster />
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} OOP Adventure. Explore and learn!</p>
      </footer>
    </main>
  );
}