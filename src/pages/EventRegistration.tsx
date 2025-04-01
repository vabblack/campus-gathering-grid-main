import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '@/data/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/lib/utils';

const EventRegistration = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    numberOfTickets: 1,
    paymentMethod: 'upi'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate UPI payment details
      const amount = event!.ticketPrice * formData.numberOfTickets;
      const upiDetails = {
        upiId: "campusgathering@upi", // Fixed merchant UPI ID
        name: "Campus Gathering Grid", // Merchant name
        amount: amount,
        description: `Payment for ${event!.title} - ${formData.name}`,
        merchantName: "Campus Gathering Grid"
      };

      // Store payment details in localStorage for the payment confirmation page
      localStorage.setItem('pendingPayment', JSON.stringify(upiDetails));
      
      // Navigate to payment confirmation page
      navigate(`/event/${event!.id}/payment-confirmation`);
      
    } catch (err) {
      setError('Failed to process registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <h1 className="text-3xl font-bold elegant-text-primary mb-6">Register for {event.title}</h1>
          
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Event Details</h2>
            <div className="space-y-2 text-gray-300">
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Price: {formatCurrency(event.ticketPrice)} per ticket</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfTickets">Number of Tickets</Label>
                <Input
                  id="numberOfTickets"
                  name="numberOfTickets"
                  type="number"
                  min="1"
                  value={formData.numberOfTickets}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI Payment</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Payment Summary</h3>
              <div className="space-y-2 text-gray-300">
                <p>Number of Tickets: {formData.numberOfTickets}</p>
                <p>Price per Ticket: {formatCurrency(event.ticketPrice)}</p>
                <p className="text-xl font-bold text-yellow-400">
                  Total Amount: {formatCurrency(event.ticketPrice * formData.numberOfTickets)}
                </p>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full glass-button text-black hover:scale-105 transition-all"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Register for Event'}
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventRegistration; 