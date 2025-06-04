import { create } from 'zustand';
import { supabase } from '../supabase/supabase';

export interface UserStats {
  testStreak: number;
  totalMeditationMinutes: number;
  totalBreathingMinutes: number;
  averageScore: number;
  lastTestDate: Date | null;
}

interface UserState {
  isSubscribed: boolean;
  subscriptionPlan: 'free' | 'monthly' | 'annual' | null;
  stats: UserStats;
  setSubscription: (isSubscribed: boolean, plan: 'free' | 'monthly' | 'annual' | null) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  fetchStats: () => Promise<void>;
}

const defaultStats: UserStats = {
  testStreak: 0,
  totalMeditationMinutes: 0,
  totalBreathingMinutes: 0,
  averageScore: 0,
  lastTestDate: null,
};

export const useUserStore = create<UserState>((set) => ({
  isSubscribed: false,
  subscriptionPlan: 'free',
  stats: defaultStats,
  setSubscription: (isSubscribed, plan) => set({ isSubscribed, subscriptionPlan: plan }),
  updateStats: (stats) => set((state) => ({ 
    stats: { ...state.stats, ...stats } 
  })),
  fetchStats: async () => {
    try {
      const { data: stats, error } = await supabase
        .from('user_stats')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching user stats:', error);
        return;
      }

      if (stats) {
        set({
          stats: {
            testStreak: stats.test_streak,
            totalMeditationMinutes: stats.total_meditation_minutes,
            totalBreathingMinutes: stats.total_breathing_minutes,
            averageScore: stats.average_score,
            lastTestDate: stats.last_test_date ? new Date(stats.last_test_date) : null,
          }
        });
      }
    } catch (error) {
      console.error('Error in fetchStats:', error);
    }
  }
}));