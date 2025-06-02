import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useTrendingNominees } from '@/hooks/useApi';

interface TrendingNominee {
  name: string;
  category: string;
  votes?: number;
  voting_percentage?: number;
}

interface TrendingTickerProps {
  nominees?: TrendingNominee[]; // Optional prop, will use API if not provided
}

const TrendingTicker = ({ nominees: propNominees }: TrendingTickerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  // Fetch trending nominees from API if not provided via props
  const { data: trendingResponse } = useTrendingNominees();
  const apiNominees = trendingResponse?.data || [];

  // Use prop nominees if provided, otherwise use API data
  const nominees = propNominees || apiNominees;

  useEffect(() => {
    // Auto-rotate through trending nominees
    if (nominees.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % nominees.length);
    }, 4000); // Slightly longer interval for better readability
    
    return () => clearInterval(interval);
  }, [nominees.length]);

  // Don't render if no nominees
  if (!nominees || nominees.length === 0) {
    return null;
  }

  const currentNominee = nominees[currentIndex];

  return (
    <div 
      ref={tickerRef}
      className="bg-face-sky-blue/90 text-face-white py-3 w-full overflow-hidden backdrop-blur-sm border-b border-face-sky-blue-dark/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-face-white animate-pulse" />
            <div className="font-medium mr-3 font-manrope">Now Trending:</div>
          </div>
          <div className="flex items-center animate-fade-in">
            <ArrowRight className="h-4 w-4 mr-2 text-face-sky-blue-light" />
            <span className="font-semibold font-clash text-face-sky-blue-light">
              {currentNominee?.category}
            </span>
            <span className="mx-2 text-face-white/60">•</span>
            <span className="font-manrope">{currentNominee?.name}</span>
            {currentNominee?.votes && (
              <>
                <span className="mx-2 text-face-white/60">•</span>
                <span className="text-sm font-manrope text-face-white/80">
                  {currentNominee.votes} votes
                </span>
              </>
            )}
            {currentNominee?.voting_percentage && (
              <>
                <span className="mx-2 text-face-white/60">•</span>
                <span className="text-sm font-manrope text-face-white/80">
                  {currentNominee.voting_percentage.toFixed(1)}%
                </span>
              </>
            )}
          </div>
          
          {/* Progress dots for multiple nominees */}
          {nominees.length > 1 && (
            <div className="hidden md:flex items-center ml-4 space-x-1">
              {nominees.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-face-white' 
                      : 'bg-face-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingTicker;