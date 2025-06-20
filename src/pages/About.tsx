import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { extractContent } from '@/lib/contentUtils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Users, Star, Trophy, User, Book, ShieldCheck } from 'lucide-react';

// Custom hook for page content
const usePageContent = (page: string, section?: string, key?: string) => {
  return useQuery({
    queryKey: ['page-content', page, section, key],
    queryFn: () => {
      if (key && section) {
        return apiClient.getSpecificContent(page, section, key);
      } else if (section) {
        return apiClient.getPageSectionContent(page, section);
      } else {
        return apiClient.getPageContent(page);
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

const About = () => {
  const navigate = useNavigate();

  // Fetch content from API
  const { data: heroContent } = usePageContent('about', 'hero');
  const { data: storyContent } = usePageContent('about', 'our_story');
  const { data: successStoriesContent } = usePageContent('about', 'success_stories');
  const { data: teamContent } = usePageContent('about', 'team');
  const { data: ctaContent } = usePageContent('about', 'call_to_action');

  // Content extraction helper
  const getContent = (source: any, key: string, fallback: string = '', options?: any) => {
    if (!source?.data?.data) return fallback;
    return extractContent(source.data.data, key, fallback, options);
  };

  // Parse JSON content safely
  const parseJsonContent = (source: any, key: string, fallback: any[] = []) => {
    try {
      const content = source?.data?.data?.[key]?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error(`Failed to parse JSON content for key: ${key}`, error);
    }
    return fallback;
  };

  // Get icon component based on name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      trophy: Trophy,
      users: Users,
      star: Star,
      award: Award
    };
    return iconMap[iconName.toLowerCase()] || Award;
  };

  // Get dynamic content
  const heroStats = parseJsonContent(heroContent, 'stats', [
    { icon: 'trophy', value: '240+', label: 'Recipients' },
    { icon: 'users', value: '50+', label: 'Countries' },
    { icon: 'star', value: '12+', label: 'Categories' }
  ]);

  const storyParagraphs = parseJsonContent(storyContent, 'content_paragraphs', []);
  const successStories = parseJsonContent(successStoriesContent, 'stories', []);
  const coreTeam = parseJsonContent(teamContent, 'core_team', []);
  const advisoryBoard = parseJsonContent(teamContent, 'advisory_board', []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleScrollToTop();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        {/* Background hero image */}
        <div className="absolute inset-0">
          <img 
            src={getContent(heroContent, 'background_image', 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')}
            alt="FACE Awards ceremony background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-2xl">
              <Award className="h-12 w-12 text-face-sky-blue" />
            </div>
            
            {/* Main heading */}
            <h1 
              className="text-6xl md:text-7xl font-serif font-bold mb-6 text-white"
              dangerouslySetInnerHTML={{
                __html: getContent(heroContent, 'main_title', 'About the <span class="text-white">FACE Awards</span>')
              }}
            />
            
            {/* Subtitle */}
            <p className="text-2xl text-white mb-8 font-semibold">
              {getContent(heroContent, 'subtitle', 'Celebrating Focus, Achievement, Courage, and Excellence across the globe since 2010')}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-white">
              {heroStats.map((stat: any, index: number) => {
                const IconComponent = getIconComponent(stat.icon);
                return (
                  <div key={index} className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                    <IconComponent className="h-6 w-6 text-white" />
                    <span className="font-bold">{stat.value} {stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-serif font-bold mb-4"
                dangerouslySetInnerHTML={{
                  __html: getContent(storyContent, 'title', 'Our <span class="text-face-sky-blue">Story</span>')
                }}
              />
              <p className="text-lg text-gray-600">
                {getContent(storyContent, 'subtitle', 'The journey of recognizing excellence across borders and industries')}
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              {storyParagraphs.map((paragraph: string, index: number) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              <div className="my-12 grid sm:grid-cols-2 gap-8">
                <div className="bg-face-sky-blue/5 border border-face-sky-blue/20 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6 text-face-sky-blue">
                    <ShieldCheck className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-face-grey">
                    {getContent(storyContent, 'mission_title', 'Our Mission')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {getContent(storyContent, 'mission_content', 'To discover, celebrate, and promote outstanding examples of Focus, Achievement, Courage, and Excellence across all sectors and regions of the world, inspiring a global culture of excellence and positive impact.')}
                  </p>
                </div>
                
                <div className="bg-face-sky-blue/5 border border-face-sky-blue/20 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6 text-face-sky-blue">
                    <Star className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-face-grey">
                    {getContent(storyContent, 'vision_title', 'Our Vision')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {getContent(storyContent, 'vision_content', 'A world where exceptional contributions to human progress are recognized regardless of geography, background, or resources—where excellence is celebrated, shared, and inspires others to create positive change.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-serif font-bold mb-4"
              dangerouslySetInnerHTML={{
                __html: getContent(successStoriesContent, 'title', 'Success <span class="text-face-sky-blue">Stories</span>')
              }}
            />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {getContent(successStoriesContent, 'subtitle', 'Discover how FACE Award recognition has amplified impact and opened new opportunities for our recipients')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.alt} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2 text-face-sky-blue">{story.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 font-medium">{story.award}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {story.description}
                  </p>
                  <button className="text-face-sky-blue font-medium hover:underline inline-flex items-center transition-colors">
                    {getContent(successStoriesContent, 'read_story_button_text', 'Read their story')} <Star className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg">
              {getContent(successStoriesContent, 'view_all_button_text', 'View All Success Stories')}
            </button>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-serif font-bold mb-4"
              dangerouslySetInnerHTML={{
                __html: getContent(teamContent, 'title', 'Our <span class="text-face-sky-blue">Team</span>')
              }}
            />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {getContent(teamContent, 'subtitle', 'Meet the diverse international team that makes the FACE Awards possible')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {coreTeam.slice(0, 4).map((member: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-face-sky-blue text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 font-medium">{member.title}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show additional team members if available */}
          {coreTeam.length > 4 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-8">
              {coreTeam.slice(4).map((member: any, index: number) => (
                <div key={index + 4} className="bg-gray-50 rounded-2xl overflow-hidden text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.alt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-face-sky-blue text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 font-medium">{member.title}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Advisory Board */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-center mb-10 text-face-grey">
              {getContent(teamContent, 'advisory_board_title', 'International Advisory Board')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {advisoryBoard.slice(0, 4).map((advisor: any, index: number) => (
                <div key={index} className="flex gap-4 items-center bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                    <img 
                      src={advisor.image} 
                      alt={advisor.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-face-sky-blue">{advisor.name}</h4>
                    <p className="text-sm text-gray-600 font-medium">{advisor.region}</p>
                    <p className="text-xs text-gray-700 mt-1">{advisor.expertise}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Show more advisors if available */}
            {advisoryBoard.length > 4 && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {advisoryBoard.slice(4, 8).map((advisor: any, index: number) => (
                  <div key={index + 4} className="flex gap-4 items-center bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                      <img 
                        src={advisor.image} 
                        alt={advisor.alt} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-face-sky-blue">{advisor.name}</h4>
                      <p className="text-sm text-gray-600 font-medium">{advisor.region}</p>
                      <p className="text-xs text-gray-700 mt-1">{advisor.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Show remaining advisors if more than 8 */}
            {advisoryBoard.length > 8 && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {advisoryBoard.slice(8).map((advisor: any, index: number) => (
                  <div key={index + 8} className="flex gap-4 items-center bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                      <img 
                        src={advisor.image} 
                        alt={advisor.alt} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-face-sky-blue">{advisor.name}</h4>
                      <p className="text-sm text-gray-600 font-medium">{advisor.region}</p>
                      <p className="text-xs text-gray-700 mt-1">{advisor.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-white">
            {getContent(ctaContent, 'title', 'Join the FACE Awards Community')}
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 text-white/90 leading-relaxed">
            {getContent(ctaContent, 'subtitle', 'Be part of a global network celebrating excellence and making a positive impact across the world.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => handleNavigation('/nominees')}
              className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              {getContent(ctaContent, 'primary_button_text', 'Explore Current Nominees')}
            </button>
            <button 
              onClick={() => handleNavigation('/categories')}
              className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              {getContent(ctaContent, 'secondary_button_text', 'View Award Categories')}
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;