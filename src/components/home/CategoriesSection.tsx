
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Enhanced categories data with detailed descriptions
const categories = [
  {
    id: 1,
    name: "Technology Innovation",
    description: "Honoring breakthrough technological advancements that transform industries and improve lives.",
    icon: "💻",
    nominees: 28,
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    criteria: [
      "Demonstrated significant technological breakthroughs within the past year",
      "Created solutions that address real-world challenges with measurable impact",
      "Shown exceptional innovation that disrupts traditional approaches",
      "Established a path for future development and wider application"
    ]
  },
  {
    id: 2,
    name: "Leadership Excellence",
    description: "Recognizing visionary leaders who inspire teams and drive organizational success.",
    icon: "🏆",
    nominees: 42,
    color: "bg-green-50 border-green-200",
    textColor: "text-green-700",
    criteria: [
      "Led organizations or teams to exceptional performance and achievement",
      "Demonstrated ethical leadership and integrity in decision-making",
      "Fostered inclusive environments that celebrate diversity and empower others",
      "Navigated significant challenges with resilience and strategic vision"
    ]
  },
  {
    id: 3,
    name: "Humanitarian Impact",
    description: "Celebrating individuals and organizations creating positive social change and addressing global challenges.",
    icon: "❤️",
    nominees: 35,
    color: "bg-red-50 border-red-200",
    textColor: "text-red-700",
    criteria: [
      "Implemented initiatives that directly improved the quality of life for vulnerable populations",
      "Demonstrated sustainable approaches to addressing humanitarian challenges",
      "Mobilized resources and built partnerships to maximize impact",
      "Advocated effectively for systemic change and policy improvements"
    ]
  },
  {
    id: 4,
    name: "Sustainable Development",
    description: "Honoring initiatives that promote environmental responsibility and sustainable business practices.",
    icon: "🌱",
    nominees: 31,
    color: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700",
    criteria: [
      "Pioneered sustainable practices that significantly reduce environmental impact",
      "Demonstrated measurable improvements in resource efficiency and conservation",
      "Created models that balance economic viability with environmental stewardship",
      "Influenced industry standards and practices toward greater sustainability"
    ]
  },
  {
    id: 5,
    name: "Creative Arts",
    description: "Recognizing exceptional talent and innovation in visual arts, performing arts, and creative expression.",
    icon: "🎨",
    nominees: 38,
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
    criteria: [
      "Produced creative works that demonstrate exceptional originality and artistic excellence",
      "Used creative expression to challenge perspectives and inspire dialogue",
      "Made significant contributions to artistic fields or cultural understanding",
      "Expanded accessibility and appreciation of the arts across diverse audiences"
    ]
  },
  {
    id: 6,
    name: "Educational Excellence",
    description: "Celebrating outstanding contributions to education, learning methodologies, and knowledge sharing.",
    icon: "📚",
    nominees: 27,
    color: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700",
    criteria: [
      "Developed innovative teaching methods that measurably improve learning outcomes",
      "Expanded educational access to underserved or marginalized communities",
      "Created resources that enhance educational quality and effectiveness",
      "Demonstrated exceptional commitment to learner success and development"
    ]
  }
];

const CategoriesSection = () => {
  const [api, setApi] = useState<any>();
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (!api || !isAutoplay) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api, isAutoplay]);

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <section className="section-padding bg-gray-50" id="categories">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <Award className="h-10 w-10 text-face-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Award Categories</h2>
          <p className="text-lg text-gray-600">
            The FACE Awards recognize excellence across a diverse range of categories, 
            each representing a vital area of human achievement and innovation.
          </p>
        </div>

        <div 
          className="relative" 
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="py-4">
              {categories.map((category) => (
                <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className={`h-full border-2 ${category.color} card-hover`}>
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className={`text-xl font-serif font-semibold mb-2 ${category.textColor}`}>
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      
                      <div className="mt-4">
                        <button 
                          onClick={() => toggleCategory(category.id)}
                          className={`text-sm font-medium ${category.textColor} hover:underline flex items-center mb-2`}
                        >
                          {expandedCategory === category.id ? "Hide Criteria" : "View Criteria"}
                        </button>
                        
                        {expandedCategory === category.id && (
                          <div className="mt-3 bg-white/80 p-3 rounded-md text-left animate-fade-in">
                            <h4 className="font-medium mb-2">Award Criteria:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                              {category.criteria.map((criterion, idx) => (
                                <li key={idx}>{criterion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <Badge variant="outline" className="bg-white">
                          {category.nominees} Nominees
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link 
                        to="/nominees" 
                        className={`text-sm font-medium ${category.textColor} hover:underline`}
                      >
                        View Nominees →
                      </Link>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
