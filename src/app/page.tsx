
import GameScreen from '@/components/game/GameScreen';
import { Toaster } from '@/components/ui/toaster'; // If you use toast notifications

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary tracking-tight">OOP Adventure</h1>
        <p className="text-lg text-foreground/80">Learn Object-Oriented Programming by playing!</p>
      </header>
      
      <GameScreen />
      
      <Toaster />
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} OOP Adventure. Explore and learn!</p>
      </footer>
    </main>
  );
}
