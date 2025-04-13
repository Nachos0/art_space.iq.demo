import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fulmxgowiicnjcjpnkhk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1bG14Z293aWljbmpjanBua2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDQxMTksImV4cCI6MjA1OTk4MDExOX0.LMKLofWtz8rZN0M4e1PKq-Jcjsv7-QdcEDPzpKs7I1E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
}) 