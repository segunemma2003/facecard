import { useState } from 'react';
import { Award, ThumbsUp, ArrowRight, Users, Star, Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <Card className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] rounded-2xl">
      {/* Hero Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`${nominee.imageUrl}?w=600&h=400&fit=crop`} 
          alt={nominee.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-brand-blue/90 backdrop-blur-sm text-white border-0 shadow-lg px-3 py-1 text-xs font-semibold">
            {nominee.category}
          </Badge>
        </div>
        
        {/* Award Icon */}
        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium text-sm">{nominee.votingPercentage}% support</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span className="text-sm font-medium">Nominee</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <CardHeader className="pb-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-brand-grey mb-1 group-hover:text-brand-blue transition-colors duration-300" 
                style={{ fontFamily: 'Clash Display' }}>
              {nominee.name}
            </h3>
            <p className="text-brand-blue font-medium text-sm">{nominee.organization}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-0">
        {/* Description */}
        <p className="text-brand-grey/80 leading-relaxed text-sm line-clamp-3">
          {nominee.description}
        </p>
        
        {/* Voting Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-brand-grey">Current Standing</span>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-brand-blue" />
              <span className="text-brand-blue font-bold">{nominee.votingPercentage}%</span>
            </div>
          </div>
          <div className="relative">
            <Progress 
              value={nominee.votingPercentage} 
              className="h-3 bg-brand-blue/10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
          <p className="text-xs text-brand-grey/60">
            {nominee.votingPercentage > 40 ? 'Strong contender' : nominee.votingPercentage > 25 ? 'Rising nominee' : 'Emerging candidate'}
          </p>
        </div>
      </CardContent>
      
      {/* Action Buttons */}
      <CardFooter className="border-t border-brand-blue/10 pt-6 space-y-3">
        {nominee.canVote ? (
          <Button 
            className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 ${
              hasVoted 
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg' 
                : 'bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg hover:shadow-xl'
            }`}
            onClick={handleVote}
            disabled={isVoting || hasVoted}
          >
            {isVoting ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Processing Vote...
              </span>
            ) : hasVoted ? (
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Vote Recorded!
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Vote for {nominee.name.split(' ')[0]}
              </span>
            )}
          </Button>
        ) : (
          <div className="w-full text-center text-brand-grey/60 py-3 bg-brand-blue/5 rounded-xl border border-brand-blue/20">
            <span className="text-sm font-medium">Voting Period Ended</span>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full h-12 border-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue hover:text-white hover:border-brand-blue rounded-xl font-medium transition-all duration-300 hover:shadow-lg" 
          onClick={handleViewProfile}
        >
          <span className="flex items-center justify-center">
            View Full Profile 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </CardFooter>
      
      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-brand-blue/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
    </Card>
  );
};

export default NomineeCard;