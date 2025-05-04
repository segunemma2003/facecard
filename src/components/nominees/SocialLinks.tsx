
import { Globe, Linkedin, Twitter, Github, Instagram } from 'lucide-react';
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
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="sm" 
          className="hover:bg-gray-100"
          asChild
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            {getIcon(link.platform)}
            <span className="ml-1">{link.platform}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialLinks;
