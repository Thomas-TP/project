import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  premium: boolean;
  imageSrc: string;
}

const meditations: Meditation[] = [
  {
    id: 'mindfulness',
    title: 'Mindfulness Meditation',
    description: 'Focus on the present moment and develop awareness of your thoughts and sensations.',
    duration: 10,
    category: 'Beginner',
    premium: false,
    imageSrc: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'body-scan',
    title: 'Body Scan Meditation',
    description: 'Progressively focus on different parts of your body to release tension and increase awareness.',
    duration: 15,
    category: 'Beginner',
    premium: false,
    imageSrc: 'https://images.pexels.com/photos/6296010/pexels-photo-6296010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'loving-kindness',
    title: 'Loving-Kindness Meditation',
    description: 'Cultivate feelings of love, kindness, and compassion towards yourself and others.',
    duration: 10,
    category: 'Intermediate',
    premium: true,
    imageSrc: 'https://images.pexels.com/photos/3927387/pexels-photo-3927387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'sleep',
    title: 'Sleep Meditation',
    description: 'Prepare your mind and body for restful sleep with this calming practice.',
    duration: 20,
    category: 'All Levels',
    premium: true,
    imageSrc: 'https://images.pexels.com/photos/6629653/pexels-photo-6629653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'breath-awareness',
    title: 'Breath Awareness',
    description: 'Focus on your breath to anchor yourself in the present moment.',
    duration: 5,
    category: 'Beginner',
    premium: false,
    imageSrc: 'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'stress-relief',
    title: 'Stress Relief',
    description: 'Release tension and find calm amidst life\'s challenges.',
    duration: 15,
    category: 'All Levels',
    premium: true,
    imageSrc: 'https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const MeditationPage: React.FC = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [filter, setFilter] = useState('all');
  
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/sounds/meditation.mp3');
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
    if (!selectedMeditation || !isPlaying) return;

    if (!timeRemaining) {
      setTimeRemaining(selectedMeditation.duration * 60);
    }
    
    intervalRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
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
  }, [selectedMeditation, isPlaying, isMuted, timeRemaining]);

  const handleSelectMeditation = (meditation: Meditation) => {
    if (isPlaying) {
      handleStop();
    }
    setSelectedMeditation(meditation);
    setTimeRemaining(meditation.duration * 60);
  };

  const handleStart = () => {
    if (!selectedMeditation) return;
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
    if (selectedMeditation) {
      setTimeRemaining(selectedMeditation.duration * 60);
    }
    if (audioRef.current && !isMuted) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    if (!selectedMeditation) return 0;
    const totalSeconds = selectedMeditation.duration * 60;
    return ((totalSeconds - timeRemaining) / totalSeconds) * 100;
  };

  // Filter meditations based on selected filter
  const filteredMeditations = filter === 'all' 
    ? meditations 
    : meditations.filter(m => 
        filter === 'free' 
          ? !m.premium 
          : filter === 'premium' 
            ? m.premium 
            : m.category.toLowerCase() === filter.toLowerCase()
      );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Guided Meditation</h1>
        <p className="text-muted-foreground">
          Explore our collection of guided meditations to calm your mind and improve mental clarity.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'beginner' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('beginner')}
        >
          Beginner
        </Button>
        <Button 
          variant={filter === 'intermediate' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('intermediate')}
        >
          Intermediate
        </Button>
        <Button 
          variant={filter === 'free' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('free')}
        >
          Free
        </Button>
        <Button 
          variant={filter === 'premium' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('premium')}
        >
          Premium
        </Button>
      </div>

      {/* Layout for meditation selection and player */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Meditation selection */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMeditations.map((meditation) => (
              <div
                key={meditation.id}
                className={`card p-0 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
                  selectedMeditation?.id === meditation.id
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
                onClick={() => handleSelectMeditation(meditation)}
              >
                <div className="h-40 relative">
                  <img 
                    src={meditation.imageSrc} 
                    alt={meditation.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {meditation.premium && (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/50 text-white rounded px-2 py-0.5">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{meditation.duration} min</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{meditation.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {meditation.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {meditation.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meditation player */}
        <div className="order-first lg:order-last">
          <div className="card p-6 h-full">
            {!selectedMeditation ? (
              <div className="flex flex-col items-center justify-center h-full py-10">
                <div className="text-center text-muted-foreground">
                  <p className="mb-4">Select a meditation to begin your practice</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold">{selectedMeditation.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{selectedMeditation.description}</p>
                </div>

                <div className="flex-grow flex items-center justify-center">
                  <div className="w-full">
                    {/* Progress circle */}
                    <div className="relative mb-6">
                      <div className="w-48 h-48 mx-auto rounded-full flex items-center justify-center bg-muted">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Remaining</p>
                          <p className="text-3xl font-semibold mt-1">
                            {formatTime(timeRemaining)}
                          </p>
                          {isPlaying && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {selectedMeditation.title}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Circular progress */}
                      <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48">
                        <circle 
                          cx="96" 
                          cy="96" 
                          r="90" 
                          fill="none" 
                          stroke="hsl(var(--muted))" 
                          strokeWidth="12" 
                        />
                        {(isPlaying || timeRemaining < selectedMeditation.duration * 60) && (
                          <motion.circle 
                            cx="96" 
                            cy="96" 
                            r="90" 
                            fill="none" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="12" 
                            strokeLinecap="round" 
                            strokeDasharray={`${2 * Math.PI * 90}`}
                            strokeDashoffset={`${2 * Math.PI * 90 * (1 - getProgress() / 100)}`}
                            transform="rotate(-90, 96, 96)"
                          />
                        )}
                      </svg>
                    </div>

                    <div className="flex justify-center space-x-4 mb-6">
                      {isPlaying ? (
                        <Button onClick={handlePause} size="lg" variant="outline" className="rounded-full h-12 w-12 p-0 flex items-center justify-center">
                          <Pause className="h-5 w-5" />
                        </Button>
                      ) : (
                        <Button onClick={handleStart} size="lg" className="rounded-full h-12 w-12 p-0 flex items-center justify-center">
                          <Play className="h-5 w-5" />
                        </Button>
                      )}
                      <Button variant="outline" onClick={handleStop} size="lg" className="rounded-full h-12 w-12 p-0 flex items-center justify-center">
                        <SkipForward className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={toggleMute}
                        title={isMuted ? 'Unmute' : 'Mute'}
                        className="rounded-full h-12 w-12 p-0 flex items-center justify-center"
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {isPlaying
                          ? "Take slow, deep breaths and follow the guided practice"
                          : "Press play to begin your meditation session"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;