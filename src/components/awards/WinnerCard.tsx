
import { Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Winner {
  id: number;
  name: string;
  category: string;
  achievement: string;
  imageUrl: string;
}

interface WinnerCardProps {
  winner: Winner;
}

const WinnerCard = ({ winner }: WinnerCardProps) => {
  return (
    <Card className="overflow-hidden card-hover border-none shadow-md">
      <div className="relative h-60">
        <img 
          src={`${winner.imageUrl}?w=600&h=400&fit=crop`} 
          alt={winner.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-face-gold p-2 rounded-full">
            <Trophy className="h-5 w-5 text-face-blue" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-face-blue text-white">{winner.category}</Badge>
        </div>
      </div>
      
      <CardContent className="pt-5">
        <h3 className="text-xl font-serif font-bold mb-2 text-face-blue">
          {winner.name}
        </h3>
        <p className="text-gray-600">
          {winner.achievement}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <a href="#" className="text-sm text-face-burgundy font-medium hover:underline">
          View Winner Profile →
        </a>
      </CardFooter>
    </Card>
  );
};

export default WinnerCard;
