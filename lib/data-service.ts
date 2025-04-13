import { AppData, Event, Artwork, CafeItem, Hours } from './types'

const STORAGE_KEY = 'art-cafe-data'

// Initialize default data structure
const defaultData: AppData = {
  events: [],
  artworks: [],
  cafeItems: [],
  hours: {
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '10:00', close: '20:00', closed: false },
    sunday: { open: '10:00', close: '16:00', closed: false }
  }
}

// Helper function to get data from localStorage
export function getData(): AppData {
  if (typeof window === 'undefined') return defaultData
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : defaultData
}

// Helper function to save data to localStorage
function saveData(data: AppData) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Events
export async function getEvents(): Promise<Event[]> {
  return getData().events
}

export async function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const data = getData()
  const newEvent = { ...event, id: Date.now().toString() }
  data.events.push(newEvent)
  saveData(data)
  return newEvent
}

export async function updateEvent(id: string, event: Partial<Event>): Promise<Event> {
  const data = getData()
  const index = data.events.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Event not found')
  data.events[index] = { ...data.events[index], ...event }
  saveData(data)
  return data.events[index]
}

export async function deleteEvent(id: string): Promise<void> {
  const data = getData()
  data.events = data.events.filter(e => e.id !== id)
  saveData(data)
}

// Artworks
export async function getArtworks(): Promise<Artwork[]> {
  return getData().artworks
}

export async function createArtwork(artwork: Omit<Artwork, 'id'>): Promise<Artwork> {
  const data = getData()
  const newArtwork = { ...artwork, id: Date.now().toString() }
  data.artworks.push(newArtwork)
  saveData(data)
  return newArtwork
}

export async function updateArtwork(id: string, artwork: Partial<Artwork>): Promise<Artwork> {
  const data = getData()
  const index = data.artworks.findIndex(a => a.id === id)
  if (index === -1) throw new Error('Artwork not found')
  data.artworks[index] = { ...data.artworks[index], ...artwork }
  saveData(data)
  return data.artworks[index]
}

export async function deleteArtwork(id: string): Promise<void> {
  const data = getData()
  data.artworks = data.artworks.filter(a => a.id !== id)
  saveData(data)
}

// Cafe Items
export async function getCafeItems(): Promise<CafeItem[]> {
  return getData().cafeItems
}

export async function createCafeItem(item: Omit<CafeItem, 'id'>): Promise<CafeItem> {
  const data = getData()
  const newItem = { ...item, id: Date.now().toString() }
  data.cafeItems.push(newItem)
  saveData(data)
  return newItem
}

export async function updateCafeItem(id: string, item: Partial<CafeItem>): Promise<CafeItem> {
  const data = getData()
  const index = data.cafeItems.findIndex(i => i.id === id)
  if (index === -1) throw new Error('Cafe item not found')
  data.cafeItems[index] = { ...data.cafeItems[index], ...item }
  saveData(data)
  return data.cafeItems[index]
}

export async function deleteCafeItem(id: string): Promise<void> {
  const data = getData()
  data.cafeItems = data.cafeItems.filter(i => i.id !== id)
  saveData(data)
}

// Hours
export async function getHours(): Promise<Hours> {
  return getData().hours
}

export async function updateHours(hours: Hours): Promise<Hours> {
  const data = getData()
  data.hours = hours
  saveData(data)
  return hours
} 