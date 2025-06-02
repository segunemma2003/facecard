import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Loader2 } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCategories } from '@/hooks/useApi'; // Your existing hook

// Fallback icons for categories
const getCategoryIcon = (categoryName: string) => {
  const iconMap: Record<string, string> = {
    'technology': '💻',
    'innovation': '💻',
    'leadership': '🏆',
    'humanitarian': '❤️',
    'sustainable': '🌱',
    'development': '🌱',
    'creative': '🎨',
    'arts': '🎨',
    'education': '📚',
    'business': '💼',
    'healthcare': '🏥',
    'community': '🤝',
  };
  
  const lowercaseName = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowercaseName.includes(key)) {
      return icon;
    }
  }
  return '🏆'; // Default icon
};

const CategoriesSection = () => {
  const [api, setApi] = useState<any>();
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  // Use your API hook
  const { data: categoriesResponse, isLoading, error } = useCategories();
  const categories = categoriesResponse?.data || [];

  useEffect(() => {
    if (!api || !isAutoplay || categories.length === 0) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [api, isAutoplay, categories.length]);

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  // Loading state
  if (isLoading) {
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
            <p className="text-lg text-face-grey/80 font-manrope">Loading categories...</p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
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
            <p className="text-lg text-red-600 font-manrope">Unable to load categories. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // No categories state
  if (categories.length === 0) {
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
            <p className="text-lg text-face-grey/80 font-manrope">No categories available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

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
                  <Card className="h-full border-2 bg-white face-card-hover">
                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={category.image_url || `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=300&fit=crop`}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          // Fallback image if category image fails to load
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=300&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-face-grey/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-4xl mb-2">
                          {category.icon || getCategoryIcon(category.name)}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-face-sky-blue text-face-white border-0 shadow-lg font-manrope">
                          {category.nominees_count || category.current_nominees || 0} Nominees
                        </Badge>
                      </div>
                      {category.voting_open && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-500 text-white border-0 shadow-lg font-manrope">
                            Voting Open
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-clash font-semibold mb-2 text-face-grey">
                        {category.name}
                      </h3>
                      <p className="text-face-grey/70 mb-4 font-manrope">{category.description}</p>
                      
                      {/* Region and voting info */}
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" className="text-xs font-manrope">
                          {category.region}
                        </Badge>
                        {category.voting_open && category.days_remaining !== undefined && (
                          <Badge variant="outline" className="text-xs font-manrope text-orange-600">
                            {category.days_remaining} days left
                          </Badge>
                        )}
                      </div>
                      
                      {/* Criteria section */}
                      {category.criteria && category.criteria.length > 0 && (
                        <div className="mt-4">
                          <button 
                            onClick={() => toggleCategory(category.id)}
                            className="text-sm font-medium text-face-sky-blue hover:underline flex items-center mb-2 font-manrope"
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
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <div className="flex justify-between items-center w-full">
                        <Link 
                          to={`/nominees?category=${category.id}`}
                          className="text-sm font-medium text-face-sky-blue hover:underline font-manrope"
                        >
                          View Nominees →
                        </Link>
                        {category.total_votes > 0 && (
                          <span className="text-xs text-face-grey/60 font-manrope">
                            {category.total_votes} votes
                          </span>
                        )}
                      </div>
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