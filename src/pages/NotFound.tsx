import { useEffect, useState } from "react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Home, Search, ArrowLeft, Sparkles, Star, Trophy, Globe, ChevronRight } from "lucide-react";

const NotFound = () => {
  const [animateElements, setAnimateElements] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setAnimateElements(true), 300);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const floatingElements = [
    { icon: Trophy, delay: 0, duration: 3 },
    { icon: Star, delay: 1, duration: 4 },
    { icon: Award, delay: 2, duration: 3.5 },
    { icon: Sparkles, delay: 0.5, duration: 2.5 },
    { icon: Globe, delay: 1.5, duration: 4.5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5 relative overflow-hidden">
      <Navbar />
      
      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -15px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -7px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(135, 206, 235, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(135, 206, 235, 0.6);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-custom {
          animation: bounce 2s infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes numberGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(135, 206, 235, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(135, 206, 235, 0.8);
          }
        }
        
        .number-glow {
          animation: numberGlow 2s ease-in-out infinite;
        }
        
        @keyframes drift {
          0% { transform: translateX(0px) translateY(0px); }
          33% { transform: translateX(30px) translateY(-30px); }
          66% { transform: translateX(-20px) translateY(20px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
        
        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated background shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-face-sky-blue/20 rounded-full animate-float" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-face-sky-blue/30 transform rotate-45 animate-drift"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-face-sky-blue/20 rounded-full animate-bounce-custom"></div>
        <div className="absolute top-60 right-40 w-20 h-20 border-2 border-face-sky-blue/25 transform rotate-12 animate-float" style={{animationDuration: '5s'}}></div>
        
        {/* Floating icons */}
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <div
              key={index}
              className="absolute text-face-sky-blue/20 animate-float"
              style={{
                left: `${10 + (index * 20)}%`,
                top: `${15 + (index * 15)}%`,
                animationDuration: `${element.duration}s`,
                animationDelay: `${element.delay}s`
              }}
            >
              <IconComponent className="h-8 w-8" />
            </div>
          );
        })}
        
        {/* Mouse-following subtle glow */}
        <div 
          className="absolute w-96 h-96 bg-face-sky-blue/5 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <div 
            className={`mb-12 ${animateElements ? 'animate-bounce-custom' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            <h1 className="text-[12rem] md:text-[16rem] font-black text-transparent bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey bg-clip-text leading-none number-glow">
              404
            </h1>
          </div>

          {/* Award Icon */}
          <div 
            className={`inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-2xl animate-pulse-glow ${animateElements ? 'animate-bounce-custom' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            <Award className="h-12 w-12 text-face-sky-blue" />
          </div>

          {/* Main Message */}
          <div 
            className={`mb-8 ${animateElements ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              animation: animateElements ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-face-grey mb-6">
              Oops! Page Not <span className="text-face-sky-blue">Found</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              It seems this page has gone on its own excellence journey. Let's help you find your way back to celebrating remarkable achievements.
            </p>
          </div>

          {/* Suggested Actions */}
          <div 
            className={`grid md:grid-cols-3 gap-6 mb-12 ${animateElements ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              animation: animateElements ? 'fadeInUp 0.8s ease-out 0.8s both' : 'none'
            }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-face-sky-blue/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-face-sky-blue/10 rounded-full p-4 inline-flex mb-6 group-hover:bg-face-sky-blue group-hover:text-white transition-all duration-300">
                <Home className="h-8 w-8 text-face-sky-blue group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-face-grey mb-3">Return Home</h3>
              <p className="text-gray-600 mb-4">Go back to the main page and explore our awards</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-face-sky-blue/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-face-sky-blue/10 rounded-full p-4 inline-flex mb-6 group-hover:bg-face-sky-blue group-hover:text-white transition-all duration-300">
                <Trophy className="h-8 w-8 text-face-sky-blue group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-face-grey mb-3">View Nominees</h3>
              <p className="text-gray-600 mb-4">Discover current nominees and cast your vote</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-face-sky-blue/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-face-sky-blue/10 rounded-full p-4 inline-flex mb-6 group-hover:bg-face-sky-blue group-hover:text-white transition-all duration-300">
                <Search className="h-8 w-8 text-face-sky-blue group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-face-grey mb-3">Search Site</h3>
              <p className="text-gray-600 mb-4">Use our search to find what you're looking for</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center ${animateElements ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              animation: animateElements ? 'fadeInUp 0.8s ease-out 1.0s both' : 'none'
            }}
          >
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-10 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <Home className="inline h-6 w-6 mr-3 group-hover:animate-bounce-custom" />
              Take Me Home
            </button>
            
            <button 
              onClick={() => window.history.back()}
              className="border-2 border-face-sky-blue bg-transparent text-face-sky-blue hover:bg-face-sky-blue hover:text-white font-bold py-4 px-10 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <ArrowLeft className="inline h-6 w-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
              Go Back
            </button>
          </div>

          {/* Popular Links */}
          <div 
            className={`mt-16 ${animateElements ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              animation: animateElements ? 'fadeInUp 0.8s ease-out 1.2s both' : 'none'
            }}
          >
            <h3 className="text-2xl font-serif font-bold text-face-grey mb-8">
              Popular <span className="text-face-sky-blue">Destinations</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Current Nominees', href: '/nominees' },
                { label: 'Award Categories', href: '/categories' },
                { label: 'Past Winners', href: '/winners' },
                { label: 'About FACE', href: '/about' },
                { label: 'Event Gallery', href: '/gallery' }
              ].map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => window.location.href = link.href}
                  className="bg-white hover:bg-face-sky-blue text-face-grey hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-face-sky-blue/20 group"
                  style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                >
                  {link.label}
                  <ChevronRight className="inline h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Fun Message */}
          <div 
            className={`mt-16 bg-face-sky-blue/5 border border-face-sky-blue/20 rounded-2xl p-8 max-w-2xl mx-auto ${animateElements ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              animation: animateElements ? 'fadeInUp 0.8s ease-out 1.4s both' : 'none'
            }}
          >
                          <Sparkles className="h-12 w-12 text-face-sky-blue mx-auto mb-4" style={{animation: 'float 3s ease-in-out infinite'}} />
            <h4 className="text-xl font-bold text-face-grey mb-3">Did You Know?</h4>
            <p className="text-gray-600 leading-relaxed">
              Even this 404 page embodies our values of Excellence in design! Every detail, from the animations to the user experience, reflects our commitment to creating extraordinary digital experiences.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;