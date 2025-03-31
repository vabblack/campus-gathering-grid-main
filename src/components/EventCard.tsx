import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '@/types';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index = 0 }) => {
  return (
    <div className="glass-card shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
        {event.featured && (
          <Badge className="absolute top-4 right-4 badge-featured">
            Featured
          </Badge>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold elegant-text-primary truncate">{event.title}</h3>
        </div>
        <p className="elegant-text-secondary text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-yellow-400" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="h-4 w-4 mr-2 text-yellow-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <span className="h-4 w-4 mr-2 text-yellow-400">₹</span>
            <span>{event.ticketPrice === 0 ? 'Free' : `₹${event.ticketPrice}`}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Badge variant="outline" className="badge-category">
            {event.category}
          </Badge>
          <Link 
            to={`/event/${event.id}`} 
            className="text-yellow-400 hover:text-yellow-500 font-medium text-sm transition-all duration-300 hover:translate-x-1"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
