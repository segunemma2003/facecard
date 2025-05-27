import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WinnerCard from '../awards/WinnerCard';

// Sample past winners data
const pastWinnersData = {
  "2023": [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      category: "Technology Innovation",
      achievement: "Revolutionary AI healthcare diagnostics platform",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 2,
      name: "EcoSolutions Inc.",
      category: "Sustainable Development",
      achievement: "Pioneering carbon-negative manufacturing processes",
      imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623"
    },
    {
      id: 3,
      name: "James Rodriguez",
      category: "Creative Arts",
      achievement: "Groundbreaking digital art fusion and virtual reality exhibitions",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  ],
  "2022": [
    {
      id: 4,
      name: "GlobalEdu Foundation",
      category: "Educational Excellence",
      achievement: "Expanding access to quality education in underserved communities",
      imageUrl: "https://images.unsplash.com/photo-1541872705-74c0899e25ad"
    },
    {
      id: 5,
      name: "Maria Santos",
      category: "Humanitarian Impact",
      achievement: "Leading refugee resettlement and integration programs",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    }
  ],
  "2021": [
    {
      id: 6,
      name: "Robert Kiyoshi",
      category: "Leadership Excellence",
      achievement: "Transforming organizational culture and business performance",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      id: 7,
      name: "HealthTech Innovations",
      category: "Technology Innovation",
      achievement: "Developing accessible medical devices for remote areas",
      imageUrl: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa"
    }
  ]
};

const years = ["2023", "2022", "2021"];

const PastWinnersSection = () => {
  const [selectedYear, setSelectedYear] = useState("2023");

  return (
    <section className="section-padding bg-brand-blue/5" id="past-winners">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <Award className="h-10 w-10 text-brand-blue" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-grey">Past Winners</h2>
          <p className="text-lg text-brand-grey/80">
            Celebrating the remarkable individuals and organizations who have previously received 
            the FACE Awards for their outstanding contributions.
          </p>
        </div>

        <div className="mb-8">
          {/* Year selector - For mobile */}
          <div className="md:hidden">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full border-brand-blue">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year} Winners
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year tabs - For desktop */}
          <div className="hidden md:block">
            <Tabs defaultValue="2023" value={selectedYear} onValueChange={setSelectedYear}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-brand-white border border-brand-blue/20">
                  {years.map((year) => (
                    <TabsTrigger 
                      key={year} 
                      value={year} 
                      className="px-8 data-[state=active]:bg-brand-blue data-[state=active]:text-brand-white"
                    >
                      {year}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {years.map((year) => (
                <TabsContent key={year} value={year} className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastWinnersData[year as keyof typeof pastWinnersData].map((winner) => (
                      <WinnerCard key={winner.id} winner={winner} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Mobile content display */}
          <div className="md:hidden mt-6">
            <div className="grid grid-cols-1 gap-6">
              {pastWinnersData[selectedYear as keyof typeof pastWinnersData].map((winner) => (
                <WinnerCard key={winner.id} winner={winner} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-brand-white">
            <Link to="/past-winners" className="flex items-center gap-2">
              View All Past Winners
              <ChevronDown className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PastWinnersSection;