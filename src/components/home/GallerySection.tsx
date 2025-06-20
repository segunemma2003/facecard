import { Link } from 'react-router-dom';
import { Award, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GalleryCard from '../gallery/GalleryCard';
import { useGalleryEvents } from '@/hooks/useApi';
import { usePageContent } from '@/hooks/usePageContent';
import { ContentRenderer, extractContent } from '@/lib/contentUtils';

const GallerySection = () => {
  const { data: galleryContent, isLoading: contentLoading } = usePageContent('homepage', 'gallery_section');
  const { data: galleryResponse, isLoading, error } = useGalleryEvents({ featured_only: true });
  
  const galleryData = galleryContent?.data?.content || {};
  const galleryEvents = galleryResponse?.data || [];
  const displayEvents = galleryEvents.slice(0, 4);

  // Extract content
  const title = extractContent(galleryData, 'title', 'Event Gallery');
  const subtitle = extractContent(galleryData, 'subtitle', 'Moments from Our Ceremonies');
  const description = extractContent(galleryData, 'content', 'Explore moments from our past ceremonies...');
  const emptyMessage = extractContent(galleryData, 'empty_state_message', 'Gallery events will be available soon.');
  const buttonText = extractContent(galleryData, 'button_text', 'View Complete Gallery');

  if (contentLoading || isLoading) {
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
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
          </div>
        </div>
      </section>
    );
  }

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
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">{title}</h2>
            <p className="text-lg text-red-600 font-manrope">Unable to load gallery events.</p>
          </div>
        </div>
      </section>
    );
  }

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
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">{title}</h2>
            <p className="text-lg text-face-grey/80 font-manrope">{emptyMessage}</p>
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
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">{title}</h2>
          <p className="text-lg text-face-grey/80 font-manrope">{description}</p>
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
            <Link to="/gallery">{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;