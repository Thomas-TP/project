import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  steps: {
    text: string;
    duration: number;
  }[];
  totalTime: number;
  premium: boolean;
}

const breathingExercises: BreathingExercise[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description: 'Reduce stress and improve focus with this simple four-part technique',
    steps: [
      { text: 'Breathe In', duration: 4 },
      { text: 'Hold', duration: 4 },
      { text: 'Breathe Out', duration: 4 },
      { text: 'Hold', duration: 4 },
    ],
    totalTime: 16,
    premium: false
  },
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description: 'Promotes sleep, reduces anxiety, and helps manage cravings',
    steps: [
      { text: 'Breathe In', duration: 4 },
      { text: 'Hold', duration: 7 },
      { text: 'Breathe Out', duration: 8 },
    ],
    totalTime: 19,
    premium: false
  },
  {
    id: 'deep-breathing',
    name: 'Deep Breathing',
    description: 'Simple deep breaths to quickly calm your nervous system',
    steps: [
      { text: 'Breathe In', duration: 5 },
      { text: 'Breathe Out', duration: 5 },
    ],
    totalTime: 10,
    premium: false
  },
  {
    id: 'alternate-nostril',
    name: 'Alternate Nostril Breathing',
    description: 'Balances your nervous system and improves focus',
    steps: [
      { text: 'Close right nostril, breathe in through left', duration: 4 },
      { text: 'Close both nostrils, hold', duration: 2 },
      { text: 'Close left nostril, breathe out through right', duration: 4 },
      { text: 'Breathe in through right nostril', duration: 4 },
      { text: 'Close both nostrils, hold', duration: 2 },
      { text: 'Close right nostril, breathe out through left', duration: 4 },
    ],
    totalTime: 20,
    premium: true
  },
  {
    id: 'relaxing-breath',
    name: 'Relaxing Breath',
    description: 'Extended exhale for deep relaxation and stress reduction',
    steps: [
      { text: 'Breathe In', duration: 4 },
      { text: 'Breathe Out', duration: 8 },
    ],
    totalTime: 12,
    premium: true
  }
];

const BreathingPage: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(1); // minutes
  
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/sounds/breathing.mp3');
    audioRef.current.loop = true;
    
    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedExercise || !isPlaying) return;

    setSecondsLeft(selectedExercise.steps[currentStep].duration);
    
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Move to next step or cycle
          if (currentStep >= selectedExercise.steps.length - 1) {
            // End of one cycle
            const newCycleCount = cycles + 1;
            setCycles(newCycleCount);
            
            // Check if we've reached the total time
            if (newCycleCount >= Math.floor((duration * 60) / selectedExercise.totalTime)) {
              setIsPlaying(false);
              return 0;
            }
            
            setCurrentStep(0);
            return selectedExercise.steps[0].duration;
          } else {
            // Next step
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            return selectedExercise.steps[nextStep].duration;
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    // Play/pause audio based on isMuted
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current && !isMuted) {
        audioRef.current.pause();
      }
    };
  }, [selectedExercise, isPlaying, currentStep, cycles, duration, isMuted]);

  const handleSelectExercise = (exercise: BreathingExercise) => {
    if (isPlaying) {
      handleStop();
    }
    setSelectedExercise(exercise);
    setCurrentStep(0);
    setCycles(0);
    setSecondsLeft(exercise.steps[0].duration);
  };

  const handleStart = () => {
    if (!selectedExercise) return;
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current && !isMuted) {
      audioRef.current.pause();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCycles(0);
    if (selectedExercise) {
      setSecondsLeft(selectedExercise.steps[0].duration);
    }
    if (audioRef.current && !isMuted) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Calculate progress percentage for the circle
  const getCircleProgress = () => {
    if (!selectedExercise) return 0;
    const totalDuration = selectedExercise.steps[currentStep].duration;
    return ((totalDuration - secondsLeft) / totalDuration) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Breathing Exercises</h1>
        <p className="text-muted-foreground">
          Practice guided breathing techniques to reduce stress and improve your mental well-being.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Exercise selection */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Available Exercises</h2>
              <p className="card-description">Select an exercise to begin</p>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                {breathingExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => handleSelectExercise(exercise)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedExercise?.id === exercise.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/40 hover:bg-muted/40'
                    } ${exercise.premium ? 'relative' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{exercise.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {exercise.description}
                        </p>
                      </div>
                      {exercise.premium && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Breathing visualization */}
        <div className="lg:col-span-2">
          <div className="card p-6 h-full flex flex-col">
            {!selectedExercise ? (
              <div className="flex flex-col items-center justify-center flex-grow py-10">
                <div className="text-center text-muted-foreground">
                  <p className="mb-4">Select a breathing exercise to get started</p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">{selectedExercise.name}</h2>
                  <p className="text-muted-foreground mt-2">{selectedExercise.description}</p>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center">
                  <div className="mb-10 relative">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={`${currentStep}-${secondsLeft}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="h-64 w-64 rounded-full flex items-center justify-center bg-muted"
                      >
                        <div 
                          className={`h-52 w-52 rounded-full flex items-center justify-center bg-primary/10 border-4 border-primary transition-all ${
                            isPlaying ? 'breathing-animation' : ''
                          }`}
                        >
                          <div className="text-center">
                            <p className="text-2xl font-semibold">
                              {selectedExercise.steps[currentStep].text}
                            </p>
                            {isPlaying && (
                              <p className="text-4xl font-bold mt-2">{secondsLeft}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Progress circle */}
                    <svg
                      className="absolute top-0 left-0 h-64 w-64"
                      viewBox="0 0 100 100"
                    >
                      {isPlaying && (
                        <motion.circle
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: getCircleProgress() / 100 }}
                          transition={{ duration: 1 }}
                          cx="50"
                          cy="50"
                          r="48"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="300"
                          strokeDashoffset="0"
                          transform="rotate(-90, 50, 50)"
                          style={{
                            strokeDashoffset: `calc(300 - (300 * ${getCircleProgress() / 100}))`
                          }}
                        />
                      )}
                    </svg>
                  </div>

                  <div className="flex items-center space-x-4 mb-8">
                    {isPlaying ? (
                      <Button onClick={handlePause} size="lg">
                        <Pause className="h-5 w-5 mr-2" /> Pause
                      </Button>
                    ) : (
                      <Button onClick={handleStart} size="lg">
                        <Play className="h-5 w-5 mr-2" /> Start
                      </Button>
                    )}
                    
                    <Button variant="outline" onClick={handleStop} size="lg">
                      <RefreshCw className="h-4 w-4 mr-2" /> Reset
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Duration</span>
                      <span className="text-sm font-medium">{duration} min</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                      className="w-full"
                      disabled={isPlaying}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1 min</span>
                      <span>5 min</span>
                      <span>10 min</span>
                    </div>
                  </div>

                  {isPlaying && (
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                      <p>Cycle {cycles + 1} / {Math.floor((duration * 60) / selectedExercise.totalTime)}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingPage;