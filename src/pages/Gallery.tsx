
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample gallery data
const galleryData = {
  "2023": [
    {
      id: "2023-ceremony",
      title: "2023 Award Ceremony",
      location: "New York City",
      date: "November 20, 2023",
      description: "The 15th Annual FACE Awards ceremony honoring exceptional achievements from around the world.",
      images: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          caption: "Opening of the ceremony with welcome address"
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          caption: "Technology Innovation Award presentation"
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
          caption: "Dr. Sarah Chen accepting her award"
        },
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
          caption: "Performers at the ceremony"
        },
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
          caption: "Networking session during the gala dinner"
        },
        {
          id: 6,
          url: "https://images.unsplash.com/photo-1559445368-b8a993676d7a",
          caption: "Award recipients group photo"
        }
      ]
    },
    {
      id: "2023-tech-summit",
      title: "Tech Innovation Summit",
      location: "San Francisco",
      date: "June 15, 2023",
      description: "A gathering of nominees and past winners in the Technology Innovation category to showcase their groundbreaking work.",
      images: [
        {
          id: 7,
          url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          caption: "Keynote presentation on AI advancements"
        },
        {
          id: 8,
          url: "https://images.unsplash.com/photo-1587394171916-a46b5cbaeda9",
          caption: "Panel discussion with industry leaders"
        },
        {
          id: 9,
          url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
          caption: "Product demonstration by HealthTech Innovations"
        },
        {
          id: 10,
          url: "https://images.unsplash.com/photo-1696347324423-94d272ac5b3c",
          caption: "Networking break between sessions"
        }
      ]
    }
  ],
  "2022": [
    {
      id: "2022-ceremony",
      title: "2022 Award Ceremony",
      location: "Dubai",
      date: "November 18, 2022",
      description: "A prestigious ceremony recognizing excellence across multiple categories with international representation.",
      images: [
        {
          id: 11,
          url: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
          caption: "Dubai venue for the 2022 FACE Awards"
        },
        {
          id: 12,
          url: "https://images.unsplash.com/photo-1560177112-fbfd5fde9566",
          caption: "GlobalEdu Foundation receiving their award"
        },
        {
          id: 13,
          url: "https://images.unsplash.com/photo-1562788869-1dd152686326",
          caption: "Entertainment segment of the ceremony"
        },
        {
          id: 14,
          url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
          caption: "Maria Santos delivering her acceptance speech"
        },
        {
          id: 15,
          url: "https://images.unsplash.com/photo-1561489413-985b06da5bee",
          caption: "Red carpet arrivals"
        }
      ]
    }
  ],
  "2021": [
    {
      id: "2021-ceremony",
      title: "2021 Award Ceremony",
      location: "London",
      date: "November 12, 2021",
      description: "The first post-pandemic in-person ceremony celebrating resilience and innovation during challenging times.",
      images: [
        {
          id: 16,
          url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
          caption: "London venue illuminated for the event"
        },
        {
          id: 17,
          url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
          caption: "Robert Kiyoshi's acceptance speech"
        },
        {
          id: 18,
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
          caption: "Award presentation for Healthcare Innovation"
        },
        {
          id: 19,
          url: "https://images.unsplash.com/photo-1515169067868-5387ec356754",
          caption: "Guests attending the gala dinner"
        }
      ]
    }
  ]
};

const years = ["2023", "2022", "2021"];

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (eventIndex: number, imageIndex: number) => {
    setCurrentEventIndex(eventIndex);
    setCurrentImageIndex(imageIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevImage = () => {
    const currentEvent = galleryData[selectedYear as keyof typeof galleryData][currentEventIndex];
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(currentEvent.images.length - 1);
    }
  };

  const goToNextImage = () => {
    const currentEvent = galleryData[selectedYear as keyof typeof galleryData][currentEventIndex];
    if (currentImageIndex < currentEvent.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-32 bg-face-blue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1496307653780-42ee777d4833')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Image className="h-16 w-16 text-face-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Event Gallery</h1>
            <p className="text-xl text-gray-200">
              Browse through memories of FACE Award ceremonies and events from around the world.
            </p>
          </div>
        </div>
      </section>
      
      {/* Gallery content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="2023" value={selectedYear} onValueChange={setSelectedYear} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white">
                {years.map((year) => (
                  <TabsTrigger key={year} value={year} className="px-8">
                    {year} Events
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {years.map((year) => (
              <TabsContent key={year} value={year}>
                {galleryData[year as keyof typeof galleryData].map((event, eventIndex) => (
                  <div key={event.id} className="mb-16">
                    <h2 className="text-2xl font-serif font-bold mb-2">
                      {event.title}
                    </h2>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                      <span>{event.location}</span>
                      <span className="mx-2">•</span>
                      <span>{event.date}</span>
                    </div>
                    <p className="text-gray-700 mb-6">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.images.map((image, imageIndex) => (
                        <div 
                          key={image.id} 
                          className="cursor-pointer group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                          onClick={() => openLightbox(eventIndex, imageIndex)}
                        >
                          <img 
                            src={`${image.url}?w=600&h=400&fit=crop`}
                            alt={image.caption}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-face-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 p-2"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
            onClick={goToPrevImage}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
            onClick={goToNextImage}
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          
          <div className="w-full max-w-5xl">
            <div className="relative">
              <img 
                src={galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images[currentImageIndex].url} 
                alt={galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images[currentImageIndex].caption}
                className="max-h-[80vh] mx-auto"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <p>{galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images[currentImageIndex].caption}</p>
                <p className="text-sm text-gray-300 mt-1">
                  {currentImageIndex + 1} of {galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
