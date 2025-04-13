import { Artwork, CafeItem, Event, Hours } from './types'

// Default events
export const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'Spring Exhibition Opening',
    date: '2024-06-01',
    time: '19:00 - 22:00',
    description: 'Join us for the opening night of our new spring exhibition featuring local artists.',
    image: '/placeholder.svg?height=400&width=600&text=Spring+Exhibition',
    type: 'exhibition',
    featured: true
  },
  {
    id: '2',
    title: 'Watercolor Workshop',
    date: '2024-06-15',
    time: '14:00 - 17:00',
    description: 'Learn watercolor techniques from professional artist Sara Ahmad.',
    image: '/placeholder.svg?height=400&width=600&text=Watercolor+Workshop',
    type: 'workshop',
    featured: false
  },
  {
    id: '3',
    title: 'Artist Talk: Modern Arabic Art',
    date: '2024-06-22',
    time: '18:00 - 20:00',
    description: 'A conversation with renowned artist Mohammed Al-Hawajri about contemporary Arabic art.',
    image: '/placeholder.svg?height=400&width=600&text=Artist+Talk',
    type: 'talk',
    featured: true
  }
]

// Default artworks
export const defaultArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Desert Sunrise',
    artist: 'Ahmed Ali',
    medium: 'Oil on Canvas',
    description: 'A beautiful depiction of a desert sunrise with vibrant colors, capturing the essence of the Arabian landscape at dawn.',
    image: '/placeholder.svg?height=600&width=800&text=Desert+Sunrise',
    featured: true
  },
  {
    id: '2',
    title: 'Urban Life',
    artist: 'Sara Johnson',
    medium: 'Mixed Media',
    description: 'A portrayal of modern urban life in Arab cities and its complexities, blending traditional elements with contemporary themes.',
    image: '/placeholder.svg?height=600&width=800&text=Urban+Life',
    featured: true
  },
  {
    id: '3',
    title: 'Seaside Dream',
    artist: 'Khalid Rahman',
    medium: 'Acrylic on Canvas',
    description: 'An abstract representation of the Red Sea coastline, showcasing the beautiful blues and greens of the water.',
    image: '/placeholder.svg?height=600&width=800&text=Seaside+Dream',
    featured: false
  }
]

// Default cafe items
export const defaultCafeItems: CafeItem[] = [
  {
    id: '1',
    name: 'Arabic Coffee',
    category: 'drink',
    price: 15,
    description: 'Traditional Arabic coffee with cardamom, served in a small cup.'
  },
  {
    id: '2',
    name: 'Date Muffin',
    category: 'food',
    price: 12,
    description: 'Freshly baked muffins made with locally sourced dates and walnuts.'
  },
  {
    id: '3',
    name: 'Espresso',
    category: 'drink',
    price: 10,
    description: 'Rich espresso made with our special blend of locally roasted beans.'
  },
  {
    id: '4',
    name: 'Za\'atar Manakish',
    category: 'food',
    price: 18,
    description: 'Traditional flatbread topped with za\'atar spice blend and olive oil.'
  },
  {
    id: '5',
    name: 'Kunafa',
    category: 'dessert',
    price: 20,
    description: 'Traditional Middle Eastern dessert made with thin noodle-like pastry, soaked in sweet syrup.'
  }
]

// Default opening hours
export const defaultOpeningHours: Hours = {
  sunday: { open: '10:00 AM', close: '6:00 PM', closed: false },
  monday: { open: '9:00 AM', close: '5:00 PM', closed: false },
  tuesday: { open: '9:00 AM', close: '5:00 PM', closed: false },
  wednesday: { open: '9:00 AM', close: '5:00 PM', closed: false },
  thursday: { open: '9:00 AM', close: '5:00 PM', closed: false },
  friday: { open: '9:00 AM', close: '10:00 PM', closed: false },
  saturday: { open: '10:00 AM', close: '10:00 PM', closed: false }
} 