import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Book, Star, Award } from 'lucide-react';
import { oopConceptManager } from '@/lib/education/OOPConceptManager';
import LearningProgressModal from '@/components/education/LearningProgressModal';
import { Button } from '@/components/ui/button';
import OOPQuizModal from './OOPQuizModal';

interface LearningProgressProps {}

const LearningProgress: React.FC<LearningProgressProps> = () => {
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const progress = oopConceptManager.getOverallProgress();
  const concepts = oopConceptManager.getAllConcepts();
  const completedConcepts = concepts.filter(
    concept => oopConceptManager.getProgress(concept.id)?.completed
  );

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStartLearning = (conceptId: string): void => {
    setSelectedConceptId(conceptId);
  };

  const handleQuizComplete = (): void => {
    setSelectedConceptId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completion</span>
              <span className="font-medium">
                {progress.completed} / {progress.total} concepts
              </span>
            </div>
            <Progress
              value={(progress.completed / progress.total) * 100}
              className="h-2"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Score</span>
              <span className="font-medium">{progress.averageScore.toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-blue-500" />
            Completed Concepts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedConcepts.map(concept => {
              const conceptProgress = oopConceptManager.getProgress(concept.id);
              return (
                <div
                  key={concept.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{concept.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={getDifficultyColor(concept.difficulty)}
                      >
                        {concept.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Score: {conceptProgress?.score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {concepts
              .filter(concept => !oopConceptManager.getProgress(concept.id)?.completed)
              .slice(0, 3)
              .map(concept => (
                <div
                  key={concept.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{concept.name}</div>
                    <Badge
                      variant="secondary"
                      className={getDifficultyColor(concept.difficulty)}
                    >
                      {concept.difficulty}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStartLearning(concept.id)}
                  >
                    Start Learning
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {selectedConceptId && (
        <OOPQuizModal
          open={!!selectedConceptId}
          conceptId={selectedConceptId}
          onClose={handleQuizComplete}
          onPass={handleQuizComplete}
        />
      )}
    </div>
  );
};

export default LearningProgress; 