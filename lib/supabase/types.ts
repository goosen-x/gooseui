/**
 * Supabase Database Types
 *
 * These types represent the database schema for the GooseUI Generator
 */

export type PlanTier = "free" | "pro" | "team" | "enterprise"
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing"
export type ExportFormat = "html" | "react" | "registry" | "json"

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  paddle_customer_id: string | null
  paddle_subscription_id: string | null
  plan: PlanTier
  status: SubscriptionStatus
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  data: Record<string, unknown>
  thumbnail: string | null
  is_published: boolean
  published_url: string | null
  created_at: string
  updated_at: string
}

export interface Export {
  id: string
  user_id: string
  project_id: string | null
  format: ExportFormat
  created_at: string
}

// Database types for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, "created_at" | "updated_at">
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
      }
      subscriptions: {
        Row: Subscription
        Insert: Omit<Subscription, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Subscription, "id" | "user_id" | "created_at" | "updated_at">>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Project, "id" | "user_id" | "created_at" | "updated_at">>
      }
      exports: {
        Row: Export
        Insert: Omit<Export, "id" | "created_at">
        Update: never // Exports are immutable
      }
    }
    Functions: {
      get_exports_this_month: {
        Args: { uid: string }
        Returns: number
      }
      get_project_count: {
        Args: { uid: string }
        Returns: number
      }
    }
  }
}
