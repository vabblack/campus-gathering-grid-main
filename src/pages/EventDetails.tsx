
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, DollarSign, Users, Share2, Heart, Ticket } from 'lucide-react';
import { events } from '@/data/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow">
        <div className="relative h-96">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <Badge className="mb-4 bg-indigo-600">{event.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {event.description}
                </p>
                <hr className="my-8" />
                <h2 className="text-2xl font-bold mb-4">Organizer</h2>
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full h-12 w-12 flex items-center justify-center">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">{event.organizer}</h3>
                    <p className="text-gray-500 text-sm">Event Organizer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-xl font-bold mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Price</p>
                        <p className="text-gray-600">{event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex justify-between">
                  <Button variant="outline" className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center">
                  <Ticket className="h-5 w-5 mr-2" />
                  {event.ticketPrice === 0 ? 'Register Now' : 'Buy Tickets'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
