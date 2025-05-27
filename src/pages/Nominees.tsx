import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Filter, PieChart, Calendar, Users, Trophy, Star, Clock, Vote, TrendingUp, Globe, Sparkles, ChevronRight, Play, Heart } from 'lucide-react';

// Sample nominees data
const nomineesData = {
  "Technology Innovation": [
    {
      id: 1,
      name: "Dr. Aisha Williams",
      organization: "AI Health Solutions",
      category: "Technology Innovation",
      description: "Developed an AI-powered diagnostic tool that detects early signs of neurological disorders with 94% accuracy.",
      imageUrl: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 42,
      canVote: true,
      votes: 2847,
      impact: "2.3M+ lives improved"
    },
    {
      id: 2,
      name: "Quantum Computing Group",
      organization: "Horizon Labs",
      category: "Technology Innovation",
      description: "Created a breakthrough quantum computing framework that solves complex climate modeling problems 100x faster than traditional methods.",
      imageUrl: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 35,
      canVote: true,
      votes: 2382,
      impact: "Climate modeling revolutionized"
    },
    {
      id: 3,
      name: "EcoTech Solutions",
      organization: "Green Innovations Inc.",
      category: "Technology Innovation",
      description: "Pioneered a water purification system that uses 90% less energy while purifying water in disaster zones.",
      imageUrl: "https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 23,
      canVote: true,
      votes: 1564,
      impact: "500K+ clean water access"
    }
  ],
  "Leadership Excellence": [
    {
      id: 4,
      name: "Maria Gonzalez",
      organization: "Global Enterprises",
      category: "Leadership Excellence",
      description: "Transformed a struggling company into a market leader while implementing groundbreaking diversity initiatives.",
      imageUrl: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 51,
      canVote: true,
      votes: 3421,
      impact: "15K+ jobs created"
    },
    {
      id: 5,
      name: "David Chen",
      organization: "Nexus Foundation",
      category: "Leadership Excellence",
      description: "Led international coalition efforts that provided educational resources to over 2 million children in conflict zones.",
      imageUrl: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 49,
      canVote: true,
      votes: 3289,
      impact: "2M+ children educated"
    }
  ],
  "Humanitarian Impact": [
    {
      id: 6,
      name: "Doctors Beyond Borders",
      organization: "Non-profit Organization",
      category: "Humanitarian Impact",
      description: "Provided critical medical care to over 500,000 people in crisis regions across three continents.",
      imageUrl: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 38,
      canVote: true,
      votes: 2156,
      impact: "500K+ lives saved"
    },
    {
      id: 7,
      name: "Clean Water Initiative",
      organization: "Environmental Action Group",
      category: "Humanitarian Impact",
      description: "Developed and installed sustainable water systems in 120 villages, impacting over 300,000 lives.",
      imageUrl: "https://images.pexels.com/photos/6995688/pexels-photo-6995688.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 33,
      canVote: true,
      votes: 1876,
      impact: "300K+ water access"
    },
    {
      id: 8,
      name: "Education For All Foundation",
      organization: "Non-profit Organization",
      category: "Humanitarian Impact",
      description: "Created mobile learning platforms reaching 1.2 million children with no prior access to education.",
      imageUrl: "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 29,
      canVote: true,
      votes: 1644,
      impact: "1.2M+ children learning"
    }
  ],
  "Sustainable Development": [
    {
      id: 9,
      name: "Green Cities Project",
      organization: "Urban Development Group",
      category: "Sustainable Development",
      description: "Transformed urban spaces with innovative carbon-negative architecture and infrastructure.",
      imageUrl: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 47,
      canVote: true,
      votes: 2634,
      impact: "Carbon-negative cities"
    },
    {
      id: 10,
      name: "Ocean Cleanup Collective",
      organization: "Marine Conservation Organization",
      category: "Sustainable Development",
      description: "Pioneered scalable technology that has removed 3 million pounds of plastic from ocean ecosystems.",
      imageUrl: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      votingPercentage: 53,
      canVote: true,
      votes: 2967,
      impact: "3M+ lbs plastic removed"
    }
  ]
};

const categories = ["Technology Innovation", "Leadership Excellence", "Humanitarian Impact", "Sustainable Development"];

const Nominees = () => {
  const [selectedCategory, setSelectedCategory] = useState("Technology Innovation");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [votingEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 30)));
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleVote = (id) => {
    console.log(`Voted for nominee with id ${id}`);
    // In a real application, we would send this vote to a backend
  };

  // Calculate stats
  const getTotalVotes = () => {
    let total = 0;
    Object.values(nomineesData).forEach(categoryNominees => {
      categoryNominees.forEach(nominee => {
        total += nominee.votes;
      });
    });
    return total;
  };

  const totalVotes = getTotalVotes();
  const activeNominees = Object.values(nomineesData).flat().length;

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

  const NomineeCard = ({ nominee, index }) => (
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
          src={nominee.imageUrl}
          alt={nominee.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating vote button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button 
            onClick={() => handleVote(nominee.id)}
            className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white p-3 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Impact badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="text-face-sky-blue font-bold text-sm">{nominee.impact}</span>
        </div>

        {/* Vote percentage indicator */}
        <div className="absolute top-4 left-4">
          <div className="bg-face-sky-blue text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {nominee.votingPercentage}%
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
                width: `${nominee.votingPercentage}%`,
                animation: animateStats ? `growWidth 1s ease-out ${index * 0.1}s both` : 'none'
              }}
            ></div>
          </div>
        </div>

        {/* Action button */}
        <button 
          onClick={() => handleVote(nominee.id)}
          className="w-full bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark hover:from-face-sky-blue-dark hover:to-face-grey text-white font-bold py-4 px-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <span className="flex items-center justify-center gap-2">
            Vote Now
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </div>
  );

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
      
      {/* Extraordinary Hero section */}
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
                  <div className="font-bold text-xl">{activeNominees}</div>
                  <div className="text-sm opacity-90">Active Nominees</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Trophy className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">4</div>
                  <div className="text-sm opacity-90">Categories Open</div>
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
      
      {/* Extraordinary Countdown Timer */}
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
      
      {/* Enhanced Category Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                <TrendingUp className="inline h-10 w-10 text-face-sky-blue mr-3" />
                Voting Insights
              </h2>
              <p className="text-xl text-gray-600">Real-time engagement across all categories</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => {
                const categoryNominees = nomineesData[category];
                const categoryVotes = categoryNominees.reduce((sum, nominee) => sum + nominee.votes, 0);
                const percentage = Math.round((categoryVotes / totalVotes) * 100);
                
                return (
                  <div 
                    key={category}
                    className="bg-gradient-to-br from-white to-face-sky-blue/5 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-face-sky-blue/10"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                    }}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-face-sky-blue to-face-sky-blue-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-2xl font-bold text-white">{percentage}%</span>
                      </div>
                      <h3 className="text-lg font-bold text-face-grey mb-3">{category}</h3>
                      <p className="text-gray-600 mb-4">{categoryVotes.toLocaleString()} total votes</p>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark transition-all duration-1000 ease-out rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            animation: animateStats ? `growWidth 1.5s ease-out ${index * 0.2}s both` : 'none'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Extraordinary Nominees section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-face-sky-blue rounded-full mb-6 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-5xl font-serif font-bold text-face-grey mb-6">
                Meet Our <span className="bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark bg-clip-text text-transparent">Extraordinary Nominees</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the remarkable individuals and organizations competing for recognition across multiple categories of excellence
              </p>
            </div>
            
            {/* Enhanced Category Navigation */}
            <div className="flex justify-center mb-16">
              <div className="bg-white p-2 rounded-2xl shadow-2xl border border-face-sky-blue/20">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-8 py-4 mx-1 text-lg font-medium rounded-xl transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark text-white shadow-xl transform scale-105'
                        : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Enhanced Nominees Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
              {nomineesData[selectedCategory].map((nominee, index) => (
                <NomineeCard key={nominee.id} nominee={nominee} index={index} />
              ))}
            </div>
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

      {/* Upcoming Categories Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                <Calendar className="inline h-10 w-10 text-face-sky-blue mr-3" />
                Coming Soon
              </h2>
              <p className="text-xl text-gray-600">New categories opening for nominations and voting</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-face-sky-blue/5 to-face-sky-blue/10 rounded-3xl p-8 border border-face-sky-blue/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-face-sky-blue rounded-full flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-face-grey">Creative Arts Excellence</h3>
                    <p className="text-face-sky-blue font-medium">Opens in 15 days</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Celebrating outstanding achievements in visual arts, music, literature, and digital creativity that inspire and transform communities.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Expected nominees: 12</span>
                  <div className="bg-face-sky-blue text-white px-4 py-2 rounded-full text-sm font-bold">
                    Nominations Open
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-face-sky-blue/5 to-face-sky-blue/10 rounded-3xl p-8 border border-face-sky-blue/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-face-sky-blue rounded-full flex items-center justify-center mr-4">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-face-grey">Educational Excellence</h3>
                    <p className="text-face-sky-blue font-medium">Opens in 30 days</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Recognizing innovative educators, institutions, and programs that are revolutionizing learning and empowering future generations.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Expected nominees: 8</span>
                  <div className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full text-sm font-bold">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-face-sky-blue/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-face-sky-blue/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-face-sky-blue rounded-full mb-8">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-6">
                Stay Updated on Excellence
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get notified when new categories open, voting begins, and winners are announced
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 border border-face-sky-blue/30 rounded-2xl focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors text-lg"
                />
                <button className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Join 50,000+ subscribers worldwide • No spam, unsubscribe anytime
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Nominees;