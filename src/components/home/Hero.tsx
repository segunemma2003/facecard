
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-grey"></div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-40 h-40 border border-white rounded-lg transform rotate-12 animate-bounce-slow"></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Logo accent */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-scale-up">
            <Award className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in" style={{ fontFamily: 'Clash Display' }}>
            Celebrating Global{' '}
            <span className="bg-gradient-to-r from-white via-brand-blue-light to-white bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-95 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-in delay-300">
            Recognizing outstanding achievements in{' '}
            <span className="font-semibold text-brand-blue-light">Focus</span>,{' '}
            <span className="font-semibold text-brand-blue-light">Achievement</span>,{' '}
            <span className="font-semibold text-brand-blue-light">Courage</span>, and{' '}
            <span className="font-semibold text-brand-blue-light">Excellence</span>{' '}
            across the world
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-up delay-500 mb-16">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-brand-blue hover:bg-brand-blue-light border-2 border-white shadow-2xl text-lg px-8 py-4 h-16"
              onClick={handleScrollToTop}
            >
              <Link to="/nominees" className="flex items-center">
                View Current Nominees
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-blue shadow-2xl text-lg px-8 py-4 h-16"
              onClick={handleScrollToTop}
            >
              <Link to="/registration">Register for Event</Link>
            </Button>
          </div>
          
          {/* Featured Highlight with modern design */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl animate-fade-in delay-700">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-3"></div>
              <span className="font-semibold uppercase text-white text-sm tracking-wider">Recent Highlight</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Clash Display' }}>
              Voting Now Open for 2025 Awards
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Cast your vote for outstanding nominees across 12 categories representing innovation and excellence from around the world.
            </p>
            <Button
              asChild
              className="bg-brand-blue text-white hover:bg-brand-blue-dark border-0 shadow-xl"
              onClick={handleScrollToTop}
            >
              <Link to="/nominees" className="flex items-center">
                Cast Your Vote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Modern wave effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            fill="white" 
            fillOpacity="1" 
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
