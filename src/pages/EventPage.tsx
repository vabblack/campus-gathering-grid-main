import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, DollarSign, Users, Share2, Star, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { events } from '@/data/events';
import { Event } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      if (id) {
        // Fix: Convert the string id to number before comparison
        const foundEvent = events.find(e => e.id === id);
        setEvent(foundEvent || null);
        
        // Find related events (same category)
        if (foundEvent) {
          const related = events
            .filter(e => e.category === foundEvent.category && e.id !== foundEvent.id)
            .slice(0, 3);
          setRelatedEvents(related);
        }
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-yellow-200 rounded-full mb-4"></div>
            <div className="h-8 w-64 bg-yellow-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-yellow-100 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card p-8 text-center animate-fade-in">
            <h2 className="text-2xl font-bold elegant-text-primary mb-4">Event Not Found</h2>
            <p className="elegant-text-secondary mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="glass-button inline-flex items-center px-4 py-2 rounded-md text-black">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg-1">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 animate-fade-in">
          <Link to="/" className="text-yellow-400 hover:text-yellow-300 flex items-center transition-all hover:translate-x-[-5px]">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </div>
        
        <div className="glass-card overflow-hidden shadow-xl animate-fade-in">
          <div className="relative h-64 md:h-96">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            {event.featured && (
              <Badge className="absolute top-4 right-4 badge-featured">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-start">
              <div className="mb-4 md:mb-0">
                <Badge variant="outline" className="badge-category mb-2">
                  {event.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold elegant-text-primary">{event.title}</h1>
                <p className="mt-4 text-lg elegant-text-secondary">{event.description}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: event.title,
                        text: event.description,
                        url: window.location.href
                      });
                    } catch (error) {
                      console.error('Error sharing:', error);
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                >
                  <Star className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold elegant-text-primary">Event Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center elegant-text-secondary staggered-item">
                    <Calendar className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p>{formatDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center elegant-text-secondary staggered-item">
                    <Clock className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p>{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center elegant-text-secondary staggered-item">
                    <MapPin className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center elegant-text-secondary staggered-item">
                    <DollarSign className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Price</p>
                      <p>{formatCurrency(event.ticketPrice)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center elegant-text-secondary staggered-item">
                    <Users className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p>150 attendees</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Button className="w-full glass-button text-black hover:scale-105 transition-all">
                    Register for Event
                  </Button>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold elegant-text-primary mb-4">Location</h2>
                <div className="h-64 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d717.0464057871566!2d75.7041794303767!3d31.252123572878492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f66440fb2c1%3A0xca553bb20da605de!2sShanti%20Devi%20Mittal%20Auditorium!5e0!3m2!1sen!2sin!4v1743417022182!5m2!1sen!2si" 
                    
                    
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {relatedEvents.length > 0 && (
          <div className="mt-16 scroll-reveal">
            <h2 className="text-2xl font-bold elegant-text-primary mb-6">Related Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((event, index) => (
                <div key={event.id} className="scroll-reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                  <Link to={`/event/${event.id}`}>
                    <div className="glass-card p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                      <h3 className="font-semibold elegant-text-primary">{event.title}</h3>
                      <p className="text-sm elegant-text-secondary mt-1">{formatDate(event.date)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default EventPage;
