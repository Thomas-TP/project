import React, { useEffect } from 'react';
import { 
  ArrowUpRight,
  ArrowDown,
  Flame,
  Brain,
  Calendar,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../../components/ui/Button';
import { useSupabase } from '../../lib/supabase/SupabaseProvider';
import { useUserStore } from '../../lib/store/useUserStore';

// Mock data for the charts - we'll replace this with real data later
const mockWellnessData = [
  { date: 'Mon', score: 68 },
  { date: 'Tue', score: 72 },
  { date: 'Wed', score: 65 },
  { date: 'Thu', score: 73 },
  { date: 'Fri', score: 80 },
  { date: 'Sat', score: 78 },
  { date: 'Sun', score: 82 },
];

// Mock activity data
const recentActivities = [
  { type: 'test', title: 'Completed daily assessment', time: '2 hours ago', score: 78 },
  { type: 'breathing', title: 'Breathing exercise: Box Breathing', time: '5 hours ago', duration: '5 min' },
  { type: 'meditation', title: 'Meditation: Mindfulness', time: 'Yesterday', duration: '10 min' },
];

const DashboardPage: React.FC = () => {
  const { user } = useSupabase();
  const { stats, fetchStats } = useUserStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Good afternoon, {user?.email?.split('@')[0] || 'there'}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your mental wellness journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Test Card */}
        <div className="card col-span-1 lg:col-span-2 flex flex-col">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h3 className="card-title">Your Wellness Today</h3>
              <Link to="/app/test">
                <Button variant="ghost" size="sm" className="text-sm">
                  Take Daily Test <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="card-content pt-4 flex-grow">
            {mockWellnessData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockWellnessData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p>No wellness data available yet. Take your first test!</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="card flex flex-col">
          <div className="card-header">
            <h3 className="card-title">Quick Stats</h3>
          </div>
          <div className="card-content pt-4 flex-grow">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center p-4 border rounded-lg">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Brain className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Today's Wellness Score</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-semibold">{stats.averageScore}</p>
                    <p className="ml-2 text-sm text-success flex items-center">
                      <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                      8%
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Test Streak</p>
                  <p className="text-2xl font-semibold mt-1">{stats.testStreak} days</p>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Total Mindful Minutes</p>
                  <p className="text-2xl font-semibold mt-1">
                    {stats.totalMeditationMinutes + stats.totalBreathingMinutes} min
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities Card */}
        <div className="card col-span-1 lg:col-span-2">
          <div className="card-header">
            <h3 className="card-title">Recent Activities</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start p-4 border rounded-lg">
                  <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {activity.type === 'test' ? (
                      <Brain className="h-5 w-5" />
                    ) : activity.type === 'breathing' ? (
                      <Flame className="h-5 w-5" />
                    ) : (
                      <Brain className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="mt-1">
                      {activity.score ? (
                        <p className="text-sm text-muted-foreground">
                          Score: <span className="font-medium text-foreground">{activity.score}</span>
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Duration: <span className="font-medium text-foreground">{activity.duration}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recommended For You</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <Link to="/app/breathing">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">4-7-8 Breathing</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduces anxiety and helps with sleep
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/app/meditation">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Body Scan Meditation</h4>
                      <p className="text-sm text-muted-foreground">
                        Release tension and improve focus
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="w-full">
                View All Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;