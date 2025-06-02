import { Calendar, Clock, Users, Timer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCategories } from '@/hooks/useApi';

interface UpcomingVotesProps {
  title?: string;
  maxItems?: number;
}

const UpcomingVotes = ({ 
  title = "Voting Status", 
  maxItems = 5 
}: UpcomingVotesProps) => {
  // Fetch all categories to check voting status
  const { data: categoriesResponse, isLoading } = useCategories();
  const categories = categoriesResponse?.data || [];

  // Separate categories by voting status
  const activeVoting = categories.filter(cat => 
    cat.voting_open && cat.voting_ends_at
  );
  
  const closedVoting = categories.filter(cat => 
    !cat.voting_open
  );



  const formatDateRange = (endDate: string | null): string => {
    if (!endDate) return 'TBD';
    
    const end = new Date(endDate);
    
    return end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="bg-face-sky-blue text-face-white pb-3">
          <CardTitle className="flex items-center text-xl font-clash">
            <Calendar className="h-5 w-5 mr-2" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center py-4">
            <p className="text-face-grey/60 font-manrope">Loading voting information...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-face-sky-blue text-face-white pb-3">
        <CardTitle className="flex items-center text-xl font-clash">
          <Calendar className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Active Voting Section */}
          {activeVoting.length > 0 && (
            <div>
              <h4 className="font-semibold text-face-sky-blue mb-3 flex items-center font-clash">
                <Timer className="h-4 w-4 mr-2" />
                Currently Voting ({activeVoting.length})
              </h4>
              {activeVoting.slice(0, maxItems).map((category) => (
                <div 
                  key={category.id} 
                  className="border border-face-sky-blue/20 rounded-lg p-4 hover:border-face-sky-blue/40 transition-colors bg-face-sky-blue/5"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-clash font-bold text-face-grey">{category.name}</h3>
                      <div className="flex items-center text-sm text-face-grey/60 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="font-manrope">
                          Ends: {category.voting_ends_at ? 
                            new Date(category.voting_ends_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'TBD'
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className="bg-green-500 text-white">
                        Active
                      </Badge>
                      <Badge variant="outline" className="bg-face-white border-face-sky-blue/30">
                        <Users className="h-3 w-3 mr-1" />
                        {category.nominees_count || category.current_nominees || 0}
                      </Badge>
                    </div>
                  </div>
                  
                  {category.days_remaining !== undefined && (
                    <div className="mt-3 text-right">
                      <span className={`text-xs font-medium font-manrope ${
                        category.days_remaining <= 1 ? 'text-red-600' : 
                        category.days_remaining <= 7 ? 'text-orange-600' : 
                        'text-face-sky-blue'
                      }`}>
                        {category.days_remaining === 0 ? 'Ends today!' : 
                         category.days_remaining === 1 ? 'Ends tomorrow!' :
                         `${category.days_remaining} days remaining`
                        }
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Closed/Upcoming Voting Section */}
          {closedVoting.length > 0 && (
            <div>
              <h4 className="font-semibold text-face-grey mb-3 flex items-center font-clash">
                <Calendar className="h-4 w-4 mr-2" />
                Other Categories ({closedVoting.length})
              </h4>
              {closedVoting.slice(0, maxItems).map((category) => (
                <div 
                  key={category.id} 
                  className="border border-face-grey/20 rounded-lg p-4 hover:border-face-sky-blue/30 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-clash font-bold text-face-grey">{category.name}</h3>
                      <div className="flex items-center text-sm text-face-grey/60 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="font-manrope">
                          {category.voting_ends_at ? 
                            `Ended: ${formatDateRange(category.voting_ends_at)}` : 
                            'Voting period TBD'
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant="outline" className="border-face-grey/30 text-face-grey">
                        Closed
                      </Badge>
                      <Badge variant="outline" className="bg-face-white border-face-sky-blue/30">
                        <Users className="h-3 w-3 mr-1" />
                        {category.nominees_count || category.current_nominees || 0}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {activeVoting.length === 0 && closedVoting.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🗳️</div>
              <p className="text-face-grey/60 font-manrope">
                No categories are available at this time.
              </p>
              <p className="text-face-grey/40 font-manrope text-sm mt-2">
                Check back later for voting opportunities!
              </p>
            </div>
          )}

          {/* Summary */}
          {(activeVoting.length > 0 || closedVoting.length > 0) && (
            <div className="border-t border-face-sky-blue/20 pt-4 mt-4">
              <div className="flex justify-between text-sm text-face-grey/60 font-manrope">
                <span>Active: {activeVoting.length}</span>
                <span>Other: {closedVoting.length}</span>
                <span>Total Categories: {categories.length}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingVotes;