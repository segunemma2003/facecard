import { Link } from 'react-router-dom';
import { ArrowRight, Award, Star, Users, Trophy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategoryStats, useCategories, useSetting } from '@/hooks/useApi';

const Hero = () => {
  // Fetch real-time data from API
  const { data: statsResponse, isLoading: statsLoading } = useCategoryStats();
  const { data: categoriesResponse, isLoading: categoriesLoading } = useCategories({ voting_only: true });
  const { data: votingEnabledResponse } = useSetting('voting_enabled');
  
  const stats = statsResponse?.data;
  const votingCategories = categoriesResponse?.data || [];
  const votingEnabled = votingEnabledResponse?.data?.value !== false;
  
  // Calculate dynamic stats
  const totalNominees = stats?.total_nominees || 0;
  const activeVotingCategories = stats?.active_voting_categories || 0;
  const totalCategories = stats?.total_categories || 12;
  const totalVotes = stats?.total_votes || 0;
  
  // Calculate days remaining (find the nearest deadline)
  const daysRemaining = votingCategories.reduce((min, category) => {
    if (category.voting_open && category.days_remaining !== undefined) {
      return min === null ? category.days_remaining : Math.min(min, category.days_remaining);
    }
    return min;
  }, null as number | null);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-face-white/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-face-white/20 transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-face-white/10 rounded-full animate-pulse backdrop-blur-sm"></div>
        <div className="absolute bottom-20 right-40 w-40 h-40 border border-face-white/20 rounded-lg transform rotate-12 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-face-white/5 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-face-white/5 rounded-full animate-pulse"></div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-face-white space-y-8">              
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in font-clash">
                  Celebrating
                  <br />
                  <span className="bg-gradient-to-r from-face-white via-face-sky-blue-light to-face-white bg-clip-text text-transparent">
                    Global Excellence
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl opacity-90 leading-relaxed animate-slide-in delay-300 font-manrope">
                  Recognizing outstanding achievements in{' '}
                  <span className="font-semibold text-face-sky-blue-light">Focus</span>,{' '}
                  <span className="font-semibold text-face-sky-blue-light">Achievement</span>,{' '}
                  <span className="font-semibold text-face-sky-blue-light">Courage</span>, and{' '}
                  <span className="font-semibold text-face-sky-blue-light">Excellence</span>{' '}
                  across the world.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-scale-up delay-500">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue-light hover:text-face-white border-2 border-face-white shadow-2xl text-lg px-8 py-6 h-auto rounded-xl font-semibold transition-all duration-300 font-manrope"
                  onClick={handleScrollToTop}
                >
                  <Link to="/nominees" className="flex items-center">
                    View Current Nominees
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-lg px-8 py-6 h-auto rounded-xl font-semibold backdrop-blur-sm font-manrope"
                  onClick={handleScrollToTop}
                >
                  <Link to="/registration">Register for Event</Link>
                </Button>
              </div>
              
              {/* Dynamic Stats */}
              <div className="flex flex-wrap gap-6 pt-4 animate-fade-in delay-700">
                <div className="flex items-center text-face-white/90">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span className="font-medium font-manrope">
                    {statsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin inline" />
                    ) : (
                      `${totalVotes}+ Votes Cast`
                    )}
                  </span>
                </div>
                <div className="flex items-center text-face-white/90">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-medium font-manrope">50+ Countries</span>
                </div>
                <div className="flex items-center text-face-white/90">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="font-medium font-manrope">
                    {statsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin inline" />
                    ) : (
                      `${totalCategories} Categories`
                    )}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Feature Highlight */}
            <div className="animate-fade-in delay-700">
              <div className="relative">
                {/* Main Feature Card */}
                <div className="bg-face-white/10 backdrop-blur-lg p-8 rounded-3xl border border-face-white/20 shadow-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-4 h-4 rounded-full mr-3 ${
                      votingEnabled ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                    }`}></div>
                    <span className="font-semibold uppercase text-face-white text-sm tracking-wider font-manrope">
                      {votingEnabled ? 'Current Highlight' : 'Coming Soon'}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-face-white font-clash">
                    {votingEnabled ? '2025 Voting Now Open' : '2025 Awards Coming Soon'}
                  </h3>
                  
                  <p className="text-face-white/90 mb-6 leading-relaxed font-manrope">
                    {votingEnabled 
                      ? `Cast your vote for outstanding nominees across ${totalCategories} categories representing innovation and excellence from around the world.`
                      : 'Get ready for our upcoming awards ceremony. Stay tuned for nominee announcements and voting details.'
                    }
                  </p>
                  
                  {/* Dynamic Mini Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-face-white font-clash">
                        {statsLoading || categoriesLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        ) : (
                          totalNominees
                        )}
                      </div>
                      <div className="text-xs text-face-white/70 font-manrope">
                        {votingEnabled ? 'Active Nominees' : 'Total Nominees'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-face-white font-clash">
                        {statsLoading || categoriesLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        ) : (
                          votingEnabled ? activeVotingCategories : totalCategories
                        )}
                      </div>
                      <div className="text-xs text-face-white/70 font-manrope">
                        {votingEnabled ? 'Open Categories' : 'Total Categories'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-face-white font-clash">
                        {statsLoading || categoriesLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        ) : daysRemaining !== null ? (
                          daysRemaining
                        ) : votingEnabled ? (
                          '∞'
                        ) : (
                          'TBA'
                        )}
                      </div>
                      <div className="text-xs text-face-white/70 font-manrope">
                        {votingEnabled 
                          ? (daysRemaining !== null ? 'Days Left' : 'Open Voting')
                          : 'Announcement'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    asChild
                    className={`w-full shadow-xl rounded-xl font-semibold py-3 font-manrope ${
                      votingEnabled 
                        ? 'bg-face-sky-blue text-face-white hover:bg-face-sky-blue-dark' 
                        : 'bg-face-white/20 text-face-white/80 cursor-not-allowed'
                    }`}
                    onClick={handleScrollToTop}
                    disabled={!votingEnabled}
                  >
                    <Link to={votingEnabled ? "/nominees" : "#"} className="flex items-center justify-center">
                      {votingEnabled ? 'Cast Your Vote' : 'Voting Closed'}
                      {votingEnabled && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </div>
                
                {/* Floating Decoration */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-face-white/20 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-face-white/10 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            fill="#FFFFFF" 
            fillOpacity="1" 
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;