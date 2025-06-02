import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Calendar, Clock } from 'lucide-react';
import { useCategories } from '@/hooks/useApi';

interface CountdownTimerProps {
  endDate?: Date;
  title?: string;
  categoryId?: number; // Optional specific category to track
}

const CountdownTimer = ({ 
  endDate: propEndDate, 
  title = "Voting Ends In",
  categoryId 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  // Fetch voting categories to get real deadlines
  const { data: categoriesResponse } = useCategories({ voting_only: true });
  const votingCategories = categoriesResponse?.data || [];

  // Determine which end date to use
  const getEndDate = (): Date | null => {
    if (propEndDate) return propEndDate;
    
    if (categoryId) {
      const category = votingCategories.find(cat => cat.id === categoryId);
      return category?.voting_ends_at ? new Date(category.voting_ends_at) : null;
    }
    
    // Find the nearest voting deadline
    const nearestDeadline = votingCategories
      .filter(cat => cat.voting_ends_at && cat.voting_open)
      .map(cat => new Date(cat.voting_ends_at!))
      .sort((a, b) => a.getTime() - b.getTime())[0];
    
    return nearestDeadline || null;
  };

  const endDate = getEndDate();
  
  useEffect(() => {
    if (!endDate) return;

    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Don't render if no voting periods are active
  if (!endDate) {
    return (
      <Card className="overflow-hidden border-2 border-face-sky-blue/20">
        <CardHeader className="bg-face-sky-blue/10 text-face-grey pb-3">
          <CardTitle className="flex items-center text-xl font-clash">
            <Clock className="h-5 w-5 mr-2" />
            No Active Voting
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="text-face-grey/60 font-manrope">
            No voting periods are currently active. Check back soon for upcoming votes!
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border-2 border-face-sky-blue/30 shadow-lg">
      <CardHeader className={`${isExpired ? 'bg-face-grey' : 'bg-face-sky-blue'} text-face-white pb-3`}>
        <CardTitle className="flex items-center text-xl font-clash">
          <Timer className="h-5 w-5 mr-2" />
          {isExpired ? "Voting Has Ended" : title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isExpired ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⏰</div>
            <p className="text-face-grey font-semibold font-manrope text-lg">Time's Up!</p>
            <p className="text-face-grey/60 font-manrope text-sm mt-2">
              This voting period has concluded
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center space-x-2 md:space-x-4">
              <div className="text-center">
                <div className={`${
                  timeLeft.days <= 1 ? 'bg-red-500' : 'bg-face-sky-blue'
                } text-face-white rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-lg md:text-2xl font-bold font-clash shadow-lg`}>
                  {formatNumber(timeLeft.days)}
                </div>
                <p className="text-xs mt-1 font-medium text-face-grey font-manrope">Days</p>
              </div>
              <div className="text-face-sky-blue text-2xl font-bold">:</div>
              <div className="text-center">
                <div className={`${
                  timeLeft.days <= 1 ? 'bg-red-500' : 'bg-face-sky-blue'
                } text-face-white rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-lg md:text-2xl font-bold font-clash shadow-lg`}>
                  {formatNumber(timeLeft.hours)}
                </div>
                <p className="text-xs mt-1 font-medium text-face-grey font-manrope">Hours</p>
              </div>
              <div className="text-face-sky-blue text-2xl font-bold">:</div>
              <div className="text-center">
                <div className={`${
                  timeLeft.days <= 1 ? 'bg-red-500' : 'bg-face-sky-blue'
                } text-face-white rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-lg md:text-2xl font-bold font-clash shadow-lg`}>
                  {formatNumber(timeLeft.minutes)}
                </div>
                <p className="text-xs mt-1 font-medium text-face-grey font-manrope">Minutes</p>
              </div>
              <div className="text-face-sky-blue text-2xl font-bold">:</div>
              <div className="text-center">
                <div className={`${
                  timeLeft.days <= 1 ? 'bg-red-500 animate-pulse' : 'bg-face-sky-blue animate-pulse'
                } text-face-white rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-lg md:text-2xl font-bold font-clash shadow-lg`}>
                  {formatNumber(timeLeft.seconds)}
                </div>
                <p className="text-xs mt-1 font-medium text-face-grey font-manrope">Seconds</p>
              </div>
            </div>
            
            {timeLeft.days <= 1 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-center text-red-600 font-semibold text-sm font-manrope">
                  ⚠️ Less than 24 hours remaining!
                </p>
              </div>
            )}
          </>
        )}
        
        <div className="mt-4 flex items-center justify-center text-sm text-face-grey/60">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="font-manrope">
            End Date: {endDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;