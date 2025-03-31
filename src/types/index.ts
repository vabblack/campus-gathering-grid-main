export type UserRole = 'student' | 'organizer' | 'admin' | 'sponsor';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: EventCategory;
  image: string;
  ticketPrice: number;
  featured: boolean;
}

export type EventCategory = 
  | 'All'
  | 'Academic'
  | 'Social'
  | 'Cultural'
  | 'Sports'
  | 'Career'
  | 'Workshop'
  | 'Concert';
