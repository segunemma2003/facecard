import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Using API Nominee interface
interface CategoryNominee {
  id: number;
  name: string;
  organization: string;
  image_url?: string;
  description: string;
  votes: number;
  voting_percentage: number;
  impact_summary?: string;
  location?: string;
}

interface CategoryNomineePreviewProps {
  nominee: CategoryNominee;
}

const CategoryNomineePreview = ({ nominee }: CategoryNomineePreviewProps) => {
  const navigate = useNavigate();

  const handleViewFullProfile = () => {
    navigate(`/nominees/${nominee.id}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const imageUrl = nominee.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d';

  return (
    <Dialog key={nominee.id}>
      <DialogTrigger asChild>
        <div className="bg-face-white/70 p-3 rounded-lg text-sm hover:bg-face-white hover:shadow-md transition-all cursor-pointer border border-face-sky-blue/10 hover:border-face-sky-blue/30">
          <div className="flex items-center space-x-3">
            <img 
              src={`${imageUrl}?w=60&h=60&fit=crop`} 
              alt={nominee.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-face-sky-blue/20"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop';
              }}
            />
            <div className="flex-1">
              <div className="font-medium text-face-grey font-clash">{nominee.name}</div>
              <div className="text-xs text-face-grey/60 font-manrope">{nominee.organization}</div>
              {nominee.location && (
                <div className="text-xs text-face-sky-blue font-manrope">{nominee.location}</div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-face-grey/70 font-manrope">Current support</span>
              <span className="font-medium text-face-sky-blue font-manrope">
                {nominee.voting_percentage.toFixed(1)}% ({nominee.votes} votes)
              </span>
            </div>
            <Progress 
              value={nominee.voting_percentage} 
              className="h-2 bg-face-sky-blue/10"
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center font-clash text-face-sky-blue">
            <Award className="h-5 w-5 mr-2" />
            Nominee Preview
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src={`${imageUrl}?w=200&h=200&fit=crop`} 
              alt={nominee.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-face-sky-blue/20"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop';
              }}
            />
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg text-face-grey font-clash">{nominee.name}</h3>
              <p className="text-sm text-face-sky-blue font-medium font-manrope">{nominee.organization}</p>
              {nominee.location && (
                <p className="text-sm text-face-grey/60 font-manrope">{nominee.location}</p>
              )}
              <div className="flex items-center justify-center sm:justify-start mt-3">
                <div className="text-sm font-medium mr-2 text-face-grey font-manrope">Current support:</div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={nominee.voting_percentage} 
                    className="h-2 w-20 bg-face-sky-blue/10"
                  />
                  <span className="font-bold text-face-sky-blue font-manrope">
                    {nominee.voting_percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-face-grey/60 mt-1 font-manrope">
                {nominee.votes} vote{nominee.votes !== 1 ? 's' : ''} received
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-face-grey font-clash">Description</h4>
            <p className="text-sm text-face-grey/80 leading-relaxed font-manrope">
              {nominee.description}
            </p>
          </div>
          
          {nominee.impact_summary && (
            <div>
              <h4 className="font-medium mb-2 text-face-grey font-clash">Impact Summary</h4>
              <p className="text-sm text-face-grey/80 leading-relaxed font-manrope">
                {nominee.impact_summary}
              </p>
            </div>
          )}
          
          <div className="border-t border-face-sky-blue/20 pt-4">
            <Button 
              onClick={handleViewFullProfile}
              className="w-full bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white font-manrope"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryNomineePreview;