
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WinnerCard from '@/components/awards/WinnerCard';

// Extended past winners data
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
    },
    {
      id: 8,
      name: "Maya Johnson",
      category: "Educational Excellence",
      achievement: "Innovative educational methodologies for neurodivergent children",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
    },
    {
      id: 9,
      name: "Global Health Initiative",
      category: "Humanitarian Impact",
      achievement: "Providing healthcare access to over 100,000 people in conflict zones",
      imageUrl: "https://images.unsplash.com/photo-1565307528294-f70f3c7094e0"
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
    },
    {
      id: 10,
      name: "SustainTech Solutions",
      category: "Technology Innovation",
      achievement: "Creating IoT solutions for sustainable agriculture",
      imageUrl: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e"
    },
    {
      id: 11,
      name: "Dr. Ahmed Khan",
      category: "Leadership Excellence",
      achievement: "Pioneering leadership in cross-cultural medical research",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
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
    },
    {
      id: 12,
      name: "Clean Ocean Project",
      category: "Sustainable Development",
      achievement: "Removing over 500 tons of plastic from ocean ecosystems",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    },
    {
      id: 13,
      name: "Harmony Arts Collective",
      category: "Creative Arts",
      achievement: "Transforming urban spaces through community-led art installations",
      imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8"
    }
  ]
};

const years = ["2023", "2022", "2021"];
const categories = ["All Categories", "Technology Innovation", "Leadership Excellence", "Humanitarian Impact", "Sustainable Development", "Creative Arts", "Educational Excellence"];

const PastWinners = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filter winners based on selected year and category
  const filteredWinners = pastWinnersData[selectedYear as keyof typeof pastWinnersData].filter(winner => 
    selectedCategory === "All Categories" || winner.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero section with background */}
      <section className="relative py-32 bg-face-blue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 text-face-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Past Award Winners</h1>
            <p className="text-xl text-gray-200">
              Celebrating the remarkable achievements of previous FACE Award recipients 
              who exemplify Focus, Achievement, Courage, and Excellence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters and winners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-serif font-bold mb-6 flex items-center">
              <Filter className="h-5 w-5 text-face-gold mr-2" />
              Filter Winners
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
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
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold mb-2">
              {selectedYear} Winners {selectedCategory !== "All Categories" && `- ${selectedCategory}`}
            </h2>
            <p className="text-gray-600 mb-8">
              Displaying {filteredWinners.length} award recipient{filteredWinners.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Winners grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWinners.map((winner) => (
              <WinnerCard key={winner.id} winner={winner} />
            ))}
          </div>
          
          {filteredWinners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No winners found for the selected category in {selectedYear}.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PastWinners;
