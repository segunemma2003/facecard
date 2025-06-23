import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    // Fixed scroll to top issue - ensure it happens after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-face-white/95 backdrop-blur-md shadow-xl border-b border-face-sky-blue/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => handleNavigation('/')}
          >
            {/* FACE Logo */}
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
            />
           
          </Link>

          {/* Desktop Navigation with brand colors */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/')} 
              className={`font-medium transition-all duration-300 hover:scale-105 font-manrope ${
                isScrolled ? 'text-face-grey hover:text-face-sky-blue' : 'text-face-white hover:text-face-sky-blue-light'
              }`}
            >
              Home
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center space-x-1 font-medium transition-all duration-300 hover:scale-105 font-manrope ${
                isScrolled ? 'text-face-grey hover:text-face-sky-blue' : 'text-face-white hover:text-face-sky-blue-light'
              }`}>
                <span>Awards</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-face-white/95 backdrop-blur-md border border-face-sky-blue/20 shadow-xl rounded-xl">
                <DropdownMenuItem asChild>
                  <button onClick={() => handleNavigation('/nominees')} className="w-full text-left font-medium text-face-grey hover:text-face-sky-blue hover:bg-face-sky-blue/10 transition-all duration-300 font-manrope">Current Nominees</button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button onClick={() => handleNavigation('/categories')} className="w-full text-left font-medium text-face-grey hover:text-face-sky-blue hover:bg-face-sky-blue/10 transition-all duration-300 font-manrope">Categories</button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button onClick={() => handleNavigation('/past-winners')} className="w-full text-left font-medium text-face-grey hover:text-face-sky-blue hover:bg-face-sky-blue/10 transition-all duration-300 font-manrope">Past Winners</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Updated navigation items to include 'projects' */}
            {['projects', 'gallery', 'approach', 'about', 'contact'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavigation(`/${item}`)} 
                className={`font-medium transition-all duration-300 hover:scale-105 capitalize font-manrope ${
                  isScrolled ? 'text-face-grey hover:text-face-sky-blue' : 'text-face-white hover:text-face-sky-blue-light'
                }`}
              >
                {item === 'approach' ? 'Our Approach' : 
                 item === 'projects' ? 'Our Projects' : 
                 item}
              </button>
            ))}
            <Button 
              className={`border-2 shadow-lg hover:scale-105 transition-all duration-300 font-manrope ${
                isScrolled 
                  ? 'border-face-sky-blue bg-face-sky-blue text-face-white hover:bg-face-sky-blue-dark hover:border-face-sky-blue-dark' 
                  : 'border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue'
              }`} 
              onClick={() => handleNavigation('/registration')}
            >
              Register for Event
            </Button>
          </div>

          {/* Mobile Menu Button with brand colors */}
          <button 
            className="lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-face-sky-blue/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-face-sky-blue' : 'text-face-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-face-sky-blue' : 'text-face-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu with brand styling - Updated to include Our Projects */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-face-white/95 backdrop-blur-md mt-4 py-6 px-4 rounded-xl shadow-xl border border-face-sky-blue/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {[
                { title: 'Home', path: '/' },
                { title: 'Current Nominees', path: '/nominees' },
                { title: 'Categories', path: '/categories' },
                { title: 'Past Winners', path: '/past-winners' },
                { title: 'Our Projects', path: '/projects' },
                { title: 'Gallery', path: '/gallery' },
                { title: 'Our Approach', path: '/approach' },
                { title: 'About', path: '/about' },
                { title: 'Contact', path: '/contact' },
                { title: 'Register for Event', path: '/registration' }
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="text-left font-medium text-face-grey hover:text-face-sky-blue transition-all duration-300 px-4 py-3 rounded-lg hover:bg-face-sky-blue/10 font-manrope"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;