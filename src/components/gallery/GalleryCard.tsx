import { Image, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// API GalleryEvent interface
interface APIGalleryEvent {
  id: number;
  title: string;
  location: string;
  date: string; // Formatted date from API
  event_date: string; // Raw date from API
  description: string;
  attendees?: string | null;
  highlights?: string | null;
  year: number;
  is_featured: boolean;
  image_count: number;
  featured_image?: string | null;
  images: Array<{
    id: number;
    image_url: string;
    caption: string | null;
  }>;
}

// Component props interface (supports both API and legacy formats)
interface GalleryEvent {
  id: number;
  title: string;
  location: string;
  date: string;
  imageUrl?: string; // Legacy format support
  imageCount?: number; // Legacy format support
  // API format fields
  event_date?: string;
  description?: string;
  attendees?: string | null;
  highlights?: string | null;
  year?: number;
  is_featured?: boolean;
  image_count?: number;
  featured_image?: string | null;
  images?: Array<{
    id: number;
    image_url: string;
    caption: string | null;
  }>;
}

interface GalleryCardProps {
  event: GalleryEvent;
}

const GalleryCard = ({ event }: GalleryCardProps) => {
  const navigate = useNavigate();

  const handleViewGallery = () => {
    navigate(`/gallery/${event.id}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  // Use featured image, first image, legacy imageUrl, or fallback
  const imageUrl = event.featured_image || 
                   event.images?.[0]?.image_url || 
                   event.imageUrl || // Legacy support
                   'https://images.unsplash.com/photo-1605810230434-7631ac76ec81';

  // Get image count from API or legacy format
  const imageCount = event.image_count || event.imageCount || 0;

  return (
    <div 
      className="group relative overflow-hidden rounded-lg face-card-hover cursor-pointer"
      onClick={handleViewGallery}
    >
      <div className="aspect-[4/3] h-full w-full overflow-hidden">
        <img
          src={`${imageUrl}?w=600&h=400&fit=crop`}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Image Count Badge */}
        <div className="absolute top-4 right-4 bg-face-sky-blue/90 backdrop-blur-sm text-face-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
          <Image className="h-4 w-4" />
          <span className="text-sm font-medium font-manrope">{imageCount}</span>
        </div>

        {/* Featured Badge */}
        {event.is_featured && (
          <div className="absolute top-4 left-4 bg-face-gold/90 backdrop-blur-sm text-face-grey px-3 py-1 rounded-full text-xs font-semibold font-manrope shadow-lg">
            ⭐ Featured
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="space-y-2">
            <h3 className="text-xl font-clash font-bold text-face-white leading-tight">
              {event.title}
            </h3>
            
            <div className="flex flex-col space-y-1 text-sm text-face-white/90">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="font-manrope">{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="font-manrope">{event.date}</span>
              </div>
              {event.attendees && (
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span className="font-manrope">{event.attendees}</span>
                </div>
              )}
            </div>

            {/* Description Preview */}
            {event.description && (
              <p className="text-sm text-face-white/80 font-manrope line-clamp-2 leading-relaxed">
                {event.description}
              </p>
            )}

            {/* Highlights */}
            {event.highlights && (
              <div className="bg-face-white/10 backdrop-blur-sm rounded-md p-2 border border-face-white/20">
                <p className="text-xs text-face-white/90 font-manrope italic">
                  "{event.highlights}"
                </p>
              </div>
            )}
          </div>

          {/* Hover Action */}
          <div className="transform translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 mt-4">
            <button className="bg-face-sky-blue/20 backdrop-blur-sm hover:bg-face-sky-blue/40 text-face-white py-2 px-4 rounded-lg transition-colors border border-face-white/20 font-manrope font-medium">
              View Gallery ({imageCount} photos)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;