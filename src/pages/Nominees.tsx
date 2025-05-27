import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Filter, PieChart, Calendar, Users, Trophy, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NomineeCard from '@/components/nominees/NomineeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import CountdownTimer from '@/components/voting/CountdownTimer';
import UpcomingVotes from '@/components/voting/UpcomingVotes';

// Sample nominees data
const nomineesData = {
  "Technology Innovation": [
    {
      id: 1,
      name: "Dr. Aisha Williams",
      organization: "AI Health Solutions",
      category: "Technology Innovation",
      description: "Developed an AI-powered diagnostic tool that detects early signs of neurological disorders with 94% accuracy.",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      votingPercentage: 42,
      canVote: true
    },
    {
      id: 2,
      name: "Quantum Computing Group",
      organization: "Horizon Labs",
      category: "Technology Innovation",
      description: "Created a breakthrough quantum computing framework that solves complex climate modeling problems 100x faster than traditional methods.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      votingPercentage: 35,
      canVote: true
    },
    {
      id: 3,
      name: "EcoTech Solutions",
      organization: "Green Innovations Inc.",
      category: "Technology Innovation",
      description: "Pioneered a water purification system that uses 90% less energy while purifying water in disaster zones.",
      imageUrl: "https://images.unsplash.com/photo-1581093196277-9f508d9f21e8",
      votingPercentage: 23,
      canVote: true
    }
  ],
  "Leadership Excellence": [
    {
      id: 4,
      name: "Maria Gonzalez",
      organization: "Global Enterprises",
      category: "Leadership Excellence",
      description: "Transformed a struggling company into a market leader while implementing groundbreaking diversity initiatives.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      votingPercentage: 51,
      canVote: true
    },
    {
      id: 5,
      name: "David Chen",
      organization: "Nexus Foundation",
      category: "Leadership Excellence",
      description: "Led international coalition efforts that provided educational resources to over 2 million children in conflict zones.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      votingPercentage: 49,
      canVote: true
    }
  ],
  "Humanitarian Impact": [
    {
      id: 6,
      name: "Doctors Beyond Borders",
      organization: "Non-profit Organization",
      category: "Humanitarian Impact",
      description: "Provided critical medical care to over 500,000 people in crisis regions across three continents.",
      imageUrl: "https://images.unsplash.com/photo-1527613426441-4da17471b66d",
      votingPercentage: 38,
      canVote: true
    },
    {
      id: 7,
      name: "Clean Water Initiative",
      organization: "Environmental Action Group",
      category: "Humanitarian Impact",
      description: "Developed and installed sustainable water systems in 120 villages, impacting over 300,000 lives.",
      imageUrl: "https://images.unsplash.com/photo-1541089404510-5c9a779841fc",
      votingPercentage: 33,
      canVote: true
    },
    {
      id: 8,
      name: "Education For All Foundation",
      organization: "Non-profit Organization",
      category: "Humanitarian Impact",
      description: "Created mobile learning platforms reaching 1.2 million children with no prior access to education.",
      imageUrl: "https://images.unsplash.com/photo-1607748851476-e8babe4800d1",
      votingPercentage: 29,
      canVote: true
    }
  ],
  "Sustainable Development": [
    {
      id: 9,
      name: "Green Cities Project",
      organization: "Urban Development Group",
      category: "Sustainable Development",
      description: "Transformed urban spaces with innovative carbon-negative architecture and infrastructure.",
      imageUrl: "https://images.unsplash.com/photo-1491960693564-421771d727d6",
      votingPercentage: 47,
      canVote: true
    },
    {
      id: 10,
      name: "Ocean Cleanup Collective",
      organization: "Marine Conservation Organization",
      category: "Sustainable Development",
      description: "Pioneered scalable technology that has removed 3 million pounds of plastic from ocean ecosystems.",
      imageUrl: "https://images.unsplash.com/photo-1551634979-2b11f8c946fe",
      votingPercentage: 53,
      canVote: true
    }
  ]
};

// Sample upcoming votes data
const upcomingVotesData = [
  {
    id: 1,
    category: "Creative Arts",
    startsAt: new Date(new Date().setDate(new Date().getDate() + 15)),
    endsAt: new Date(new Date().setDate(new Date().getDate() + 45)),
    nominees: 12
  },
  {
    id: 2,
    category: "Educational Excellence",
    startsAt: new Date(new Date().setDate(new Date().getDate() + 30)),
    endsAt: new Date(new Date().setDate(new Date().getDate() + 60)),
    nominees: 8
  }
];

// Current voting end date (one month from now)
const currentVotingEndDate = new Date(new Date().setDate(new Date().getDate() + 30));

const categories = ["Technology Innovation", "Leadership Excellence", "Humanitarian Impact", "Sustainable Development"];

const Nominees = () => {
  const [selectedCategory, setSelectedCategory] = useState("Technology Innovation");
  
  const handleVote = (id: number) => {
    console.log(`Voted for nominee with id ${id}`);
    // In a real application, we would send this vote to a backend
  };

  // Calculate category voting stats
  const getCategoryStats = () => {
    let totalVotes = 0;
    const categoryVotes: Record<string, number> = {};
    
    Object.keys(nomineesData).forEach(category => {
      const categoryTotal = nomineesData[category as keyof typeof nomineesData].reduce(
        (sum, nominee) => sum + nominee.votingPercentage, 0
      );
      totalVotes += categoryTotal;
      categoryVotes[category] = categoryTotal;
    });
    
    return {
      totalVotes,
      categoryVotes,
      mostActive: Object.keys(categoryVotes).reduce(
        (a, b) => categoryVotes[a] > categoryVotes[b] ? a : b
      )
    };
  };
  
  const stats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Modern Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-grey overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-scale-up">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in" style={{ fontFamily: 'Clash Display' }}>
              Current <span className="bg-gradient-to-r from-white to-brand-blue-light bg-clip-text text-transparent">Nominees</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-in">
              Vote for outstanding individuals and organizations making remarkable contributions across various sectors worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-up delay-300">
              <div className="flex items-center text-white/80">
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">32 Active Nominees</span>
              </div>
              <div className="flex items-center text-white/80">
                <Trophy className="h-5 w-5 mr-2" />
                <span className="font-medium">4 Categories Open</span>
              </div>
              <div className="flex items-center text-white/80">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-medium">30 Days Remaining</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="white" 
              fillOpacity="1" 
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Stats and Countdown Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Countdown Timer */}
              <div className="lg:col-span-2">
                <CountdownTimer endDate={currentVotingEndDate} />
              </div>
              
              {/* Most Active Category */}
              <Card className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white border-0 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2 text-white" />
                    Most Active Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Clash Display' }}>
                      {stats.mostActive}
                    </h3>
                    <p className="text-white/80 text-sm">Leading in engagement</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Participation Rate</span>
                      <span className="font-medium">{Math.round((stats.categoryVotes[stats.mostActive] / stats.totalVotes) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(stats.categoryVotes[stats.mostActive] / stats.totalVotes) * 100} 
                      className="h-2 bg-white/20"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Category Engagement Overview */}
            <Card className="mb-12 border-brand-blue/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-brand-blue/5 to-brand-blue/10 border-b border-brand-blue/20">
                <CardTitle className="text-xl flex items-center text-brand-grey" style={{ fontFamily: 'Clash Display' }}>
                  <PieChart className="h-6 w-6 text-brand-blue mr-3" />
                  Category Engagement Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.keys(stats.categoryVotes).map((category) => (
                    <div key={category} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-brand-grey text-sm">{category}</h4>
                        <span className="text-brand-blue font-bold">
                          {Math.round((stats.categoryVotes[category] / stats.totalVotes) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(stats.categoryVotes[category] / stats.totalVotes) * 100} 
                        className="h-3"
                      />
                      <p className="text-xs text-brand-grey/60">
                        {nomineesData[category as keyof typeof nomineesData].length} nominees active
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Nominees section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-grey mb-4" style={{ fontFamily: 'Clash Display' }}>
                Meet Our <span className="text-brand-blue">Nominees</span>
              </h2>
              <p className="text-lg text-brand-grey/70 max-w-2xl mx-auto">
                Discover the remarkable individuals and organizations competing for recognition across multiple categories of excellence.
              </p>
            </div>
            
            {/* Category tabs - For desktop */}
            <div className="hidden lg:block">
              <Tabs defaultValue="Technology Innovation" value={selectedCategory} onValueChange={setSelectedCategory}>
                <div className="flex justify-center mb-12">
                  <TabsList className="bg-white border border-brand-blue/20 shadow-lg p-1 rounded-xl">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category} 
                        value={category} 
                        className="px-6 py-3 text-sm font-medium data-[state=active]:bg-brand-blue data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {nomineesData[category as keyof typeof nomineesData].map((nominee) => (
                        <NomineeCard key={nominee.id} nominee={nominee} onVote={handleVote} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            {/* Category selector - For mobile and tablet */}
            <div className="lg:hidden mb-8">
              <div className="bg-white p-4 rounded-xl shadow-lg border border-brand-blue/20 mb-6">
                <label className="block text-sm font-medium text-brand-grey mb-2">
                  <Filter className="h-4 w-4 inline mr-2" />
                  Select Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full border-brand-blue/30 focus:border-brand-blue">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {nomineesData[selectedCategory as keyof typeof nomineesData].map((nominee) => (
                  <NomineeCard key={nominee.id} nominee={nominee} onVote={handleVote} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming votes section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-grey mb-4" style={{ fontFamily: 'Clash Display' }}>
                What's <span className="text-brand-blue">Coming Next</span>
              </h2>
              <p className="text-lg text-brand-grey/70">
                Stay updated on upcoming voting periods and new categories opening soon.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <UpcomingVotes votes={upcomingVotesData} />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Nominees;