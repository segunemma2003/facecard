import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, TrendingUp, Users, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Next voting end date (one month from now)
const nextVotingEnd = new Date(new Date().setDate(new Date().getDate() + 30));

const Hero = () => {
  const countRef = useRef<HTMLDivElement>(null);
  const [days, hours, minutes, seconds] = useCountdown(nextVotingEnd);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter-value');
            counters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              let count = 0;
              const updateCounter = () => {
                const increment = target / 100;
                if (count < target) {
                  count += increment;
                  (counter as HTMLElement).innerText = Math.ceil(count).toString();
                  setTimeout(updateCounter, 10);
                } else {
                  (counter as HTMLElement).innerText = target.toString();
                }
              };
              updateCounter();
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-20 pb-16 flex flex-col justify-center flex-grow">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="mb-6 inline-block">
            <Award className="h-16 w-16 text-face-gold animate-bounce-slow mx-auto" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-transparent bg-clip-text gold-gradient trophy-shine">Celebrating Impact</span>
            <br />
            Across the Globe
          </h1>
          
          {/* Live Countdown Timer */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
            <p className="text-sm mb-2">Voting ends in:</p>
            <div className="flex justify-center space-x-2 text-xl font-bold">
              <div className="flex flex-col items-center">
                <span>{days}</span>
                <span className="text-xs text-gray-300">days</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{hours}</span>
                <span className="text-xs text-gray-300">hrs</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{minutes}</span>
                <span className="text-xs text-gray-300">min</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center animate-pulse">
                <span>{seconds}</span>
                <span className="text-xs text-gray-300">sec</span>
              </div>
            </div>
          </div>
          
          <p className="text-xl mb-8 animate-fade-in opacity-90">
            Celebrating Focus, Achievement, Courage, and Excellence across the globe. 
            Recognizing outstanding individuals and organizations making remarkable contributions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="bg-face-gold hover:bg-yellow-500 text-face-blue font-medium">
              <Link to="/nominees">Current Nominees</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-face-gold text-white hover:bg-face-gold/20">
              <Link to="/registration">Register for Event</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div 
          ref={countRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-fade-in"
        >
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg text-center">
            <div className="flex justify-center mb-3">
              <Trophy className="h-8 w-8 text-face-gold" />
            </div>
            <div className="counter-value text-3xl md:text-4xl font-bold text-white" data-target="240">0</div>
            <p className="text-sm text-gray-200">Award Recipients</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg text-center">
            <div className="flex justify-center mb-3">
              <Users className="h-8 w-8 text-face-gold" />
            </div>
            <div className="counter-value text-3xl md:text-4xl font-bold text-white" data-target="50">0</div>
            <p className="text-sm text-gray-200">Countries Represented</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg text-center">
            <div className="flex justify-center mb-3">
              <Award className="h-8 w-8 text-face-gold" />
            </div>
            <div className="counter-value text-3xl md:text-4xl font-bold text-white" data-target="12">0</div>
            <p className="text-sm text-gray-200">Award Categories</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg text-center">
            <div className="flex justify-center mb-3">
              <TrendingUp className="h-8 w-8 text-face-gold" />
            </div>
            <div className="counter-value text-3xl md:text-4xl font-bold text-white" data-target="15">0</div>
            <p className="text-sm text-gray-200">Years of Excellence</p>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

// Custom countdown hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  function calculateTimeLeft(targetDate: Date) {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return [0, 0, 0, 0];
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return [days, hours, minutes, seconds];
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default Hero;
