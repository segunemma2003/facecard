import { Link } from 'react-router-dom';
import { ArrowRight, Award, Star, Users, Trophy, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-grey">
        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform skew-y-12 animate-pulse delay-1000"></div>
        </div>
      </div>
      
      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large decorative circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 border border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-white/15 rounded-full animate-spin-reverse"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-white/15 rounded-lg rotate-45 animate-float delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-white/25 rounded-full animate-pulse"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-20 left-1/3 text-white/30 animate-twinkle">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="absolute bottom-32 right-1/4 text-white/20 animate-twinkle delay-700">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Main Content */}
            <div className="text-white space-y-12">
              {/* Logo Accent */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full shadow-2xl animate-scale-up border border-white/30">
                <Award className="h-12 w-12 text-white" />
              </div>
              
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in" style={{ fontFamily: 'Clash Display' }}>
                  Celebrating
                  <span className="block bg-gradient-to-r from-white via-brand-blue-light to-white bg-clip-text text-transparent">
                    Global Excellence
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl opacity-90 leading-relaxed animate-slide-in delay-300 max-w-2xl">
                  The world's most prestigious platform recognizing outstanding achievements in{' '}
                  <span className="font-semibold text-brand-blue-light">Focus</span>,{' '}
                  <span className="font-semibold text-brand-blue-light">Achievement</span>,{' '}
                  <span className="font-semibold text-brand-blue-light">Courage</span>, and{' '}
                  <span className="font-semibold text-brand-blue-light">Excellence</span>
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 animate-scale-up delay-500">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-brand-blue hover:bg-brand-blue-light hover:text-white border-2 border-white shadow-2xl text-lg px-10 py-6 h-auto rounded-2xl font-bold transition-all duration-500 hover:scale-110 hover:shadow-white/20"
                >
                  <Link to="/nominees" className="flex items-center" onClick={handleScrollToTop}>
                    <Trophy className="mr-3 h-5 w-5" />
                    View Nominees 2025
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-blue shadow-2xl text-lg px-10 py-6 h-auto rounded-2xl font-bold transition-all duration-500 hover:scale-110 backdrop-blur-sm"
                >
                  <Link to="/registration" onClick={handleScrollToTop}>
                    Register for Ceremony
                  </Link>
                </Button>
              </div>
              
              {/* Achievement Stats */}
              <div className="grid grid-cols-3 gap-8 animate-fade-in delay-700">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Clash Display' }}>240+</div>
                  <div className="text-white/80 text-sm uppercase tracking-wider">Winners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Clash Display' }}>50+</div>
                  <div className="text-white/80 text-sm uppercase tracking-wider">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Clash Display' }}>12</div>
                  <div className="text-white/80 text-sm uppercase tracking-wider">Categories</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Featured Card */}
            <div className="lg:pl-12 animate-scale-up delay-300">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-white/10 rounded-3xl transform rotate-6"></div>
                <div className="absolute -inset-2 bg-white/5 rounded-3xl transform -rotate-3"></div>
                
                {/* Main featured card */}
                <div className="relative bg-white/15 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white/90 text-sm uppercase tracking-wider font-medium">Now Open</div>
                      <div className="text-white text-lg font-bold">2025 Voting Period</div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display' }}>
                    Cast Your Vote for Global Excellence
                  </h3>
                  
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Join thousands of voters worldwide in recognizing outstanding achievements across 12 categories. 
                    Your voice matters in celebrating global impact and innovation.
                  </p>
                  
                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <div className="font-bold text-white text-lg">32</div>
                      <div className="text-white/70 text-xs">Active Nominees</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <div className="font-bold text-white text-lg">30</div>
                      <div className="text-white/70 text-xs">Days Remaining</div>
                    </div>
                  </div>
                  
                  <Button
                    asChild
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white shadow-xl rounded-xl py-4 font-bold text-lg transition-all duration-300 hover:scale-105"
                  >
                    <Link to="/nominees" className="flex items-center justify-center" onClick={handleScrollToTop}>
                      <Star className="mr-2 h-5 w-5" />
                      Start Voting Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="white" stopOpacity="1"/>
              <stop offset="100%" stopColor="white" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradient)"
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;