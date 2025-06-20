import { Link } from 'react-router-dom';
import { Award, Mail, MapPin, Users, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { extractContent } from '@/lib/contentUtils';
import { usePageContent, useGlobalSettings } from '@/hooks/usePageContent';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fetch content from API
  const { data: footerContent } = usePageContent('footer');
  const { data: companyContent } = usePageContent('company_info');
  const { data: globalSettings } = useGlobalSettings();

  // Extract content with fallbacks
  const getContent = (source: any, key: string, fallback: string = '', options?: any) => {
    if (!source?.data?.data) return fallback;
    return extractContent(source.data.data, key, fallback, options);
  };

  // Social media links from global settings
  const getSocialLinks = () => {
    if (!globalSettings?.data?.data?.social_links_json?.content) {
      // Fallback to individual social URLs
      return [
        {
          platform: 'Facebook',
          url: getContent(globalSettings, 'facebook_url', '#'),
          icon: Facebook
        },
        {
          platform: 'Twitter', 
          url: getContent(globalSettings, 'twitter_url', '#'),
          icon: Twitter
        },
        {
          platform: 'Instagram',
          url: getContent(globalSettings, 'instagram_url', '#'),
          icon: Instagram
        },
        {
          platform: 'LinkedIn',
          url: getContent(globalSettings, 'linkedin_url', '#'),
          icon: Linkedin
        }
      ];
    }

    try {
      const socialData = JSON.parse(globalSettings.data.data.social_links_json.content);
      return socialData.map((social: any) => ({
        platform: social.platform,
        url: social.url,
        icon: getIconComponent(social.icon)
      }));
    } catch (error) {
      console.error('Failed to parse social links JSON:', error);
      return [];
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

  // Get dynamic content
  const companyName = getContent(companyContent, 'company_name', 'Outstanding FACE Global Recognition Awards');
  const companyDescription = getContent(companyContent, 'company_description', 
    'Celebrating outstanding individuals and organizations making meaningful impact across the globe. Recognizing excellence in innovation, leadership, and social contribution.');
  const copyrightText = getContent(footerContent, 'copyright_text', 'Outstanding FACE Global Recognition Awards. All rights reserved.');
  const footerNote = getContent(footerContent, 'footer_note', 'Excellence Recognized Globally');
  
  // Contact information
  const primaryEmail = getContent(globalSettings, 'primary_email', 'info@faceawards.org');
  const fullAddress = getContent(globalSettings, 'full_address', 
    'Global Headquarters<br>3120 Southwest freeway 1st floor<br>2003 Houston TX 77098<br>',
    { stripHtml: false });

  const socialLinks = getSocialLinks();

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
                __html: getContent(companyContent, 'company_description', companyDescription, { stripHtml: false })
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
                { title: 'Current Nominees', path: '/nominees' },
                { title: 'Past Winners', path: '/past-winners' },
                { title: 'Gallery', path: '/gallery' },
                { title: 'Registration', path: '/registration' }
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