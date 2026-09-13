export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string;
          role?: 'user' | 'admin';
          updated_at?: string;
        };
        Relationships: [];
      };
      plans: {
        Row: {
          id: 'full' | 'pro' | 'annual';
          name: string;
          duration_days: number;
          price_cents: number;
          currency: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: 'full' | 'pro' | 'annual';
          name: string;
          duration_days: number;
          price_cents: number;
          currency?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          duration_days?: number;
          price_cents?: number;
          currency?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: 'full' | 'pro' | 'annual';
          status: 'active' | 'pending' | 'expired' | 'canceled';
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          stripe_checkout_session_id: string | null;
          started_at: string;
          expires_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_id: 'full' | 'pro' | 'annual';
          status?: 'active' | 'pending' | 'expired' | 'canceled';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_checkout_session_id?: string | null;
          started_at?: string;
          expires_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          plan_id?: 'full' | 'pro' | 'annual';
          status?: 'active' | 'pending' | 'expired' | 'canceled';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_checkout_session_id?: string | null;
          started_at?: string;
          expires_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      whatsapp_connections: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          instance_name: string | null;
          status: 'connected' | 'disconnected' | 'pending';
          is_backup: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          instance_name?: string | null;
          status?: 'connected' | 'disconnected' | 'pending';
          is_backup?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          instance_name?: string | null;
          status?: 'connected' | 'disconnected' | 'pending';
          is_backup?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      groups: {
        Row: { id: string; user_id: string; name: string; created_at: string; updated_at: string };
        Insert: { id?: string; user_id: string; name: string; created_at?: string; updated_at?: string };
        Update: { name?: string; updated_at?: string };
        Relationships: [];
      };
      offers: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          url: string | null;
          price_cents: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          url?: string | null;
          price_cents?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: { title?: string; url?: string | null; price_cents?: number | null; updated_at?: string };
        Relationships: [];
      };
      dispatches: {
        Row: {
          id: string;
          user_id: string;
          offer_id: string | null;
          group_id: string | null;
          status: 'scheduled' | 'sent' | 'failed' | 'canceled';
          scheduled_at: string | null;
          sent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          offer_id?: string | null;
          group_id?: string | null;
          status?: 'scheduled' | 'sent' | 'failed' | 'canceled';
          scheduled_at?: string | null;
          sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          offer_id?: string | null;
          group_id?: string | null;
          status?: 'scheduled' | 'sent' | 'failed' | 'canceled';
          scheduled_at?: string | null;
          sent_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: 'user' | 'admin';
      subscription_status: 'active' | 'pending' | 'expired' | 'canceled';
      whatsapp_connection_status: 'connected' | 'disconnected' | 'pending';
      dispatch_status: 'scheduled' | 'sent' | 'failed' | 'canceled';
    };
    CompositeTypes: Record<string, never>;
  };
};
