
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2"
          >
            <img 
              src="/lovable-uploads/d3c7b365-309d-4e28-8670-d9e32511bd89.png" 
              alt="FACE Awards Logo" 
              className="h-12 w-auto"
            />
            <span className={`font-serif font-bold text-2xl ${isScrolled ? 'text-face-blue' : 'text-white'} hidden sm:inline-block`}>
              Awards
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isScrolled ? 'text-face-blue' : 'text-white'} hover:text-face-gold transition-colors`}>
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center space-x-1 ${isScrolled ? 'text-face-blue' : 'text-white'} hover:text-face-gold transition-colors`}>
                <span>Awards</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem asChild>
                  <Link to="/nominees" className="w-full">Current Nominees</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/categories" className="w-full">Categories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/past-winners" className="w-full">Past Winners</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/gallery" className={`${isScrolled ? 'text-face-blue' : 'text-white'} hover:text-face-gold transition-colors`}>
              Gallery
            </Link>
            <Link to="/approach" className={`${isScrolled ? 'text-face-blue' : 'text-white'} hover:text-face-gold transition-colors`}>
              Our Approach
            </Link>
            <Link to="/about" className={`${isScrolled ? 'text-face-blue' : 'text-white'} hover:text-face-gold transition-colors`}>
              About
            </Link>
            <Link to="/contact" className={`${isScrolled ? 'text-face-blue' : 'text-white'} hover:text-face-gold transition-colors`}>
              Contact
            </Link>
            <Link to="/registration" className="hidden lg:block">
              <Button variant="outline" className="border-face-gold text-face-gold hover:bg-face-gold hover:text-white">
                Register for Event
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-face-blue' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-face-blue' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white mt-4 py-4 px-2 rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/nominees" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Current Nominees
              </Link>
              <Link 
                to="/categories" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/past-winners" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Past Winners
              </Link>
              <Link 
                to="/gallery" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/approach" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Approach
              </Link>
              <Link 
                to="/about" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/registration"
                className="text-face-blue hover:text-face-gold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register for Event
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
