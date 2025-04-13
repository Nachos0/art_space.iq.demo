import { supabase } from './supabase'
import { Event, Artwork, CafeItem, Hours, AppData } from './types'

// Initialize tables if they don't exist
export async function initializeSupabaseTables() {
  try {
    // Enable UUID extension if not already enabled
    await supabase.rpc('exec_sql', {
      query: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    })

    // Create events table
    await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          description TEXT,
          date TEXT NOT NULL,
          time TEXT,
          image TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    // Create artworks table with explicit featured default
    await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS artworks (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          artist TEXT NOT NULL,
          description TEXT,
          medium TEXT,
          image TEXT,
          featured BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    // Create cafe_items table
    await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS cafe_items (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          description TEXT,
          price NUMERIC,
          category TEXT,
          image TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    // Create hours table
    await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS hours (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          monday JSONB,
          tuesday JSONB,
          wednesday JSONB,
          thursday JSONB,
          friday JSONB,
          saturday JSONB,
          sunday JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    // Insert default hours if not exists
    const { data: existingHours } = await supabase.from('hours').select('*')
    if (!existingHours || existingHours.length === 0) {
      await supabase.from('hours').insert([{
        monday: { open: '09:00', close: '18:00', closed: false },
        tuesday: { open: '09:00', close: '18:00', closed: false },
        wednesday: { open: '09:00', close: '18:00', closed: false },
        thursday: { open: '09:00', close: '18:00', closed: false },
        friday: { open: '09:00', close: '18:00', closed: false },
        saturday: { open: '10:00', close: '20:00', closed: false },
        sunday: { open: '10:00', close: '16:00', closed: false }
      }])
    }

    return { success: true, message: 'Database initialized successfully' }
  } catch (error) {
    console.error('Error initializing database:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to initialize database' 
    }
  }
}

// Events
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) throw error
  return data || []
}

export async function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateEvent(id: string, event: Partial<Event>): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Artworks
export async function getArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createArtwork(artwork: Omit<Artwork, 'id'>): Promise<Artwork> {
  const { data, error } = await supabase
    .from('artworks')
    .insert([artwork])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateArtwork(id: string, artwork: Partial<Artwork>): Promise<Artwork> {
  const { data, error } = await supabase
    .from('artworks')
    .update(artwork)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteArtwork(id: string): Promise<void> {
  const { error } = await supabase
    .from('artworks')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Cafe Items
export async function getCafeItems(): Promise<CafeItem[]> {
  const { data, error } = await supabase
    .from('cafe_items')
    .select('*')
    .order('category', { ascending: true })

  if (error) throw error
  return data || []
}

export async function createCafeItem(item: Omit<CafeItem, 'id'>): Promise<CafeItem> {
  const { data, error } = await supabase
    .from('cafe_items')
    .insert([item])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCafeItem(id: string, item: Partial<CafeItem>): Promise<CafeItem> {
  const { data, error } = await supabase
    .from('cafe_items')
    .update(item)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCafeItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('cafe_items')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Hours
export async function getHours(): Promise<Hours> {
  const { data, error } = await supabase
    .from('hours')
    .select('*')
    .single()

  if (error) throw error
  if (!data) throw new Error('Hours not found')
  
  const { id, created_at, ...hours } = data
  return hours as Hours
}

export async function updateHours(hours: Hours): Promise<Hours> {
  const { data, error } = await supabase
    .from('hours')
    .update(hours)
    .eq('id', '1')
    .select()
    .single()

  if (error) throw error
  const { id, created_at, ...updatedHours } = data
  return updatedHours as Hours
}

// Execute raw SQL (for admin purposes)
export async function exec_sql(query: string) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { query })
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('SQL execution error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to execute SQL' 
    }
  }
} 