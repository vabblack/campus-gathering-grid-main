import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from '@/components/CategoryFilter';
import EventCard from '@/components/EventCard';
import { Event, EventCategory } from '@/types';

const EventHome: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    return () => {
      scrollElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const events: Event[] = [
    {
      id: '1',
      title: 'Annual Tech Symposium',
      description: 'Join us for the biggest tech event of the year featuring guest speakers from leading tech companies.',
      date: '2024-11-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Lovely Unipolis (Block 12)',
      ticketPrice: 1150,
      category: 'Academic',
      featured: true,
      organizer: 'Tech Club',
      image: 'https://happenings.lpu.in/wp-content/uploads/2024/08/LPU-Pro-Chancellor-Rashmi-Mittal-is-interacting-with-the-students-during-freshman-induction-program-at-LPU-campus-scaled.jpg'
    },
    {
      id: '2',
      title: 'Spring Music Festival',
      description: 'Annual music festival featuring performances from student bands and a headliner concert.',
      date: '2024-04-22',
      time: '5:00 PM - 11:00 PM',
      location: 'Shanti Devi Mittal Auditorium',
      ticketPrice: 2500,
      category: 'Concert',
      featured: true,
      organizer: 'Music Club',
      image: 'https://happenings.lpu.in/wp-content/uploads/2022/09/DSC00187-scaled.jpg'
    },
    {
      id: '3',
      title: 'Career Fair 2023',
      description: 'Connect with employers from various industries for internship and job opportunities.',
      date: '2024-10-05',
      time: '11:00 AM - 3:00 PM',
      location: 'Student Union Grand Ballroom',
      ticketPrice: 0,
      category: 'Career',
      featured: false,
      organizer: 'Career Services',
      image: 'https://images.unsplash.com/photo-1577896852618-01da1afc6f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: '4',
      title: 'Cultural Diversity Festival',
      description: 'Celebrate the diversity of our campus community with food, performances, and activities.',
      date: '2024-03-18',
      time: '12:00 PM - 6:00 PM',
      location: 'Shanti Devi Mittal Auditorium',
      ticketPrice: 500,
      category: 'Cultural',
      featured: true,
      organizer: 'Cultural Club',
      image: 'https://happenings.lpu.in/wp-content/uploads/2024/04/Students-performing-cultural-dance-and-showcasing-tableau-of-various-regions-during-One-India-2024-cultural-fest-at-LPU-campus-1-scaled.jpg'
    },
    {
      id: '5',
      title: 'Basketball Tournament',
      description: 'Intramural basketball tournament open to all students. Form your team and register today!',
      date: '2024-02-10',
      time: '9:00 AM - 5:00 PM',
      location: 'Recreation Center Courts',
      ticketPrice: 10,
      category: 'Sports',
      featured: false,
      organizer: 'Sports Club',
      image: 'https://images.unsplash.com/photo-1518514379462-5c11e75348c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: '6',
      title: 'Resume Writing Workshop',
      description: 'Learn how to craft an effective resume that stands out to employers.',
      date: '2024-09-28',
      time: '2:00 PM - 4:00 PM',
      location: 'Library Learning Commons',
      ticketPrice: 0,
      category: 'Workshop',
      featured: false,
      organizer: 'Career Services',
      image: 'https://images.unsplash.com/photo-1520583457224-aee11bad5112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    },
    {
      id: '7',
      title: 'Alumni Networking Mixer',
      description: 'Connect with successful alumni in various fields for mentorship and career advice.',
      date: '2024-11-02',
      time: '6:00 PM - 8:00 PM',
      location: 'Alumni Center',
      ticketPrice: 5,
      category: 'Social',
      featured: false,
      organizer: 'Alumni Association',
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: '8',
      title: 'Research Symposium',
      description: 'Undergraduate and graduate students present their research projects.',
      date: '2024-05-12',
      time: '9:00 AM - 3:00 PM',
      location: 'Science Building Atrium',
      ticketPrice: 0,
      category: 'Academic',
      featured: false,
      organizer: 'Research Department',
      image: 'https://happenings.lpu.in/wp-content/uploads/2022/09/DSC00187-scaled.jpg'
    }
  ];

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <section className="relative py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Campus Events</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover and join exciting events happening across campus
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/create-event">
                <button className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                  Create Event
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">All Events</h2>
            <p className="text-gray-400">Browse through all upcoming events on campus</p>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="scroll-reveal" style={{transitionDelay: `${0.1 * index}s`}}>
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No events found for this category.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/create-event">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                Create Your Own Event
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventHome;