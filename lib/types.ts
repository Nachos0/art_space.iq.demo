export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  featured?: boolean;
  type?: string;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  medium?: string;
  description: string;
  image: string;
  featured: boolean;
}

export interface CafeItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'drink' | 'food' | 'dessert';
  image?: string;
}

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface Hours {
  sunday: DayHours;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
}

export interface AppData {
  events: Event[];
  artworks: Artwork[];
  cafeItems: CafeItem[];
  hours: Hours;
} 