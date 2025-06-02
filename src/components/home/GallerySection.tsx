import { Link } from 'react-router-dom';
import { Award, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GalleryCard from '../gallery/GalleryCard';
import { useGalleryEvents } from '@/hooks/useApi';

const GallerySection = () => {
  // Use your API hook - fetch featured events only for homepage
  const { data: galleryResponse, isLoading, error } = useGalleryEvents({ 
    featured_only: true 
  });
  
  const galleryEvents = galleryResponse?.data || [];
  
  // Take only the first 4 events for the homepage display
  const displayEvents = galleryEvents.slice(0, 4);

  // Loading state
  if (isLoading) {
    return (
      <section className="section-padding bg-brand-white" id="gallery">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-3">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">Event Gallery</h2>
            <p className="text-lg text-face-grey/80 font-manrope">Loading gallery events...</p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="section-padding bg-brand-white" id="gallery">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-3">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">Event Gallery</h2>
            <p className="text-lg text-red-600 font-manrope">Unable to load gallery events. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // No events state
  if (displayEvents.length === 0) {
    return (
      <section className="section-padding bg-brand-white" id="gallery">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-3">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">Event Gallery</h2>
            <p className="text-lg text-face-grey/80 font-manrope">
              Gallery events will be available soon. Check back later for photos from our ceremonies and events.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-brand-white" id="gallery">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">Event Gallery</h2>
          <p className="text-lg text-face-grey/80 font-manrope">
            Explore moments from our past ceremonies and events that celebrate excellence and achievement across the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <GalleryCard 
              key={event.id} 
              event={{
                id: event.id,
                title: event.title,
                location: event.location,
                date: event.date,
                imageUrl: event.featured_image || event.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
                imageCount: event.image_count
              }} 
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-face-sky-blue hover:bg-face-grey text-face-white font-manrope">
            <Link to="/gallery">View Complete Gallery</Link>
          </Button>
        </div>

        {/* Show total events count if there are more */}
        {galleryEvents.length > 4 && (
          <div className="text-center mt-6">
            <p className="text-sm text-face-grey/60 font-manrope">
              Showing {displayEvents.length} of {galleryEvents.length} featured events
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;