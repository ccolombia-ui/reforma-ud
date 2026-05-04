/**
 * Tipos mínimos para las tablas de Supabase.
 * En producción se genera con `supabase gen types typescript`.
 */

export interface TenantRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  tenant_id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GamificationConfigRow {
  id: string;
  tenant_id: string;
  config: {
    enabled?: boolean;
    xpPerAction?: Record<string, number>;
    levels?: Array<{ name: string; minXp: number; icon?: string }>;
    badges?: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      condition: string;
    }>;
  };
  created_at: string;
  updated_at: string;
}

export interface DocumentRow {
  id: string;
  tenant_id: string;
  slug: string;
  title: string;
  content: string | null;
  source_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface UserProgressRow {
  id: string;
  tenant_id: string;
  user_id: string;
  document_slug: string;
  section_id: string;
  status: 'pending' | 'completed' | 'verified';
  xp_earned: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserXpRow {
  id: string;
  tenant_id: string;
  user_id: string;
  total_xp: number;
  sections_read: number;
  missions_completed: number;
  questions_verified: number;
  updated_at: string;
}

export interface BadgeEarningRow {
  id: string;
  tenant_id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface LeaderboardEntryRow {
  id: string;
  tenant_id: string;
  user_id: string;
  total_xp: number;
  rank: number | null;
  period: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      tenants: { Row: TenantRow; Insert: Omit<TenantRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<TenantRow, 'id'>> };
      profiles: { Row: ProfileRow; Insert: Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<ProfileRow, 'id'>> };
      gamification_configs: { Row: GamificationConfigRow; Insert: Omit<GamificationConfigRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<GamificationConfigRow, 'id'>> };
      documents: { Row: DocumentRow; Insert: Omit<DocumentRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<DocumentRow, 'id'>> };
      user_progress: { Row: UserProgressRow; Insert: Omit<UserProgressRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<UserProgressRow, 'id'>> };
      user_xp: { Row: UserXpRow; Insert: Omit<UserXpRow, 'id' | 'updated_at'>; Update: Partial<Omit<UserXpRow, 'id'>> };
      badge_earnings: { Row: BadgeEarningRow; Insert: Omit<BadgeEarningRow, 'id' | 'earned_at'>; Update: never };
      leaderboard_entries: { Row: LeaderboardEntryRow; Insert: Omit<LeaderboardEntryRow, 'id' | 'updated_at'>; Update: Partial<Omit<LeaderboardEntryRow, 'id'>> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
