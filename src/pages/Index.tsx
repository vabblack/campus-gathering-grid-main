
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
    ? events.filter(event => event.featured)
    : events.filter(event => event.category === selectedCategory);

  const handleCategoryChange = (category: EventCategory) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <Hero />
      
      <FeaturedEvents events={events} />
      
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Browse Events by Category
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Find the perfect event for you
            </p>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="scroll-reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">
                No events found in this category. Please check back later or try another category.
              </p>
            </div>
          )}
          
          <div className="mt-12 text-center scroll-reveal">
            <Link to="/events">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
                View All Events
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
