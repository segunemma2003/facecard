
import { Globe, Linkedin, Twitter, Github, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SocialMediaLink } from '@/models/nomineeData';

interface SocialLinksProps {
  links: SocialMediaLink[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  // Function to get the appropriate icon based on platform
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
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

  // Group links by platform type
  const primaryPlatforms = ['linkedin', 'twitter', 'instagram', 'facebook'];
  const primaryLinks = links.filter(link => 
    primaryPlatforms.includes(link.platform.toLowerCase())
  );
  const secondaryLinks = links.filter(link => 
    !primaryPlatforms.includes(link.platform.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Primary social links (displayed larger) */}
      <div className="flex flex-wrap gap-2">
        {primaryLinks.map((link, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            className="hover:bg-gray-100 transition-all"
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
              <span className="ml-1">{link.platform}</span>
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
              className="hover:bg-gray-100 border-dashed"
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
                <span className="ml-1">{link.platform}</span>
              </a>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
