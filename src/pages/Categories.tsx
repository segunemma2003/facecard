import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Trophy, Globe, Star, Clock, Users, ChevronRight, Sparkles, Target, TrendingUp, Calendar, MapPin, Heart, Eye, Vote, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useCategories, useVote, useUserVotes, useCategoryStats } from '@/hooks/useApi';
import { toast } from '@/components/ui/use-toast';

const Categories = () => {
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

  const handleVote = async (categoryId: number) => {
    if (votedCategoryIds.has(categoryId)) {
      toast({
        title: "Already voted",
        description: "You have already voted in this category.",
        variant: "destructive"
      });
      return;
    }
    
    // Find the first nominee in this category to vote for
    // In a real implementation, you might want to redirect to the category page instead
    const category = categories.find(cat => cat.id === categoryId);
    if (!category || !category.nominees || category.nominees.length === 0) {
      toast({
        title: "No nominees available",
        description: "This category doesn't have any nominees to vote for yet.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // For demo purposes, vote for the first nominee in the category
      const firstNominee = category.nominees[0];
      await voteMutation.mutateAsync({ nomineeId: firstNominee.id });
      
      setShowVoteSuccess(categoryId);
      setTimeout(() => setShowVoteSuccess(null), 3000);
      
      toast({
        title: "Vote recorded!",
        description: `Thank you for voting in the ${category.name} category.`,
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

  const hasVoted = (categoryId: number) => votedCategoryIds.has(categoryId);

  // Get unique regions from categories
  const regions = ["Global", ...Array.from(new Set(categories.map(cat => cat.region).filter(region => region !== "Global")))];

  const CategoryCard = ({ category, index }: { category: any; index: number }) => {
    const userHasVoted = hasVoted(category.id);
    const showingSuccess = showVoteSuccess === category.id;
    const isActive = category.is_voting_active;
    const isVoting = voteMutation.isPending;
    
    return (
      <div 
        className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-face-sky-blue/10 overflow-hidden"
        onMouseEnter={() => setHoveredCard(category.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Success notification */}
        {showingSuccess && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
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
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${category.color || 'from-blue-500 to-cyan-500'} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
          
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
              isActive 
                ? 'bg-green-500 text-white' 
                : 'bg-yellow-500 text-gray-900'
            }`}>
              {isActive ? 'Voting Open' : 'Coming Soon'}
            </div>
          </div>

          {/* Vote status indicator */}
          {userHasVoted && (
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          )}

          {/* Icon */}
          <div className={`absolute ${userHasVoted ? 'top-16 left-4' : 'top-4 left-4'}`}>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Region badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-gray-800 font-bold text-sm flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {category.region}
              </span>
            </div>
          </div>

          {/* Vote button overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {isActive ? (
              <button 
                onClick={() => handleVote(category.id)}
                disabled={userHasVoted || isVoting}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform group-hover:scale-110 shadow-2xl ${
                  userHasVoted
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-white text-gray-900 hover:bg-face-sky-blue hover:text-white'
                }`}
              >
                {isVoting ? (
                  <>
                    <Loader2 className="inline h-5 w-5 mr-2 animate-spin" />
                    Voting...
                  </>
                ) : userHasVoted ? (
                  <>
                    <CheckCircle className="inline h-5 w-5 mr-2" />
                    Voted
                  </>
                ) : (
                  <>
                    <Vote className="inline h-5 w-5 mr-2" />
                    Vote Now
                  </>
                )}
              </button>
            ) : (
              <button 
                disabled
                className="bg-gray-400 text-gray-600 cursor-not-allowed px-8 py-4 rounded-2xl font-bold text-lg"
              >
                <Clock className="inline h-5 w-5 mr-2" />
                Coming Soon
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-serif font-bold text-face-grey mb-3 group-hover:text-face-sky-blue transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-face-sky-blue/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-face-sky-blue">{category.nominees_count || 0}</div>
              <div className="text-sm text-gray-600">Nominees</div>
            </div>
            <div className="bg-face-sky-blue/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-face-sky-blue">{category.total_votes?.toLocaleString() || '0'}</div>
              <div className="text-sm text-gray-600">Votes</div>
            </div>
          </div>

          {/* Impact and countdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`font-bold ${isActive ? 'text-green-600' : 'text-yellow-600'}`}>
                {isActive ? 'Voting Open' : 'Coming Soon'}
              </span>
            </div>
            
            {isActive && category.voting_ends_at && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <span className="text-sm text-gray-600">Ends in:</span>
                <span className="font-bold text-green-600">
                  {category.days_remaining || 0} days
                </span>
              </div>
            )}
          </div>

          {/* Action row */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <button className="text-face-sky-blue hover:text-face-sky-blue-dark font-medium transition-colors">
                <Eye className="inline h-4 w-4 mr-2" />
                View Nominees
              </button>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-face-sky-blue group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-gray-600">Loading categories...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">Failed to load categories</p>
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
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white rounded-full animate-float"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
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
              Award <span className="bg-gradient-to-r from-white via-face-sky-blue-light to-white bg-clip-text text-transparent">Categories</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Discover the diverse categories recognizing excellence across industries and borders. Vote for your favorites!
            </p>
            
            {/* Voting info */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 text-white text-lg">
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                <p>
                  <span className="font-bold">One vote per category.</span> We track IP addresses to ensure fair voting.
                </p>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="flex flex-wrap justify-center gap-8 text-lg text-white">
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Trophy className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{stats?.active_voting_categories || categories.filter(c => c.is_voting_active).length}</div>
                  <div className="text-sm opacity-90">Active Categories</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Users className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{stats?.total_nominees || categories.reduce((sum, cat) => sum + (cat.nominees_count || 0), 0)}</div>
                  <div className="text-sm opacity-90">Total Nominees</div>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                <Globe className="inline h-10 w-10 text-face-sky-blue mr-3" />
                Explore by Region
              </h2>
              <p className="text-xl text-gray-600">Categories span across continents, celebrating global excellence</p>
            </div>
            
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-2 rounded-2xl shadow-xl border border-face-sky-blue/20">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-8 py-4 mx-1 text-lg font-medium rounded-xl transition-all duration-300 ${
                    activeTab === "all"
                      ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark text-white shadow-xl transform scale-105'
                      : 'text-gray-600 hover:bg-white hover:text-face-sky-blue'
                  }`}
                >
                  All Regions
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveTab(region)}
                    className={`px-8 py-4 mx-1 text-lg font-medium rounded-xl transition-all duration-300 ${
                      activeTab === region
                        ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark text-white shadow-xl transform scale-105'
                        : 'text-gray-600 hover:bg-white hover:text-face-sky-blue'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                Categories of <span className="text-face-sky-blue">Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <div className="bg-white rounded-3xl p-12 shadow-xl border border-face-sky-blue/20 max-w-md mx-auto">
                  <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">No Categories Found</h3>
                  <p className="text-gray-500 text-lg">
                    No categories found for the selected region. Try selecting a different region.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Countdown and Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Live countdown */}
              <div className="bg-gradient-to-br from-face-sky-blue to-face-sky-blue-dark rounded-3xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto mb-6 animate-float" />
                  <h3 className="text-3xl font-serif font-bold mb-4">Voting Ends Soon</h3>
                  <p className="text-xl mb-8 opacity-90">Current voting period closes in:</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-3xl font-bold">15</div>
                      <div className="text-sm opacity-90">Days</div>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-3xl font-bold">07</div>
                      <div className="text-sm opacity-90">Hours</div>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-3xl font-bold">23</div>
                      <div className="text-sm opacity-90">Minutes</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Impact stats */}
              <div className="bg-gradient-to-br from-white to-face-sky-blue/5 rounded-3xl p-8 border border-face-sky-blue/20 shadow-xl">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-face-sky-blue mx-auto mb-6" />
                  <h3 className="text-3xl font-serif font-bold text-face-grey mb-6">Global Impact</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-face-sky-blue mb-2">5M+</div>
                      <div className="text-gray-600">Lives Impacted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-face-sky-blue mb-2">{stats?.regions?.length || 5}+</div>
                      <div className="text-gray-600">Regions Represented</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-face-sky-blue mb-2">85%</div>
                      <div className="text-gray-600">Positive Change</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-face-sky-blue mb-2">15</div>
                      <div className="text-gray-600">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Star className="h-16 w-16 text-white mx-auto mb-8 animate-float" />
            <h2 className="text-5xl font-serif font-bold mb-8 text-white">
              Ready to Make Your Mark?
            </h2>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              Join the community of excellence and help recognize outstanding achievements worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Vote className="inline h-6 w-6 mr-3" />
                Start Voting Now
              </button>
              <button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Trophy className="inline h-6 w-6 mr-3" />
                Submit Nomination
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Categories;