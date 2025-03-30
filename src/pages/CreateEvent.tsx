
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, DollarSign, Upload, X, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { EventCategory } from '@/types';

const categories: EventCategory[] = [
  'Academic', 'Social', 'Cultural', 'Sports', 'Career', 'Workshop', 'Concert'
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0');
  const [category, setCategory] = useState<EventCategory>('Academic');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImage(null);
    setPreviewUrl('');
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!title.trim()) errors.title = 'Title is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!date) errors.date = 'Date is required';
    if (!time) errors.time = 'Time is required';
    if (!location.trim()) errors.location = 'Location is required';
    if (!category) errors.category = 'Category is required';
    if (!image) errors.image = 'Event image is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission with animation
      const submitBtn = document.getElementById('submit-btn');
      if (submitBtn) {
        submitBtn.textContent = 'Creating...';
        submitBtn.classList.add('opacity-70', 'cursor-wait');
      }
      
      // In a real app, you would call an API here
      setTimeout(() => {
        navigate('/');
        // Show success message, would typically use a toast
        alert('Event created successfully!');
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen gradient-bg-1">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <h1 className="text-3xl font-bold elegant-text-primary mb-6">Create a New Event</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Image */}
            <div className="space-y-2">
              <label className="block font-medium elegant-text-primary">Event Image</label>
              
              {previewUrl ? (
                <div className="relative rounded-lg overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm elegant-text-secondary">
                    Drag and drop an image, or <span className="text-indigo-500">browse</span>
                  </p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {formErrors.image && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.image}</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Event Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium elegant-text-primary">
                Event Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter event title"
              />
              {formErrors.title && (
                <p className="text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block font-medium elegant-text-primary">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe your event"
              ></textarea>
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
            
            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="block font-medium elegant-text-primary flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formErrors.date && (
                  <p className="text-sm text-red-500">{formErrors.date}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="time" className="block font-medium elegant-text-primary flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formErrors.time && (
                  <p className="text-sm text-red-500">{formErrors.time}</p>
                )}
              </div>
            </div>
            
            {/* Location and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="location" className="block font-medium elegant-text-primary flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Event location"
                />
                {formErrors.location && (
                  <p className="text-sm text-red-500">{formErrors.location}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="price" className="block font-medium elegant-text-primary flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-indigo-500" />
                  Ticket Price
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
                <p className="text-xs elegant-text-secondary">
                  Enter 0 for free events
                </p>
              </div>
            </div>
            
            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block font-medium elegant-text-primary">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {formErrors.category && (
                <p className="text-sm text-red-500">{formErrors.category}</p>
              )}
            </div>
            
            {/* Featured Event */}
            <div className="flex items-center">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="featured" className="ml-2 block elegant-text-secondary">
                Mark as featured event
              </label>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                id="submit-btn"
                type="submit" 
                className="w-full glass-button text-white hover:scale-105 transition-all py-3"
              >
                Create Event
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
