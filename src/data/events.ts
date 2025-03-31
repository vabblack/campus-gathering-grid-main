import { Event, EventCategory } from '@/types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Symposium',
    description: 'Join us for the biggest tech event of the year featuring guest speakers from leading tech companies.',
    date: '2023-11-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Lovely Unipolis (Block 12)',
    organizer: 'Computer Science Club',
    category: 'Academic' as EventCategory,
    image: 'https://happenings.lpu.in/wp-content/uploads/2024/08/LPU-Pro-Chancellor-Rashmi-Mittal-is-interacting-with-the-students-during-freshman-induction-program-at-LPU-campus-scaled.jpg',
    ticketPrice: 1150,
    featured: true
  },
  {
    id: '2',
    title: 'Spring Music Festival',
    description: 'Annual music festival featuring performances from student bands and a headliner concert.',
    date: '2023-04-22',
    time: '5:00 PM - 11:00 PM',
    location: 'Shanti Devi Mittal Auditorium',
    organizer: 'Student Activities Board',
    category: 'Concert' as EventCategory,
    image: 'https://happenings.lpu.in/wp-content/uploads/2022/09/DSC00187-scaled.jpg',
    ticketPrice: 2500,
    featured: true
  },
  {
    id: '3',
    title: 'Career Fair 2023',
    description: 'Connect with employers from various industries for internship and job opportunities.',
    date: '2023-10-05',
    time: '11:00 AM - 3:00 PM',
    location: 'Student Union Grand Ballroom',
    organizer: 'Career Services Center',
    category: 'Career' as EventCategory,
    image: 'https://images.unsplash.com/photo-1577896852618-01da1afc6f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ticketPrice: 0,
    featured: false
  },
  {
    id: '4',
    title: 'Cultural Diversity Festival',
    description: 'Celebrate the diversity of our campus community with food, performances, and activities.',
    date: '2023-03-18',
    time: '12:00 PM - 6:00 PM',
    location: 'Shanti Devi Mittal Auditorium',
    organizer: 'Multicultural Student Association',
    category: 'Cultural' as EventCategory,
    image: 'https://happenings.lpu.in/wp-content/uploads/2024/04/Students-performing-cultural-dance-and-showcasing-tableau-of-various-regions-during-One-India-2024-cultural-fest-at-LPU-campus-1-scaled.jpg',
    ticketPrice: 500,
    featured: true
  },
  {
    id: '5',
    title: 'Basketball Tournament',
    description: 'Intramural basketball tournament open to all students. Form your team and register today!',
    date: '2023-02-10',
    time: '9:00 AM - 5:00 PM',
    location: 'Recreation Center Courts',
    organizer: 'Campus Recreation',
    category: 'Sports' as EventCategory,
    image: 'https://happenings.lpu.in/wp-content/uploads/2019/08/Basketball6.jpg',
    ticketPrice: 10,
    featured: false
  },
  {
    id: '6',
    title: 'Resume Writing Workshop',
    description: 'Learn how to craft an effective resume that stands out to employers.',
    date: '2023-09-28',
    time: '2:00 PM - 4:00 PM',
    location: 'Library Learning Commons',
    organizer: 'Career Services Center',
    category: 'Workshop' as EventCategory,
    image: 'https://images.unsplash.com/photo-1520583457224-aee11bad5112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    ticketPrice: 0,
    featured: false
  },
  {
    id: '7',
    title: 'Alumni Networking Mixer',
    description: 'Connect with successful alumni in various fields for mentorship and career advice.',
    date: '2023-11-02',
    time: '6:00 PM - 8:00 PM',
    location: 'Alumni Center',
    organizer: 'Alumni Association',
    category: 'Social' as EventCategory,
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ticketPrice: 5,
    featured: false
  },
  {
    id: '8',
    title: 'Research Symposium',
    description: 'Undergraduate and graduate students present their research projects.',
    date: '2023-05-12',
    time: '9:00 AM - 3:00 PM',
    location: 'Science Building Atrium',
    organizer: 'Office of Research',
    category: 'Academic' as EventCategory,
    image: 'https://happenings.lpu.in/wp-content/uploads/2022/09/DSC00187-scaled.jpg',
    ticketPrice: 0,
    featured: false
  }
];
