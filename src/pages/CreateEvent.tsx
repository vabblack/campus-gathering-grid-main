import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, DollarSign, Upload, X, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { EventCategory } from '@/types';

const categories: EventCategory[] = [
  'Academic', 'Social', 'Cultural', 'Sports', 'Career', 'Workshop', 'Concert'
];

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '0',
    category: 'Academic' as EventCategory,
    featured: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData | 'image', string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      featured: e.target.checked,
    }));
  };

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormErrors(prev => ({ ...prev, image: 'Please upload an image file' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFormErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
      setFormErrors(prev => ({ ...prev, image: undefined }));
    }
  }, []);

  const removeImage = useCallback(() => {
    setImage(null);
    setPreviewUrl('');
  }, []);

  const validateForm = useCallback(() => {
    const errors: Partial<Record<keyof typeof formData | 'image', string>> = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (Number(formData.price) < 0) errors.price = 'Price cannot be negative';
    if (!image) errors.image = 'Event image is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here with formData and image
      console.log('Submitting event:', { ...formData, image });
      
      navigate('/');
      alert('Event created successfully!');
    } catch (error) {
      setFormErrors({ submit: 'Failed to create event. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg-1">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <h1 className="text-3xl font-bold elegant-text-primary mb-6">Create a New Event</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                    disabled={isSubmitting}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm elegant-text-secondary">
                    Drag and drop an image, or{' '}
                    <span className="text-indigo-500 cursor-pointer">browse</span>
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isSubmitting}
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
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter event title"
                disabled={isSubmitting}
              />
              {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block font-medium elegant-text-primary">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe your event"
                disabled={isSubmitting}
              />
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
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                />
                {formErrors.date && <p className="text-sm text-red-500">{formErrors.date}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="time" className="block font-medium elegant-text-primary flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                />
                {formErrors.time && <p className="text-sm text-red-500">{formErrors.time}</p>}
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
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Event location"
                  disabled={isSubmitting}
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
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                  disabled={isSubmitting}
                />
                <p className="text-xs elegant-text-secondary">Enter 0 for free events</p>
                {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block font-medium elegant-text-primary">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {categories.map(cat => (
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
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                disabled={isSubmitting}
              />
              <label htmlFor="featured" className="ml-2 block elegant-text-secondary">
                Mark as featured event
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-2">
              <Button
                type="submit"
                className="w-full glass-button text-white hover:scale-105 transition-all py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </Button>
              {formErrors.submit && (
                <p className="text-sm text-red-500 text-center">{formErrors.submit}</p>
              )}
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;