import { Link } from 'react-router-dom';
import { ArrowRight, Award, Star, Users, Trophy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategoryStats, useCategories } from '@/hooks/useApi';
import { usePageContent } from '@/hooks/usePageContent';
import { ContentRenderer, getPlainText, formatContentForDisplay } from '@/lib/contentUtils';

const Hero = () => {
  // Fetch page content for hero section
  const { data: heroContent, isLoading: contentLoading } = usePageContent('homepage', 'hero');
  
  // Fetch real-time data from API
  const { data: statsResponse, isLoading: statsLoading } = useCategoryStats();
  const { data: categoriesResponse, isLoading: categoriesLoading } = useCategories({ voting_only: true });
  
  const stats = statsResponse?.data;
  const votingCategories = categoriesResponse?.data || [];
  const heroData = heroContent?.data?.content || {};
  
  // Extract content with proper parsing
  const mainTitle = heroData.main_title?.content || 'Celebrating Global Excellence';
  const mainSubtitle = getPlainText(heroData.main_subtitle?.content, heroData.main_subtitle?.type) || 'Recognizing outstanding achievements across the world.';
  const highlightTitle = heroData.current_highlight_subtitle?.content || '2025 Voting Now Open';
  const highlightContent = getPlainText(heroData.current_highlight_content?.content, heroData.current_highlight_content?.type) || 'Cast your vote for outstanding nominees.';
  const primaryButtonText = heroData.primary_button_text?.content || 'View Current Nominees';
  const secondaryButtonText = heroData.secondary_button_text?.content || 'Register for Event';
  
  // Calculate dynamic stats
  const totalNominees = stats?.total_nominees || 0;
  const activeVotingCategories = stats?.active_voting_categories || 0;
  const totalCategories = stats?.total_categories || 12;
  const totalVotes = stats?.total_votes || 0;
  
  // Calculate days remaining
  const daysRemaining = votingCategories.reduce((min, category) => {
    if (category.voting_open && category.days_remaining !== undefined) {
      return min === null ? category.days_remaining : Math.min(min, category.days_remaining);
    }
    return min;
  }, null as number | null);

  const votingEnabled = activeVotingCategories > 0;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (contentLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <Loader2 className="h-12 w-12 animate-spin text-face-white" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey">
      {/* Background and decoration elements remain the same */}
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-face-white space-y-8">              
              {/* Main Heading with dynamic content */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in font-clash">
                  {mainTitle.split(' ').map((word, index) => (
                    <span key={index}>
                      {index === 0 ? word : (
                        index === 1 ? (
                          <span className="bg-gradient-to-r from-face-white via-face-sky-blue-light to-face-white bg-clip-text text-transparent">
                            <br />{word}
                          </span>
                        ) : ` ${word}`
                      )}
                    </span>
                  ))}
                </h1>
                
                {/* Use ContentRenderer for subtitle with HTML parsing */}
                <ContentRenderer
                  content={heroData.main_subtitle?.content}
                  type={heroData.main_subtitle?.type || 'text'}
                  className="text-xl md:text-2xl opacity-90 leading-relaxed animate-slide-in delay-300 font-manrope"
                  fallback="Recognizing outstanding achievements in Focus, Achievement, Courage, and Excellence across the world."
                  stripHtml={false} // Set to true if you want plain text only
                />
              </div>
              
              {/* Action Buttons with dynamic text */}
              <div className="flex flex-col sm:flex-row gap-4 animate-scale-up delay-500">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue-light hover:text-face-white border-2 border-face-white shadow-2xl text-lg px-8 py-6 h-auto rounded-xl font-semibold transition-all duration-300 font-manrope"
                  onClick={handleScrollToTop}
                >
                  <Link to="/nominees" className="flex items-center">
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-lg px-8 py-6 h-auto rounded-xl font-semibold backdrop-blur-sm font-manrope"
                  onClick={handleScrollToTop}
                >
                  <Link to="/registration">{secondaryButtonText}</Link>
                </Button>
              </div>
              
              {/* Stats section remains the same */}
              <div className="flex flex-wrap gap-6 pt-4 animate-fade-in delay-700">
                <div className="flex items-center text-face-white/90">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span className="font-medium font-manrope">
                    {statsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin inline" />
                    ) : (
                      `${totalVotes}+ Votes Cast`
                    )}
                  </span>
                </div>
                <div className="flex items-center text-face-white/90">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-medium font-manrope">50+ Countries</span>
                </div>
                <div className="flex items-center text-face-white/90">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="font-medium font-manrope">
                    {statsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin inline" />
                    ) : (
                      `${totalCategories} Categories`
                    )}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Column with dynamic highlight content */}
            <div className="animate-fade-in delay-700">
              <div className="relative">
                <div className="bg-face-white/10 backdrop-blur-lg p-8 rounded-3xl border border-face-white/20 shadow-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-4 h-4 rounded-full mr-3 ${
                      votingEnabled ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                    }`}></div>
                    <span className="font-semibold uppercase text-face-white text-sm tracking-wider font-manrope">
                      {votingEnabled ? 'Current Highlight' : 'Coming Soon'}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-face-white font-clash">
                    {highlightTitle}
                  </h3>
                  
                  {/* Use ContentRenderer for highlight content */}
                  <ContentRenderer
                    content={heroData.current_highlight_content?.content}
                    type={heroData.current_highlight_content?.type || 'text'}
                    className="text-face-white/90 mb-6 leading-relaxed font-manrope"
                    fallback="Cast your vote for outstanding nominees across categories representing innovation and excellence from around the world."
                    stripHtml={true} // Strip HTML for this section since it's in a card
                  />
                  
                  {/* Stats and button sections remain the same */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Stats content unchanged */}
                  </div>
                  
                  <Button
                    asChild
                    className={`w-full shadow-xl rounded-xl font-semibold py-3 font-manrope ${
                      votingEnabled 
                        ? 'bg-face-sky-blue text-face-white hover:bg-face-sky-blue-dark' 
                        : 'bg-face-white/20 text-face-white/80 cursor-not-allowed'
                    }`}
                    onClick={handleScrollToTop}
                    disabled={!votingEnabled}
                  >
                    <Link to={votingEnabled ? "/nominees" : "#"} className="flex items-center justify-center">
                      {votingEnabled ? 'Cast Your Vote' : 'Voting Closed'}
                      {votingEnabled && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </div>
                
                {/* Decoration elements unchanged */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave effect unchanged */}
    </section>
  );
};

export default Hero;