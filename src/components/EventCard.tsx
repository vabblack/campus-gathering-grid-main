
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, DollarSign } from 'lucide-react';
import { Event } from '@/types';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index = 0 }) => {
  return (
    <div className="glass-card shadow-md overflow-hidden staggered-item" style={{animationDelay: `${0.1 * (index % 10)}s`}}>
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
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2 text-indigo-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <DollarSign className="h-4 w-4 mr-2 text-indigo-500" />
            <span>{event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Badge variant="outline" className="badge-category">
            {event.category}
          </Badge>
          <Link to={`/event/${event.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-all duration-300 hover:translate-x-1">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
