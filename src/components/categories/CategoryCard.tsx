import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Trophy, 
  Calendar, 
  User, 
  Info, 
  ChartBar,
  MapPin,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCategory, usePastWinners } from '@/hooks/useApi';

// Using API Category interface
interface CategoryCardProps {
  categoryId: number;
  showVoteButton?: boolean;
}

const CategoryCard = ({ categoryId, showVoteButton = true }: CategoryCardProps) => {
  const navigate = useNavigate();
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Fetch category details from API
  const { data: categoryResponse, isLoading: categoryLoading, error: categoryError } = useCategory(categoryId);
  const category = categoryResponse?.data;

  // Fetch past winners for this category
  const { data: winnersResponse } = usePastWinners({ 
    category: category?.name 
  });
  const pastWinners = winnersResponse?.data || [];

  const handleVoteClick = () => {
    navigate(`/nominees?category=${categoryId}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleViewNominees = () => {
    navigate(`/nominees?category=${categoryId}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  // Loading state
  if (categoryLoading) {
    return (
      <Card className="bg-face-white border-face-sky-blue/20 hover:shadow-lg transition-shadow overflow-hidden animate-pulse">
        <CardHeader className="pb-3">
          <div className="h-6 bg-face-sky-blue/10 rounded mb-2"></div>
          <div className="h-4 bg-face-sky-blue/5 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-16 bg-face-sky-blue/5 rounded"></div>
            <div className="h-12 bg-face-sky-blue/5 rounded"></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="h-10 bg-face-sky-blue/5 rounded w-full"></div>
        </CardFooter>
      </Card>
    );
  }

  // Error state
  if (categoryError || !category) {
    return (
      <Card className="bg-face-white border-red-200 hover:shadow-lg transition-shadow overflow-hidden">
        <CardContent className="p-6 text-center">
          <p className="text-red-600 font-manrope">Failed to load category</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-face-white border-face-sky-blue/20 hover:shadow-lg transition-shadow overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-clash text-face-sky-blue group-hover:text-face-sky-blue-dark transition-colors">
            {category.name}
          </CardTitle>
          <div className="flex flex-col items-end space-y-2">
            <Badge 
              variant={category.voting_open ? "default" : "outline"} 
              className={`font-manrope ${
                category.voting_open 
                  ? "bg-green-500 text-white hover:bg-green-600" 
                  : "bg-face-grey/10 text-face-grey border-face-grey/20"
              }`}
            >
              {category.voting_open ? "Voting Open" : "Voting Closed"}
            </Badge>
            <Badge variant="outline" className="text-xs border-face-sky-blue/30 text-face-sky-blue font-manrope">
              <MapPin className="h-3 w-3 mr-1" />
              {category.region}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-sm text-face-grey/80 mt-2 font-manrope leading-relaxed">
          {category.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Evaluation Criteria */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center font-clash text-face-grey">
              <Info className="h-4 w-4 mr-1 text-face-sky-blue" /> Evaluation Criteria
            </h4>
            <ul className="text-sm text-face-grey/80 list-disc pl-5 space-y-1 font-manrope">
              {category.criteria.map((criterion, idx) => (
                <li key={idx}>{criterion}</li>
              ))}
            </ul>
          </div>
          
          {/* Past Winners */}
          {pastWinners.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center font-clash text-face-grey">
                <Trophy className="h-4 w-4 mr-1 text-face-sky-blue" /> Past Winners
              </h4>
              <div className="space-y-2">
                {pastWinners.slice(0, 2).map((winner) => (
                  <div key={winner.id} className="bg-face-sky-blue/5 p-3 rounded-lg text-sm border border-face-sky-blue/10">
                    <div className="font-medium text-face-grey font-clash">{winner.name}</div>
                    <div className="text-xs text-face-grey/60 flex justify-between font-manrope mt-1">
                      <span>{winner.organization}</span>
                      <span className="text-face-sky-blue font-medium">{winner.year}</span>
                    </div>
                  </div>
                ))}
                {pastWinners.length > 2 && (
                  <p className="text-xs text-face-grey/60 text-center font-manrope">
                    +{pastWinners.length - 2} more winner{pastWinners.length - 2 !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Current Nominees Overview */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center font-clash text-face-grey">
              <User className="h-4 w-4 mr-1 text-face-sky-blue" /> Current Nominees
            </h4>
            <div className="bg-face-sky-blue/5 p-3 rounded-lg text-center border border-face-sky-blue/10">
              <span className="font-bold text-2xl text-face-sky-blue font-clash">
                {category.nominees_count}
              </span>
              <span className="block text-xs text-face-grey/60 font-manrope mt-1">
                qualified nominees
              </span>
              {category.total_votes > 0 && (
                <div className="mt-2 pt-2 border-t border-face-sky-blue/20">
                  <span className="text-sm text-face-sky-blue font-medium font-manrope">
                    {category.total_votes} votes cast
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Voting Timeline */}
          {category.voting_open && category.days_remaining !== undefined && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center font-clash text-face-grey">
                <Calendar className="h-4 w-4 mr-1 text-face-sky-blue" /> Voting Timeline
              </h4>
              <div className="bg-face-sky-blue/5 p-3 rounded-lg text-center border border-face-sky-blue/10">
                <div className="text-sm text-face-grey/80 mb-1 font-manrope">Voting ends in</div>
                <div className="flex justify-center items-center space-x-2">
                  <span className={`font-bold text-xl font-clash ${
                    category.days_remaining <= 1 ? 'text-red-500' : 
                    category.days_remaining <= 7 ? 'text-orange-500' : 
                    'text-face-sky-blue'
                  }`}>
                    {category.days_remaining}
                  </span>
                  <span className="text-sm text-face-grey/80 font-manrope">
                    day{category.days_remaining !== 1 ? 's' : ''}
                  </span>
                </div>
                {category.voting_ends_at && (
                  <div className="text-xs text-face-grey/60 mt-2 font-manrope">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {new Date(category.voting_ends_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Top Nominees Preview */}
          {category.nominees && category.nominees.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center font-clash text-face-grey">
                <Award className="h-4 w-4 mr-1 text-face-sky-blue" /> Top Nominees
              </h4>
              <div className="space-y-2">
                {category.nominees.slice(0, 2).map((nominee) => (
                  <div key={nominee.id} className="bg-face-white p-3 rounded-lg border border-face-sky-blue/10 hover:border-face-sky-blue/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={nominee.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'} 
                        alt={nominee.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-face-sky-blue/20"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-face-grey font-clash">{nominee.name}</div>
                        <div className="text-xs text-face-grey/60 font-manrope">{nominee.organization}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-face-sky-blue font-manrope">{nominee.votes} votes</div>
                        <div className="text-xs text-face-grey/60 font-manrope">
                          {nominee.voting_percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 pt-4">
        {showVoteButton && (
          <Button 
            onClick={handleVoteClick} 
            disabled={!category.voting_open}
            className={`w-full font-medium font-manrope transition-all duration-300 ${
              category.voting_open 
                ? 'bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white shadow-lg hover:shadow-xl' 
                : 'bg-face-grey/20 text-face-grey/60 cursor-not-allowed'
            }`}
          >
            {category.voting_open ? "Vote for Nominees" : "Voting Closed"}
          </Button>
        )}
        
        <Button 
          variant="outline"
          onClick={handleViewNominees}
          className="w-full border-face-sky-blue/30 text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white font-medium font-manrope transition-all duration-300"
        >
          View All Nominees ({category.nominees_count})
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;