import { Globe, Linkedin, Twitter, Github, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Using API SocialLink interface
interface SocialLink {
  platform: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  // Function to get the appropriate icon based on platform
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
      case 'x':
        return <Twitter className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  // Function to get platform color
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'hover:bg-blue-600 hover:text-white hover:border-blue-600';
      case 'twitter':
      case 'x':
        return 'hover:bg-sky-500 hover:text-white hover:border-sky-500';
      case 'github':
        return 'hover:bg-gray-800 hover:text-white hover:border-gray-800';
      case 'instagram':
        return 'hover:bg-pink-600 hover:text-white hover:border-pink-600';
      case 'facebook':
        return 'hover:bg-blue-700 hover:text-white hover:border-blue-700';
      case 'youtube':
        return 'hover:bg-red-600 hover:text-white hover:border-red-600';
      default:
        return 'hover:bg-face-sky-blue hover:text-face-white hover:border-face-sky-blue';
    }
  };

  // Group links by platform type
  const primaryPlatforms = ['linkedin', 'twitter', 'x', 'instagram', 'facebook'];
  const primaryLinks = links.filter(link => 
    primaryPlatforms.includes(link.platform.toLowerCase())
  );
  const secondaryLinks = links.filter(link => 
    !primaryPlatforms.includes(link.platform.toLowerCase())
  );

  if (links.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-face-grey/60 text-sm font-manrope">No social links available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Primary social links (displayed larger) */}
      <div className="flex flex-wrap gap-2">
        {primaryLinks.map((link, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            className={`border-face-sky-blue/30 text-face-grey transition-all duration-300 font-manrope ${getPlatformColor(link.platform)}`}
            asChild
          >
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center"
              aria-label={`Visit ${link.platform} profile`}
            >
              {getIcon(link.platform)}
              <span className="ml-2 capitalize">{link.platform}</span>
            </a>
          </Button>
        ))}
      </div>

      {/* Secondary social links (if any) */}
      {secondaryLinks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {secondaryLinks.map((link, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm" 
              className={`border-face-sky-blue/20 border-dashed text-face-grey/80 transition-all duration-300 font-manrope ${getPlatformColor(link.platform)}`}
              asChild
            >
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center"
                aria-label={`Visit ${link.platform} profile`}
              >
                {getIcon(link.platform)}
                <span className="ml-2 capitalize">{link.platform}</span>
              </a>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinks;