import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface TrendingNominee {
  name: string;
  category: string;
}

interface TrendingTickerProps {
  nominees: TrendingNominee[];
}

const TrendingTicker = ({ nominees }: TrendingTickerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-rotate through trending nominees
    if (nominees.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % nominees.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nominees.length]);

  return (
    <div 
      ref={tickerRef}
      className="bg-brand-blue/90 text-brand-white py-2 w-full overflow-hidden backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="font-medium mr-3">Now Trending:</div>
          <div className="flex items-center animate-pulse">
            <ArrowRight className="h-4 w-4 mr-2" />
            <span className="font-semibold">{nominees[currentIndex]?.category}</span>
            <span className="mx-2">•</span>
            <span>{nominees[currentIndex]?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTicker;