// src/pages/ImpactStories.tsx - Updated with Content API integration
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Video, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { extractContent } from '@/lib/contentUtils';
import { usePageContent } from '@/hooks/usePageContent';

// Sample impact stories data (keep existing data)
const impactStories = [
  {
    id: 1,
    title: "From Refugee to Global Tech Leader",
    nominee: "Amina Hassan",
    category: "Technology Innovation",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample YouTube video
    excerpt: "Amina's journey from a refugee camp to founding a tech company that revolutionized healthcare access in rural communities."
  },
  {
    id: 2,
    title: "Rebuilding Communities Through Sustainable Architecture",
    nominee: "EcoHomes Project",
    category: "Sustainable Development",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    excerpt: "How the EcoHomes Project is creating affordable, sustainable housing solutions in disaster-affected areas, transforming lives and communities."
  },
  {
    id: 3,
    title: "The Educator Reaching 1 Million Children",
    nominee: "GlobalEdu Foundation",
    category: "Educational Excellence",
    type: "interview",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample YouTube video
    excerpt: "An interview with the founder of GlobalEdu Foundation on their journey to bring quality education to 1 million underserved children worldwide."
  },
  {
    id: 4,
    title: "Ocean Cleanup Pioneers",
    nominee: "Ocean Cleanup Collective",
    category: "Humanitarian Impact",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1551634979-2b11f8c946fe",
    excerpt: "The inspiring story of the Ocean Cleanup Collective, removing millions of pounds of plastic waste from our oceans and creating sustainable solutions."
  },
  {
    id: 5,
    title: "Healthcare Revolution in Remote Areas",
    nominee: "Dr. Sarah Chen",
    category: "Leadership Excellence",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample YouTube video
    excerpt: "Dr. Chen's innovative mobile healthcare solutions are bringing medical care to the most remote and underserved communities."
  }
];

const ImpactStories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Content API Hook
  const { data: contentResponse, isLoading: contentLoading, error: contentError } = usePageContent('impact_stories');
  
  const pageContent = contentResponse?.data;
  
  const filteredStories = selectedCategory === "all" 
    ? impactStories 
    : impactStories.filter(story => story.category === selectedCategory);

  const categories = ["all", ...Array.from(new Set(impactStories.map(story => story.category)))];

  // Loading state
  if (contentLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-gray-600">Loading content...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract content with fallbacks
  const heroTitle = extractContent(pageContent?.hero, 'main_title', 'Impact Stories');
  const heroSubtitle = extractContent(pageContent?.hero, 'subtitle', 'Inspirational journeys and remarkable achievements of those making a difference across the globe.');
  const heroBackgroundImage = extractContent(pageContent?.hero, 'background_image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d');
  
  const allStoriesText = extractContent(pageContent?.stories_section, 'all_stories_text', 'All Stories');
  const readStoryButtonText = extractContent(pageContent?.stories_section, 'read_story_button_text', 'Read Full Story');
  const featuringLabel = extractContent(pageContent?.stories_section, 'featuring_label', 'Featuring:');
  const videoBadgeText = extractContent(pageContent?.stories_section, 'video_badge_text', 'Video');
  const interviewBadgeText = extractContent(pageContent?.stories_section, 'interview_badge_text', 'Interview');
  const articleBadgeText = extractContent(pageContent?.stories_section, 'article_badge_text', 'Article');

  // Function to get badge text based on story type
  const getBadgeText = (type: string) => {
    switch (type) {
      case 'video':
        return videoBadgeText;
      case 'interview':
        return interviewBadgeText;
      case 'article':
        return articleBadgeText;
      default:
        return articleBadgeText;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-32 bg-face-blue">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 text-face-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
              {heroTitle}
            </h1>
            <p className="text-xl text-gray-200">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>
      
      {/* Stories section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
              <div className="mb-8">
                <TabsList className="bg-white p-1 border rounded-lg">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="capitalize"
                    >
                      {category === "all" ? allStoriesText : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.map((story) => (
                  <Card key={story.id} className="overflow-hidden card-hover border-none shadow-md">
                    <div className="relative h-48">
                      <img 
                        src={`${story.imageUrl}?w=600&h=300&fit=crop`} 
                        alt={story.title} 
                        className="w-full h-full object-cover"
                      />
                      {story.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-face-blue/80 rounded-full p-3">
                            <Video className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-face-blue text-white">
                          {getBadgeText(story.type)}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="pt-6">
                      <Badge variant="outline" className="mb-2">{story.category}</Badge>
                      <h3 className="text-xl font-serif font-bold mb-2 line-clamp-2">{story.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">{featuringLabel} {story.nominee}</p>
                      <p className="text-gray-500 line-clamp-3">{story.excerpt}</p>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#" className="flex items-center justify-center">
                          {readStoryButtonText} <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ImpactStories;