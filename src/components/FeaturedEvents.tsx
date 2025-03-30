
import React, { useEffect, useRef } from 'react';
import EventCard from './EventCard';
import { Event } from '@/types';

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ events }) => {
  const featuredEvents = events.filter(event => event.featured);
  const sectionRef = useRef<HTMLElement>(null);

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
    scrollElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      scrollElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 gradient-bg-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl font-extrabold elegant-text-primary sm:text-4xl">
            Featured Events
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl elegant-text-secondary sm:mt-4">
            Don't miss out on these popular campus events
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <div key={event.id} className="scroll-reveal" style={{transitionDelay: `${index * 0.1}s`}}>
              <EventCard event={event} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
