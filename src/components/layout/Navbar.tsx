
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
    setTimeout(() => window.scrollTo(0, 0), 100);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-brand-blue/20' 
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
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <span className={`font-bold text-2xl transition-colors duration-300 ${
                isScrolled ? 'text-brand-blue' : 'text-white'
              }`} style={{ fontFamily: 'Clash Display' }}>
                FACE
              </span>
              <span className={`block text-sm font-medium ${
                isScrolled ? 'text-brand-grey' : 'text-white/90'
              }`}>
                Awards
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/')} 
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-brand-grey hover:text-brand-blue' : 'text-white hover:text-brand-blue-light'
              }`}
            >
              Home
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center space-x-1 font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-brand-grey hover:text-brand-blue' : 'text-white hover:text-brand-blue-light'
              }`}>
                <span>Awards</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md border border-brand-blue/20 shadow-xl rounded-xl">
                <DropdownMenuItem asChild>
                  <button onClick={() => handleNavigation('/nominees')} className="w-full text-left font-medium text-brand-grey hover:text-brand-blue hover:bg-brand-blue-light transition-all duration-300">Current Nominees</button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button onClick={() => handleNavigation('/categories')} className="w-full text-left font-medium text-brand-grey hover:text-brand-blue hover:bg-brand-blue-light transition-all duration-300">Categories</button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button onClick={() => handleNavigation('/past-winners')} className="w-full text-left font-medium text-brand-grey hover:text-brand-blue hover:bg-brand-blue-light transition-all duration-300">Past Winners</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {['gallery', 'approach', 'about', 'contact'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavigation(`/${item}`)} 
                className={`font-medium transition-all duration-300 hover:scale-105 capitalize ${
                  isScrolled ? 'text-brand-grey hover:text-brand-blue' : 'text-white hover:text-brand-blue-light'
                }`}
              >
                {item === 'approach' ? 'Our Approach' : item}
              </button>
            ))}
            <Button 
              variant="outline" 
              className="border-2 shadow-lg hover:scale-105 transition-all duration-300" 
              onClick={() => handleNavigation('/registration')}
            >
              Register for Event
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-brand-blue-light"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-brand-blue' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-brand-blue' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md mt-4 py-6 px-4 rounded-xl shadow-xl border border-brand-blue/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {[
                { title: 'Home', path: '/' },
                { title: 'Current Nominees', path: '/nominees' },
                { title: 'Categories', path: '/categories' },
                { title: 'Past Winners', path: '/past-winners' },
                { title: 'Gallery', path: '/gallery' },
                { title: 'Our Approach', path: '/approach' },
                { title: 'About', path: '/about' },
                { title: 'Contact', path: '/contact' },
                { title: 'Register for Event', path: '/registration' }
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="text-left font-medium text-brand-grey hover:text-brand-blue transition-all duration-300 px-4 py-3 rounded-lg hover:bg-brand-blue-light"
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
