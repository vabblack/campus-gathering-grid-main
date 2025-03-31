import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedEvents from '@/components/FeaturedEvents';
import CategoryFilter from '@/components/CategoryFilter';
import EventCard from '@/components/EventCard';
import Footer from '@/components/Footer';
import { events } from '@/data/events';
import { EventCategory } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [animatedElements, setAnimatedElements] = useState<Element[]>([]);

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => {
        console.log('Comparing:', event.category, selectedCategory);
        return event.category === selectedCategory;
      });

  const handleCategoryChange = (category: EventCategory) => {
    console.log('Category changed to:', category);
    setSelectedCategory(category);
  };

  useEffect(() => {
    console.log('Component re-rendered with category:', selectedCategory);
    // Initialize scroll animations
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

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => {
      observer.observe(el);
    });

    setAnimatedElements(Array.from(elements));

    return () => {
      if (animatedElements.length) {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <Hero />
      
      <FeaturedEvents events={events} />
      
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose Campus Gathering Grid?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              The ultimate platform for campus events and community building
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="glass-card p-6 scroll-reveal" style={{transitionDelay: '0.1s'}}>
              <div className="text-yellow-400 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Easy Event Discovery</h3>
              <p className="text-gray-300">Find events that match your interests with our smart category system and personalized recommendations.</p>
            </div>
            
            <div className="glass-card p-6 scroll-reveal" style={{transitionDelay: '0.2s'}}>
              <div className="text-yellow-400 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Build Community</h3>
              <p className="text-gray-300">Connect with fellow students, join clubs, and create lasting friendships through shared experiences.</p>
            </div>
            
            <div className="glass-card p-6 scroll-reveal" style={{transitionDelay: '0.3s'}}>
              <div className="text-yellow-400 text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">Express Yourself</h3>
              <p className="text-gray-300">Create and host your own events to share your passions and talents with the campus community.</p>
            </div>
            
            <div className="glass-card p-6 scroll-reveal" style={{transitionDelay: '0.4s'}}>
              <div className="text-yellow-400 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300">Never miss an event with our real-time notifications and calendar integration.</p>
            </div>
            
            <div className="glass-card p-6 scroll-reveal" style={{transitionDelay: '0.5s'}}>
              <div className="text-yellow-400 text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-white mb-2">Learn & Grow</h3>
              <p className="text-gray-300">Access workshops, seminars, and networking events to enhance your academic and professional journey.</p>
            </div>
            
            <div className="glass-card p-6 scroll-reveal" style={{transitionDelay: '0.6s'}}>
              <div className="text-yellow-400 text-4xl mb-4">💫</div>
              <h3 className="text-xl font-bold text-white mb-2">Create Memories</h3>
              <p className="text-gray-300">Make your university experience unforgettable with diverse events and activities.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center scroll-reveal">
            <Link to="/events">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
                Explore All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 rounded-lg shadow-lg scroll-reveal border border-yellow-400/20">
            <h2 className="text-3xl font-bold text-white">
              Ready to create your own campus event?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Share your passion with the university community
            </p>
            <div className="mt-8">
              <Link to="/create-event">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 transition-all">
                  Start Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
