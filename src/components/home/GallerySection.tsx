
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GalleryCard from '../gallery/GalleryCard';

// Sample gallery events data
const galleryEvents = [
  {
    id: 1,
    title: "2023 Award Ceremony",
    location: "New York City",
    date: "November, 2023",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    imageCount: 38
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    location: "San Francisco",
    date: "June, 2023",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    imageCount: 24
  },
  {
    id: 3,
    title: "Global Leadership Forum",
    location: "London",
    date: "March, 2023",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    imageCount: 42
  },
  {
    id: 4,
    title: "2022 Award Ceremony",
    location: "Dubai",
    date: "November, 2022",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    imageCount: 55
  }
];

const GallerySection = () => {
  return (
    <section className="section-padding bg-brand-white" id="gallery">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <Award className="h-10 w-10 text-brand-blue" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-grey">Event Gallery</h2>
          <p className="text-lg text-brand-grey/80">
            Explore moments from our past ceremonies and events that celebrate excellence and achievement across the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryEvents.map((event) => (
            <GalleryCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-brand-blue hover:bg-brand-grey text-brand-white">
            <Link to="/gallery">View Complete Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
