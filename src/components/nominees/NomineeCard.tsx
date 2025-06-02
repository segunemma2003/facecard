import { useState, useEffect } from 'react';
import { Award, ThumbsUp, ArrowRight, Users, Star, Trophy, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useVote, useVoteCheck } from '@/hooks/useApi';

interface Nominee {
  id: number;
  name: string;
  organization: string;
  category: string;
  description: string;
  image_url?: string;
  votes: number;
  voting_percentage: number;
  can_vote: boolean;
  is_winner?: boolean;
  impact_summary?: string;
  location?: string;
}

interface NomineeCardProps {
  nominee: Nominee;
  onVoteSuccess?: (id: number, newVoteCount: number, newPercentage: number) => void;
}

const NomineeCard = ({ nominee, onVoteSuccess }: NomineeCardProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const navigate = useNavigate();

  // Use API hooks for voting
  const voteMutation = useVote();
  const { data: voteCheckResponse } = useVoteCheck(nominee.id);
  const hasVoted = voteCheckResponse?.data?.has_voted || false;

  const handleVote = async () => {
    if (hasVoted || !nominee.can_vote) return;
    
    setIsVoting(true);
    
    try {
      const result = await voteMutation.mutateAsync({ nomineeId: nominee.id });
      
      toast({
        title: "Vote Submitted!",
        description: `You've successfully voted for ${nominee.name}.`,
      });
      
      // Call parent callback if provided
      if (onVoteSuccess && result.data) {
        onVoteSuccess(
          nominee.id, 
          result.data.new_vote_count, 
          result.data.new_percentage
        );
      }
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "There was an error submitting your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleViewProfile = () => {
    navigate(`/nominees/${nominee.id}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  // Fallback image if none provided
  const imageUrl = nominee.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d';

  return (
    <Card className="group relative overflow-hidden bg-face-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] rounded-2xl">
      {/* Hero Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`${imageUrl}?w=600&h=400&fit=crop`} 
          alt={nominee.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-face-sky-blue/90 backdrop-blur-sm text-face-white border-0 shadow-lg px-3 py-1 text-xs font-semibold font-manrope">
            {nominee.category}
          </Badge>
        </div>
        
        {/* Winner Badge */}
        {nominee.is_winner && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-face-gold/90 backdrop-blur-sm text-face-grey border-0 shadow-lg px-3 py-1 text-xs font-semibold font-manrope">
              🏆 Winner
            </Badge>
          </div>
        )}
        
        {/* Award Icon (if not winner) */}
        {!nominee.is_winner && (
          <div className="absolute top-4 left-4">
            <div className="w-10 h-10 bg-face-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Award className="h-5 w-5 text-face-white" />
            </div>
          </div>
        )}
        
        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-face-white">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium text-sm font-manrope">{nominee.voting_percentage.toFixed(1)}% support</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span className="text-sm font-medium font-manrope">
                {nominee.votes} vote{nominee.votes !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <CardHeader className="pb-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-face-grey mb-1 group-hover:text-face-sky-blue transition-colors duration-300 font-clash">
              {nominee.name}
            </h3>
            <p className="text-face-sky-blue font-medium text-sm font-manrope">{nominee.organization}</p>
            {nominee.location && (
              <p className="text-face-grey/60 text-xs font-manrope mt-1">{nominee.location}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-0">
        {/* Description */}
        <p className="text-face-grey/80 leading-relaxed text-sm line-clamp-3 font-manrope">
          {nominee.impact_summary || nominee.description}
        </p>
        
        {/* Voting Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-face-grey font-manrope">Current Standing</span>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-face-sky-blue" />
              <span className="text-face-sky-blue font-bold font-manrope">{nominee.voting_percentage.toFixed(1)}%</span>
            </div>
          </div>
          <div className="relative">
            <Progress 
              value={nominee.voting_percentage} 
              className="h-3 bg-face-sky-blue/10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-face-white/20 to-transparent animate-pulse"></div>
          </div>
          <p className="text-xs text-face-grey/60 font-manrope">
            {nominee.voting_percentage > 40 ? 'Strong contender' : 
             nominee.voting_percentage > 25 ? 'Rising nominee' : 
             'Emerging candidate'}
          </p>
        </div>
      </CardContent>
      
      {/* Action Buttons */}
      <CardFooter className="border-t border-face-sky-blue/10 pt-6 space-y-3">
        {nominee.can_vote ? (
          <Button 
            className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 font-manrope ${
              hasVoted 
                ? 'bg-green-500 text-face-white hover:bg-green-600 shadow-lg' 
                : 'bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white shadow-lg hover:shadow-xl'
            }`}
            onClick={handleVote}
            disabled={isVoting || hasVoted || voteMutation.isPending}
          >
            {isVoting || voteMutation.isPending ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
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
          <div className="w-full text-center text-face-grey/60 py-3 bg-face-sky-blue/5 rounded-xl border border-face-sky-blue/20">
            <span className="text-sm font-medium font-manrope">Voting Period Ended</span>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full h-12 border-2 border-face-sky-blue/30 text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white hover:border-face-sky-blue rounded-xl font-medium transition-all duration-300 hover:shadow-lg font-manrope" 
          onClick={handleViewProfile}
        >
          <span className="flex items-center justify-center">
            View Full Profile 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </CardFooter>
      
      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-face-sky-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-face-sky-blue/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
    </Card>
  );
};

export default NomineeCard;