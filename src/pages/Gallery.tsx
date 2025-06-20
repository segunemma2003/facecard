// src/pages/Gallery.tsx - Updated with Content API integration
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Image, X, ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGalleryEvents, useGalleryYears } from '@/hooks/useApi';
import { extractContent } from '@/lib/contentUtils';
import { usePageContent } from '@/hooks/usePageContent';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // API Hooks (keep existing)
  const { data: galleryResponse, isLoading, error } = useGalleryEvents({
    year: selectedYear,
    featured_only: false
  });
  const { data: yearsResponse } = useGalleryYears();

  // Content API Hook
  const { data: contentResponse, isLoading: contentLoading, error: contentError } = usePageContent('gallery');

  const galleryData = galleryResponse?.data || [];
  const years = yearsResponse?.data || [];
  const pageContent = contentResponse?.data;

  // Set default year to the most recent year
  useEffect(() => {
    if (years.length > 0 && !selectedYear) {
      const sortedYears = [...years].sort((a, b) => b - a);
      setSelectedYear(sortedYears[0]);
    }
  }, [years, selectedYear]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (eventIndex: number, imageIndex: number) => {
    setCurrentEventIndex(eventIndex);
    setCurrentImageIndex(imageIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevImage = () => {
    const currentEvent = galleryData[currentEventIndex];
    if (currentEvent && currentEvent.images.length > 0) {
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else {
        setCurrentImageIndex(currentEvent.images.length - 1);
      }
    }
  };

  const goToNextImage = () => {
    const currentEvent = galleryData[currentEventIndex];
    if (currentEvent && currentEvent.images.length > 0) {
      if (currentImageIndex < currentEvent.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
    }
  };

  // Calculate total images
  const totalImages = galleryData.reduce((sum, event) => sum + (event.images?.length || 0), 0);

  // Loading state
  if (isLoading || contentLoading) {
    const loadingText = extractContent(
      pageContent?.loading_states, 
      'loading_gallery_text', 
      'Loading gallery...'
    );
    
    return (
      <div className="min-h-screen bg-face-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-face-grey/60 font-manrope">{loadingText}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state - prioritize gallery error over content error
  if (error) {
    const failedToLoadText = extractContent(
      pageContent?.loading_states, 
      'failed_to_load_text', 
      'Failed to load gallery'
    );
    const tryAgainText = extractContent(
      pageContent?.loading_states, 
      'try_again_button_text', 
      'Try Again'
    );
    
    return (
      <div className="min-h-screen bg-face-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-face-grey/60 mb-4 font-manrope">{failedToLoadText}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-face-sky-blue text-face-white px-6 py-2 rounded-lg hover:bg-face-sky-blue-dark transition-colors font-manrope"
            >
              {tryAgainText}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract content with fallbacks
  const heroTitle = pageContent?.hero?.find(item => item.key === 'main_title')?.content || 'Event <span class="text-face-sky-blue-light">Gallery</span>';
  const heroSubtitle = extractContent(pageContent?.hero, 'subtitle', 'Experience the grandeur and inspiration of FACE Award ceremonies from around the world');
  const heroBackgroundImage = extractContent(pageContent?.hero, 'background_image', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop');

  // Parse stats labels from JSON content
  let statsLabels = { 
    events: { label: 'Events', suffix: '+' }, 
    photos: { label: 'Photos', suffix: '+' }, 
    years: { label: 'Years', suffix: '+' } 
  };
  try {
    const statsLabelsContent = pageContent?.hero?.find(item => item.key === 'stats_labels')?.content;
    if (statsLabelsContent) {
      const parsed = JSON.parse(statsLabelsContent);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (item.key && item.label) {
            statsLabels[item.key] = { label: item.label, suffix: item.suffix || '' };
          }
        });
      }
    }
  } catch (error) {
    console.warn('Failed to parse stats labels:', error);
  }

  const eventsSuffix = extractContent(pageContent?.year_selector, 'events_suffix', 'Events');
  
  const noImagesTitle = extractContent(pageContent?.gallery_content, 'no_images_title', 'No Images Available');
  const noImagesMessage = extractContent(pageContent?.gallery_content, 'no_images_message', 'Images for this event are coming soon.');
  const noEventsTitle = extractContent(pageContent?.gallery_content, 'no_events_title', 'No Events Found');
  const noEventsMessageWithYear = extractContent(pageContent?.gallery_content, 'no_events_message_with_year', 'No events found for {year}. Try selecting a different year.');
  const noEventsMessageGeneral = extractContent(pageContent?.gallery_content, 'no_events_message_general', 'No events available at the moment.');
  const imageCounterText = extractContent(pageContent?.gallery_content, 'image_counter_text', 'of');

  const ctaTitle = extractContent(pageContent?.call_to_action, 'title', 'Be Part of Our Next Celebration');
  const ctaSubtitle = extractContent(pageContent?.call_to_action, 'subtitle', 'Join us at upcoming FACE Awards events and become part of our global community celebrating excellence.');
  const ctaPrimaryButton = extractContent(pageContent?.call_to_action, 'primary_button_text', 'Register for Next Event');
  const ctaSecondaryButton = extractContent(pageContent?.call_to_action, 'secondary_button_text', 'View Current Nominees');

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        {/* Background hero image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroBackgroundImage}
            alt="Awards ceremony background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-face-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-face-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* FACE Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-face-white rounded-full mb-8 shadow-2xl">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-12 w-auto"
              />
            </div>
            
            {/* Main heading */}
            <h1 
              className="text-6xl md:text-7xl font-clash font-bold mb-6 text-face-white"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            
            {/* Subtitle */}
            <p className="text-2xl text-face-white mb-8 font-semibold font-manrope">
              {heroSubtitle}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-face-white">
              <div className="flex items-center gap-3 bg-face-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-face-white/60 hover:bg-face-white/50 transition-all duration-300">
                <Award className="h-6 w-6 text-face-white" />
                <span className="font-bold font-manrope">
                  {galleryData.length}{statsLabels.events.suffix} {statsLabels.events.label}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-face-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-face-white/60 hover:bg-face-white/50 transition-all duration-300">
                <Image className="h-6 w-6 text-face-white" />
                <span className="font-bold font-manrope">
                  {totalImages}{statsLabels.photos.suffix} {statsLabels.photos.label}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-face-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-face-white/60 hover:bg-face-white/50 transition-all duration-300">
                <Calendar className="h-6 w-6 text-face-white" />
                <span className="font-bold font-manrope">
                  {years.length}{statsLabels.years.suffix} {statsLabels.years.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="#FFFFFF" 
              fillOpacity="1" 
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Year selector */}
      <section className="py-16 bg-face-white">
        <div className="container mx-auto px-4">
          {years.length > 0 && (
            <div className="flex justify-center mb-16">
              <div className="bg-face-sky-blue/5 shadow-2xl border-4 border-face-sky-blue/20 p-3 rounded-2xl">
                {[...years].sort((a, b) => b - a).map((year) => (
                  <Button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    variant={selectedYear === year ? "default" : "ghost"}
                    className={`px-8 py-4 mx-2 text-xl font-bold rounded-xl transition-all duration-300 font-clash ${
                      selectedYear === year
                        ? 'bg-face-sky-blue text-face-white shadow-xl transform scale-105'
                        : 'bg-face-white text-face-grey hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                    }`}
                  >
                    {year} {eventsSuffix}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Gallery content */}
          <div className="space-y-24">
            {galleryData.map((event, eventIndex) => (
              <div key={event.id} className="relative">
                {/* Event Header */}
                <div className="text-center mb-16">
                  <div className="inline-block bg-face-sky-blue px-8 py-3 rounded-full mb-6 shadow-lg">
                    <div className="bg-face-white text-face-sky-blue border-0 text-lg font-bold px-4 py-1 rounded-full font-clash">
                      {event.year}
                    </div>
                  </div>
                  <h2 className="text-5xl font-clash font-bold mb-6 text-face-grey">
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap justify-center items-center gap-8 text-face-grey mb-6 text-lg">
                    <div className="flex items-center gap-3 bg-face-white px-6 py-3 rounded-full shadow-lg border border-face-sky-blue/20">
                      <MapPin className="h-6 w-6 text-face-sky-blue" />
                      <span className="font-bold font-manrope">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-face-white px-6 py-3 rounded-full shadow-lg border border-face-sky-blue/20">
                      <Calendar className="h-6 w-6 text-face-sky-blue" />
                      <span className="font-bold font-manrope">{event.date}</span>
                    </div>
                    {event.attendees && (
                      <div className="flex items-center gap-3 bg-face-white px-6 py-3 rounded-full shadow-lg border border-face-sky-blue/20">
                        <Users className="h-6 w-6 text-face-sky-blue" />
                        <span className="font-bold font-manrope">{event.attendees}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xl text-face-grey/80 max-w-4xl mx-auto mb-6 leading-relaxed font-manrope">
                    {event.description}
                  </p>
                  {event.highlights && (
                    <div className="inline-block bg-face-sky-blue/10 border-2 border-face-sky-blue/30 px-8 py-4 rounded-full">
                      <span className="text-face-sky-blue font-bold text-lg font-manrope">{event.highlights}</span>
                    </div>
                  )}
                </div>
                
                {/* Image Grid */}
                {event.images && event.images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {event.images.map((image, imageIndex) => (
                      <div 
                        key={image.id} 
                        className="group cursor-pointer relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 border-4 border-face-white"
                        onClick={() => openLightbox(eventIndex, imageIndex)}
                      >
                        <img 
                          src={image.image_url || `https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`}
                          alt={image.caption || event.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-face-grey/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <p className="text-face-white text-lg font-bold leading-relaxed font-manrope">
                              {image.caption || `${event.title} - Image ${imageIndex + 1}`}
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-face-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl">
                            <Image className="h-6 w-6 text-face-sky-blue" />
                          </div>
                        </div>
                        {/* Image number indicator */}
                        <div className="absolute top-6 left-6">
                          <div className="bg-face-sky-blue text-face-white px-4 py-2 rounded-full text-lg font-bold shadow-xl font-manrope">
                            {imageIndex + 1} {imageCounterText} {event.images.length}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-face-white rounded-3xl p-12 shadow-xl border border-face-sky-blue/20 max-w-md mx-auto">
                      <Image className="h-16 w-16 text-face-grey/40 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-face-grey mb-4 font-clash">{noImagesTitle}</h3>
                      <p className="text-face-grey/60 text-lg font-manrope">
                        {noImagesMessage}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* No events message */}
          {galleryData.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="bg-face-white rounded-3xl p-12 shadow-xl border border-face-sky-blue/20 max-w-md mx-auto">
                <Calendar className="h-16 w-16 text-face-grey/40 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-face-grey mb-4 font-clash">{noEventsTitle}</h3>
                <p className="text-face-grey/60 text-lg font-manrope">
                  {selectedYear 
                    ? noEventsMessageWithYear.replace('{year}', selectedYear.toString())
                    : noEventsMessageGeneral
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {isLightboxOpen && galleryData[currentEventIndex] && galleryData[currentEventIndex].images && galleryData[currentEventIndex].images[currentImageIndex] && (
        <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center">
          <Button 
            className="absolute top-8 right-8 text-face-white hover:text-face-gold p-6 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 shadow-2xl border-2 border-face-white/20 hover:border-face-gold"
            onClick={closeLightbox}
            variant="ghost"
          >
            <X className="h-10 w-10" />
          </Button>
          
          <Button 
            className="absolute left-8 top-1/2 -translate-y-1/2 text-face-white hover:text-face-gold p-8 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 shadow-2xl border-2 border-face-white/20 hover:border-face-gold"
            onClick={goToPrevImage}
            variant="ghost"
          >
            <ChevronLeft className="h-12 w-12" />
          </Button>
          
          <Button 
            className="absolute right-8 top-1/2 -translate-y-1/2 text-face-white hover:text-face-gold p-8 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 shadow-2xl border-2 border-face-white/20 hover:border-face-gold"
            onClick={goToNextImage}
            variant="ghost"
          >
            <ChevronRight className="h-12 w-12" />
          </Button>
          
          <div className="w-full max-w-7xl mx-8">
            <div className="relative">
              <img 
                src={galleryData[currentEventIndex].images[currentImageIndex].image_url} 
                alt={galleryData[currentEventIndex].images[currentImageIndex].caption || galleryData[currentEventIndex].title}
                className="max-h-[85vh] mx-auto rounded-3xl shadow-2xl border-4 border-face-white/20"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-12 rounded-b-3xl">
                <div className="max-w-5xl">
                  <h3 className="text-face-white text-4xl font-clash font-bold mb-6">
                    {galleryData[currentEventIndex].title}
                  </h3>
                  <p className="text-face-white/95 text-2xl mb-6 leading-relaxed font-medium font-manrope">
                    {galleryData[currentEventIndex].images[currentImageIndex].caption || `${galleryData[currentEventIndex].title} - Image ${currentImageIndex + 1}`}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8 text-face-white/90 text-xl">
                      <span className="font-bold font-manrope">{galleryData[currentEventIndex].location}</span>
                      <span className="text-face-gold">•</span>
                      <span className="font-bold font-manrope">{galleryData[currentEventIndex].date}</span>
                    </div>
                    <div className="text-face-white font-bold text-xl bg-face-white/20 px-6 py-3 rounded-2xl border-2 border-face-white/30 font-manrope">
                      {currentImageIndex + 1} {imageCounterText} {galleryData[currentEventIndex].images.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-clash font-bold mb-8 text-face-white">
              {ctaTitle}
            </h2>
            <p className="text-2xl text-face-white/90 mb-12 leading-relaxed font-manrope">
              {ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => {
                  navigate('/registration');
                  handleScrollToTop();
                }}
                className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white border-4 border-face-white hover:border-face-white shadow-2xl text-xl font-bold py-6 px-12 rounded-full transform hover:scale-105 transition-all duration-300 font-manrope"
              >
                {ctaPrimaryButton}
              </Button>
              <Button 
                onClick={() => {
                  navigate('/nominees');
                  handleScrollToTop();
                }}
                variant="outline"
                className="border-4 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-6 px-12 rounded-full transform hover:scale-105 transition-all duration-300 font-manrope"
              >
                {ctaSecondaryButton}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Gallery;