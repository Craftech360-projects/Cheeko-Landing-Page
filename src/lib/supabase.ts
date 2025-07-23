import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type NewsletterSubscription = {
  id?: string
  email: string
  subscribed_at?: string
  source?: string
  tags?: string[]
  ip_address?: string
  user_agent?: string
  created_at?: string
  updated_at?: string
}