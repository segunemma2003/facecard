import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Filter, Trophy, Star, Crown, Sparkles, Medal, Users, TrendingUp, Calendar, Eye, ChevronRight, Globe, Heart } from 'lucide-react';

// Enhanced past winners data with more details
const pastWinnersData = {
  "2023": [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      category: "Technology Innovation",
      achievement: "Revolutionary AI healthcare diagnostics platform",
      description: "Developed an AI-powered diagnostic system that has improved healthcare outcomes for over 2 million patients worldwide, with 94% accuracy in early disease detection.",
      imageUrl: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "2M+ patients helped",
      country: "Singapore",
      yearWon: "2023",
      bgColor: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "EcoSolutions Inc.",
      category: "Sustainable Development",
      achievement: "Pioneering carbon-negative manufacturing processes",
      description: "Created revolutionary manufacturing techniques that not only eliminate carbon emissions but actually remove CO2 from the atmosphere, setting new industry standards.",
      imageUrl: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "Carbon-negative impact",
      country: "Germany",
      yearWon: "2023",
      bgColor: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      name: "James Rodriguez",
      category: "Creative Arts",
      achievement: "Groundbreaking digital art fusion and virtual reality exhibitions",
      description: "Pioneered immersive VR art experiences that have been featured in over 50 galleries worldwide, transforming how people interact with digital creativity.",
      imageUrl: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "50+ galleries worldwide",
      country: "Mexico",
      yearWon: "2023",
      bgColor: "from-purple-500 to-pink-500"
    },
    {
      id: 8,
      name: "Maya Johnson",
      category: "Educational Excellence",
      achievement: "Innovative educational methodologies for neurodivergent children",
      description: "Developed specialized learning techniques that have helped over 10,000 neurodivergent children achieve academic success and improved social integration.",
      imageUrl: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "10K+ children supported",
      country: "Canada",
      yearWon: "2023",
      bgColor: "from-indigo-500 to-blue-500"
    },
    {
      id: 9,
      name: "Global Health Initiative",
      category: "Humanitarian Impact",
      achievement: "Providing healthcare access to over 100,000 people in conflict zones",
      description: "Established mobile healthcare units and telemedicine networks in war-torn regions, providing critical medical care to vulnerable populations.",
      imageUrl: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "100K+ lives saved",
      country: "International",
      yearWon: "2023",
      bgColor: "from-red-500 to-orange-500"
    }
  ],
  "2022": [
    {
      id: 4,
      name: "GlobalEdu Foundation",
      category: "Educational Excellence",
      achievement: "Expanding access to quality education in underserved communities",
      description: "Built educational infrastructure and trained teachers in 200+ rural communities, providing quality education access to over 50,000 children.",
      imageUrl: "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "50K+ students reached",
      country: "Kenya",
      yearWon: "2022",
      bgColor: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      name: "Maria Santos",
      category: "Humanitarian Impact",
      achievement: "Leading refugee resettlement and integration programs",
      description: "Coordinated successful resettlement of 5,000+ refugees across 12 countries, with 95% successful integration rate into local communities.",
      imageUrl: "https://images.pexels.com/photos/6995688/pexels-photo-6995688.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "5K+ refugees helped",
      country: "Brazil",
      yearWon: "2022",
      bgColor: "from-rose-500 to-pink-500"
    },
    {
      id: 10,
      name: "SustainTech Solutions",
      category: "Technology Innovation",
      achievement: "Creating IoT solutions for sustainable agriculture",
      description: "Developed smart farming systems that increased crop yields by 40% while reducing water usage by 60% across 1,000+ farms globally.",
      imageUrl: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "1K+ farms optimized",
      country: "Netherlands",
      yearWon: "2022",
      bgColor: "from-emerald-500 to-green-500"
    },
    {
      id: 11,
      name: "Dr. Ahmed Khan",
      category: "Leadership Excellence",
      achievement: "Pioneering leadership in cross-cultural medical research",
      description: "Led groundbreaking international medical research collaborations that resulted in 3 new treatments and improved healthcare protocols worldwide.",
      imageUrl: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "3 new treatments developed",
      country: "UAE",
      yearWon: "2022",
      bgColor: "from-violet-500 to-purple-500"
    }
  ],
  "2021": [
    {
      id: 6,
      name: "Robert Kiyoshi",
      category: "Leadership Excellence",
      achievement: "Transforming organizational culture and business performance",
      description: "Revolutionized corporate culture at Fortune 500 companies, improving employee satisfaction by 80% and increasing productivity by 45%.",
      imageUrl: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "80% satisfaction increase",
      country: "Japan",
      yearWon: "2021",
      bgColor: "from-slate-500 to-gray-500"
    },
    {
      id: 7,
      name: "HealthTech Innovations",
      category: "Technology Innovation",
      achievement: "Developing accessible medical devices for remote areas",
      description: "Created low-cost, portable medical devices that have brought essential healthcare technology to 500+ remote communities worldwide.",
      imageUrl: "https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "500+ communities served",
      country: "India",
      yearWon: "2021",
      bgColor: "from-cyan-500 to-blue-500"
    },
    {
      id: 12,
      name: "Clean Ocean Project",
      category: "Sustainable Development",
      achievement: "Removing over 500 tons of plastic from ocean ecosystems",
      description: "Developed innovative ocean cleanup technology and community programs that have removed 500+ tons of plastic waste from marine environments.",
      imageUrl: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "500+ tons plastic removed",
      country: "Australia",
      yearWon: "2021",
      bgColor: "from-blue-500 to-teal-500"
    },
    {
      id: 13,
      name: "Harmony Arts Collective",
      category: "Creative Arts",
      achievement: "Transforming urban spaces through community-led art installations",
      description: "Created 100+ public art installations across 25 cities, fostering community engagement and cultural expression in urban environments.",
      imageUrl: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      impact: "100+ installations created",
      country: "USA",
      yearWon: "2021",
      bgColor: "from-pink-500 to-rose-500"
    }
  ]
};

const years = ["2023", "2022", "2021"];
const categories = ["All Categories", "Technology Innovation", "Leadership Excellence", "Humanitarian Impact", "Sustainable Development", "Creative Arts", "Educational Excellence"];

const PastWinners = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 300);
    return () => clearTimeout(timer);
  }, [selectedYear, selectedCategory]);

  // Filter winners based on selected year and category
  const filteredWinners = pastWinnersData[selectedYear].filter(winner => 
    selectedCategory === "All Categories" || winner.category === selectedCategory
  );

  const totalWinners = Object.values(pastWinnersData).flat().length;
  const countriesRepresented = [...new Set(Object.values(pastWinnersData).flat().map(w => w.country))].length;

  const WinnerCard = ({ winner, index }) => (
    <div 
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-face-sky-blue/10 overflow-hidden"
      onMouseEnter={() => setHoveredCard(winner.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        animation: animateCards ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
      }}
    >
      {/* Award badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full shadow-2xl animate-pulse">
          <Crown className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Year badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-face-sky-blue text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {winner.yearWon} Winner
        </div>
      </div>

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={winner.imageUrl}
          alt={winner.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${winner.bgColor} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
        
        {/* Country badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-gray-800 font-bold text-sm flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {winner.country}
            </span>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-face-sky-blue/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-white font-bold text-sm">{winner.category}</span>
          </div>
        </div>

        {/* Overlay with view button */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-900 hover:bg-face-sky-blue hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
            <Eye className="inline h-5 w-5 mr-2" />
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-serif font-bold text-face-grey mb-2 group-hover:text-face-sky-blue transition-colors duration-300">
            {winner.name}
          </h3>
          <h4 className="text-lg font-bold text-face-sky-blue mb-3">{winner.achievement}</h4>
          <p className="text-gray-600 leading-relaxed text-sm">
            {winner.description}
          </p>
        </div>

        {/* Impact section */}
        <div className="bg-face-sky-blue/5 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Impact Achieved:</span>
            <span className="font-bold text-face-sky-blue">{winner.impact}</span>
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <Medal className="h-4 w-4" />
            <span className="text-sm font-medium">FACE Award Winner</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-face-sky-blue group-hover:translate-x-1 transition-all duration-300" />
        </div>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
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
      `}</style>
      
      {/* Extraordinary Hero section */}
      <section className="relative py-40 bg-face-grey overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="FACE Awards past winners background"
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
        
        {/* Floating crowns and stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {i % 2 === 0 ? <Crown className="h-6 w-6" /> : <Star className="h-4 w-4" />}
            </div>
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Extraordinary icon */}
            <div className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-2xl animate-pulse-glow">
              <Trophy className="h-14 w-14 text-white animate-float" />
            </div>
            
            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-white leading-tight">
              Past Award <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">Winners</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Celebrating the remarkable achievements of previous FACE Award recipients who exemplify Focus, Achievement, Courage, and Excellence
            </p>
            
            {/* Floating stats */}
            <div className="flex flex-wrap justify-center gap-8 text-lg text-white">
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Crown className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{totalWinners}</div>
                  <div className="text-sm opacity-90">Total Winners</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Globe className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{countriesRepresented}</div>
                  <div className="text-sm opacity-90">Countries</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Calendar className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">3</div>
                  <div className="text-sm opacity-90">Years Featured</div>
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

      {/* Enhanced Filters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                <Filter className="inline h-10 w-10 text-face-sky-blue mr-3" />
                Explore Our Winners
              </h2>
              <p className="text-xl text-gray-600">Filter by year and category to discover inspiring achievements</p>
            </div>
            
            <div className="bg-gradient-to-r from-white to-face-sky-blue/5 p-8 rounded-3xl shadow-2xl border border-face-sky-blue/20 mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-face-grey mb-4">Select Year</label>
                  <div className="bg-white rounded-2xl p-2 shadow-lg border border-face-sky-blue/20">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                          selectedYear === year
                            ? 'bg-face-sky-blue text-white shadow-lg transform scale-105'
                            : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-face-grey mb-4">Select Category</label>
                  <div className="bg-white rounded-2xl p-2 shadow-lg border border-face-sky-blue/20 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 mb-1 ${
                          selectedCategory === category
                            ? 'bg-face-sky-blue text-white shadow-lg'
                            : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Winners Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                {selectedYear} Winners {selectedCategory !== "All Categories" && `- ${selectedCategory}`}
              </h2>
              <p className="text-xl text-gray-600">
                Displaying {filteredWinners.length} award recipient{filteredWinners.length !== 1 ? 's' : ''} who changed the world
              </p>
            </div>
            
            {/* Winners grid */}
            {filteredWinners.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredWinners.map((winner, index) => (
                  <WinnerCard key={winner.id} winner={winner} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-white rounded-3xl p-12 shadow-xl border border-face-sky-blue/20 max-w-md mx-auto">
                  <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">No Winners Found</h3>
                  <p className="text-gray-500 text-lg">
                    No winners found for the selected category in {selectedYear}. Try selecting a different category or year.
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
            <Star className="h-16 w-16 text-white mx-auto mb-8 animate-float" />
            <h2 className="text-5xl font-serif font-bold mb-8 text-white">
              Inspired by Excellence?
            </h2>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              These winners started with a vision. Your journey to excellence could be next.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Trophy className="inline h-6 w-6 mr-3" />
                Submit Nomination
              </button>
              <button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Heart className="inline h-6 w-6 mr-3" />
                View Current Nominees
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PastWinners;