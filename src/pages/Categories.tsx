
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import CountdownTimer from '@/components/voting/CountdownTimer';
import UpcomingVotes from '@/components/voting/UpcomingVotes';
import CategoryCard from '@/components/categories/CategoryCard';
import { categoriesData, upcomingVotes } from '@/components/categories/categoryData';

const Categories = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get all unique regions from the categories
  const regions = Array.from(new Set(categoriesData.map(cat => cat.region)));
  
  // Filter categories based on selected region tab
  const filteredCategories = activeTab === "all" 
    ? categoriesData
    : categoriesData.filter(cat => cat.region === activeTab);

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
      
      <section className="py-32 bg-gradient-to-b from-face-blue to-face-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Award className="h-16 w-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Award <span className="text-face-grey">Categories</span>
            </h1>
            <p className="text-xl text-white">
              Discover the diverse categories recognizing excellence across industries and borders.
              {!isAuthenticated && (
                <span className="block mt-4 text-face-grey font-medium">
                  Please <button onClick={handleLogin} className="underline text-white">login</button> to vote for nominees.
                </span>
              )}
            </p>
          </div>
          
          {/* Region Tabs */}
          <div className="max-w-5xl mx-auto mb-12">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white/20 mx-auto mb-8 overflow-x-auto flex w-full md:w-auto">
                <TabsTrigger value="all" className="text-white data-[state=active]:bg-face-blue data-[state=active]:text-white">
                  All Regions
                </TabsTrigger>
                {regions.map(region => (
                  <TabsTrigger 
                    key={region} 
                    value={region}
                    className="text-white data-[state=active]:bg-face-blue data-[state=active]:text-white"
                  >
                    {region}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredCategories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                isAuthenticated={isAuthenticated} 
                onLogin={handleLogin} 
              />
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
