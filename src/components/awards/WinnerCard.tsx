import { Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Winner {
  id: number;
  name: string;
  category: string;
  achievement: string;
  imageUrl: string;
  organization?: string; // Optional since it might not always be present
  year?: number; // Optional since it might not always be present
}

interface WinnerCardProps {
  winner: Winner;
}

const WinnerCard = ({ winner }: WinnerCardProps) => {
  return (
    <Card className="overflow-hidden face-card-hover border-face-sky-blue/20 shadow-md bg-face-white">
      <div className="relative h-60">
        <img 
          src={`${winner.imageUrl}?w=600&h=400&fit=crop`} 
          alt={winner.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image if winner image fails to load
            e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop';
          }}
        />
        <div className="absolute top-4 right-4">
          <div className="bg-face-sky-blue p-2 rounded-full">
            <Trophy className="h-5 w-5 text-face-white" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-face-sky-blue text-face-white border-face-sky-blue font-manrope">
            {winner.category}
          </Badge>
        </div>
        {winner.year && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-face-white/90 text-face-sky-blue border-face-white font-manrope">
              {winner.year}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="pt-5">
        <h3 className="text-xl font-clash font-bold mb-2 text-face-sky-blue">
          {winner.name}
        </h3>
        {winner.organization && (
          <p className="text-sm text-face-grey/60 mb-2 font-manrope font-medium">
            {winner.organization}
          </p>
        )}
        <p className="text-face-grey/80 font-manrope leading-relaxed">
          {winner.achievement}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <button className="text-sm text-face-sky-blue font-medium hover:underline font-manrope transition-colors">
          View Winner Profile →
        </button>
      </CardFooter>
    </Card>
  );
};

export default WinnerCard;