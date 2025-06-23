// src/pages/ApproachPage.tsx - Updated with correct Content API integration
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Globe, Users, Trophy, Calendar, Handshake, Award, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useCategoryStats, useSettings } from '@/hooks/useApi';

// Custom hook for page content (same as About page)
const usePageContent = (page: string, section?: string, key?: string) => {
  return useQuery({
    queryKey: ['page-content', page, section, key],
    queryFn: async () => {
      try {
        console.log(`Fetching content for: page=${page}, section=${section}, key=${key}`);
        
        if (key && section) {
          const result = await apiClient.getSpecificContent(page, section, key);
          console.log(`API Response for ${page}/${section}/${key}:`, result);
          return result;
        } else if (section) {
          const result = await apiClient.getPageSectionContent(page, section);
          console.log(`API Response for ${page}/${section}:`, result);
          return result;
        } else {
          const result = await apiClient.getPageContent(page);
          console.log(`API Response for ${page}:`, result);
          return result;
        }
      } catch (error) {
        console.error(`API Error for ${page}/${section}/${key}:`, error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
};

const ApproachPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch real data from API (keep existing)
  const { data: statsResponse } = useCategoryStats();
  const { data: settingsResponse } = useSettings();
  
  // Fetch approach page content using the same pattern as About page
  const { 
    data: heroContent, 
    isLoading: heroLoading, 
    error: heroError 
  } = usePageContent('approach', 'hero');
  
  const { 
    data: introContent, 
    isLoading: introLoading, 
    error: introError 
  } = usePageContent('approach', 'introduction');
  
  const { 
    data: processContent, 
    isLoading: processLoading, 
    error: processError 
  } = usePageContent('approach', 'process_section');
  
  const { 
    data: stepsContent, 
    isLoading: stepsLoading, 
    error: stepsError 
  } = usePageContent('approach', 'process_steps');
  
  const { 
    data: ctaContent, 
    isLoading: ctaLoading, 
    error: ctaError 
  } = usePageContent('approach', 'call_to_action');

  const stats = statsResponse?.data;
  const settings = settingsResponse?.data;

  // Check if any critical data is still loading
  const isLoading = heroLoading || introLoading || processLoading || stepsLoading || ctaLoading;
  const hasErrors = heroError || introError || processError || stepsError || ctaError;

  // Content extraction helper (same as About page)
  const getContent = (source: any, key: string, fallback: string = '', options?: any) => {
    try {
      const contentData = source?.data?.content?.[key];
      
      if (!contentData) {
        console.warn(`No data found for key: ${key}, using fallback: ${fallback}`);
        return fallback;
      }
      
      let result = contentData.content;
      
      if (contentData.type === 'html' && typeof result === 'string') {
        if (options?.stripHTML) {
          result = result.replace(/<[^>]*>/g, '');
        }
      }
      
      console.log(`Extracted content for ${key}:`, result);
      return result || fallback;
    } catch (error) {
      console.error(`Error extracting content for ${key}:`, error);
      return fallback;
    }
  };

  // Parse JSON content (same as About page)
  const parseJsonContent = (source: any, key: string, fallback: any[] = []) => {
    try {
      console.log(`Parsing content for key: ${key}`, source);
      const contentData = source?.data?.content?.[key];
      
      if (!contentData) {
        console.warn(`No content found for key: ${key}, using fallback`);
        return fallback;
      }
      
      let content = contentData.content;
      
      if (Array.isArray(content) || typeof content === 'object') {
        console.log(`Successfully extracted ${contentData.type} content for ${key}:`, content);
        return content;
      }
      
      if (typeof content === 'string' && contentData.type === 'json') {
        const parsed = JSON.parse(content);
        console.log(`Successfully parsed JSON for ${key}:`, parsed);
        return parsed;
      }
      
      console.warn(`Content for ${key} is not in expected format, using fallback`);
      return fallback;
    } catch (error) {
      console.error(`Failed to parse content for key: ${key}`, error);
      return fallback;
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Debug: Log all data states
  React.useEffect(() => {
    console.log('Approach Component render - Data states:', {
      heroContent,
      introContent,
      processContent,
      stepsContent,
      ctaContent,
      errors: {
        heroError,
        introError,
        processError,
        stepsError,
        ctaError
      }
    });
  }, [heroContent, introContent, processContent, stepsContent, ctaContent]);

  const handleViewNominees = () => {
    navigate('/nominees');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleViewCategories = () => {
    navigate('/categories');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconMap = {
      globe: Globe,
      users: Users,
      trophy: Trophy,
      calendar: Calendar,
      handshake: Handshake
    };
    return iconMap[iconName as keyof typeof iconMap] || Globe;
  };

  // Default steps data (fallback)
  const defaultSteps = [
    {
      id: 1,
      icon: "globe",
      title: "Global Reach, Local Impact",
      subtitle: "Worldwide Recognition Without Boundaries",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "FACE is not limited by geography. We are committed to recognizing outstanding excellence wherever it exists — from local heroes in small communities to global brands making waves across continents.",
      details: `Our nomination process extends across borders, languages, and cultures, ensuring that all forms of excellence have the opportunity to be recognized regardless of location. Currently serving ${stats?.regions?.length || 'multiple'} regions worldwide.`,
      color: "from-face-sky-blue to-face-sky-blue-light"
    },
    {
      id: 2,
      icon: "users",
      title: "People-Centered Nomination Process",
      subtitle: "Democratic Recognition by the People",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "Nominees are selected through open, inclusive polling systems. The public votes on individuals or companies they believe are making the most impact in their respective categories.",
      details: `This democratic model ensures that recognition comes from the people who experience the impact directly. Our internal screening team then verifies that nominees meet the category criteria before advancing to the final voting round. ${stats?.total_votes ? `Over ${stats.total_votes} votes have been cast to date.` : ''}`,
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      icon: "trophy",
      title: "Award Delivery – Personal and Global",
      subtitle: "Excellence Delivered to Your Doorstep",
      image: "https://images.pexels.com/photos/8761456/pexels-photo-8761456.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "Once nominees are selected and voting concludes, winners receive a beautifully crafted award trophy or plaque, which is sent via secure delivery, courier, or personally presented depending on the location and circumstance.",
      details: "This approach makes sure that every honoree, regardless of their location, receives the recognition they deserve. Each award is custom-crafted to reflect the prestige and honor associated with the FACE Awards.",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      icon: "calendar",
      title: "End-of-Year Global Recognition Ceremony",
      subtitle: "A Grand Celebration of Excellence",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "While FACE primarily delivers awards globally throughout the year, we may also host an annual end-of-year grand recognition ceremony where awardees from around the world can gather, network, and be celebrated in an atmosphere of elegance and inspiration.",
      details: `This optional event brings together diverse leaders and innovators, creating unique opportunities for collaboration and connection among those who exemplify excellence in their respective fields. ${settings?.event_date ? `Our next ceremony is scheduled for ${new Date(settings.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.` : ''}`,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      icon: "handshake",
      title: "Diverse International Collaboration",
      subtitle: "United by Excellence, Strengthened by Diversity",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "FACE is built on strong global partnerships. We are assembling a multicultural, multinational team of professionals, advisors, and collaborators to ensure that our work remains relevant, inclusive, and representative of diverse voices worldwide.",
      details: `This collaborative approach allows us to maintain cultural sensitivity while ensuring that our recognition standards remain consistently high across all regions and sectors we serve. We currently recognize excellence across ${stats?.total_categories || 'multiple'} categories.`,
      color: "from-indigo-500 to-blue-500"
    }
  ];

  // Show loading state (same as About page)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page content...</p>
        </div>
      </div>
    );
  }

  // Show error state (same as About page)
  if (hasErrors) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Content</h2>
          <p className="text-gray-600 mb-4">There was an error loading the page content from the server.</p>
          <div className="text-left bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Error Details:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {heroError && <li>• Hero section: {heroError.message}</li>}
              {introError && <li>• Introduction: {introError.message}</li>}
              {processError && <li>• Process section: {processError.message}</li>}
              {stepsError && <li>• Steps: {stepsError.message}</li>}
              {ctaError && <li>• CTA section: {ctaError.message}</li>}
            </ul>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Get dynamic content with fallbacks
  const steps = parseJsonContent(stepsContent, 'steps_data', defaultSteps);
  
  // Process steps with dynamic data
  const processedSteps = steps.map(step => ({
    ...step,
    details: step.details.includes('multiple regions') && stats?.regions?.length 
      ? step.details.replace('multiple regions', `${stats.regions.length} regions`)
      : step.details.includes('Over') && stats?.total_votes
      ? step.details.replace(/Over \d+ votes/, `Over ${stats.total_votes} votes`)
      : step.details.includes('multiple categories') && stats?.total_categories
      ? step.details.replace('multiple categories', `${stats.total_categories} categories`)
      : step.details
  }));

  // Extract content with fallbacks
  const heroTitle = getContent(heroContent, 'main_title', 'Our Award <span class="text-face-white">Approach</span>');
  const heroSubtitle = getContent(heroContent, 'subtitle', 'A unique process designed to recognize true excellence and impact across the globe');

  // Parse stats labels from JSON content
  const statsLabelsArray = parseJsonContent(heroContent, 'stats_labels', [
    { key: 'award_categories', label: 'Award Categories' },
    { key: 'total_nominees', label: 'Total Nominees' },
    { key: 'votes_cast', label: 'Votes Cast' }
  ]);
  
  let statsLabels = { 
    award_categories: 'Award Categories', 
    total_nominees: 'Total Nominees', 
    votes_cast: 'Votes Cast' 
  };
  
  statsLabelsArray.forEach((item: any) => {
    if (item.key && item.label) {
      statsLabels[item.key as keyof typeof statsLabels] = item.label;
    }
  });

  const introTitle = getContent(introContent, 'title', 'Excellence Without Compromise');
  const introContentText = getContent(introContent, 'content', 'The FACE Awards stands apart through its commitment to fairness, inclusivity, and global representation. Our approach ensures that recognition is based on genuine impact and excellence, not influence or connections. From nomination to final celebration, each step in our process is designed to honor those who truly embody the principles of <span class="font-bold text-face-sky-blue">Focus, Achievement, Courage, and Excellence</span>.');

  const processTitle = getContent(processContent, 'title', 'Our Recognition Process');
  const processSubtitle = getContent(processContent, 'subtitle', 'Five carefully crafted steps that ensure excellence is recognized fairly and globally');

  const ctaTitle = getContent(ctaContent, 'title', 'Be Part of the FACE Awards Journey');
  const ctaSubtitle = getContent(ctaContent, 'subtitle', 'Whether as a nominee, voter, or supporter, you can contribute to recognizing excellence around the world.');
  const ctaPrimaryButton = getContent(ctaContent, 'primary_button_text', 'View Current Nominees');
  const ctaSecondaryButton = getContent(ctaContent, 'secondary_button_text', 'Explore Award Categories');

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-face-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-face-white/30 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-face-white rounded-full mb-8 shadow-2xl">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-12 w-auto"
              />
            </div>
            <h1 
              className="text-5xl md:text-6xl font-serif font-bold mb-6 text-face-white"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            <p className="text-2xl text-face-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>
            
            {/* Real Stats */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-face-white/10 backdrop-blur-sm rounded-lg p-6 border border-face-white/20">
                  <div className="text-3xl font-bold text-face-white">{stats.total_categories}</div>
                  <div className="text-face-white/80 text-sm">{statsLabels.award_categories}</div>
                </div>
                <div className="bg-face-white/10 backdrop-blur-sm rounded-lg p-6 border border-face-white/20">
                  <div className="text-3xl font-bold text-face-white">{stats.total_nominees}</div>
                  <div className="text-face-white/80 text-sm">{statsLabels.total_nominees}</div>
                </div>
                <div className="bg-face-white/10 backdrop-blur-sm rounded-lg p-6 border border-face-white/20">
                  <div className="text-3xl font-bold text-face-white">{stats.total_votes}</div>
                  <div className="text-face-white/80 text-sm">{statsLabels.votes_cast}</div>
                </div>
              </div>
            )}
            
            {/* Process Overview Cards */}
            <div className="flex flex-wrap justify-center gap-6 mt-16">
              {processedSteps.map((step, index) => {
                const IconComponent = getIcon(step.icon);
                return (
                  <div key={step.id} className="flex items-center gap-3 bg-face-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-face-white/30">
                    <IconComponent className="h-5 w-5 text-face-white" />
                    <span className="text-face-white font-medium text-sm">Step {step.id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-face-white rounded-2xl shadow-xl p-12 border border-face-sky-blue/10">
              <h2 className="text-3xl font-serif font-bold text-face-grey mb-8">
                {introTitle}
              </h2>
              <p 
                className="text-xl leading-relaxed text-face-grey/80"
                dangerouslySetInnerHTML={{ __html: introContentText }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Process Flow */}
      <section className="py-24 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-6">
                {processTitle}
              </h2>
              <p className="text-xl text-face-grey/70 max-w-3xl mx-auto">
                {processSubtitle}
              </p>
            </div>

            {/* Process Visualization */}
            <div className="relative mb-20">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-face-grey/20 transform -translate-y-1/2 hidden lg:block">
                <div 
                  className="h-full bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark transition-all duration-1000 ease-out"
                  style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
                ></div>
              </div>
              
              {/* Step Indicators */}
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 relative">
                {processedSteps.map((step, index) => {
                  const IconComponent = getIcon(step.icon);
                  return (
                    <div key={step.id} className="flex flex-col items-center text-center lg:w-1/5">
                      <div 
                        className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 transform ${
                          index <= activeStep 
                            ? 'bg-face-sky-blue border-face-sky-blue-dark scale-110 shadow-lg' 
                            : 'bg-face-white border-face-grey/30'
                        }`}
                      >
                        {index <= activeStep ? (
                          <CheckCircle className="h-8 w-8 text-face-white" />
                        ) : (
                          <IconComponent className="h-6 w-6 text-face-grey/40" />
                        )}
                        
                        {index <= activeStep && (
                          <div className="absolute inset-0 rounded-full bg-face-sky-blue animate-ping opacity-20"></div>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-face-grey mt-4 text-sm lg:text-base">
                        {step.title}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Steps */}
            <div className="space-y-24">
              {processedSteps.map((step, index) => {
                const IconComponent = getIcon(step.icon);
                return (
                  <div 
                    key={step.id} 
                    className={`transform transition-all duration-1000 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                      {/* Image Section */}
                      <div className="lg:w-1/2">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                          <img 
                            src={step.image}
                            alt={step.title}
                            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                          <div className="absolute top-6 left-6">
                            <div className="bg-face-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                              <IconComponent className="h-6 w-6 text-face-sky-blue" />
                            </div>
                          </div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-face-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                              <div className="flex items-center gap-3">
                                <div className="bg-face-sky-blue text-face-white rounded-full px-3 py-1 text-sm font-bold">
                                  Step {step.id}
                                </div>
                                <span className="text-face-grey font-medium text-sm">{step.subtitle}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="lg:w-1/2">
                        <div className="bg-face-white rounded-2xl shadow-xl p-8 border border-face-sky-blue/10 hover:shadow-2xl transition-shadow duration-300">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="bg-face-sky-blue/10 rounded-full p-3">
                              <IconComponent className="h-8 w-8 text-face-sky-blue" />
                            </div>
                            <div>
                              <span className="text-face-sky-blue font-bold text-sm">STEP {step.id}</span>
                              <h3 className="text-2xl font-serif font-bold text-face-grey">{step.title}</h3>
                            </div>
                          </div>
                          
                          <p className="text-face-grey/80 mb-6 leading-relaxed text-lg">
                            {step.description}
                          </p>
                          
                          <p className="text-face-grey/70 leading-relaxed">
                            {step.details}
                          </p>

                          <div className="mt-6 pt-6 border-t border-face-grey/10">
                            <div className="flex items-center text-face-sky-blue font-medium">
                              <span>Learn more about this step</span>
                              <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-8 text-face-white">
              {ctaTitle}
            </h2>
            <p className="text-xl text-face-white/90 mb-12 leading-relaxed">
              {ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleViewNominees}
                className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white border-4 border-face-white hover:border-face-white shadow-2xl text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300"
              >
                {ctaPrimaryButton}
              </button>
              <button 
                onClick={handleViewCategories}
                className="border-4 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300"
              >
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

export default ApproachPage;