import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Trophy, Globe, Star, Clock, Users, ChevronRight, Sparkles, Target, TrendingUp, Calendar, MapPin, Heart, Eye, Vote, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useCategories, useVote, useUserVotes, useCategoryStats } from '@/hooks/useApi';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [showVoteSuccess, setShowVoteSuccess] = useState<number | null>(null);
  
  // API Hooks
  const { data: categoriesResponse, isLoading, error } = useCategories({
    region: activeTab === "all" ? undefined : activeTab,
    voting_only: false
  });
  const { data: userVotesResponse } = useUserVotes();
  const { data: statsResponse } = useCategoryStats();
  const voteMutation = useVote();
  
  const categories = categoriesResponse?.data || [];
  const userVotes = userVotesResponse?.data || [];
  const stats = statsResponse?.data;
  
  // Get voted category IDs
  const votedCategoryIds = new Set(
    userVotes.map(categoryVote => categoryVote.category_id)
  );
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const filteredCategories = activeTab === "all" 
    ? categories
    : categories.filter(cat => cat.region === activeTab);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewNominees = (categoryId: number) => {
    navigate(`/nominees?category=${categoryId}`);
    handleScrollToTop();
  };

  const handleVote = async (categoryId: number) => {
    if (votedCategoryIds.has(categoryId)) {
      toast({
        title: "Already voted",
        description: "You have already voted in this category.",
        variant: "destructive"
      });
      return;
    }
    
    // Redirect to nominees page instead of auto-voting
    navigate(`/nominees?category=${categoryId}`);
    handleScrollToTop();
  };

  const hasVoted = (categoryId: number) => votedCategoryIds.has(categoryId);

  // Get unique regions from categories
  const regions = ["Global", ...Array.from(new Set(categories.map(cat => cat.region).filter(region => region !== "Global")))];

  const CategoryCard = ({ category, index }: { category: any; index: number }) => {
    const userHasVoted = hasVoted(category.id);
    const showingSuccess = showVoteSuccess === category.id;
    const isActive = category.voting_open;
    const isVoting = voteMutation.isPending;
    
    return (
      <div 
        className="group relative bg-face-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-face-sky-blue/10 overflow-hidden"
        onMouseEnter={() => setHoveredCard(category.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Success notification */}
        {showingSuccess && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-green-500 text-face-white px-4 py-2 rounded-full shadow-lg animate-bounce">
            <CheckCircle className="inline h-4 w-4 mr-2" />
            Vote recorded!
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={category.image_url || `https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-face-sky-blue/80 via-face-sky-blue/30 to-transparent group-hover:from-face-sky-blue-dark/80 transition-all duration-300"></div>
          
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg font-manrope ${
              isActive 
                ? 'bg-green-500 text-face-white' 
                : 'bg-face-gold text-face-grey'
            }`}>
              {isActive ? 'Voting Open' : 'Coming Soon'}
            </div>
          </div>

          {/* Vote status indicator */}
          {userHasVoted && (
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-face-white p-2 rounded-full shadow-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          )}

          {/* Icon */}
          <div className={`absolute ${userHasVoted ? 'top-16 left-4' : 'top-4 left-4'}`}>
            <div className="bg-face-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
              <Award className="h-6 w-6 text-face-white" />
            </div>
          </div>

          {/* Region badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-face-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-face-grey font-bold text-sm flex items-center font-manrope">
                <Globe className="h-4 w-4 mr-2" />
                {category.region}
              </span>
            </div>
          </div>

          {/* Vote button overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {isActive ? (
              <Button 
                onClick={() => handleVote(category.id)}
                disabled={isVoting}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform group-hover:scale-110 shadow-2xl font-manrope ${
                  userHasVoted
                    ? 'bg-green-500 text-face-white cursor-default'
                    : 'bg-face-white text-face-grey hover:bg-face-sky-blue hover:text-face-white'
                }`}
              >
                {userHasVoted ? (
                  <>
                    <CheckCircle className="inline h-5 w-5 mr-2" />
                    View Nominees
                  </>
                ) : (
                  <>
                    <Vote className="inline h-5 w-5 mr-2" />
                    Vote Now
                  </>
                )}
              </Button>
            ) : (
              <Button 
                disabled
                className="bg-face-grey/60 text-face-white cursor-not-allowed px-8 py-4 rounded-2xl font-bold text-lg font-manrope"
              >
                <Clock className="inline h-5 w-5 mr-2" />
                Coming Soon
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-clash font-bold text-face-grey mb-3 group-hover:text-face-sky-blue transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-face-grey/80 leading-relaxed font-manrope">
              {category.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-face-sky-blue/5 rounded-xl p-4 text-center border border-face-sky-blue/10">
              <div className="text-2xl font-bold text-face-sky-blue font-clash">{category.nominees_count || 0}</div>
              <div className="text-sm text-face-grey/60 font-manrope">Nominees</div>
            </div>
            <div className="bg-face-sky-blue/5 rounded-xl p-4 text-center border border-face-sky-blue/10">
              <div className="text-2xl font-bold text-face-sky-blue font-clash">{category.total_votes?.toLocaleString() || '0'}</div>
              <div className="text-sm text-face-grey/60 font-manrope">Votes</div>
            </div>
          </div>

          {/* Impact and countdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-face-sky-blue/5 rounded-xl border border-face-sky-blue/10">
              <span className="text-sm text-face-grey/60 font-manrope">Status:</span>
              <span className={`font-bold font-manrope ${isActive ? 'text-green-600' : 'text-face-gold'}`}>
                {isActive ? 'Voting Open' : 'Coming Soon'}
              </span>
            </div>
            
            {isActive && category.days_remaining !== undefined && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <span className="text-sm text-face-grey/60 font-manrope">Ends in:</span>
                <span className="font-bold text-green-600 font-manrope">
                  {category.days_remaining} day{category.days_remaining !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Action row */}
          <div className="mt-6 pt-6 border-t border-face-sky-blue/10">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => handleViewNominees(category.id)}
                className="text-face-sky-blue hover:text-face-sky-blue-dark hover:bg-face-sky-blue/5 font-medium transition-colors font-manrope"
              >
                <Eye className="inline h-4 w-4 mr-2" />
                View Nominees
              </Button>
              <ChevronRight className="h-5 w-5 text-face-grey/40 group-hover:text-face-sky-blue group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-face-white via-face-sky-blue/5 to-face-sky-blue/10">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-face-grey/60 font-manrope">Loading categories...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-face-white via-face-sky-blue/5 to-face-sky-blue/10">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-face-grey/60 mb-4 font-manrope">Failed to load categories</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-face-sky-blue text-face-white px-6 py-2 rounded-lg hover:bg-face-sky-blue-dark transition-colors font-manrope"
            >
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-face-white via-face-sky-blue/5 to-face-sky-blue/10">
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
        
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-count-up {
          animation: countUp 0.8s ease-out forwards;
        }
      `}</style>
      
      {/* Hero section */}
      <section className="relative py-40 bg-face-grey overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="FACE Awards categories background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Animated decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-face-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-face-white rounded-full animate-float"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-face-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-face-white/20 rounded-full animate-float"
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
            {/* Logo icon */}
            <div className="inline-flex items-center justify-center w-28 h-28 bg-face-white/20 backdrop-blur-sm rounded-full mb-8 shadow-2xl animate-pulse-glow">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-14 w-auto animate-float"
              />
            </div>
            
            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-clash font-bold mb-8 text-face-white leading-tight">
              Award <span className="bg-gradient-to-r from-face-white via-face-sky-blue-light to-face-white bg-clip-text text-transparent">Categories</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-face-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium font-manrope">
              Discover the diverse categories recognizing excellence across industries and borders. Vote for your favorites!
            </p>
            
            {/* Voting info */}
            <div className="bg-face-white/20 backdrop-blur-sm border border-face-white/30 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 text-face-white text-lg">
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                <p className="font-manrope">
                  <span className="font-bold">One vote per category.</span> We track IP addresses to ensure fair voting.
                </p>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="flex flex-wrap justify-center gap-8 text-lg text-face-white">
              <div className="flex items-center gap-4 bg-face-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-face-white/40 hover:bg-face-white/40 transition-all duration-300 transform hover:scale-105">
                <Trophy className="h-7 w-7 text-face-white" />
                <div className="text-left">
                  <div className="font-bold text-xl font-clash">{stats?.active_voting_categories || categories.filter(c => c.voting_open).length}</div>
                  <div className="text-sm opacity-90 font-manrope">Active Categories</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-face-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-face-white/40 hover:bg-face-white/40 transition-all duration-300 transform hover:scale-105">
                <Users className="h-7 w-7 text-face-white" />
                <div className="text-left">
                  <div className="font-bold text-xl font-clash">{stats?.total_nominees || categories.reduce((sum, cat) => sum + (cat.nominees_count || 0), 0)}</div>
                  <div className="text-sm opacity-90 font-manrope">Total Nominees</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-face-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-face-white/40 hover:bg-face-white/40 transition-all duration-300 transform hover:scale-105">
                <Vote className="h-7 w-7 text-face-white" />
                <div className="text-left">
                  <div className="font-bold text-xl font-clash">{stats?.total_votes?.toLocaleString() || '0'}</div>
                  <div className="text-sm opacity-90 font-manrope">Total Votes</div>
                </div>
              </div>
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

      {/* Regional Navigation */}
      <section className="py-20 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-clash font-bold text-face-grey mb-4">
                <Globe className="inline h-10 w-10 text-face-sky-blue mr-3" />
                Explore by Region
              </h2>
              <p className="text-xl text-face-grey/60 font-manrope">Categories span across continents, celebrating global excellence</p>
            </div>
            
            <div className="flex justify-center mb-12">
              <div className="bg-face-sky-blue/5 p-2 rounded-2xl shadow-xl border border-face-sky-blue/20">
                <Button
                  onClick={() => setActiveTab("all")}
                  variant={activeTab === "all" ? "default" : "ghost"}
                  className={`px-8 py-4 mx-1 text-lg font-medium rounded-xl transition-all duration-300 font-manrope ${
                    activeTab === "all"
                      ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark text-face-white shadow-xl transform scale-105'
                      : 'text-face-grey/60 hover:bg-face-white hover:text-face-sky-blue'
                  }`}
                >
                  All Regions
                </Button>
                {regions.map((region) => (
                  <Button
                    key={region}
                    onClick={() => setActiveTab(region)}
                    variant={activeTab === region ? "default" : "ghost"}
                    className={`px-8 py-4 mx-1 text-lg font-medium rounded-xl transition-all duration-300 font-manrope ${
                      activeTab === region
                        ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark text-face-white shadow-xl transform scale-105'
                        : 'text-face-grey/60 hover:bg-face-white hover:text-face-sky-blue'
                    }`}
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-20 bg-gradient-to-br from-face-sky-blue/5 to-face-sky-blue/10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-clash font-bold text-face-grey mb-4">
                Categories of <span className="text-face-sky-blue">Excellence</span>
              </h2>
              <p className="text-xl text-face-grey/60 max-w-3xl mx-auto font-manrope">
                Each category represents a unique domain where exceptional achievements are recognized and celebrated
              </p>
            </div>
            
            {filteredCategories.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredCategories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-face-white rounded-3xl p-12 shadow-xl border border-face-sky-blue/20 max-w-md mx-auto">
                  <Sparkles className="h-16 w-16 text-face-grey/40 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-face-grey mb-4 font-clash">No Categories Found</h3>
                  <p className="text-face-grey/60 text-lg font-manrope">
                    No categories found for the selected region. Try selecting a different region.
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
            <Star className="h-16 w-16 text-face-white mx-auto mb-8 animate-float" />
            <h2 className="text-5xl font-clash font-bold mb-8 text-face-white">
              Ready to Make Your Mark?
            </h2>
            <p className="text-2xl text-face-white/90 mb-12 leading-relaxed font-manrope">
              Join the community of excellence and help recognize outstanding achievements worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => {
                  navigate('/nominees');
                  handleScrollToTop();
                }}
                className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white border-4 border-face-white hover:border-face-white shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300 font-manrope"
              >
                <Vote className="inline h-6 w-6 mr-3" />
                Start Voting Now
              </Button>
              <Button 
                onClick={() => {
                  navigate('/registration');
                  handleScrollToTop();
                }}
                variant="outline"
                className="border-4 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300 font-manrope"
              >
                <Trophy className="inline h-6 w-6 mr-3" />
                Register for Event
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Categories;