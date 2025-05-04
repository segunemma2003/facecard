
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UpcomingVote {
  id: number;
  category: string;
  startsAt: Date;
  endsAt: Date;
  nominees: number;
}

interface UpcomingVotesProps {
  votes: UpcomingVote[];
  title?: string;
}

const UpcomingVotes = ({ votes, title = "Upcoming Voting Periods" }: UpcomingVotesProps) => {
  return (
    <Card>
      <CardHeader className="bg-face-gold text-face-blue pb-3">
        <CardTitle className="flex items-center text-xl">
          <Calendar className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {votes.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No upcoming voting periods scheduled.</p>
          ) : (
            votes.map((vote) => (
              <div 
                key={vote.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-face-gold transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-bold text-face-blue">{vote.category}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {vote.startsAt.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} - {vote.endsAt.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-face-blue/10">
                    {vote.nominees} Nominees
                  </Badge>
                </div>
                
                <div className="mt-3 text-right">
                  <span className="text-xs text-gray-500">
                    Starts in {Math.ceil((vote.startsAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingVotes;
