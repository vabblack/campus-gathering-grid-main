import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, Bell, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Add the shine animation styles
const shineStyles = `
  @keyframes shine {
    0% {
      background-position: 0;
    }
    100% {
      background-position: 200px;
    }
  }
  
  .btn-shine {
    position: relative;
    padding: 12px 48px;
    color: #fff;
    background: linear-gradient(to right, #ff6b6b 0%, #ffd93d 25%, #6c5ce7 50%, #ffd93d 75%, #ff6b6b 100%);
    background-size: 200px 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 4s linear infinite;
    font-weight: 700;
    font-size: 28px;
    text-decoration: none;
    white-space: nowrap;
    font-family: "Poppins", sans-serif;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .btn-shine:hover {
    transform: scale(1.05);
    animation-play-state: paused;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Event', message: 'A new event has been created in your area', time: '5m ago' },
    { id: 2, title: 'Event Reminder', message: 'Your event "Campus Meetup" starts in 1 hour', time: '1h ago' },
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Simulate search results
    if (query.length > 0) {
      setSearchResults([
        { id: 1, title: 'Campus Meetup', type: 'event' },
        { id: 2, title: 'Tech Workshop', type: 'event' },
        { id: 3, title: 'Sports Day', type: 'event' },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: any) => {
    navigate(`/events/${result.id}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSignOut = () => {
    // Add your sign out logic here
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <style>{shineStyles}</style>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center animate-fade-in">
                <span className="btn-shine text-2xl font-bold">CampusEvents</span>
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-800/40 backdrop-blur-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  type="search"
                  placeholder="Search events"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchResults.length > 0 && (
                  <div className="absolute mt-1 w-full bg-gray-800 rounded-md shadow-lg border border-gray-700">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        {result.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-1 text-gray-300 hover:bg-gray-700 transition-all relative">
                      <Bell className="h-6 w-6" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700">
                    <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="text-gray-300 hover:bg-gray-700">
                        <div className="flex flex-col">
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-sm text-gray-400">{notification.message}</span>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-1 text-gray-300 hover:bg-gray-700 transition-all">
                      <User className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                    <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to="/signin" className="ml-4">
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                    Sign In
                  </Button>
                </Link>
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
      </nav>

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
              <Link to="/signin">
                <Button className="w-full justify-center bg-yellow-400 text-black hover:bg-yellow-500">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
