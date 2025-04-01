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
    setLoading(true);
    setTimeout(() => {
      if (id) {
        const foundEvent = events.find(e => e.id === id);
        setEvent(foundEvent || null);
        
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
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
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
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gray-800/50 backdrop-blur-md p-8 text-center rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
            <p className="text-gray-300 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="inline-flex items-center px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Link to="/" className="text-yellow-400 hover:text-yellow-300 flex items-center transition-all hover:translate-x-[-5px]">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-md rounded-lg shadow-xl border border-gray-700 overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            {event.featured && (
              <Badge className="absolute top-4 right-4 bg-yellow-400 text-black">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-start">
              <div className="mb-4 md:mb-0">
                <Badge variant="outline" className="border-yellow-400 text-yellow-400 mb-2">
                  {event.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
                <p className="mt-4 text-lg text-gray-300">{event.description}</p>
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
                <h2 className="text-2xl font-semibold text-white">Event Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p>{formatDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p>{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <DollarSign className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Price</p>
                      <p>{formatCurrency(event.ticketPrice)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Users className="h-5 w-5 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p>150 attendees</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-yellow-400/20">
                <h2 className="text-2xl font-semibold text-white mb-4">Register for Event</h2>
                <p className="text-gray-300 mb-6">
                  Secure your spot at this exciting event. Limited seats available!
                </p>
                <Link to={`/event/${event.id}/register`}>
                  <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 transition-all">
                    Register for Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {relatedEvents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((event) => (
                <Link key={event.id} to={`/event/${event.id}`}>
                  <div className="bg-gray-800/50 backdrop-blur-md p-4 rounded-lg border border-gray-700 hover:border-yellow-400/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                    <h3 className="font-semibold text-white">{event.title}</h3>
                    <p className="text-sm text-gray-300 mt-1">{formatDate(event.date)}</p>
                  </div>
                </Link>
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
