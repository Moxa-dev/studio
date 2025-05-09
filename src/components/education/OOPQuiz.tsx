import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { oopConceptManager } from '@/lib/education/OOPConceptManager';
import type { OOPConcept } from '@/lib/education/OOPConceptManager';

interface OOPQuizProps {
  conceptId: string;
  onComplete: (score: number) => void;
}

const OOPQuiz: React.FC<OOPQuizProps> = ({ conceptId, onComplete }) => {
  const concept = oopConceptManager.getConcept(conceptId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!concept) return null;

  const currentExercise = concept.exercises[currentQuestion];
  const progress = ((currentQuestion + 1) / concept.exercises.length) * 100;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentExercise.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < concept.exercises.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const finalScore = (score / concept.exercises.length) * 100;
      oopConceptManager.updateProgress(conceptId, finalScore);
      onComplete(finalScore);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{concept.name} Quiz</span>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {concept.exercises.length}
          </span>
        </CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-lg font-medium">
            {currentExercise.question}
          </div>

          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            className="space-y-3"
          >
            {currentExercise.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={showExplanation}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className={`flex-1 cursor-pointer ${
                    showExplanation
                      ? index === currentExercise.correctAnswer
                        ? 'text-green-600'
                        : selectedAnswer === index
                        ? 'text-red-600'
                        : ''
                      : ''
                  }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Explanation:</h4>
              <p>{currentExercise.explanation}</p>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            {!showExplanation ? (
              <Button
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
              >
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQuestion < concept.exercises.length - 1
                  ? 'Next Question'
                  : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OOPQuiz; 