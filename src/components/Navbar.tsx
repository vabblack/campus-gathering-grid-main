
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center animate-fade-in">
              <span className="text-2xl font-bold text-yellow-400">CampusEvents</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Events', path: '/events' },
                { name: 'Create Event', path: '/create-event' },
                { name: 'About', path: '/about' }
              ].map((item, index) => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 staggered-item ${
                    isActive(item.path) 
                      ? 'text-yellow-400 border-b-2 border-yellow-400' 
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-800/40 backdrop-blur-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                type="search"
                placeholder="Search events"
              />
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon" className="p-1 text-gray-300 hover:bg-gray-700 transition-all">
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="p-1 text-gray-300 hover:bg-gray-700 transition-all">
                <User className="h-6 w-6" />
              </Button>
              <Button className="ml-4 bg-yellow-400 text-black hover:bg-yellow-500">
                Sign In
              </Button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-300 hover:bg-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden animate-fade-in bg-gray-800/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mx-2 my-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'Events', path: '/events' },
              { name: 'Create Event', path: '/create-event' },
              { name: 'About', path: '/about' }
            ].map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium staggered-item ${
                  isActive(item.path) 
                    ? 'text-yellow-400 bg-gray-700' 
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700 mx-2 my-2">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-200">Guest User</div>
                <div className="text-sm font-medium text-gray-400">Sign in to access your account</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Button className="w-full justify-center bg-yellow-400 text-black hover:bg-yellow-500">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
