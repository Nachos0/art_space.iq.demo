import { supabase } from './supabase'
import { Event, Artwork, CafeItem, Hours } from './types'

/**
 * Migrates all data from localStorage to Supabase
 */
export async function migrateLocalStorageToSupabase() {
  try {
    await Promise.all([
      migrateEvents(),
      migrateArtworks(),
      migrateCafeItems(),
      migrateHours()
    ])
    return { success: true, message: 'All data migrated successfully' }
  } catch (error: any) {
    console.error('Migration error:', error)
    return { success: false, message: error.message || 'Unknown error' }
  }
}

/**
 * Migrates events from localStorage to Supabase
 */
async function migrateEvents() {
  try {
    // Get events from localStorage
    const eventsStr = localStorage.getItem('events') || '[]'
    const events: Event[] = JSON.parse(eventsStr)
    
    if (events.length === 0) {
      return { success: true, message: 'No events to migrate' }
    }
    
    // Prepare events for insertion by removing the id field (Supabase will generate new ones)
    const preparedEvents = events.map(({ id, ...rest }: any) => rest)
    
    // Insert events into Supabase
    const { data, error } = await supabase
      .from('events')
      .insert(preparedEvents)
      .select()
    
    if (error) throw error
    
    return { success: true, message: `Migrated ${data.length} events` }
  } catch (error: any) {
    console.error('Error migrating events:', error)
    throw new Error(`Error migrating events: ${error.message}`)
  }
}

/**
 * Migrates artworks from localStorage to Supabase
 */
async function migrateArtworks() {
  try {
    // Get artworks from localStorage
    const artworksStr = localStorage.getItem('artworks') || '[]'
    const artworks: Artwork[] = JSON.parse(artworksStr)
    
    if (artworks.length === 0) {
      return { success: true, message: 'No artworks to migrate' }
    }
    
    // Prepare artworks for insertion by removing the id field
    const preparedArtworks = artworks.map(({ id, ...rest }: any) => rest)
    
    // Insert artworks into Supabase
    const { data, error } = await supabase
      .from('artworks')
      .insert(preparedArtworks)
      .select()
    
    if (error) throw error
    
    return { success: true, message: `Migrated ${data.length} artworks` }
  } catch (error: any) {
    console.error('Error migrating artworks:', error)
    throw new Error(`Error migrating artworks: ${error.message}`)
  }
}

/**
 * Migrates cafe items from localStorage to Supabase
 */
async function migrateCafeItems() {
  try {
    // Get cafe items from localStorage
    const cafeItemsStr = localStorage.getItem('cafeItems') || '[]'
    const cafeItems: CafeItem[] = JSON.parse(cafeItemsStr)
    
    if (cafeItems.length === 0) {
      return { success: true, message: 'No cafe items to migrate' }
    }
    
    // Prepare cafe items for insertion by removing the id field
    const preparedCafeItems = cafeItems.map(({ id, ...rest }: any) => rest)
    
    // Insert cafe items into Supabase
    const { data, error } = await supabase
      .from('cafe_items')
      .insert(preparedCafeItems)
      .select()
    
    if (error) throw error
    
    return { success: true, message: `Migrated ${data.length} cafe items` }
  } catch (error: any) {
    console.error('Error migrating cafe items:', error)
    throw new Error(`Error migrating cafe items: ${error.message}`)
  }
}

/**
 * Migrates hours from localStorage to Supabase
 */
async function migrateHours() {
  try {
    // Get hours from localStorage
    const hoursStr = localStorage.getItem('hours') || '{}'
    const hours: Hours = JSON.parse(hoursStr)
    
    if (Object.keys(hours).length === 0) {
      return { success: true, message: 'No hours to migrate' }
    }
    
    // Check if hours table exists and create if needed
    const { error: checkError } = await supabase
      .from('hours')
      .select('id')
      .eq('id', 'main')
      .single()
    
    if (checkError) {
      // Create hours table entry
      const { error } = await supabase
        .from('hours')
        .insert({ id: 'main', ...hours })
      
      if (error) throw error
    } else {
      // Update existing hours
      const { error } = await supabase
        .from('hours')
        .update(hours)
        .eq('id', 'main')
      
      if (error) throw error
    }
    
    return { success: true, message: 'Hours migrated' }
  } catch (error: any) {
    console.error('Error migrating hours:', error)
    throw new Error(`Error migrating hours: ${error.message}`)
  }
} 