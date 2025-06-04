import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you rate your overall mood today?",
    options: [
      { text: "Very poor", value: 1 },
      { text: "Poor", value: 2 },
      { text: "Neutral", value: 3 },
      { text: "Good", value: 4 },
      { text: "Excellent", value: 5 }
    ]
  },
  {
    id: 2,
    text: "How well did you sleep last night?",
    options: [
      { text: "Very poorly", value: 1 },
      { text: "Poorly", value: 2 },
      { text: "Average", value: 3 },
      { text: "Well", value: 4 },
      { text: "Very well", value: 5 }
    ]
  },
  {
    id: 3,
    text: "How would you rate your stress level today?",
    options: [
      { text: "Very high", value: 1 },
      { text: "High", value: 2 },
      { text: "Moderate", value: 3 },
      { text: "Low", value: 4 },
      { text: "Very low", value: 5 }
    ]
  },
  {
    id: 4,
    text: "How easy or difficult is it to focus today?",
    options: [
      { text: "Very difficult", value: 1 },
      { text: "Difficult", value: 2 },
      { text: "Neutral", value: 3 },
      { text: "Easy", value: 4 },
      { text: "Very easy", value: 5 }
    ]
  },
  {
    id: 5,
    text: "How connected do you feel to others today?",
    options: [
      { text: "Not at all", value: 1 },
      { text: "Slightly", value: 2 },
      { text: "Moderately", value: 3 },
      { text: "Very", value: 4 },
      { text: "Extremely", value: 5 }
    ]
  },
  {
    id: 6,
    text: "How satisfied do you feel with your life right now?",
    options: [
      { text: "Very dissatisfied", value: 1 },
      { text: "Dissatisfied", value: 2 },
      { text: "Neutral", value: 3 },
      { text: "Satisfied", value: 4 },
      { text: "Very satisfied", value: 5 }
    ]
  },
  {
    id: 7,
    text: "How easily were you able to relax today?",
    options: [
      { text: "Not at all", value: 1 },
      { text: "With great difficulty", value: 2 },
      { text: "With some difficulty", value: 3 },
      { text: "Fairly easily", value: 4 },
      { text: "Very easily", value: 5 }
    ]
  },
  {
    id: 8,
    text: "How optimistic do you feel about the future?",
    options: [
      { text: "Not at all", value: 1 },
      { text: "Slightly", value: 2 },
      { text: "Moderately", value: 3 },
      { text: "Very", value: 4 },
      { text: "Extremely", value: 5 }
    ]
  },
  {
    id: 9,
    text: "How energetic do you feel today?",
    options: [
      { text: "Not at all", value: 1 },
      { text: "Slightly", value: 2 },
      { text: "Moderately", value: 3 },
      { text: "Very", value: 4 },
      { text: "Extremely", value: 5 }
    ]
  },
  {
    id: 10,
    text: "Overall, how would you rate your mental well-being today?",
    options: [
      { text: "Very poor", value: 1 },
      { text: "Poor", value: 2 },
      { text: "Average", value: 3 },
      { text: "Good", value: 4 },
      { text: "Excellent", value: 5 }
    ]
  }
];

const TestPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (questionId: number, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate score (0-100 scale)
    const totalQuestions = questions.length;
    const maxPossibleScore = totalQuestions * 5; // 5 is the max value for each question
    const userTotalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const normalizedScore = Math.round((userTotalScore / maxPossibleScore) * 100);
    
    // Mock API call to save results
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Navigate to results page with score
    navigate('/app/test/result', { 
      state: { 
        score: normalizedScore,
        answers 
      } 
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[question.id] !== undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Daily Mental Wellness Check</h1>
        <p className="text-muted-foreground">
          Answer these questions honestly to get an accurate assessment of your current mental state.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-xl font-medium mb-6">{question.text}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(question.id, option.value)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                answers[question.id] === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/40 hover:bg-muted/40'
              }`}
            >
              <div className="flex items-center">
                <div className={`h-5 w-5 rounded-full mr-3 flex items-center justify-center border ${
                  answers[question.id] === option.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground'
                }`}>
                  {answers[question.id] === option.value && (
                    <div className="h-2 w-2 rounded-full bg-current" />
                  )}
                </div>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...
                </>
              ) : (
                'Complete Test'
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
            >
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TestPage;