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

// Enhanced categories data with better representative images
const categories = [
  {
    id: 1,
    name: "Technology Innovation",
    description: "Honoring breakthrough technological advancements that transform industries and improve lives.",
    icon: "💻",
    nominees: 28,
    color: "face-card",
    textColor: "text-face-grey",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176", // AI/Tech innovation
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
    color: "face-card",
    textColor: "text-face-grey",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a", // Business leadership
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
    color: "face-card",
    textColor: "text-face-grey",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c", // Humanitarian aid/helping hands
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
    color: "face-card",
    textColor: "text-face-grey",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", // Green forest/sustainability
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
    color: "face-card",
    textColor: "text-face-grey",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b", // Art gallery/creative arts
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
    color: "face-card",
    textColor: "text-face-grey",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0bc644", // Education/classroom
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
    }, 4000); // Slightly longer interval for better viewing
    
    return () => clearInterval(interval);
  }, [api, isAutoplay]);

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <section className="face-section bg-face-white" id="categories">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">Award Categories</h2>
          <p className="text-lg text-face-grey/80 font-manrope">
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
                  <Card className={`h-full border-2 ${category.color} face-card-hover`}>
                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={`${category.imageUrl}?w=600&h=300&fit=crop`}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-face-grey/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-4xl mb-2">{category.icon}</div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-face-sky-blue text-face-white border-0 shadow-lg font-manrope">
                          {category.nominees} Nominees
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className={`text-xl font-clash font-semibold mb-2 ${category.textColor}`}>
                        {category.name}
                      </h3>
                      <p className="text-face-grey/70 mb-4 font-manrope">{category.description}</p>
                      
                      <div className="mt-4">
                        <button 
                          onClick={() => toggleCategory(category.id)}
                          className={`text-sm font-medium text-face-sky-blue hover:underline flex items-center mb-2 font-manrope`}
                        >
                          {expandedCategory === category.id ? "Hide Criteria" : "View Criteria"}
                        </button>
                        
                        {expandedCategory === category.id && (
                          <div className="mt-3 bg-face-white/80 p-3 rounded-md text-left animate-fade-in border border-face-sky-blue/20">
                            <h4 className="font-medium mb-2 text-face-grey font-manrope">Award Criteria:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-face-grey/80 font-manrope">
                              {category.criteria.map((criterion, idx) => (
                                <li key={idx}>{criterion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link 
                        to="/nominees" 
                        className={`text-sm font-medium text-face-sky-blue hover:underline font-manrope`}
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