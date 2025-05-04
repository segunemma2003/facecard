
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, Trophy, MapPin, Calendar, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { nomineesDetailData } from '@/models/nomineeData';
import SocialLinks from '@/components/nominees/SocialLinks';
import AchievementTimeline from '@/components/nominees/AchievementTimeline';
import TestimonialsSection from '@/components/nominees/TestimonialsSection';

const NomineeProfile = () => {
  const { id } = useParams();
  const nomineeId = parseInt(id || '0');
  
  // Get nominee details
  const nominee = nomineesDetailData[nomineeId];
  
  // Handle case where nominee doesn't exist
  if (!nominee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif mb-4">Nominee Not Found</h1>
          <p className="mb-6">We couldn't find the nominee you're looking for.</p>
          <Button asChild>
            <Link to="/nominees">Return to Nominees</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero section with cover image */}
      <div className="relative h-72 md:h-96">
        <div className="absolute inset-0 bg-face-blue">
          {nominee.coverImageUrl && (
            <img 
              src={nominee.coverImageUrl} 
              alt={`${nominee.name} cover`}
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div className="max-w-3xl">
            <Link to="/nominees" className="text-white opacity-80 hover:opacity-100 inline-flex items-center mb-6">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to All Nominees</span>
            </Link>
            <Badge className="mb-2 bg-face-gold text-face-blue">
              {nominee.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl text-white font-serif font-bold mb-2">
              {nominee.name}
            </h1>
            <p className="text-white/80 mb-2">{nominee.organization} • {nominee.position}</p>
            <div className="flex items-center text-white/70 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{nominee.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Profile image */}
                <div className="relative -mt-20 md:-mt-24">
                  <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={`${nominee.imageUrl}?w=300&h=300&fit=crop`}
                      alt={nominee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Voting status */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-serif font-bold mb-3 flex items-center">
                    <Trophy className="h-5 w-5 text-face-gold mr-2" />
                    Current Standing
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Category Votes</span>
                      <span className="font-medium">{nominee.votingPercentage}%</span>
                    </div>
                    <Progress value={nominee.votingPercentage} className="h-2" />
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-serif font-bold mb-3">Connect</h3>
                  <SocialLinks links={nominee.socialLinks} />
                </div>

                {/* Share section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-serif font-bold mb-3">Share Profile</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">Facebook</Button>
                    <Button variant="outline" size="sm">LinkedIn</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="mb-6 bg-gray-100">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                    {nominee.videoUrl && (
                      <TabsTrigger value="media">Media</TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="profile" className="mt-0">
                    <div className="prose max-w-none">
                      <h2 className="font-serif text-2xl mb-4">{nominee.name}</h2>
                      <p className="text-lg mb-6">{nominee.longBio}</p>
                      
                      <h3 className="font-serif text-xl mb-3">Impact Summary</h3>
                      <div className="bg-face-blue/5 border-l-4 border-face-blue p-4 rounded">
                        <p>{nominee.impactSummary}</p>
                      </div>
                      
                      <div className="mt-8 text-center">
                        <Button className="bg-face-gold text-face-blue hover:bg-yellow-500">
                          Vote for {nominee.name}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="achievements" className="mt-0 space-y-6">
                    <h2 className="font-serif text-2xl mb-4">Achievement Timeline</h2>
                    <AchievementTimeline achievements={nominee.achievements} />
                  </TabsContent>
                  
                  <TabsContent value="testimonials" className="mt-0 space-y-6">
                    <h2 className="font-serif text-2xl mb-4">Testimonials</h2>
                    <TestimonialsSection testimonials={nominee.testimonials} />
                  </TabsContent>
                  
                  {nominee.videoUrl && (
                    <TabsContent value="media" className="mt-0 space-y-6">
                      <h2 className="font-serif text-2xl mb-4 flex items-center">
                        <Video className="h-5 w-5 text-face-gold mr-2" />
                        Featured Video
                      </h2>
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-96"
                          src={nominee.videoUrl.replace('watch?v=', 'embed/')}
                          title={`${nominee.name} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NomineeProfile;
