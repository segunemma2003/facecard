
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Celebrating Global <span className="text-face-gold">Excellence</span>
          </h1>
          <p className="text-xl opacity-90 mb-8 animate-slide-in">
            Recognizing outstanding achievements in Focus, Achievement, Courage, and Excellence across the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-up">
            <Button asChild size="lg" className="bg-face-gold hover:bg-yellow-500 text-face-blue font-medium border-2 border-face-gold shadow-lg">
              <Link to="/nominees">View Current Nominees</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white  bg-white/20 text-white hover:bg-white/40 border-2">
              <Link to="/registration">Register for Event</Link>
            </Button>
          </div>
          
          {/* Featured Highlight with improved visibility */}
          <div className="mt-16 bg-face-blue/60 backdrop-blur-sm p-6 rounded-lg border border-white/20 animate-fade-in">
            <div className="font-medium mb-2 uppercase text-face-gold text-sm tracking-wider">Recent Highlight</div>
            <h3 className="text-2xl font-serif font-bold mb-2">Voting Now Open for 2025 Awards</h3>
            <p className="text-white mb-4">
              Cast your vote for outstanding nominees across 12 categories representing innovation and excellence from around the world.
            </p>
            <Link 
              to="/nominees" 
              className="inline-flex items-center text-face-gold hover:text-white transition-colors"
            >
              Cast Your Vote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path 
            fill="white" 
            fillOpacity="1" 
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
