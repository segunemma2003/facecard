
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Trophy, Calendar, User, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import CountdownTimer from '@/components/voting/CountdownTimer';
import UpcomingVotes from '@/components/voting/UpcomingVotes';

// Sample category data
const categoriesData = [
  {
    id: 1,
    name: "Technology Innovation",
    description: "Recognizing groundbreaking technological advancements and digital solutions that solve real-world problems.",
    criteria: [
      "Demonstrated innovation in technology application",
      "Measurable impact on target users or industry",
      "Sustainability and scalability of the solution",
      "User experience and accessibility considerations"
    ],
    currentNominees: 8,
    pastWinners: [
      { year: 2023, name: "Dr. Aisha Williams", organization: "EcoTech Solutions" },
      { year: 2022, name: "Global AI Initiative", organization: "Technology For All Foundation" }
    ],
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 14)),
    color: "bg-blue-50"
  },
  {
    id: 2,
    name: "Business Leadership",
    description: "Celebrating exceptional business leaders who demonstrate strategic vision, ethical practices, and deliver outstanding results.",
    criteria: [
      "Demonstrable business growth or transformation",
      "Ethical leadership and governance",
      "Innovation in business model or practices",
      "Positive impact on employees and stakeholders"
    ],
    currentNominees: 12,
    pastWinners: [
      { year: 2023, name: "Marcus Chen", organization: "Sustainable Futures Inc." },
      { year: 2022, name: "Olivia Martins", organization: "Global Finance Group" }
    ],
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 10)),
    color: "bg-teal-50"
  },
  {
    id: 3,
    name: "Humanitarian Impact",
    description: "Honoring organizations and individuals making significant contributions to human welfare and social causes globally.",
    criteria: [
      "Scale and significance of humanitarian contribution",
      "Sustainable and lasting positive impact",
      "Innovation in addressing social challenges",
      "Community engagement and empowerment"
    ],
    currentNominees: 7,
    pastWinners: [
      { year: 2023, name: "Dr. Kwame Nkosi", organization: "Doctors Beyond Borders" },
      { year: 2022, name: "Water For All Initiative", organization: "Global Relief Foundation" }
    ],
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 21)),
    color: "bg-red-50"
  },
  {
    id: 4,
    name: "Educational Excellence",
    description: "Recognizing transformative educational initiatives, institutions, and leaders advancing learning worldwide.",
    criteria: [
      "Innovation in educational methods or accessibility",
      "Measurable improvement in learning outcomes",
      "Scalability and adaptability of educational model",
      "Inclusion and diversity considerations"
    ],
    currentNominees: 10,
    pastWinners: [
      { year: 2023, name: "Future Skills Academy", organization: "Education First Trust" },
      { year: 2022, name: "Prof. Sarah Johnson", organization: "Global Learning Initiative" }
    ],
    votingOpen: false,
    votingEnds: new Date(new Date().setDate(new Date().getDate() - 5)),
    color: "bg-amber-50"
  },
  {
    id: 5,
    name: "Sustainable Development",
    description: "Celebrating initiatives and organizations driving environmental sustainability and responsible resource management.",
    criteria: [
      "Measurable environmental impact and conservation",
      "Innovation in sustainable practices or technologies",
      "Community engagement and education",
      "Scalability and long-term viability"
    ],
    currentNominees: 9,
    pastWinners: [
      { year: 2023, name: "Green Cities Initiative", organization: "Eco Solutions Global" },
      { year: 2022, name: "Dr. Isabella Martinez", organization: "Sustainable Future Research" }
    ],
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 7)),
    color: "bg-green-50"
  },
  {
    id: 6,
    name: "Cultural Excellence",
    description: "Recognizing outstanding contributions to arts, heritage preservation, and cultural exchange.",
    criteria: [
      "Significant cultural preservation or expression",
      "Innovation in cultural presentation or exchange",
      "Community engagement and education",
      "Cross-cultural understanding and collaboration"
    ],
    currentNominees: 6,
    pastWinners: [
      { year: 2023, name: "Global Heritage Foundation", organization: "Arts For All" },
      { year: 2022, name: "Traditional Futures Collective", organization: "Cultural Preservation Trust" }
    ],
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 18)),
    color: "bg-purple-50"
  }
];

// Upcoming voting periods
const upcomingVotes = [
  { 
    id: 1, 
    category: "Healthcare Innovation", 
    startsAt: new Date(new Date().setDate(new Date().getDate() + 10)), 
    endsAt: new Date(new Date().setDate(new Date().getDate() + 40)),
    nominees: 0
  },
  { 
    id: 2, 
    category: "Community Development", 
    startsAt: new Date(new Date().setDate(new Date().getDate() + 15)), 
    endsAt: new Date(new Date().setDate(new Date().getDate() + 45)),
    nominees: 0
  }
];

const Categories = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const handleVoteClick = (categoryId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to vote for this category's nominees.",
        variant: "destructive"
      });
      
      // In a real app, redirect to login page
      // For demo, we'll simulate login
      setIsAuthenticated(false);
    } else {
      // Navigate to nominees page
      navigate(`/nominees?category=${categoryId}`);
    }
  };

  const handleLogin = () => {
    // In a real app, this would open a login form or redirect to auth page
    setIsAuthenticated(true);
    toast({
      title: "Login Successful",
      description: "You can now vote for your favorite nominees.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-16 bg-gradient-to-b from-face-navy/5 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Award className="h-16 w-16 text-face-gold mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Award <span className="text-face-blue">Categories</span>
            </h1>
            <p className="text-xl text-gray-600">
              Discover the diverse categories recognizing excellence across industries and borders.
              {!isAuthenticated && (
                <span className="block mt-4 text-face-burgundy font-medium">
                  Please <button onClick={handleLogin} className="underline text-face-blue">login</button> to vote for nominees.
                </span>
              )}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categoriesData.map(category => (
              <Card key={category.id} className={`${category.color} border-gray-200 hover:shadow-lg transition-shadow overflow-hidden`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-serif text-face-blue">{category.name}</CardTitle>
                    <Badge variant={category.votingOpen ? "default" : "outline"} className={category.votingOpen ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-600"}>
                      {category.votingOpen ? "Voting Open" : "Voting Closed"}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-gray-600 mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-1" /> Evaluation Criteria
                      </h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                        {category.criteria.map((criterion, idx) => (
                          <li key={idx}>{criterion}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Trophy className="h-4 w-4 mr-1" /> Past Winners
                      </h4>
                      <div className="space-y-2">
                        {category.pastWinners.map((winner, idx) => (
                          <div key={idx} className="bg-white/70 p-2 rounded-md text-sm">
                            <div className="font-medium">{winner.name}</div>
                            <div className="text-xs text-gray-600 flex justify-between">
                              <span>{winner.organization}</span>
                              <span>{winner.year}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {category.votingOpen && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> Voting Timeline
                        </h4>
                        <div className="bg-white/70 p-2 rounded-md text-sm">
                          <div className="text-center mb-1">Voting ends in</div>
                          <div className="flex justify-center space-x-2 text-face-blue font-bold">
                            <span>{Math.ceil((category.votingEnds.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}</span>
                            <span>days</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <User className="h-4 w-4 mr-1" /> Current Nominees
                      </h4>
                      <div className="bg-white/70 p-2 rounded-md text-sm text-center">
                        <span className="font-bold text-xl">{category.currentNominees}</span>
                        <span className="block text-xs text-gray-600">qualified nominees</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-0">
                  <Button 
                    onClick={() => handleVoteClick(category.id)} 
                    disabled={!category.votingOpen}
                    className={`w-full ${category.votingOpen ? 'bg-face-gold hover:bg-yellow-500 text-face-blue' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {category.votingOpen ? "View & Vote Nominees" : "Voting Closed"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="md:col-span-2">
              <CountdownTimer 
                endDate={new Date(new Date().setDate(new Date().getDate() + 10))} 
                title="Current Voting Period Ends In" 
              />
            </div>
            <div>
              <UpcomingVotes votes={upcomingVotes} />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Categories;
