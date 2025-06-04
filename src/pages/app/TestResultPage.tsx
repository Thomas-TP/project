import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  Flame,
  ArrowUpRight,
  Smile,
  Meh,
  Frown
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const TestResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, answers } = location.state || {};

  useEffect(() => {
    // If there's no score, redirect to the test page
    if (!score && score !== 0) {
      navigate('/app/test');
    }
  }, [score, navigate]);

  if (!score && score !== 0) {
    return null;
  }

  // Determine result category
  let resultCategory: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  };

  if (score >= 80) {
    resultCategory = {
      icon: <Smile className="h-8 w-8" />,
      title: 'Excellent',
      description: 'Your mental wellness is in great shape! Keep up the positive habits.',
      color: 'text-success'
    };
  } else if (score >= 60) {
    resultCategory = {
      icon: <Meh className="h-8 w-8" />,
      title: 'Good',
      description: 'Your mental wellness is generally good, with some room for improvement.',
      color: 'text-warning'
    };
  } else {
    resultCategory = {
      icon: <Frown className="h-8 w-8" />,
      title: 'Needs Attention',
      description: 'Your mental wellness could benefit from some focused care and attention.',
      color: 'text-destructive'
    };
  }

  // Recommendations based on score
  const recommendations = [
    score < 70 ? {
      icon: <Flame className="h-5 w-5" />,
      title: 'Box Breathing Exercise',
      description: 'Try a 5-minute box breathing session to reduce stress.',
      link: '/app/breathing'
    } : {
      icon: <Flame className="h-5 w-5" />,
      title: '4-7-8 Breathing Exercise',
      description: 'Maintain your calm with this relaxing breathing technique.',
      link: '/app/breathing'
    },
    score < 60 ? {
      icon: <Brain className="h-5 w-5" />,
      title: 'Body Scan Meditation',
      description: 'Release tension with a guided body scan meditation.',
      link: '/app/meditation'
    } : {
      icon: <Brain className="h-5 w-5" />,
      title: 'Loving-Kindness Meditation',
      description: 'Cultivate positive emotions with this guided meditation.',
      link: '/app/meditation'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Your Wellness Results</h1>
        <p className="text-muted-foreground">
          Based on your responses, here's an assessment of your current mental wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-6 lg:col-span-2"
        >
          <div className="flex flex-col items-center text-center">
            <div className={`flex items-center justify-center h-24 w-24 rounded-full ${resultCategory.color} bg-opacity-20 mb-4`}>
              <div className={resultCategory.color}>
                {resultCategory.icon}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">{resultCategory.title}</h2>
            <p className="text-muted-foreground mb-6">
              {resultCategory.description}
            </p>
            
            <div className="w-full max-w-md h-8 bg-muted rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-out"
                style={{ width: `${score}%` }}
              />
            </div>
            
            <div className="flex justify-between w-full max-w-md mb-6 text-sm text-muted-foreground">
              <span>Needs Attention</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
            
            <p className="text-4xl font-bold">{score}<span className="text-lg text-muted-foreground">/100</span></p>
          </div>
        </motion.div>

        {/* Date & Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Test Details</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="card p-6 mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <Link key={index} to={rec.link}>
              <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {rec.icon}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium flex items-center">
                      {rec.title}
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Link to="/app/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
        <Link to="/app/test">
          <Button variant="outline">
            Retake Test
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TestResultPage;