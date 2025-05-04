
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import PastWinnersSection from '@/components/home/PastWinnersSection';
import GallerySection from '@/components/home/GallerySection';
import RegistrationSection from '@/components/home/RegistrationSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AboutSection />
      <CategoriesSection />
      <PastWinnersSection />
      <GallerySection />
      <RegistrationSection />
      <Footer />
    </div>
  );
};

export default Index;
