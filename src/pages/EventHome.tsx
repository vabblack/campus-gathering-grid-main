import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from '@/components/CategoryFilter';
import EventCard from '@/components/EventCard';
import type { Event } from '@/types';
import { EventCategory } from '@/types';
import '@/styles/animations.css';

const EventHome: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [isAnimating, setIsAnimating] = useState(false);
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
      title: 'Career Fair 2025',
      description: 'Connect with employers from various industries for internship and job opportunities.',
      date: '2024-10-05',
      time: '11:00 AM - 3:00 PM',
      location: 'Student Union Grand Ballroom',
      ticketPrice: 0,
      category: 'Career',
      featured: false,
      organizer: 'Career Services',
      image: 'https://happenings.lpu.in/wp-content/uploads/2018/03/LPU-hosting-Five-Day-Mega-Job-Fair-from-26th-February--e1520322336180.jpg'
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
      image: 'https://happenings.lpu.in/wp-content/uploads/2019/08/Basketball6.jpg'
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
      image: 'https://happenings.lpu.in/wp-content/uploads/2023/03/337892852_884703495946873_182910794258418404_n-1536x906.jpg'
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
      image: 'https://happenings.lpu.in/wp-content/uploads/2024/12/pharma-2-scaled.jpg'
    }
  ];

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const handleCategoryChange = (category: EventCategory) => {
    if (category === selectedCategory) return;
    setIsAnimating(true);
    setSelectedCategory(category);
    setTimeout(() => setIsAnimating(false), 100);
  };

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
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <section className="relative py-12 bg-gradient-to-b from-[#1e293b] to-[#0f172a] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://giss.ind.in/img/venue-gallery/8.jpg')] bg-cover bg-center opacity-20 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f172a]" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in">
              Campus Events
            </h1>
          </div>
        </div>
      </section>

      <section className="py-4 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 min-h-[400px] relative">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
            {!isAnimating && filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="event-card flex flex-col h-full"
                style={{
                  animation: `cardFadeIn 0.4s ease-out forwards`,
                  animationDelay: `${index * 50}ms`,
                  opacity: 0,
                  transform: 'scale(0.98)',
                  position: 'relative'
                }}
              >
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 animate-cardFadeIn">
              <p className="text-gray-400 text-lg">No events found for this category.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/create-event">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
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