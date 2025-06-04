export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          preferences: Json | null
          created_at: string
          subscription_status: string
          subscription_id: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
          created_at?: string
          subscription_status?: string
          subscription_id?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
          created_at?: string
          subscription_status?: string
          subscription_id?: string | null
        }
      }
      test_results: {
        Row: {
          id: string
          user_id: string
          date: string
          score: number
          answers: Json
          recommendations: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          score: number
          answers: Json
          recommendations?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          score?: number
          answers?: Json
          recommendations?: Json | null
        }
      }
      meditation_sessions: {
        Row: {
          id: string
          user_id: string
          date: string
          duration: number
          meditation_type: string
          completed: boolean
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          duration: number
          meditation_type: string
          completed: boolean
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          duration?: number
          meditation_type?: string
          completed?: boolean
        }
      }
      breathing_sessions: {
        Row: {
          id: string
          user_id: string
          date: string
          duration: number
          exercise_type: string
          completed: boolean
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          duration: number
          exercise_type: string
          completed: boolean
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          duration?: number
          exercise_type?: string
          completed?: boolean
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          plan_type: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          plan_type: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          plan_type?: string
          status?: string
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
        }
      }
    }
  }
}