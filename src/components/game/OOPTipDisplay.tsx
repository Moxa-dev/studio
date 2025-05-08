
import type { GameMessage, OOPTip } from '@/types/game';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Info, CheckCircle, XCircle, Zap } from 'lucide-react'; // Zap for "Concept"
import { ScrollArea } from '@/components/ui/scroll-area';

interface OOPTipDisplayProps {
  message: GameMessage | null;
}

const OOPTipDisplay: React.FC<OOPTipDisplayProps> = ({ message }) => {
  if (!message) {
    return (
       <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5 text-muted-foreground" />
            Game Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Move around and interact with objects to learn OOP!</p>
        </CardContent>
      </Card>
    );
  }

  const tip = message.tip;

  const Icon = (() => {
    switch (message.type) {
      case 'success': return <CheckCircle className="mr-2 h-6 w-6 text-green-500" />;
      case 'error': return <XCircle className="mr-2 h-6 w-6 text-red-500" />;
      case 'oop': return <Lightbulb className="mr-2 h-6 w-6 text-accent" />;
      default: return <Info className="mr-2 h-6 w-6 text-blue-500" />;
    }
  })();
  
  return (
    <Card className="bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-card-foreground">
          {Icon}
          {message.type === 'oop' && tip ? `OOP Concept: ${tip.concept}` : 'Game Message'}
        </CardTitle>
        <CardDescription className="text-card-foreground/80">{message.text}</CardDescription>
      </CardHeader>
      {tip && (
        <CardContent>
          <ScrollArea className="h-auto max-h-60">
            <div className="space-y-3 pr-4">
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center text-card-foreground">
                  <Zap className="mr-2 h-4 w-4 text-accent" />
                  What is "{tip.concept}"?
                </h4>
                <p className="text-sm text-card-foreground/90">{tip.explanation}</p>
              </div>
              {tip.codeExample && (
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-card-foreground">Code Example:</h4>
                  <pre className="bg-muted p-3 rounded-md text-xs text-muted-foreground overflow-x-auto">
                    <code>{tip.codeExample}</code>
                  </pre>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      )}
    </Card>
  );
};

export default OOPTipDisplay;
