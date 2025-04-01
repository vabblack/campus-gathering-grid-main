import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '@/data/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface UPIDetails {
  upiId: string;
  name: string;
  amount: number;
  description: string;
  merchantName: string;
}

const PaymentSuccess = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const [upiDetails, setUpiDetails] = useState<UPIDetails | null>(null);

  useEffect(() => {
    const storedPayment = localStorage.getItem('pendingPayment');
    if (storedPayment) {
      setUpiDetails(JSON.parse(storedPayment));
      // Clear the stored payment details after showing them
      localStorage.removeItem('pendingPayment');
    } else {
      navigate('/events');
    }
  }, [navigate]);

  if (!event || !upiDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold elegant-text-primary mb-2">Payment Successful!</h1>
            <p className="text-gray-400">Thank you for registering for {event.title}</p>
          </div>

          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Registration Details</h2>
            <div className="space-y-3 text-gray-300">
              <p><span className="text-gray-400">Event:</span> {event.title}</p>
              <p><span className="text-gray-400">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
              <p><span className="text-gray-400">Time:</span> {event.time}</p>
              <p><span className="text-gray-400">Location:</span> {event.location}</p>
              <p><span className="text-gray-400">Amount Paid:</span> {formatCurrency(upiDetails.amount)}</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Next Steps</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Check your email for the event confirmation</li>
              <li>• Save the event details to your calendar</li>
              <li>• Join the event's WhatsApp group (if applicable)</li>
              <li>• Follow the event page for updates</li>
            </ul>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate('/events')}
              className="glass-button text-black"
            >
              Browse More Events
            </Button>
            <Button
              onClick={() => navigate(`/event/${event.id}`)}
              className="glass-button text-black"
            >
              View Event Details
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess; 