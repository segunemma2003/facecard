// src/pages/Nominees.tsx
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Filter, PieChart, Calendar, Users, Trophy, Star, Clock, Vote, TrendingUp, Globe, Sparkles, ChevronRight, Play, Heart, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useCategories, useNominees, useVote, useUserVotes, useCategoryStats } from '@/hooks/useApi';
import { toast } from '@/components/ui/use-toast';

const Nominees = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [votingEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 30)));
  
  // API Hooks
  const { data: categoriesResponse, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: nomineesResponse, isLoading: nomineesLoading, error: nomineesError } = useNominees({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    order_by: 'votes',
    order_direction: 'desc'
  });
  const { data: userVotesResponse } = useUserVotes();
  const { data: statsResponse } = useCategoryStats();
  const voteMutation = useVote();
  
  const categories = categoriesResponse?.data || [];
  const nominees = nomineesResponse?.data || [];
  const userVotes = userVotesResponse?.data || [];
  const stats = statsResponse?.data;
  
  // Get voted nominee IDs
  const votedNomineeIds = new Set(
    userVotes.flatMap(categoryVote => categoryVote.voted_nominees)
  );
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleVote = async (nomineeId: number) => {
    if (votedNomineeIds.has(nomineeId)) {
      toast({
        title: "Already voted",
        description: "You have already voted for this nominee.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await voteMutation.mutateAsync({ nomineeId });
      toast({
        title: "Vote recorded!",
        description: "Thank you for your vote. It has been successfully recorded.",
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to record vote. Please try again.";
      toast({
        title: "Vote failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = votingEndDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [votingEndDate]);

  const NomineeCard = ({ nominee, index }: { nominee: any; index: number }) => {
    const hasVoted = votedNomineeIds.has(nominee.id);
    const isVoting = voteMutation.isPending;
    
    return (
      <div 
        className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-face-sky-blue/10 overflow-hidden"
        onMouseEnter={() => setHoveredCard(nominee.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={nominee.image_url || `https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`}
            alt={nominee.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Vote status indicator */}
          {hasVoted && (
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          )}

          {/* Floating vote button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button 
              onClick={() => handleVote(nominee.id)}
              disabled={hasVoted || isVoting || !nominee.can_vote}
              className={`p-3 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ${
                hasVoted 
                  ? 'bg-green-500 text-white cursor-default' 
                  : nominee.can_vote 
                    ? 'bg-face-sky-blue hover:bg-face-sky-blue-dark text-white' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isVoting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : hasVoted ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Heart className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Impact badge */}
          {nominee.impact_summary && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-face-sky-blue font-bold text-sm">{nominee.impact_summary}</span>
            </div>
          )}

          {/* Vote percentage indicator */}
          <div className="absolute top-4 left-4">
            <div className="bg-face-sky-blue text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {nominee.voting_percentage.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-4">
            <h3 className="text-2xl font-serif font-bold text-face-grey mb-2 group-hover:text-face-sky-blue transition-colors duration-300">
              {nominee.name}
            </h3>
            <p className="text-face-sky-blue font-medium text-sm">{nominee.organization}</p>
            <p className="text-gray-500 text-sm">{nominee.category}</p>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {nominee.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-500">
              <Vote className="h-4 w-4" />
              <span className="text-sm font-medium">{nominee.votes.toLocaleString()} votes</span>
            </div>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark transition-all duration-1000 ease-out"
                style={{ 
                  width: `${nominee.voting_percentage}%`,
                  animation: animateStats ? `growWidth 1s ease-out ${index * 0.1}s both` : 'none'
                }}
              ></div>
            </div>
          </div>

          {/* Action button */}
          <button 
            onClick={() => handleVote(nominee.id)}
            disabled={hasVoted || isVoting || !nominee.can_vote}
            className={`w-full font-bold py-4 px-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group ${
              hasVoted 
                ? 'bg-green-500 text-white cursor-default'
                : nominee.can_vote 
                  ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark hover:from-face-sky-blue-dark hover:to-face-grey text-white'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {isVoting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Voting...
                </>
              ) : hasVoted ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Voted
                </>
              ) : nominee.can_vote ? (
                <>
                  Vote Now
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              ) : (
                'Voting Closed'
              )}
            </span>
          </button>
        </div>
      </div>
    );
  };

  // Loading state
  if (categoriesLoading || nomineesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-gray-600">Loading nominees...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (categoriesError || nomineesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">Failed to load nominees</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-face-sky-blue text-white px-6 py-2 rounded-lg hover:bg-face-sky-blue-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
      <Navbar />
      
      {/* Custom styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes growWidth {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(135, 206, 235, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(135, 206, 235, 0.6);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      
      {/* Hero section */}
      <section className="relative py-40 bg-face-grey overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="FACE Awards nominees background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Animated decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white rounded-full animate-float"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-60 right-60 w-12 h-12 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Extraordinary icon */}
            <div className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-2xl animate-pulse-glow">
              <Award className="h-14 w-14 text-white animate-float" />
            </div>
            
            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-white leading-tight">
              Current <span className="bg-gradient-to-r from-white via-face-sky-blue-light to-white bg-clip-text text-transparent animate-pulse">Nominees</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Vote for outstanding individuals and organizations making remarkable contributions across various sectors worldwide
            </p>
            
            {/* Floating stats */}
            <div className="flex flex-wrap justify-center gap-8 text-lg text-white mb-12">
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Users className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{stats?.total_nominees || nominees.length}</div>
                  <div className="text-sm opacity-90">Active Nominees</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Trophy className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{stats?.active_voting_categories || categories.length}</div>
                  <div className="text-sm opacity-90">Categories Open</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Vote className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{stats?.total_votes?.toLocaleString() || '0'}</div>
                  <div className="text-sm opacity-90">Total Votes</div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce">
              <ChevronRight className="h-8 w-8 text-white mx-auto rotate-90" />
            </div>
          </div>
        </div>
        
        {/* Enhanced wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: 'white', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#f8fafc', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'white', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <path 
              fill="url(#waveGradient)" 
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>
      
      {/* Countdown Timer */}
      <section className="py-20 bg-gradient-to-r from-white via-face-sky-blue/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                <Clock className="inline h-10 w-10 text-face-sky-blue mr-3" />
                Voting Ends In
              </h2>
              <p className="text-xl text-gray-600">Make your voice heard before time runs out!</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <div className="bg-gradient-to-br from-face-sky-blue to-face-sky-blue-dark text-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
                    <div className="text-4xl md:text-5xl font-bold mb-2 font-mono">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-sm uppercase tracking-wider opacity-90">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Navigation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                <Filter className="inline h-10 w-10 text-face-sky-blue mr-3" />
                Filter by Category
              </h2>
              <p className="text-xl text-gray-600">Explore nominees across different categories of excellence</p>
            </div>
            
            <div className="flex justify-center mb-16">
              <div className="bg-white p-2 rounded-2xl shadow-2xl border border-face-sky-blue/20">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-8 py-4 mx-1 text-lg font-medium rounded-xl transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark text-white shadow-xl transform scale-105'
                      : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-8 py-4 mx-1 text-lg font-medium rounded-xl transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark text-white shadow-xl transform scale-105'
                        : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nominees Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                Exceptional <span className="text-face-sky-blue">Nominees</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover remarkable individuals and organizations competing for recognition
              </p>
            </div>
            
            {nominees.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {nominees.map((nominee, index) => (
                  <NomineeCard key={nominee.id} nominee={nominee} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-white rounded-3xl p-12 shadow-xl border border-face-sky-blue/20 max-w-md mx-auto">
                  <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">No Nominees Found</h3>
                  <p className="text-gray-500 text-lg">
                    No nominees found for the selected category. Try selecting a different category.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Globe className="h-16 w-16 text-white mx-auto mb-8 animate-float" />
            <h2 className="text-5xl font-serif font-bold mb-8 text-white">
              Your Vote Matters
            </h2>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              Join thousands of voters worldwide in recognizing excellence and making a difference
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Play className="inline h-6 w-6 mr-3" />
                Watch Nominee Stories
              </button>
              <button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Award className="inline h-6 w-6 mr-3" />
                Learn About FACE Awards
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Nominees;