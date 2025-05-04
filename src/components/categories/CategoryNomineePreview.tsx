
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';

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

interface CategoryNomineePreviewProps {
  nominee: CategoryNominee;
}

const CategoryNomineePreview = ({ nominee }: CategoryNomineePreviewProps) => {
  return (
    <Dialog key={nominee.id}>
      <DialogTrigger asChild>
        <div className="bg-white/70 p-3 rounded-md text-sm hover:bg-white hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center space-x-3">
            <img 
              src={`${nominee.image}?w=60&h=60&fit=crop`} 
              alt={nominee.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{nominee.name}</div>
              <div className="text-xs text-gray-600">{nominee.organization}</div>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Current votes</span>
              <span className="font-medium">{nominee.votes}%</span>
            </div>
            <Progress value={nominee.votes} className="h-1.5 animate-pulse" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nominee Impact</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src={`${nominee.image}?w=200&h=200&fit=crop`} 
              alt={nominee.name} 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-lg">{nominee.name}</h3>
              <p className="text-sm text-gray-600">{nominee.organization}</p>
              <div className="flex items-center mt-2">
                <div className="text-sm font-medium mr-2">Current votes:</div>
                <Progress value={nominee.votes} className="h-2 w-24" />
                <span className="ml-2 font-bold">{nominee.votes}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Bio</h4>
            <p className="text-sm">{nominee.bio}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Impact</h4>
            <p className="text-sm">{nominee.impact}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Testimonials</h4>
            <div className="space-y-2">
              {nominee.testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-md text-sm italic">
                  "{testimonial}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryNomineePreview;
