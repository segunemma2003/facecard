import { Link } from 'react-router-dom';
import { Award, Mail, MapPin, Users, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fetch global settings using the same pattern as About page
  const { data: globalSettings } = useQuery({
    queryKey: ['page-content', 'global_settings'],
    queryFn: async () => {
      try {
        const result = await apiClient.getPageContent('global_settings');
        console.log('Footer Global settings API Response:', result);
        return result;
      } catch (error) {
        console.error('Footer Global settings API Error:', error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });

  // Content extraction helper - updated for correct API structure
  const getGlobalContent = (section: string, key: string, fallback: string = '') => {
    try {
      // Correct structure: data.sections.section_name.key.content
      const contentData = globalSettings?.data?.sections?.[section]?.[key];
      
      if (!contentData) {
        console.warn(`No global data found for ${section}/${key}, using fallback: ${fallback}`);
        return fallback;
      }
      
      let result = contentData.content;
      console.log(`Extracted global content for ${section}/${key}:`, result);
      return result || fallback;
    } catch (error) {
      console.error(`Error extracting global content for ${section}/${key}:`, error);
      return fallback;
    }
  };

  // Parse JSON content safely - updated for correct API structure
  const parseGlobalJsonContent = (section: string, key: string, fallback: any[] = []) => {
    try {
      // Correct structure: data.sections.section_name.key
      const contentData = globalSettings?.data?.sections?.[section]?.[key];
      
      if (!contentData) {
        console.warn(`No global JSON data found for ${section}/${key}, using fallback`);
        return fallback;
      }
      
      let content = contentData.content;
      
      // If it's already an array/object, return it directly
      if (Array.isArray(content) || typeof content === 'object') {
        console.log(`Successfully extracted ${contentData.type} content for ${section}/${key}:`, content);
        return content;
      }
      
      // If it's a JSON string, parse it
      if (typeof content === 'string' && contentData.type === 'json') {
        const parsed = JSON.parse(content);
        console.log(`Successfully parsed JSON for ${section}/${key}:`, parsed);
        return parsed;
      }
      
      console.warn(`Content for ${section}/${key} is not in expected format, using fallback`);
      return fallback;
    } catch (error) {
      console.error(`Failed to parse JSON content for ${section}/${key}:`, error);
      return fallback;
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      facebook: Facebook,
      twitter: Twitter,
      instagram: Instagram,
      linkedin: Linkedin
    };
    return iconMap[iconName.toLowerCase()] || Users;
  };

  const handleNavigation = (path: string) => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  // Get social media links from global settings
  const getSocialLinks = () => {
    // First try to get from social_links_json
    const socialLinksJson = parseGlobalJsonContent('social_media', 'social_links_json', []);
    
    if (socialLinksJson.length > 0) {
      return socialLinksJson.map((social: any) => ({
        platform: social.platform,
        url: social.url,
        icon: getIconComponent(social.icon)
      }));
    }

    // Fallback to individual social URLs
    return [
      {
        platform: 'Facebook',
        url: getGlobalContent('social_media', 'facebook_url', '#'),
        icon: Facebook
      },
      {
        platform: 'Twitter', 
        url: getGlobalContent('social_media', 'twitter_url', '#'),
        icon: Twitter
      },
      {
        platform: 'Instagram',
        url: getGlobalContent('social_media', 'instagram_url', '#'),
        icon: Instagram
      },
      {
        platform: 'LinkedIn',
        url: getGlobalContent('social_media', 'linkedin_url', '#'),
        icon: Linkedin
      }
    ];
  };

  // Get all content from global_settings with correct structure
  const companyName = getGlobalContent('company_info', 'company_name', 'Outstanding FACE Global Recognition Awards');
  const companyDescription = getGlobalContent('company_info', 'company_description', 
    'Celebrating outstanding individuals and organizations making meaningful impact across the globe. Recognizing excellence in innovation, leadership, and social contribution.');
  const copyrightText = getGlobalContent('footer', 'copyright_text', 'Outstanding FACE Global Recognition Awards. All rights reserved.');
  const footerNote = getGlobalContent('footer', 'footer_note', 'Excellence Recognized Globally');
  
  // Contact information from global_settings
  const primaryEmail = getGlobalContent('contact_info', 'primary_email', 'info@faceawards.org');
  const fullAddress = getGlobalContent('contact_info', 'full_address', 
    'Global Headquarters<br>3120 Southwest freeway 1st floor<br>2003 Houston TX 77098<br>United States');

  const socialLinks = getSocialLinks();

  // Debug logging
  React.useEffect(() => {
    console.log('Footer Component - Global Settings:', globalSettings);
    console.log('Footer Content:', {
      companyName,
      companyDescription,
      copyrightText,
      footerNote,
      primaryEmail,
      fullAddress,
      socialLinks
    });
  }, [globalSettings, companyName, companyDescription, copyrightText, footerNote, primaryEmail, fullAddress, socialLinks]);

  return (
    <footer className="bg-gradient-to-br from-face-grey via-face-grey-light to-face-grey-dark text-face-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col items-start space-y-4">
              {/* Updated brand logo area */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                  alt="FACE Awards Logo" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
            <div 
              className="text-face-white/90 leading-relaxed max-w-md font-manrope"
              dangerouslySetInnerHTML={{ 
                __html: companyDescription
              }}
            />
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="w-12 h-12 bg-face-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-face-white hover:bg-face-sky-blue hover:scale-110 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.platform} page`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-6 font-clash">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { title: 'Home', path: '/' },
                { title: 'About', path: '/about' },
                { title: 'Categories', path: '/categories' },
                { title: 'Current Nominees', path: '/nominees' },
                { title: 'Past Winners', path: '/past-winners' },
                { title: 'Gallery', path: '/gallery' },
                { title: 'Registration', path: '/registration' },
                { title: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-face-white/80 hover:text-face-sky-blue-light transition-colors duration-300 font-medium hover:translate-x-2 inline-block transform transition-transform font-manrope" 
                    onClick={() => handleNavigation(link.path)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-6 font-clash">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-face-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-face-white" />
                </div>
                <div 
                  className="text-face-white/90 leading-relaxed font-manrope"
                  dangerouslySetInnerHTML={{ 
                    __html: fullAddress
                  }}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-face-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-face-white" />
                </div>
                <a 
                  href={`mailto:${primaryEmail}`}
                  className="text-face-white/90 hover:text-face-sky-blue-light transition-colors duration-300 font-medium font-manrope"
                >
                  {primaryEmail}
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-face-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-face-white" />
                </div>
                <span className="text-face-white/90 font-manrope">
                  Join our global network of FACE honorees
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-face-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-face-white/70 text-center md:text-left font-manrope">
              © {currentYear} {copyrightText}
            </p>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-face-sky-blue" />
              <span className="text-face-white/70 font-manrope">{footerNote}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;