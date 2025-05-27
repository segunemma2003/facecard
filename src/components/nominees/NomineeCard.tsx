
import { useState } from 'react';
import { Award, ThumbsUp, ArrowRight, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleViewProfile = () => {
    navigate(`/nominees/${nominee.id}`);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <Card className="card-modern overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={`${nominee.imageUrl}?w=600&h=400&fit=crop`} 
          alt={nominee.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-brand-blue text-white border-0 shadow-lg">
            {nominee.category}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center text-white text-sm">
            <Users className="h-4 w-4 mr-2" />
            <span className="font-medium">{nominee.votingPercentage}% voted</span>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-brand-grey mb-2" style={{ fontFamily: 'Clash Display' }}>
              {nominee.name}
            </CardTitle>
            <p className="text-brand-blue font-medium">{nominee.organization}</p>
          </div>
          <Award className="h-6 w-6 text-brand-blue flex-shrink-0" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-brand-grey/80 leading-relaxed">{nominee.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-brand-grey">Current Standing</span>
            <span className="text-brand-blue">{nominee.votingPercentage}%</span>
          </div>
          <Progress 
            value={nominee.votingPercentage} 
            className="h-3 bg-brand-blue-light"
          />
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-brand-blue/10 pt-6 flex flex-col space-y-3">
        {nominee.canVote ? (
          <Button 
            className={`w-full ${
              hasVoted 
                ? 'bg-green-500 text-white hover:bg-green-600 border-green-500' 
                : 'btn-primary'
            }`}
            onClick={handleVote}
            disabled={isVoting || hasVoted}
          >
            {isVoting ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
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
          <div className="w-full text-center text-brand-grey/60 py-3 bg-brand-blue-light rounded-lg">
            Voting for this nominee has ended
          </div>
        )}
        <Button 
          variant="outline" 
          className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" 
          onClick={handleViewProfile}
        >
          View Full Profile 
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NomineeCard;
