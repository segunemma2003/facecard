import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Calendar } from 'lucide-react';

interface CountdownTimerProps {
  endDate: Date;
  title?: string;
}

const CountdownTimer = ({ endDate, title = "Voting Ends In" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  
  return (
    <Card className="overflow-hidden border-2 border-brand-blue/30">
      <CardHeader className="bg-brand-blue text-white pb-3">
        <CardTitle className="flex items-center text-xl">
          <Timer className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-center items-center space-x-4">
          <div className="text-center">
            <div className="bg-brand-blue text-white rounded-md w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {formatNumber(timeLeft.days)}
            </div>
            <p className="text-xs mt-1 font-medium">Days</p>
          </div>
          <div className="text-center">
            <div className="bg-brand-blue text-white rounded-md w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {formatNumber(timeLeft.hours)}
            </div>
            <p className="text-xs mt-1 font-medium">Hours</p>
          </div>
          <div className="text-center">
            <div className="bg-brand-blue text-white rounded-md w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {formatNumber(timeLeft.minutes)}
            </div>
            <p className="text-xs mt-1 font-medium">Minutes</p>
          </div>
          <div className="text-center">
            <div className="bg-brand-blue text-white rounded-md w-16 h-16 flex items-center justify-center text-2xl font-bold animate-pulse">
              {formatNumber(timeLeft.seconds)}
            </div>
            <p className="text-xs mt-1 font-medium">Seconds</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>End Date: {endDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;