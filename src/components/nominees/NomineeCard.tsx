
import { useState } from 'react';
import { Award, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface Nominee {
  id: number;
  name: string;
  organization: string;
  category: string;
  description: string;
  imageUrl: string;
  votingPercentage: number;
  canVote: boolean;
}

interface NomineeCardProps {
  nominee: Nominee;
  onVote?: (id: number) => void;
}

const NomineeCard = ({ nominee, onVote }: NomineeCardProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (hasVoted) return;
    
    setIsVoting(true);
    setTimeout(() => {
      setIsVoting(false);
      setHasVoted(true);
      if (onVote) {
        onVote(nominee.id);
      }
      toast({
        title: "Vote Submitted!",
        description: `You've successfully voted for ${nominee.name}.`,
      });
    }, 1000);
  };

  return (
    <Card className="overflow-hidden card-hover border border-gray-200">
      <div className="relative h-48">
        <img 
          src={`${nominee.imageUrl}?w=600&h=300&fit=crop`} 
          alt={nominee.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-face-blue text-white">
            {nominee.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl font-serif">{nominee.name}</CardTitle>
          <Award className="h-5 w-5 text-face-gold" />
        </div>
        <p className="text-sm text-gray-500">{nominee.organization}</p>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{nominee.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Current Standing</span>
            <span className="font-medium">{nominee.votingPercentage}%</span>
          </div>
          <Progress value={nominee.votingPercentage} className="h-2" />
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-4">
        {nominee.canVote ? (
          <Button 
            className={`w-full ${hasVoted ? 'bg-green-600' : 'bg-face-gold text-face-blue hover:bg-yellow-500'}`}
            onClick={handleVote}
            disabled={isVoting || hasVoted}
          >
            {isVoting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : hasVoted ? (
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Vote Recorded
              </span>
            ) : (
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Vote for Nominee
              </span>
            )}
          </Button>
        ) : (
          <div className="w-full text-center text-sm text-gray-500">
            Voting for this nominee has ended
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default NomineeCard;
