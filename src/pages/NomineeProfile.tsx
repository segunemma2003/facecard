import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Trophy, MapPin, Calendar, Video, Loader2, AlertCircle, Vote, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SocialLinks from '@/components/nominees/SocialLinks';
import AchievementTimeline from '@/components/nominees/AchievementTimeline';
import TestimonialsSection from '@/components/nominees/TestimonialsSection';
import { useNominee, useVote, useVoteCheck } from '@/hooks/useApi';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

const NomineeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nomineeId = parseInt(id || '0');
  const [isVoting, setIsVoting] = useState(false);
  
  // API Hooks
  const { data: nomineeResponse, isLoading, error } = useNominee(nomineeId);
  const { data: voteCheckResponse } = useVoteCheck(nomineeId);
  const voteMutation = useVote();
  
  const nominee = nomineeResponse?.data;
  const hasVoted = voteCheckResponse?.data?.has_voted || false;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVote = async () => {
    if (!nominee || hasVoted || !nominee.can_vote) return;
    
    setIsVoting(true);
    
    try {
      await voteMutation.mutateAsync({ nomineeId: nominee.id });
      
      toast({
        title: "Vote Recorded!",
        description: `Thank you for voting for ${nominee.name}.`,
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to record vote. Please try again.";
      toast({
        title: "Vote Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsVoting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-face-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-face-grey/60 font-manrope">Loading nominee profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !nominee) {
    return (
      <div className="min-h-screen bg-face-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-clash mb-4 text-face-grey">Nominee Not Found</h1>
          <p className="mb-6 text-face-grey/60 font-manrope">We couldn't find the nominee you're looking for.</p>
          <Button 
            onClick={() => {
              navigate('/nominees');
              handleScrollToTop();
            }}
            className="bg-face-sky-blue text-face-white hover:bg-face-sky-blue-dark font-manrope"
          >
            Return to Nominees
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero section with cover image */}
      <div className="relative h-72 md:h-96">
        <div className="absolute inset-0 bg-face-sky-blue">
          {nominee.cover_image_url && (
            <img 
              src={nominee.cover_image_url} 
              alt={`${nominee.name} cover`}
              className="w-full h-full object-cover opacity-30"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div className="max-w-3xl">
            <Button
              onClick={() => {
                navigate('/nominees');
                handleScrollToTop();
              }}
              variant="ghost"
              className="text-face-white opacity-80 hover:opacity-100 inline-flex items-center mb-6 font-manrope"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to All Nominees</span>
            </Button>
            <Badge className="mb-2 bg-face-gold text-face-grey font-manrope">
              {nominee.category}
            </Badge>
            {nominee.is_winner && (
              <Badge className="mb-2 ml-2 bg-green-500 text-face-white font-manrope">
                🏆 Winner
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl text-face-white font-clash font-bold mb-2">
              {nominee.name}
            </h1>
            <p className="text-face-white/80 mb-2 font-manrope">{nominee.organization}</p>
            {nominee.position && (
              <p className="text-face-white/80 mb-2 font-manrope">{nominee.position}</p>
            )}
            {nominee.location && (
              <div className="flex items-center text-face-white/70 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="font-manrope">{nominee.location}</span>
              </div>
            )}
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
                  <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-face-white shadow-lg">
                    <img 
                      src={nominee.image_url || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop`}
                      alt={nominee.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop';
                      }}
                    />
                  </div>
                </div>
                
                {/* Voting status */}
                <div className="bg-face-white p-6 rounded-lg border border-face-sky-blue/20 shadow-sm">
                  <h3 className="font-clash font-bold mb-3 flex items-center text-face-grey">
                    <Trophy className="h-5 w-5 text-face-sky-blue mr-2" />
                    Current Standing
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-face-grey/60 font-manrope">Vote Percentage</span>
                      <span className="font-medium text-face-sky-blue font-manrope">{nominee.voting_percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={nominee.voting_percentage} className="h-2 bg-face-sky-blue/10" />
                    <div className="flex justify-between text-sm">
                      <span className="text-face-grey/60 font-manrope">Total Votes</span>
                      <span className="font-medium text-face-sky-blue font-manrope">{nominee.votes}</span>
                    </div>
                  </div>
                </div>

                {/* Vote Button */}
                {nominee.can_vote && (
                  <div className="bg-face-white p-6 rounded-lg border border-face-sky-blue/20 shadow-sm">
                    <Button
                      onClick={handleVote}
                      disabled={hasVoted || isVoting || voteMutation.isPending}
                      className={`w-full font-bold py-3 rounded-xl transition-all duration-300 font-manrope ${
                        hasVoted
                          ? 'bg-green-500 text-face-white cursor-default'
                          : 'bg-face-sky-blue text-face-white hover:bg-face-sky-blue-dark'
                      }`}
                    >
                      {isVoting || voteMutation.isPending ? (
                        <>
                          <Loader2 className="inline h-5 w-5 mr-2 animate-spin" />
                          Voting...
                        </>
                      ) : hasVoted ? (
                        <>
                          <CheckCircle className="inline h-5 w-5 mr-2" />
                          Vote Recorded
                        </>
                      ) : (
                        <>
                          <Vote className="inline h-5 w-5 mr-2" />
                          Vote for {nominee.name.split(' ')[0]}
                        </>
                      )}
                    </Button>
                  </div>
                )}
                
                {/* Social Links */}
                {nominee.social_links && nominee.social_links.length > 0 && (
                  <div className="bg-face-white p-6 rounded-lg border border-face-sky-blue/20 shadow-sm">
                    <h3 className="font-clash font-bold mb-3 text-face-grey">Connect</h3>
                    <SocialLinks links={nominee.social_links} />
                  </div>
                )}

                {/* Share section */}
                <div className="bg-face-white p-6 rounded-lg border border-face-sky-blue/20 shadow-sm">
                  <h3 className="font-clash font-bold mb-3 text-face-grey">Share Profile</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="border-face-sky-blue/30 text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white font-manrope">Twitter</Button>
                    <Button variant="outline" size="sm" className="border-face-sky-blue/30 text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white font-manrope">Facebook</Button>
                    <Button variant="outline" size="sm" className="border-face-sky-blue/30 text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white font-manrope">LinkedIn</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <div className="bg-face-white p-6 md:p-8 rounded-lg border border-face-sky-blue/20 shadow-sm">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="mb-6 bg-face-sky-blue/5 border border-face-sky-blue/20">
                    <TabsTrigger value="profile" className="font-manrope data-[state=active]:bg-face-sky-blue data-[state=active]:text-face-white">Profile</TabsTrigger>
                    {nominee.achievements && nominee.achievements.length > 0 && (
                      <TabsTrigger value="achievements" className="font-manrope data-[state=active]:bg-face-sky-blue data-[state=active]:text-face-white">Achievements</TabsTrigger>
                    )}
                    {nominee.testimonials && nominee.testimonials.length > 0 && (
                      <TabsTrigger value="testimonials" className="font-manrope data-[state=active]:bg-face-sky-blue data-[state=active]:text-face-white">Testimonials</TabsTrigger>
                    )}
                    {nominee.video_url && (
                      <TabsTrigger value="media" className="font-manrope data-[state=active]:bg-face-sky-blue data-[state=active]:text-face-white">Media</TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="profile" className="mt-0">
                    <div className="prose max-w-none">
                      <h2 className="font-clash text-2xl mb-4 text-face-grey">{nominee.name}</h2>
                      <p className="text-lg mb-6 text-face-grey/80 font-manrope leading-relaxed">
                        {nominee.long_bio || nominee.description}
                      </p>
                      
                      {nominee.impact_summary && (
                        <>
                          <h3 className="font-clash text-xl mb-3 text-face-grey">Impact Summary</h3>
                          <div className="bg-face-sky-blue/5 border-l-4 border-face-sky-blue p-4 rounded">
                            <p className="text-face-grey/80 font-manrope">{nominee.impact_summary}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  {nominee.achievements && nominee.achievements.length > 0 && (
                    <TabsContent value="achievements" className="mt-0 space-y-6">
                      <h2 className="font-clash text-2xl mb-4 text-face-grey">Achievement Timeline</h2>
                      <AchievementTimeline achievements={nominee.achievements} />
                    </TabsContent>
                  )}
                  
                  {nominee.testimonials && nominee.testimonials.length > 0 && (
                    <TabsContent value="testimonials" className="mt-0 space-y-6">
                      <h2 className="font-clash text-2xl mb-4 text-face-grey">Testimonials</h2>
                      <TestimonialsSection testimonials={nominee.testimonials} />
                    </TabsContent>
                  )}
                  
                  {nominee.video_url && (
                    <TabsContent value="media" className="mt-0 space-y-6">
                      <h2 className="font-clash text-2xl mb-4 flex items-center text-face-grey">
                        <Video className="h-5 w-5 text-face-sky-blue mr-2" />
                        Featured Video
                      </h2>
                      <div className="aspect-w-16 aspect-h-9 bg-face-sky-blue/5 rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-96"
                          src={nominee.video_url.includes('youtube.com') ? nominee.video_url.replace('watch?v=', 'embed/') : nominee.video_url}
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