
import { Image } from 'lucide-react';

interface GalleryEvent {
  id: number;
  title: string;
  location: string;
  date: string;
  imageUrl: string;
  imageCount: number;
}

interface GalleryCardProps {
  event: GalleryEvent;
}

const GalleryCard = ({ event }: GalleryCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg card-hover">
      <div className="aspect-[4/3] h-full w-full overflow-hidden">
        <img
          src={`${event.imageUrl}?w=600&h=400&fit=crop`}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
        
        <div className="absolute top-4 right-4 bg-brand-blue/80 backdrop-blur-sm text-brand-white px-3 py-1 rounded-full flex items-center space-x-1">
          <Image className="h-4 w-4" />
          <span className="text-sm">{event.imageCount}</span>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h3 className="text-xl font-serif font-bold text-brand-white mb-1">
            {event.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-brand-white/90 mb-2">
            <span>{event.location}</span>
            <span>•</span>
            <span>{event.date}</span>
          </div>
          <div className="transform translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button className="text-sm bg-brand-blue/20 backdrop-blur-sm hover:bg-brand-blue/30 text-brand-white py-2 px-3 rounded-md transition-colors">
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
