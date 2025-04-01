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

const PaymentConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const [upiDetails, setUpiDetails] = useState<UPIDetails | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedPayment = localStorage.getItem('pendingPayment');
    if (storedPayment) {
      setUpiDetails(JSON.parse(storedPayment));
    } else {
      navigate('/events');
    }
  }, [navigate]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!event || !upiDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <h1 className="text-3xl font-bold elegant-text-primary mb-6">Complete Your Payment</h1>
          
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Event Details</h2>
            <div className="space-y-2 text-gray-300">
              <p>Event: {event.title}</p>
              <p>Amount: {formatCurrency(upiDetails.amount)}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-800 rounded-lg border border-yellow-400/20">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">UPI Payment Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">UPI ID</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={upiDetails.upiId}
                      readOnly
                      className="flex-1 glass-input bg-gray-700 text-white"
                    />
                    <Button
                      onClick={() => copyToClipboard(upiDetails.upiId)}
                      className="glass-button text-black"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Amount</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={formatCurrency(upiDetails.amount)}
                      readOnly
                      className="flex-1 glass-input bg-gray-700 text-white"
                    />
                    <Button
                      onClick={() => copyToClipboard(upiDetails.amount.toString())}
                      className="glass-button text-black"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Description</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={upiDetails.description}
                      readOnly
                      className="flex-1 glass-input bg-gray-700 text-white"
                    />
                    <Button
                      onClick={() => copyToClipboard(upiDetails.description)}
                      className="glass-button text-black"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-400/10 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-400 mb-2">How to Pay:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                  <li>Open your UPI payment app (Google Pay, PhonePe, etc.)</li>
                  <li>Enter the UPI ID shown above</li>
                  <li>Enter the amount shown above</li>
                  <li>Add the description in the note field</li>
                  <li>Complete the payment</li>
                  <li>Take a screenshot of the payment confirmation</li>
                </ol>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                onClick={() => navigate('/events')}
                className="glass-button text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={() => navigate(`/event/${event.id}/payment-success`)}
                className="glass-button text-black"
              >
                I've Completed the Payment
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentConfirmation; 