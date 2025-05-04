
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Trophy, 
  Calendar, 
  User, 
  Info, 
  ChartBar 
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
import CategoryStats from './CategoryStats';
import CategoryNomineePreview from './CategoryNomineePreview';

interface PastWinner {
  year: number;
  name: string;
  organization: string;
}

interface CategoryNominee {
  id: number;
  name: string;
  organization: string;
  image: string;
  bio: string;
  votes: number;
  impact: string;
  testimonials: string[];
}

interface CategoryStats {
  countries: { name: string; percentage: number }[];
  gender: { male: number; female: number; other: number };
  impactLevel: { high: number; medium: number; emerging: number };
}

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    description: string;
    criteria: string[];
    currentNominees: number;
    pastWinners: PastWinner[];
    nominees: CategoryNominee[];
    stats: CategoryStats;
    votingOpen: boolean;
    votingEnds: Date;
    color: string;
    region: string;
  };
  isAuthenticated: boolean;
  onLogin: () => void;
}

const CategoryCard = ({ category, isAuthenticated, onLogin }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleVoteClick = (categoryId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to vote for this category's nominees.",
        variant: "destructive"
      });
    } else {
      navigate(`/nominees?category=${categoryId}`);
    }
  };

  return (
    <Card className={`${category.color} border-gray-200 hover:shadow-lg transition-shadow overflow-hidden`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-serif text-face-blue">{category.name}</CardTitle>
          <Badge variant={category.votingOpen ? "default" : "outline"} className={category.votingOpen ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-600"}>
            {category.votingOpen ? "Voting Open" : "Voting Closed"}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600 mt-2">
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Info className="h-4 w-4 mr-1" /> Evaluation Criteria
            </h4>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              {category.criteria.map((criterion, idx) => (
                <li key={idx}>{criterion}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Trophy className="h-4 w-4 mr-1" /> Past Winners
            </h4>
            <div className="space-y-2">
              {category.pastWinners.map((winner, idx) => (
                <div key={idx} className="bg-white/70 p-2 rounded-md text-sm">
                  <div className="font-medium">{winner.name}</div>
                  <div className="text-xs text-gray-600 flex justify-between">
                    <span>{winner.organization}</span>
                    <span>{winner.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Category Stats */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full bg-white/70 border-gray-200 hover:bg-white">
                <ChartBar className="h-4 w-4 mr-2" /> View Category Stats
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{category.name} - Statistics</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 my-4">
                {category.stats && <CategoryStats stats={category.stats} />}
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Current Nominees */}
          {category.nominees && category.nominees.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-1" /> Top Nominees
              </h4>
              <div className="space-y-3">
                {category.nominees.slice(0, 2).map((nominee) => (
                  <CategoryNomineePreview key={nominee.id} nominee={nominee} />
                ))}
              </div>
            </div>
          )}
          
          {category.votingOpen && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1" /> Voting Timeline
              </h4>
              <div className="bg-white/70 p-2 rounded-md text-sm">
                <div className="text-center mb-1">Voting ends in</div>
                <div className="flex justify-center space-x-2 text-face-blue font-bold">
                  <span>{Math.ceil((category.votingEnds.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}</span>
                  <span>days</span>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <User className="h-4 w-4 mr-1" /> Current Nominees
            </h4>
            <div className="bg-white/70 p-2 rounded-md text-sm text-center">
              <span className="font-bold text-xl">{category.currentNominees}</span>
              <span className="block text-xs text-gray-600">qualified nominees</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-0">
        <Button 
          onClick={() => handleVoteClick(category.id)} 
          disabled={!category.votingOpen}
          className={`w-full ${category.votingOpen ? 'bg-face-gold hover:bg-yellow-500 text-face-blue' : 'bg-gray-200 text-gray-500'}`}
        >
          {category.votingOpen ? "View & Vote Nominees" : "Voting Closed"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
