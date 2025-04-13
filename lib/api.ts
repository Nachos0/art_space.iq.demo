import { supabase } from './supabase'
import { Event, Artwork, CafeItem, Hours } from '@/lib/types'

// Event functions
export async function addEvent(event: Omit<Event, 'id'>) {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select();
  
  if (error) throw error;
  return data?.[0];
}

export async function removeEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Artwork functions
export async function addArtwork(artwork: Omit<Artwork, 'id'>) {
  const { data, error } = await supabase
    .from('artworks')
    .insert([artwork])
    .select();
  
  if (error) throw error;
  return data?.[0];
}

export async function removeArtwork(id: string) {
  const { error } = await supabase
    .from('artworks')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

export async function toggleArtworkFeatured(id: string, featured: boolean) {
  const { error } = await supabase
    .from('artworks')
    .update({ featured })
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Cafe Item functions
export async function addCafeItem(item: Omit<CafeItem, 'id'>) {
  const { data, error } = await supabase
    .from('cafe_items')
    .insert([item])
    .select();
  
  if (error) throw error;
  return data?.[0];
}

export async function removeCafeItem(id: string) {
  const { error } = await supabase
    .from('cafe_items')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Hours functions
export async function updateHours(hours: Hours) {
  const { error } = await supabase
    .from('hours')
    .update(hours)
    .eq('id', 'main');
  
  if (error) throw error;
  return true;
}

// Fallback functions for when Supabase is not configured
// These use localStorage for persistence, similar to the current implementation
export function fallbackAddEvent(event: Event) {
  const eventsStr = localStorage.getItem('events') || '[]';
  const events = JSON.parse(eventsStr);
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
  return event;
}

export function fallbackRemoveEvent(id: string) {
  const eventsStr = localStorage.getItem('events') || '[]';
  const events = JSON.parse(eventsStr);
  const filtered = events.filter((e: Event) => e.id !== id);
  localStorage.setItem('events', JSON.stringify(filtered));
  return true;
}

export function fallbackAddArtwork(artwork: Artwork) {
  const artworksStr = localStorage.getItem('artworks') || '[]';
  const artworks = JSON.parse(artworksStr);
  artworks.push(artwork);
  localStorage.setItem('artworks', JSON.stringify(artworks));
  return artwork;
}

export function fallbackRemoveArtwork(id: string) {
  const artworksStr = localStorage.getItem('artworks') || '[]';
  const artworks = JSON.parse(artworksStr);
  const filtered = artworks.filter((a: Artwork) => a.id !== id);
  localStorage.setItem('artworks', JSON.stringify(filtered));
  return true;
}

export function fallbackToggleArtworkFeatured(id: string, featured: boolean) {
  const artworksStr = localStorage.getItem('artworks') || '[]';
  const artworks = JSON.parse(artworksStr);
  const updated = artworks.map((a: Artwork) => 
    a.id === id ? { ...a, featured } : a
  );
  localStorage.setItem('artworks', JSON.stringify(updated));
  return true;
}

export function fallbackAddCafeItem(item: CafeItem) {
  const itemsStr = localStorage.getItem('cafeItems') || '[]';
  const items = JSON.parse(itemsStr);
  items.push(item);
  localStorage.setItem('cafeItems', JSON.stringify(items));
  return item;
}

export function fallbackRemoveCafeItem(id: string) {
  const itemsStr = localStorage.getItem('cafeItems') || '[]';
  const items = JSON.parse(itemsStr);
  const filtered = items.filter((i: CafeItem) => i.id !== id);
  localStorage.setItem('cafeItems', JSON.stringify(filtered));
  return true;
}

export function fallbackUpdateHours(hours: Hours) {
  localStorage.setItem('hours', JSON.stringify(hours));
  return true;
} 