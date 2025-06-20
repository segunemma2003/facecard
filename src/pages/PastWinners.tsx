// src/pages/PastWinners.tsx - Updated with Content API integration
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Filter, Trophy, Star, Crown, Sparkles, Medal, Users, TrendingUp, Calendar, Eye, ChevronRight, Globe, Heart, Loader2, AlertCircle } from 'lucide-react';
import { usePastWinners, usePastWinnerYears, usePastWinnerCategories } from '@/hooks/useApi';
import { extractContent } from '@/lib/contentUtils';
import { usePageContent } from '@/hooks/usePageContent';

const PastWinners = () => {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // API Hooks (keep existing)
  const { data: winnersResponse, isLoading: winnersLoading, error: winnersError } = usePastWinners({
    year: selectedYear,
    category: selectedCategory === "All Categories" ? undefined : selectedCategory
  });
  const { data: yearsResponse } = usePastWinnerYears();
  const { data: categoriesResponse } = usePastWinnerCategories();

  // Content API Hook
  const { data: contentResponse, isLoading: contentLoading, error: contentError } = usePageContent('past_winners');

  const winners = winnersResponse?.data || [];
  const years = yearsResponse?.data || [];
  const categories = categoriesResponse?.data || [];
  const pageContent = contentResponse?.data;

  // Set default year to the most recent year
  useEffect(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 300);
    return () => clearTimeout(timer);
  }, [selectedYear, selectedCategory]);

  const totalWinners = winners.length;
  const countriesRepresented = [...new Set(winners.map(w => w.organization))].length; // Using organization as proxy for country

  const WinnerCard = ({ winner, index }: { winner: any; index: number }) => {
    // Get card texts from content
    const winnerBadgeText = extractContent(pageContent?.winners_grid, 'winner_badge_text', '{year} Winner');
    const viewDetailsText = extractContent(pageContent?.winners_grid, 'view_details_text', 'View Details');
    const organizationLabel = extractContent(pageContent?.winners_grid, 'organization_label', 'Organization:');
    const faceAwardWinnerText = extractContent(pageContent?.winners_grid, 'face_award_winner_text', 'FACE Award Winner');
    
    // Replace placeholder with actual year
    const displayBadgeText = winnerBadgeText.replace('{year}', winner.year.toString());
    
    return (
      <div 
        className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-face-sky-blue/10 overflow-hidden"
        onMouseEnter={() => setHoveredCard(winner.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          animation: animateCards ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
        }}
      >
        {/* Award badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full shadow-2xl animate-pulse">
            <Crown className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Year badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-face-sky-blue text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {displayBadgeText}
          </div>
        </div>

        {/* Image Container */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src={winner.image_url || `https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`}
            alt={winner.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-cyan-500 opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
          
          {/* Organization badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-gray-800 font-bold text-sm flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {winner.organization}
              </span>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-face-sky-blue/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-white font-bold text-sm">{winner.category}</span>
            </div>
          </div>

          {/* Overlay with view button */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-white text-gray-900 hover:bg-face-sky-blue hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
              <Eye className="inline h-5 w-5 mr-2" />
              {viewDetailsText}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-serif font-bold text-face-grey mb-2 group-hover:text-face-sky-blue transition-colors duration-300">
              {winner.name}
            </h3>
            <h4 className="text-lg font-bold text-face-sky-blue mb-3">{winner.achievement}</h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              {winner.achievement}
            </p>
          </div>

          {/* Impact section */}
          <div className="bg-face-sky-blue/5 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">{organizationLabel}</span>
              <span className="font-bold text-face-sky-blue">{winner.organization}</span>
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <Medal className="h-4 w-4" />
              <span className="text-sm font-medium">{faceAwardWinnerText}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-face-sky-blue group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (winnersLoading || contentLoading) {
    const loadingText = extractContent(
      pageContent?.loading_states, 
      'loading_winners_text', 
      'Loading past winners...'
    );
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-gray-600">{loadingText}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state - prioritize winners error over content error
  if (winnersError) {
    const failedToLoadText = extractContent(
      pageContent?.loading_states, 
      'failed_to_load_text', 
      'Failed to load past winners'
    );
    const tryAgainText = extractContent(
      pageContent?.loading_states, 
      'try_again_button_text', 
      'Try Again'
    );
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">{failedToLoadText}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-face-sky-blue text-white px-6 py-2 rounded-lg hover:bg-face-sky-blue-dark transition-colors"
            >
              {tryAgainText}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract content with fallbacks
  const heroTitle = pageContent?.hero?.find(item => item.key === 'main_title')?.content || 'Past Award <span class="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">Winners</span>';
  const heroSubtitle = extractContent(pageContent?.hero, 'subtitle', 'Celebrating the remarkable achievements of previous FACE Award recipients who exemplify Focus, Achievement, Courage, and Excellence');
  const heroBackgroundImage = extractContent(pageContent?.hero, 'background_image', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop');

  // Parse stats labels from JSON content
  let statsLabels = { total_winners: 'Total Winners', organizations: 'Organizations', years_featured: 'Years Featured' };
  try {
    const statsLabelsContent = pageContent?.hero?.find(item => item.key === 'stats_labels')?.content;
    if (statsLabelsContent) {
      const parsed = JSON.parse(statsLabelsContent);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (item.key && item.label) {
            statsLabels[item.key] = item.label;
          }
        });
      }
    }
  } catch (error) {
    console.warn('Failed to parse stats labels:', error);
  }

  const filtersTitle = extractContent(pageContent?.filters_section, 'title', 'Explore Our Winners');
  const filtersSubtitle = extractContent(pageContent?.filters_section, 'subtitle', 'Filter by year and category to discover inspiring achievements');
  const selectYearLabel = extractContent(pageContent?.filters_section, 'select_year_label', 'Select Year');
  const selectCategoryLabel = extractContent(pageContent?.filters_section, 'select_category_label', 'Select Category');
  const allCategoriesText = extractContent(pageContent?.filters_section, 'all_categories_text', 'All Categories');

  // Results header text with placeholders
  const resultsHeaderTemplate = extractContent(pageContent?.winners_grid, 'results_header_text', '{year} Winners {category}');
  const resultsCountTemplate = extractContent(pageContent?.winners_grid, 'results_count_text', 'Displaying {count} award recipient{plural} who changed the world');
  
  // Process template strings
  const categoryText = selectedCategory !== "All Categories" ? `- ${selectedCategory}` : '';
  const resultsHeader = resultsHeaderTemplate
    .replace('{year}', selectedYear?.toString() || '')
    .replace('{category}', categoryText);
    
  const pluralSuffix = winners.length !== 1 ? 's' : '';
  const resultsCount = resultsCountTemplate
    .replace('{count}', winners.length.toString())
    .replace('{plural}', pluralSuffix);

  const emptyStateTitle = extractContent(pageContent?.winners_grid, 'no_winners_title', 'No Winners Found');
  const emptyStateMessage = extractContent(pageContent?.winners_grid, 'no_winners_message', 'No winners found for the selected filters. Try selecting different criteria.');

  const ctaTitle = extractContent(pageContent?.call_to_action, 'title', 'Inspired by Excellence?');
  const ctaSubtitle = extractContent(pageContent?.call_to_action, 'subtitle', 'These winners started with a vision. Your journey to excellence could be next.');
  const ctaPrimaryButton = extractContent(pageContent?.call_to_action, 'primary_button_text', 'Submit Nomination');
  const ctaSecondaryButton = extractContent(pageContent?.call_to_action, 'secondary_button_text', 'View Current Nominees');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-face-sky-blue/5">
      <Navbar />
      
      {/* Custom styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(135, 206, 235, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(135, 206, 235, 0.6);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Hero section */}
      <section className="relative py-40 bg-face-grey overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0">
          <img 
            src={heroBackgroundImage}
            alt="FACE Awards past winners background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Animated decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white rounded-full animate-float"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        {/* Floating crowns and stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {i % 2 === 0 ? <Crown className="h-6 w-6" /> : <Star className="h-4 w-4" />}
            </div>
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Extraordinary icon */}
            <div className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-2xl animate-pulse-glow">
              <Trophy className="h-14 w-14 text-white animate-float" />
            </div>
            
            {/* Main heading */}
            <h1 
              className="text-6xl md:text-8xl font-serif font-bold mb-8 text-white leading-tight"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              {heroSubtitle}
            </p>
            
            {/* Floating stats */}
            <div className="flex flex-wrap justify-center gap-8 text-lg text-white">
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Crown className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{totalWinners}</div>
                  <div className="text-sm opacity-90">{statsLabels.total_winners}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Globe className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{countriesRepresented}</div>
                  <div className="text-sm opacity-90">{statsLabels.organizations}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                <Calendar className="h-7 w-7 text-white" />
                <div className="text-left">
                  <div className="font-bold text-xl">{years.length}</div>
                  <div className="text-sm opacity-90">{statsLabels.years_featured}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: 'white', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#f8fafc', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'white', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <path 
              fill="url(#waveGradient)" 
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Enhanced Filters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                <Filter className="inline h-10 w-10 text-face-sky-blue mr-3" />
                {filtersTitle}
              </h2>
              <p className="text-xl text-gray-600">{filtersSubtitle}</p>
            </div>
            
            <div className="bg-gradient-to-r from-white to-face-sky-blue/5 p-8 rounded-3xl shadow-2xl border border-face-sky-blue/20 mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-face-grey mb-4">{selectYearLabel}</label>
                  <div className="bg-white rounded-2xl p-2 shadow-lg border border-face-sky-blue/20">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                          selectedYear === year
                            ? 'bg-face-sky-blue text-white shadow-lg transform scale-105'
                            : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-face-grey mb-4">{selectCategoryLabel}</label>
                  <div className="bg-white rounded-2xl p-2 shadow-lg border border-face-sky-blue/20 max-h-64 overflow-y-auto">
                    <button
                      onClick={() => setSelectedCategory(allCategoriesText)}
                      className={`w-full px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 mb-1 ${
                        selectedCategory === allCategoriesText
                          ? 'bg-face-sky-blue text-white shadow-lg'
                          : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                      }`}
                    >
                      {allCategoriesText}
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 mb-1 ${
                          selectedCategory === category
                            ? 'bg-face-sky-blue text-white shadow-lg'
                            : 'text-gray-600 hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Winners Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-4">
                {resultsHeader}
              </h2>
              <p className="text-xl text-gray-600">
                {resultsCount}
              </p>
            </div>
            
            {/* Winners grid */}
            {winners.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {winners.map((winner, index) => (
                  <WinnerCard key={winner.id} winner={winner} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-white rounded-3xl p-12 shadow-xl border border-face-sky-blue/20 max-w-md mx-auto">
                  <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">{emptyStateTitle}</h3>
                  <p className="text-gray-500 text-lg">
                    {emptyStateMessage}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Star className="h-16 w-16 text-white mx-auto mb-8 animate-float" />
            <h2 className="text-5xl font-serif font-bold mb-8 text-white">
              {ctaTitle}
            </h2>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              {ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Trophy className="inline h-6 w-6 mr-3" />
                {ctaPrimaryButton}
              </button>
              <button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-5 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <Heart className="inline h-6 w-6 mr-3" />
                {ctaSecondaryButton}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PastWinners;