import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Trophy, Globe, Star, Clock, Users, ChevronRight, Sparkles, Target, TrendingUp, Calendar, MapPin, Heart, Eye, Vote, CheckCircle, AlertCircle } from 'lucide-react';

// Mock categories data with enhanced information
const categoriesData = [
  {
    id: 1,
    title: "Technology Innovation",
    description: "Recognizing groundbreaking technological advancements that solve real-world problems and improve lives globally.",
    region: "Global",
    nominees: 12,
    totalVotes: 8547,
    status: "Active",
    endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    icon: Trophy,
    color: "from-blue-500 to-cyan-500",
    impact: "2.3M+ lives improved"
  },
  {
    id: 2,
    title: "Leadership Excellence",
    description: "Celebrating visionary leaders who inspire change, drive innovation, and create positive impact in their organizations and communities.",
    region: "Americas",
    nominees: 8,
    totalVotes: 6732,
    status: "Active",
    endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    image: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    impact: "50K+ teams inspired"
  },
  {
    id: 3,
    title: "Humanitarian Impact",
    description: "Honoring individuals and organizations making significant humanitarian contributions to society's most vulnerable populations.",
    region: "Africa",
    nominees: 15,
    totalVotes: 9234,
    status: "Active",
    endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    image: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    icon: Heart,
    color: "from-red-500 to-orange-500",
    impact: "1M+ lives touched"
  },
  {
    id: 4,
    title: "Sustainable Development",
    description: "Recognizing initiatives that promote environmental sustainability and create long-lasting positive environmental change.",
    region: "Europe",
    nominees: 10,
    totalVotes: 7891,
    status: "Active",
    endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    icon: Globe,
    color: "from-green-500 to-teal-500",
    impact: "Carbon negative impact"
  },
  {
    id: 5,
    title: "Educational Excellence",
    description: "Celebrating innovative educators and institutions revolutionizing learning and empowering future generations.",
    region: "Asia-Pacific",
    nominees: 7,
    totalVotes: 5643,
    status: "Coming Soon",
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    image: "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    icon: Target,
    color: "from-indigo-500 to-blue-500",
    impact: "500K+ students reached"
  },
  {
    id: 6,
    title: "Creative Arts Excellence",
    description: "Recognizing outstanding achievements in visual arts, music, literature, and digital creativity that inspire and transform.",
    region: "Global",
    nominees: 9,
    totalVotes: 4321,
    status: "Coming Soon",
    endDate: new Date(new Date().setDate(new Date().getDate() + 45)),
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    impact: "Global cultural impact"
  }
];

const regions = ["Global", "Americas", "Europe", "Africa", "Asia-Pacific"];

const Categories = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [votedCategories, setVotedCategories] = useState(new Set());
  const [showVoteSuccess, setShowVoteSuccess] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setAnimateStats(true), 500);
    
    // Simulate checking which categories user has voted for based on IP
    // In real implementation, this would be an API call
    const existingVotes = localStorage.getItem('faceAwards_voted_categories');
    if (existingVotes) {
      setVotedCategories(new Set(JSON.parse(existingVotes)));
    }
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredCategories = activeTab === "all" 
    ? categoriesData
    : categoriesData.filter(cat => cat.region === activeTab);

  const handleVote = (categoryId) => {
    if (votedCategories.has(categoryId)) {
      return; // Already voted
    }
    
    // Simulate voting process
    const newVotedCategories = new Set([...votedCategories, categoryId]);
    setVotedCategories(newVotedCategories);
    
    // Store in localStorage (in real app, this would be handled by backend with IP tracking)
    localStorage.setItem('faceAwards_voted_categories', JSON.stringify([...newVotedCategories]));
    
    // Show success message
    setShowVoteSuccess(categoryId);
    setTimeout(() => setShowVoteSuccess(null), 3000);
  };

  const hasVoted = (categoryId) => votedCategories.has(categoryId);

  const totalNominees = categoriesData.reduce((sum, cat) => sum + cat.nominees, 0);
  const totalVotes = categoriesData.reduce((sum, cat) => sum + cat.totalVotes, 0);
  const activeCategories = categoriesData.filter(cat => cat.status === "Active").length;

  const CategoryCard = ({ category, index }) => {
    const IconComponent = category.icon;
    const isActive = category.status === "Active";
    const userHasVoted = hasVoted(category.id);
    const showingSuccess = showVoteSuccess === category.id;
    
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
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
          
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
              isActive 
                ? 'bg-green-500 text-white' 
                : 'bg-yellow-500 text-gray-900'
            }`}>
              {category.status}
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
              <IconComponent className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Region badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-gray-800 font-bold text-sm">{category.region}</span>
            </div>
          </div>

          {/* Vote button overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {isActive ? (
              <button 
                onClick={() => handleVote(category.id)}
                disabled={userHasVoted}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform group-hover:scale-110 shadow-2xl ${
                  userHasVoted
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-white text-gray-900 hover:bg-face-sky-blue hover:text-white'
                }`}
              >
                {userHasVoted ? (
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
              {category.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-face-sky-blue/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-face-sky-blue">{category.nominees}</div>
              <div className="text-sm text-gray-600">Nominees</div>
            </div>
            <div className="bg-face-sky-blue/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-face-sky-blue">{category.totalVotes.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Votes</div>
            </div>
          </div>

          {/* Impact and countdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Impact:</span>
              <span className="font-bold text-face-sky-blue">{category.impact}</span>
            </div>
            
            {isActive && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <span className="text-sm text-gray-600">Ends in:</span>
                <span className="font-bold text-green-600">
                  {Math.ceil((category.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
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
      
      {/* Extraordinary Hero section */}
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
                  <div className="font-bold text-xl">{activeCategories}</div>
                  <div className="text-sm opacity-90">Active Categories</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Users className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{totalNominees}</div>
                  <div className="text-sm opacity-90">Total Nominees</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Vote className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{totalVotes.toLocaleString()}</div>
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
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredCategories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
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
                      <div className="text-4xl font-bold text-face-sky-blue mb-2">120+</div>
                      <div className="text-gray-600">Countries Represented</div>
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