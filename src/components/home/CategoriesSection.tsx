
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

// Sample categories data
const categories = [
  {
    id: 1,
    name: "Technology Innovation",
    description: "Honoring breakthrough technological advancements that transform industries and improve lives.",
    icon: "💻",
    nominees: 28,
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700"
  },
  {
    id: 2,
    name: "Leadership Excellence",
    description: "Recognizing visionary leaders who inspire teams and drive organizational success.",
    icon: "🏆",
    nominees: 42,
    color: "bg-green-50 border-green-200",
    textColor: "text-green-700"
  },
  {
    id: 3,
    name: "Humanitarian Impact",
    description: "Celebrating individuals and organizations creating positive social change and addressing global challenges.",
    icon: "❤️",
    nominees: 35,
    color: "bg-red-50 border-red-200",
    textColor: "text-red-700"
  },
  {
    id: 4,
    name: "Sustainable Development",
    description: "Honoring initiatives that promote environmental responsibility and sustainable business practices.",
    icon: "🌱",
    nominees: 31,
    color: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700"
  },
  {
    id: 5,
    name: "Creative Arts",
    description: "Recognizing exceptional talent and innovation in visual arts, performing arts, and creative expression.",
    icon: "🎨",
    nominees: 38,
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700"
  },
  {
    id: 6,
    name: "Educational Excellence",
    description: "Celebrating outstanding contributions to education, learning methodologies, and knowledge sharing.",
    icon: "📚",
    nominees: 27,
    color: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700"
  }
];

const CategoriesSection = () => {
  const [api, setApi] = useState<any>();
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!api || !isAutoplay) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api, isAutoplay]);

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
                      <Badge variant="outline" className="bg-white">
                        {category.nominees} Nominees
                      </Badge>
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
