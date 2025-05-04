
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Filter, PieChart } from 'lucide-react';
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
    const categoryVotes = {};
    
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-32 bg-face-blue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 text-face-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Current Nominees</h1>
            <p className="text-xl text-gray-200">
              Vote for outstanding individuals and organizations making remarkable contributions across various sectors.
            </p>
          </div>
        </div>
      </section>
      
      {/* Countdown and Stats Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <CountdownTimer endDate={currentVotingEndDate} />
              </div>
              
              <Card className="bg-face-blue text-white h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <PieChart className="h-4 w-4 mr-2 text-face-gold" />
                    Most Active Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-bold">{stats.mostActive}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Engagement</span>
                      <span>{Math.round((stats.categoryVotes[stats.mostActive] / stats.totalVotes) * 100)}%</span>
                    </div>
                    <Progress value={(stats.categoryVotes[stats.mostActive] / stats.totalVotes) * 100} className="h-2 bg-white/20" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Category engagement */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="h-5 w-5 text-face-gold mr-2" />
                  Category Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(stats.categoryVotes).map((category) => (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span>{Math.round((stats.categoryVotes[category] / stats.totalVotes) * 100)}%</span>
                    </div>
                    <Progress value={(stats.categoryVotes[category] / stats.totalVotes) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Nominees section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-8 flex items-center">
              <Award className="h-6 w-6 text-face-gold mr-2" />
              Nominees by Category
            </h2>
            
            {/* Category tabs - For desktop */}
            <div className="hidden md:block">
              <Tabs defaultValue="Technology Innovation" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="mb-8 w-full justify-start bg-transparent border-b border-gray-200">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category} 
                      className="data-[state=active]:bg-face-gold data-[state=active]:text-face-blue"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {nomineesData[category as keyof typeof nomineesData].map((nominee) => (
                        <NomineeCard key={nominee.id} nominee={nominee} onVote={handleVote} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            {/* Category selector - For mobile */}
            <div className="md:hidden mb-8">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
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
              
              <div className="mt-6 grid grid-cols-1 gap-6">
                {nomineesData[selectedCategory as keyof typeof nomineesData].map((nominee) => (
                  <NomineeCard key={nominee.id} nominee={nominee} onVote={handleVote} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming votes section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-8 flex items-center">
              <Calendar className="h-6 w-6 text-face-gold mr-2" />
              Upcoming Voting Periods
            </h2>
            
            <UpcomingVotes votes={upcomingVotesData} />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Nominees;
