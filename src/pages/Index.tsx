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
      
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Testimonials & Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="glass-card p-4 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 scroll-reveal">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-semibold text-white">Sarah Johnson</h3>
                  <p className="text-xs text-gray-400">Computer Science Student</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 italic mb-3">"The hackathon organized through this platform was incredible! I met amazing people and learned so much. The registration process was smooth and the real-time updates kept us informed throughout the event."</p>
              <div className="flex items-center text-yellow-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-1 text-xs">5.0</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-card p-4 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 scroll-reveal">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-semibold text-white">Michael Chen</h3>
                  <p className="text-xs text-gray-400">Business Student</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 italic mb-3">"As an event organizer, this platform made it so easy to manage our career fair. The features for managing registrations and sending updates were exactly what we needed. Highly recommended!"</p>
              <div className="flex items-center text-yellow-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-1 text-xs">4.8</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-card p-4 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 scroll-reveal">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-semibold text-white">Emma Rodriguez</h3>
                  <p className="text-xs text-gray-400">Arts Student</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 italic mb-3">"The cultural festival was a huge success! The platform helped us reach a wider audience and manage ticket sales efficiently. The community engagement features are fantastic!"</p>
              <div className="flex items-center text-yellow-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-1 text-xs">4.9</span>
              </div>
            </div>
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
