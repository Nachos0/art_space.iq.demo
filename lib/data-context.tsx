"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { 
  getArtworks, createArtwork, updateArtwork, deleteArtwork,
  getEvents, createEvent, updateEvent, deleteEvent,
  getCafeItems, createCafeItem, updateCafeItem, deleteCafeItem,
  updateHours
} from "./supabase-service"
import { Event, Artwork, CafeItem, Hours } from "./types"

// Define OpeningHours type for backward compatibility
export type OpeningHours = Hours

interface SiteDataContextType {
  events: Event[]
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
  addEvent: (event: Omit<Event, 'id'>) => Promise<Event | null>
  removeEvent: (id: string) => Promise<void>
  
  artworks: Artwork[]
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>
  addArtwork: (artwork: Omit<Artwork, 'id'>) => Promise<Artwork | null>
  removeArtwork: (id: string) => Promise<void>
  toggleArtworkFeatured: (id: string, featured: boolean) => Promise<void>
  
  cafeItems: CafeItem[]
  setCafeItems: React.Dispatch<React.SetStateAction<CafeItem[]>>
  addCafeItem: (item: Omit<CafeItem, 'id'>) => Promise<CafeItem | null>
  removeCafeItem: (id: string) => Promise<void>
  
  openingHours: OpeningHours
  setOpeningHours: React.Dispatch<React.SetStateAction<OpeningHours>>
  updateOpeningHours: (hours: OpeningHours) => Promise<boolean>
  isLoading: boolean
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined)

// Default data
const defaultEvents: Event[] = [
  {
    id: "1",
    title: "New Exhibition Opening",
    date: "2025-05-15",
    time: "19:00 - 22:00",
    description: "Join us for the opening night of our new exhibition featuring local artists.",
    image: "/placeholder.svg?height=400&width=600&text=Exhibition"
  },
  {
    id: "2",
    title: "Watercolor Workshop",
    date: "2025-05-22",
    time: "14:00 - 17:00",
    description: "Learn watercolor techniques from professional artists.",
    image: "/placeholder.svg?height=400&width=600&text=Workshop"
  }
]

const defaultArtworks: Artwork[] = [
  {
    id: "1",
    title: "Desert Sunrise",
    artist: "Ahmed Ali",
    description: "A beautiful depiction of a desert sunrise with vibrant colors.",
    image: "/placeholder.svg?height=600&width=800&text=Artwork 1",
    featured: true
  },
  {
    id: "2",
    title: "Urban Life",
    artist: "Sara Johnson",
    description: "A portrayal of modern urban life and its complexities.",
    image: "/placeholder.svg?height=600&width=800&text=Artwork 2",
    featured: true
  }
]

const defaultCafeItems: CafeItem[] = [
  {
    id: "1",
    name: "Specialty Coffee",
    category: "drink",
    price: 15,
    description: "Expertly crafted espresso drinks made with locally roasted beans."
  },
  {
    id: "2",
    name: "Artisanal Pastries",
    category: "food",
    price: 20,
    description: "Freshly baked goods made in-house daily using traditional recipes."
  }
]

const defaultOpeningHours: OpeningHours = {
  sunday: { open: "10:00 AM", close: "4:00 PM", closed: false },
  monday: { open: "9:00 AM", close: "5:00 PM", closed: false },
  tuesday: { open: "9:00 AM", close: "5:00 PM", closed: false },
  wednesday: { open: "9:00 AM", close: "5:00 PM", closed: false },
  thursday: { open: "9:00 AM", close: "5:00 PM", closed: false },
  friday: { open: "9:00 AM", close: "8:00 PM", closed: false },
  saturday: { open: "10:00 AM", close: "6:00 PM", closed: false }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  // Initialize state with default data, will be replaced with DB data
  const [events, setEvents] = useState<Event[]>(defaultEvents)
  const [artworks, setArtworks] = useState<Artwork[]>(defaultArtworks)
  const [cafeItems, setCafeItems] = useState<CafeItem[]>(defaultCafeItems)
  const [openingHours, setOpeningHours] = useState<OpeningHours>(defaultOpeningHours)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Ensure localStorage has default data for failsafe operation
  useEffect(() => {
    // Ensure localStorage has default data
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          // Initialize default data to localStorage if empty
          if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify(defaultEvents));
          }
          if (!localStorage.getItem('artworks')) {
            localStorage.setItem('artworks', JSON.stringify(defaultArtworks));
          }
          if (!localStorage.getItem('cafeItems')) {
            localStorage.setItem('cafeItems', JSON.stringify(defaultCafeItems));
          }
          if (!localStorage.getItem('site_opening_hours')) {
            localStorage.setItem('site_opening_hours', JSON.stringify(defaultOpeningHours));
          }
        } catch (e) {
          console.error('Error accessing localStorage:', e);
        }
      }
    } catch (error) {
      console.error('Error initializing localStorage:', error);
    }
  }, []);

  // Load data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      
      // Helper function to fallback to localStorage
      const fallbackToLocalStorage = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            const storedArtworks = localStorage.getItem('artworks')
            if (storedArtworks) setArtworks(JSON.parse(storedArtworks))
            
            const storedEvents = localStorage.getItem('events')
            if (storedEvents) setEvents(JSON.parse(storedEvents))
            
            const storedCafeItems = localStorage.getItem('cafeItems')
            if (storedCafeItems) setCafeItems(JSON.parse(storedCafeItems))
          } catch (e) {
            console.error('Error reading from localStorage:', e);
          }
        }
      }
      
      try {
        // Initialize localStorage with default data if empty
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            if (!localStorage.getItem('events')) {
              localStorage.setItem('events', JSON.stringify(defaultEvents));
            }
            if (!localStorage.getItem('artworks')) {
              localStorage.setItem('artworks', JSON.stringify(defaultArtworks));
            }
            if (!localStorage.getItem('cafeItems')) {
              localStorage.setItem('cafeItems', JSON.stringify(defaultCafeItems));
            }
            if (!localStorage.getItem('site_opening_hours')) {
              localStorage.setItem('site_opening_hours', JSON.stringify(defaultOpeningHours));
            }
          } catch (e) {
            console.error('Error accessing localStorage:', e);
          }
        }

        // Fetch all data from Supabase
        let artworksData: Artwork[] = [];
        let eventsData: Event[] = [];
        let cafeItemsData: CafeItem[] = [];
        
        try {
          // Use Promise.allSettled to prevent one failed request from blocking others
          const results = await Promise.allSettled([
            getArtworks(),
            getEvents(),
            getCafeItems()
          ]);
          
          // Handle each result separately
          if (results[0].status === 'fulfilled') {
            artworksData = results[0].value;
          } else {
            console.warn('Error fetching artworks:', results[0].reason);
          }
          
          if (results[1].status === 'fulfilled') {
            eventsData = results[1].value;
          } else {
            console.warn('Error fetching events:', results[1].reason);
          }
          
          if (results[2].status === 'fulfilled') {
            cafeItemsData = results[2].value;
          } else {
            console.warn('Error fetching cafe items:', results[2].reason);
          }
          
          // Update state with data from Supabase if available
          if (artworksData && artworksData.length > 0) setArtworks(artworksData);
          if (eventsData && eventsData.length > 0) setEvents(eventsData);
          if (cafeItemsData && cafeItemsData.length > 0) setCafeItems(cafeItemsData);
          
        } catch (error) {
          console.error('Error fetching data from Supabase:', error);
          // Fall back to localStorage if needed
          fallbackToLocalStorage();
        }
        
        // Get opening hours from localStorage for now (can be moved to Supabase later)
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            const storedOpeningHours = localStorage.getItem('site_opening_hours')
            if (storedOpeningHours) setOpeningHours(JSON.parse(storedOpeningHours))
          } catch (e) {
            console.error('Error reading opening hours from localStorage:', e);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
        // Ensure we have data by using defaults if necessary
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            const storedArtworks = localStorage.getItem('artworks')
            if (storedArtworks) setArtworks(JSON.parse(storedArtworks))
            else setArtworks(defaultArtworks)
            
            const storedEvents = localStorage.getItem('events')
            if (storedEvents) setEvents(JSON.parse(storedEvents))
            else setEvents(defaultEvents)
            
            const storedCafeItems = localStorage.getItem('cafeItems')
            if (storedCafeItems) setCafeItems(JSON.parse(storedCafeItems))
            else setCafeItems(defaultCafeItems)
            
            const storedOpeningHours = localStorage.getItem('site_opening_hours')
            if (storedOpeningHours) setOpeningHours(JSON.parse(storedOpeningHours))
            else setOpeningHours(defaultOpeningHours)
          } catch (e) {
            console.error('Error reading from localStorage:', e);
            // Use defaults if localStorage fails
            setArtworks(defaultArtworks)
            setEvents(defaultEvents)
            setCafeItems(defaultCafeItems)
            setOpeningHours(defaultOpeningHours)
          }
        } else {
          // If we're in an environment where localStorage isn't available, use defaults
          setArtworks(defaultArtworks)
          setEvents(defaultEvents)
          setCafeItems(defaultCafeItems)
          setOpeningHours(defaultOpeningHours)
        }
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Save opening hours to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('site_opening_hours', JSON.stringify(openingHours))
      } catch (e) {
        console.error('Error saving opening hours to localStorage:', e);
      }
    }
  }, [openingHours])
  
  // Function to add a new event
  const addEvent = async (event: Omit<Event, 'id'>) => {
    try {
      const newEvent = await createEvent(event)
      if (newEvent) {
        setEvents(prev => [...prev, newEvent])
        return newEvent
      }
      return null
    } catch (error) {
      console.error('Error adding event:', error)
      // Even if there's an error, try to create the event in localStorage directly
      const storedEvents = localStorage.getItem('events') || '[]'
      const events = JSON.parse(storedEvents)
      const newId = events.length ? String(Math.max(...events.map((e: any) => parseInt(e.id))) + 1) : "1"
      const newEvent = {
        ...event,
        id: newId
      } as Event
      events.push(newEvent)
      localStorage.setItem('events', JSON.stringify(events))
      
      // Update state
      setEvents(prev => [...prev, newEvent])
      return newEvent
    }
  }
  
  // Function to remove an event
  const removeEvent = async (id: string) => {
    try {
      const success = await deleteEvent(id)
      if (success) {
        setEvents(prev => prev.filter(event => event.id !== id))
      }
    } catch (error) {
      console.error('Error removing event:', error)
    }
  }
  
  // Function to add a new artwork
  const addArtwork = async (artwork: Omit<Artwork, 'id'>) => {
    try {
      const newArtwork = await createArtwork(artwork)
      if (newArtwork) {
        setArtworks(prev => [...prev, newArtwork])
        return newArtwork
      }
      return null
    } catch (error) {
      console.error('Error adding artwork:', error)
      // Even if there's an error, try to create the artwork in localStorage directly
      const storedArtworks = localStorage.getItem('artworks') || '[]'
      const artworks = JSON.parse(storedArtworks)
      const newId = artworks.length ? String(Math.max(...artworks.map((a: any) => parseInt(a.id))) + 1) : "1"
      const newArtwork = {
        ...artwork,
        id: newId
      } as Artwork
      artworks.push(newArtwork)
      localStorage.setItem('artworks', JSON.stringify(artworks))
      
      // Update state
      setArtworks(prev => [...prev, newArtwork])
      return newArtwork
    }
  }
  
  // Function to remove an artwork
  const removeArtwork = async (id: string) => {
    try {
      const success = await deleteArtwork(id)
      if (success) {
        setArtworks(prev => prev.filter(artwork => artwork.id !== id))
      }
    } catch (error) {
      console.error('Error removing artwork:', error)
    }
  }
  
  // Function to toggle featured status of an artwork
  const toggleArtworkFeatured = async (id: string, featured: boolean) => {
    try {
      const artwork = artworks.find(a => a.id === id)
      if (!artwork) return
      
      const updatedArtwork = await updateArtwork({...artwork, featured})
      if (updatedArtwork) {
        setArtworks(prev => 
          prev.map(artwork => 
            artwork.id === id ? { ...artwork, featured } : artwork
          )
        )
      }
    } catch (error) {
      console.error('Error toggling artwork featured status:', error)
    }
  }
  
  // Function to add a new cafe item
  const addCafeItem = async (item: Omit<CafeItem, 'id'>) => {
    try {
      const newItem = await createCafeItem(item)
      if (newItem) {
        setCafeItems(prev => [...prev, newItem])
        return newItem
      }
      return null
    } catch (error) {
      console.error('Error adding cafe item:', error)
      // Even if there's an error, try to create the item in localStorage directly
      const storedCafeItems = localStorage.getItem('cafeItems') || '[]'
      const cafeItems = JSON.parse(storedCafeItems)
      const newId = cafeItems.length ? String(Math.max(...cafeItems.map((i: any) => parseInt(i.id))) + 1) : "1"
      const newItem = {
        ...item,
        id: newId
      } as CafeItem
      cafeItems.push(newItem)
      localStorage.setItem('cafeItems', JSON.stringify(cafeItems))
      
      // Update state
      setCafeItems(prev => [...prev, newItem])
      return newItem
    }
  }
  
  // Function to remove a cafe item
  const removeCafeItem = async (id: string) => {
    try {
      const success = await deleteCafeItem(id)
      if (success) {
        setCafeItems(prev => prev.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Error removing cafe item:', error)
    }
  }

  // Function to update opening hours
  const updateOpeningHours = async (hours: OpeningHours) => {
    try {
      const success = await updateHours(hours)
      if (success) {
        setOpeningHours(hours)
        // Also update in localStorage as a backup
        localStorage.setItem('site_opening_hours', JSON.stringify(hours))
      }
      return success
    } catch (error) {
      console.error('Error updating opening hours:', error)
      // Update in localStorage anyway
      localStorage.setItem('site_opening_hours', JSON.stringify(hours))
      setOpeningHours(hours)
      return true
    }
  }

  return (
    <SiteDataContext.Provider 
      value={{ 
        events, 
        setEvents,
        addEvent,
        removeEvent,
        artworks, 
        setArtworks,
        addArtwork,
        removeArtwork,
        toggleArtworkFeatured,
        cafeItems, 
        setCafeItems,
        addCafeItem,
        removeCafeItem,
        openingHours, 
        setOpeningHours,
        updateOpeningHours,
        isLoading
      }}
    >
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider')
  }
  return context
} 