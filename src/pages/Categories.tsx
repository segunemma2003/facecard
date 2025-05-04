
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Award, 
  Trophy, 
  Calendar, 
  User, 
  Info, 
  Globe, 
  Users, 
  BarChart2, 
  ChartBar 
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import CountdownTimer from '@/components/voting/CountdownTimer';
import UpcomingVotes from '@/components/voting/UpcomingVotes';

// Sample category data with enhanced information
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
    nominees: [
      {
        id: 101,
        name: "Dr. Aisha Williams",
        organization: "AI Health Solutions",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        bio: "Pioneering AI diagnostic tools that have revolutionized early disease detection in underserved communities.",
        votes: 42,
        impact: "High impact across 12 countries in the Global South, improving healthcare outcomes for over 2 million patients.",
        testimonials: ["Dr. Williams' technology has transformed our rural clinic's diagnostic capabilities.", "The AI system has improved our diagnosis accuracy by 87%."]
      },
      {
        id: 102,
        name: "Quantum Computing Group",
        organization: "Horizon Labs",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        bio: "Creating breakthrough quantum algorithms that address complex climate and energy challenges.",
        votes: 35,
        impact: "Reduced computation time for climate models from months to days, enabling more accurate forecasting.",
        testimonials: ["Their quantum solutions helped us identify new sustainable materials 10x faster.", "Revolutionary approach to solving previously impossible computational problems."]
      }
    ],
    stats: {
      countries: [
        { name: "United States", percentage: 25 },
        { name: "India", percentage: 18 },
        { name: "Nigeria", percentage: 15 },
        { name: "China", percentage: 12 },
        { name: "Others", percentage: 30 }
      ],
      gender: { male: 55, female: 42, other: 3 },
      impactLevel: { high: 65, medium: 25, emerging: 10 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 14)),
    color: "bg-blue-50",
    region: "Global"
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
    nominees: [
      {
        id: 201,
        name: "Maria Gonzalez",
        organization: "Global Enterprises",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
        bio: "Transformed a struggling company into a market leader while implementing groundbreaking diversity initiatives.",
        votes: 51,
        impact: "Created over 5,000 jobs and increased female leadership by 200% in a traditionally male-dominated industry.",
        testimonials: ["Maria's leadership style combines empathy with strategic vision.", "Her inclusive approach transformed our corporate culture completely."]
      },
      {
        id: 202,
        name: "David Chen",
        organization: "Nexus Foundation",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        bio: "Led international coalition efforts that provided educational resources to over 2 million children in conflict zones.",
        votes: 49,
        impact: "Programs in 15 countries with measurable improvements in literacy and academic achievement.",
        testimonials: ["David's leadership during crisis situations has been exceptional.", "His ability to unite diverse stakeholders behind a common goal is unparalleled."]
      }
    ],
    stats: {
      countries: [
        { name: "United Kingdom", percentage: 22 },
        { name: "South Africa", percentage: 20 },
        { name: "Brazil", percentage: 18 },
        { name: "Canada", percentage: 15 },
        { name: "Others", percentage: 25 }
      ],
      gender: { male: 48, female: 51, other: 1 },
      impactLevel: { high: 70, medium: 20, emerging: 10 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 10)),
    color: "bg-teal-50",
    region: "Americas"
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
    nominees: [
      {
        id: 301,
        name: "Doctors Beyond Borders",
        organization: "Non-profit Organization",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d",
        bio: "Provided critical medical care to over 500,000 people in crisis regions across three continents.",
        votes: 38,
        impact: "Established 25 permanent health facilities in regions with limited medical access.",
        testimonials: ["Their rapid response saved thousands during the recent natural disaster.", "They don't just treat patients, they build sustainable healthcare systems."]
      },
      {
        id: 302,
        name: "Clean Water Initiative",
        organization: "Environmental Action Group",
        image: "https://images.unsplash.com/photo-1541089404510-5c9a779841fc",
        bio: "Developed and installed sustainable water systems in 120 villages, impacting over 300,000 lives.",
        votes: 33,
        impact: "Reduced waterborne disease by 78% in target communities and improved agricultural yields.",
        testimonials: ["Their water systems have completely transformed our village.", "The educational component ensures long-term sustainability of the projects."]
      }
    ],
    stats: {
      countries: [
        { name: "Kenya", percentage: 28 },
        { name: "Bangladesh", percentage: 22 },
        { name: "Haiti", percentage: 18 },
        { name: "Syria", percentage: 12 },
        { name: "Others", percentage: 20 }
      ],
      gender: { male: 40, female: 58, other: 2 },
      impactLevel: { high: 85, medium: 10, emerging: 5 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 21)),
    color: "bg-red-50",
    region: "Africa"
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
    nominees: [],
    stats: {
      countries: [
        { name: "India", percentage: 30 },
        { name: "Ghana", percentage: 20 },
        { name: "Mexico", percentage: 15 },
        { name: "Australia", percentage: 15 },
        { name: "Others", percentage: 20 }
      ],
      gender: { male: 35, female: 63, other: 2 },
      impactLevel: { high: 60, medium: 25, emerging: 15 }
    },
    votingOpen: false,
    votingEnds: new Date(new Date().setDate(new Date().getDate() - 5)),
    color: "bg-amber-50",
    region: "Asia Pacific"
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
    nominees: [],
    stats: {
      countries: [
        { name: "Denmark", percentage: 22 },
        { name: "Costa Rica", percentage: 18 },
        { name: "Singapore", percentage: 15 },
        { name: "Kenya", percentage: 15 },
        { name: "Others", percentage: 30 }
      ],
      gender: { male: 45, female: 52, other: 3 },
      impactLevel: { high: 75, medium: 20, emerging: 5 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 7)),
    color: "bg-green-50",
    region: "Europe"
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
    nominees: [],
    stats: {
      countries: [
        { name: "Japan", percentage: 25 },
        { name: "Morocco", percentage: 20 },
        { name: "Peru", percentage: 18 },
        { name: "Ireland", percentage: 12 },
        { name: "Others", percentage: 25 }
      ],
      gender: { male: 48, female: 50, other: 2 },
      impactLevel: { high: 60, medium: 30, emerging: 10 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 18)),
    color: "bg-purple-50",
    region: "Middle East"
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

// Get all unique regions from the categories
const regions = Array.from(new Set(categoriesData.map(cat => cat.region)));

const Categories = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const navigate = useNavigate();
  
  // Filter categories based on selected region tab
  const filteredCategories = activeTab === "all" 
    ? categoriesData
    : categoriesData.filter(cat => cat.region === activeTab);

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

  // Function to get category by ID
  const getCategoryById = (id: number) => {
    return categoriesData.find(cat => cat.id === id) || null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-32 bg-gradient-to-b from-face-navy to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Award className="h-16 w-16 text-face-gold mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Award <span className="text-face-gold">Categories</span>
            </h1>
            <p className="text-xl text-gray-200">
              Discover the diverse categories recognizing excellence across industries and borders.
              {!isAuthenticated && (
                <span className="block mt-4 text-face-burgundy font-medium">
                  Please <button onClick={handleLogin} className="underline text-face-gold">login</button> to vote for nominees.
                </span>
              )}
            </p>
          </div>
          
          {/* Region Tabs */}
          <div className="max-w-5xl mx-auto mb-12">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white/20 mx-auto mb-8 overflow-x-auto flex w-full md:w-auto">
                <TabsTrigger value="all" className="data-[state=active]:bg-face-gold data-[state=active]:text-face-blue">
                  All Regions
                </TabsTrigger>
                {regions.map(region => (
                  <TabsTrigger 
                    key={region} 
                    value={region}
                    className="data-[state=active]:bg-face-gold data-[state=active]:text-face-blue"
                  >
                    {region}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredCategories.map(category => (
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
                    
                    {/* Category Stats */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-white/70 border-gray-200 hover:bg-white">
                          <ChartBar className="h-4 w-4 mr-2" /> View Category Stats
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{category.name} - Statistics</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 my-4">
                          {category.stats && (
                            <>
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                  <Globe className="h-4 w-4 mr-2" /> Country Distribution
                                </h4>
                                <div className="space-y-2">
                                  {category.stats.countries.map((country, idx) => (
                                    <div key={idx} className="space-y-1">
                                      <div className="flex justify-between text-xs">
                                        <span>{country.name}</span>
                                        <span>{country.percentage}%</span>
                                      </div>
                                      <Progress value={country.percentage} className="h-1" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                  <Users className="h-4 w-4 mr-2" /> Gender Breakdown
                                </h4>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-blue-50 p-2 rounded-md text-center">
                                    <div className="font-medium text-blue-600">{category.stats.gender.male}%</div>
                                    <div className="text-xs text-gray-600">Male</div>
                                  </div>
                                  <div className="bg-red-50 p-2 rounded-md text-center">
                                    <div className="font-medium text-red-600">{category.stats.gender.female}%</div>
                                    <div className="text-xs text-gray-600">Female</div>
                                  </div>
                                  <div className="bg-purple-50 p-2 rounded-md text-center">
                                    <div className="font-medium text-purple-600">{category.stats.gender.other}%</div>
                                    <div className="text-xs text-gray-600">Other</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                  <BarChart2 className="h-4 w-4 mr-2" /> Industry Impact Level
                                </h4>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span>High Impact</span>
                                      <span>{category.stats.impactLevel.high}%</span>
                                    </div>
                                    <Progress value={category.stats.impactLevel.high} className="h-1 bg-gray-100" />
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span>Medium Impact</span>
                                      <span>{category.stats.impactLevel.medium}%</span>
                                    </div>
                                    <Progress value={category.stats.impactLevel.medium} className="h-1 bg-gray-100" />
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span>Emerging Impact</span>
                                      <span>{category.stats.impactLevel.emerging}%</span>
                                    </div>
                                    <Progress value={category.stats.impactLevel.emerging} className="h-1 bg-gray-100" />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Current Nominees */}
                    {category.nominees && category.nominees.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <User className="h-4 w-4 mr-1" /> Top Nominees
                        </h4>
                        <div className="space-y-3">
                          {category.nominees.slice(0, 2).map((nominee) => (
                            <Dialog key={nominee.id}>
                              <DialogTrigger asChild>
                                <div className="bg-white/70 p-3 rounded-md text-sm hover:bg-white hover:shadow-md transition-all cursor-pointer">
                                  <div className="flex items-center space-x-3">
                                    <img 
                                      src={`${nominee.image}?w=60&h=60&fit=crop`} 
                                      alt={nominee.name} 
                                      className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                      <div className="font-medium">{nominee.name}</div>
                                      <div className="text-xs text-gray-600">{nominee.organization}</div>
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>Current votes</span>
                                      <span className="font-medium">{nominee.votes}%</span>
                                    </div>
                                    <Progress value={nominee.votes} className="h-1.5 animate-pulse" />
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Nominee Impact</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                  <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <img 
                                      src={`${nominee.image}?w=200&h=200&fit=crop`} 
                                      alt={nominee.name} 
                                      className="w-24 h-24 rounded-full object-cover"
                                    />
                                    <div>
                                      <h3 className="font-bold text-lg">{nominee.name}</h3>
                                      <p className="text-sm text-gray-600">{nominee.organization}</p>
                                      <div className="flex items-center mt-2">
                                        <div className="text-sm font-medium mr-2">Current votes:</div>
                                        <Progress value={nominee.votes} className="h-2 w-24" />
                                        <span className="ml-2 font-bold">{nominee.votes}%</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-1">Bio</h4>
                                    <p className="text-sm">{nominee.bio}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-1">Impact</h4>
                                    <p className="text-sm">{nominee.impact}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-1">Testimonials</h4>
                                    <div className="space-y-2">
                                      {nominee.testimonials.map((testimonial, idx) => (
                                        <div key={idx} className="bg-gray-50 p-3 rounded-md text-sm italic">
                                          "{testimonial}"
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                      </div>
                    )}
                    
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
