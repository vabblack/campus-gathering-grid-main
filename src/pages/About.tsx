
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Calendar, MapPin, Heart, Award, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      scrollElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="hero-pattern text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About Campus Gathering Grid</h1>
            <p className="text-xl max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
              Connecting students with campus events and creating vibrant university experiences.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 gradient-bg-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-8 md:p-10 scroll-reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold elegant-text-primary mb-6">Our Mission</h2>
                  <p className="text-lg elegant-text-secondary mb-4">
                    Campus Gathering Grid aims to enhance the university experience by connecting students with events that matter to them. We believe that a rich campus life contributes significantly to student growth and development.
                  </p>
                  <p className="text-lg elegant-text-secondary">
                    Our platform makes it easy for students to discover, attend, and create events that foster community, learning, and memorable experiences.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="Students at an event" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 gradient-bg-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold elegant-text-primary">Our Values</h2>
              <p className="mt-4 text-xl elegant-text-secondary">The principles that guide our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Users className="h-10 w-10 text-indigo-500" />,
                  title: "Community Building",
                  description: "We foster connections among students, faculty, and staff to create a vibrant campus community."
                },
                {
                  icon: <Calendar className="h-10 w-10 text-indigo-500" />,
                  title: "Accessibility",
                  description: "Making event information accessible to all students, regardless of their background or interests."
                },
                {
                  icon: <Heart className="h-10 w-10 text-indigo-500" />,
                  title: "Student Empowerment",
                  description: "Enabling students to take initiative and create their own events to enrich campus life."
                }
              ].map((value, index) => (
                <div key={index} className="glass-card p-6 text-center scroll-reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                  <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold elegant-text-primary mb-2">{value.title}</h3>
                  <p className="elegant-text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "15,000+", label: "Students Connected" },
                { value: "1,200+", label: "Events Hosted" },
                { value: "200+", label: "Student Organizations" },
                { value: "95%", label: "Student Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 glass-card staggered-item" style={{background: "rgba(255,255,255,0.15)", animationDelay: `${index * 0.1}s`}}>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-indigo-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 gradient-bg-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold elegant-text-primary">Our Team</h2>
              <p className="mt-4 text-xl elegant-text-secondary">The people behind Campus Gathering Grid</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                },
                {
                  name: "Taylor Williams",
                  role: "Head of Operations",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                },
                {
                  name: "Jamie Chen",
                  role: "Community Manager",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="glass-card overflow-hidden scroll-reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                  <div className="h-64">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold elegant-text-primary">{member.name}</h3>
                    <p className="elegant-text-secondary">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 scroll-reveal">
              <h2 className="text-3xl font-bold elegant-text-primary">Contact Us</h2>
              <p className="mt-4 text-xl elegant-text-secondary">Have questions or feedback? Reach out to our team.</p>
            </div>
            
            <div className="glass-card p-8 scroll-reveal">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium elegant-text-primary">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium elegant-text-primary">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium elegant-text-primary">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Subject of your message"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium elegant-text-primary">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="glass-input w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div>
                  <Button type="submit" className="w-full glass-button text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 gradient-bg-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 scroll-reveal">
              <h2 className="text-3xl font-bold elegant-text-primary">Frequently Asked Questions</h2>
              <p className="mt-4 elegant-text-secondary">Answers to common questions about our platform</p>
            </div>
            
            <div className="glass-card divide-y scroll-reveal">
              {[
                {
                  question: "How do I create my own event?",
                  answer: "You can create an event by clicking on the 'Create Event' button in the navigation menu. Fill out the event details form, add an image, and submit for approval."
                },
                {
                  question: "Are all events free to attend?",
                  answer: "No, some events may require a ticket purchase. Each event listing will clearly indicate if there is a fee to attend and the ticket price."
                },
                {
                  question: "How can I promote my student organization's events?",
                  answer: "Create an account for your organization, then create events through that account. You can also contact us to feature your events on our homepage."
                },
                {
                  question: "Can I edit an event after publishing it?",
                  answer: "Yes, you can edit your event's details anytime before it occurs. Just go to your event management dashboard to make changes."
                },
                {
                  question: "How can I get notified about new events?",
                  answer: "Sign up for an account and set your notification preferences to receive updates about new events in categories you're interested in."
                }
              ].map((faq, index) => (
                <div key={index} className="py-6 px-4 sm:px-6 staggered-item" style={{animationDelay: `${index * 0.1}s`}}>
                  <h3 className="text-lg font-medium elegant-text-primary mb-2">{faq.question}</h3>
                  <p className="elegant-text-secondary">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
