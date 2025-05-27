import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Image, X, ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award } from 'lucide-react';

// Sample gallery data
const galleryData = {
  "2023": [
    {
      id: "2023-ceremony",
      title: "2023 Global Award Ceremony",
      location: "New York City",
      date: "November 20, 2023",
      description: "The prestigious 15th Annual FACE Awards ceremony celebrating exceptional achievements from around the world.",
      attendees: "500+ Global Leaders",
      highlights: "12 Categories • 45 Nominees • 15 Winners",
      images: [
        {
          id: 1,
          url: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
          caption: "Grand opening ceremony with welcome address from FACE Awards Chairman"
        },
        {
          id: 2,
          url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
          caption: "Technology Innovation Award presentation to Dr. Sarah Chen"
        },
        {
          id: 3,
          url: "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg",
          caption: "Educational Excellence winner delivering inspiring acceptance speech"
        },
        {
          id: 4,
          url: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
          caption: "Cultural performance celebrating global diversity and excellence"
        },
        {
          id: 5,
          url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
          caption: "VIP networking reception with international dignitaries"
        },
        {
          id: 6,
          url: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
          caption: "Award recipients group photo celebrating global excellence"
        }
      ]
    },
    {
      id: "2023-tech-summit",
      title: "Technology Innovation Summit",
      location: "San Francisco",
      date: "June 15, 2023",
      description: "An exclusive gathering of nominees and past winners showcasing groundbreaking technological innovations.",
      attendees: "200+ Tech Leaders",
      highlights: "15 Innovations • 8 Keynotes • 3 Panel Discussions",
      images: [
        {
          id: 7,
          url: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg",
          caption: "Keynote presentation on AI advancements in healthcare diagnostics"
        },
        {
          id: 8,
          url: "https://images.pexels.com/photos/1181643/pexels-photo-1181643.jpeg",
          caption: "Interactive panel discussion with quantum computing pioneers"
        },
        {
          id: 9,
          url: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg",
          caption: "Live demonstration of breakthrough water purification technology"
        },
        {
          id: 10,
          url: "https://images.pexels.com/photos/3845163/pexels-photo-3845163.jpeg",
          caption: "Networking session connecting innovators from around the globe"
        }
      ]
    }
  ],
  "2022": [
    {
      id: "2022-ceremony",
      title: "2022 Global Award Ceremony",
      location: "Dubai",
      date: "November 18, 2022",
      description: "A spectacular ceremony recognizing excellence across multiple categories with unprecedented international representation.",
      attendees: "600+ International Guests",
      highlights: "10 Categories • 38 Nominees • 12 Winners",
      images: [
        {
          id: 11,
          url: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          caption: "Magnificent Dubai venue illuminated for the FACE Awards ceremony"
        },
        {
          id: 12,
          url: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
          caption: "GlobalEdu Foundation receiving Educational Excellence Award"
        },
        {
          id: 13,
          url: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
          caption: "Spectacular entertainment segment featuring international artists"
        },
        {
          id: 14,
          url: "https://images.pexels.com/photos/1181247/pexels-photo-1181247.jpeg",
          caption: "Humanitarian Impact winner Maria Santos' moving acceptance speech"
        },
        {
          id: 15,
          url: "https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg",
          caption: "Elegant red carpet arrivals showcasing global fashion"
        }
      ]
    }
  ],
  "2021": [
    {
      id: "2021-ceremony",
      title: "2021 Global Award Ceremony",
      location: "London",
      date: "November 12, 2021",
      description: "A groundbreaking hybrid ceremony celebrating resilience and innovation during unprecedented global challenges.",
      attendees: "400+ Attendees (In-person & Virtual)",
      highlights: "9 Categories • 32 Nominees • 11 Winners",
      images: [
        {
          id: 18,
          url: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg",
          caption: "Historic London venue beautifully illuminated for the hybrid ceremony"
        },
        {
          id: 19,
          url: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
          caption: "Robert Kiyoshi's inspiring Leadership Excellence acceptance speech"
        },
        {
          id: 20,
          url: "https://images.pexels.com/photos/1181409/pexels-photo-1181409.jpeg",
          caption: "Virtual participants joining from around the world"
        },
        {
          id: 21,
          url: "https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg",
          caption: "Socially distanced gala dinner celebrating global achievement"
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
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero section with FACE brand colors and enhanced visibility */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        {/* Background hero image with stronger overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Awards ceremony background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Decorative elements with better visibility */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon with stronger FACE brand styling */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-2xl">
              <Image className="h-12 w-12 text-face-sky-blue" />
            </div>
            
            {/* Main heading with stronger contrast */}
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 text-white">
              Event <span className="text-white">Gallery</span>
            </h1>
            
            {/* Subtitle with stronger visibility */}
            <p className="text-2xl text-white mb-8 font-semibold">
              Experience the grandeur and inspiration of FACE Award ceremonies from around the world
            </p>
            
            {/* Stats with stronger contrast */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-white">
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Award className="h-6 w-6 text-white" />
                <span className="font-bold">15+ Ceremonies</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Users className="h-6 w-6 text-white" />
                <span className="font-bold">5000+ Attendees</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <MapPin className="h-6 w-6 text-white" />
                <span className="font-bold">12+ Countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Year selector with FACE brand styling */}
      <section className="py-16 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-16">
            <div className="bg-white shadow-2xl border-4 border-face-sky-blue/20 p-3 rounded-2xl">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-8 py-4 mx-2 text-xl font-bold rounded-xl transition-all duration-300 font-serif ${
                    selectedYear === year
                      ? 'bg-face-sky-blue text-white shadow-xl transform scale-105'
                      : 'bg-face-white text-face-grey hover:bg-face-sky-blue/10 hover:text-face-sky-blue'
                  }`}
                >
                  {year} Events
                </button>
              ))}
            </div>
          </div>
          
          {/* Gallery content with FACE brand styling */}
          <div className="space-y-24">
            {galleryData[selectedYear as keyof typeof galleryData].map((event, eventIndex) => (
              <div key={event.id} className="relative">
                {/* Event Header with FACE brand styling */}
                <div className="text-center mb-16">
                  <div className="inline-block bg-face-sky-blue px-8 py-3 rounded-full mb-6 shadow-lg">
                    <div className="bg-white text-face-sky-blue border-0 text-lg font-bold px-4 py-1 rounded-full">
                      {selectedYear}
                    </div>
                  </div>
                  <h2 className="text-5xl font-serif font-bold mb-6 text-face-grey">
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap justify-center items-center gap-8 text-face-grey mb-6 text-lg">
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-face-sky-blue/20">
                      <MapPin className="h-6 w-6 text-face-sky-blue" />
                      <span className="font-bold">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-face-sky-blue/20">
                      <Calendar className="h-6 w-6 text-face-sky-blue" />
                      <span className="font-bold">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-face-sky-blue/20">
                      <Users className="h-6 w-6 text-face-sky-blue" />
                      <span className="font-bold">{event.attendees}</span>
                    </div>
                  </div>
                  <p className="text-xl text-face-grey max-w-4xl mx-auto mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="inline-block bg-face-sky-blue/10 border-2 border-face-sky-blue/30 px-8 py-4 rounded-full">
                    <span className="text-face-sky-blue font-bold text-lg">{event.highlights}</span>
                  </div>
                </div>
                
                {/* Image Grid with FACE brand styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {event.images.map((image, imageIndex) => (
                    <div 
                      key={image.id} 
                      className="group cursor-pointer relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 border-4 border-white"
                      onClick={() => openLightbox(eventIndex, imageIndex)}
                    >
                      <img 
                        src={`${image.url}?w=600&h=400&fit=crop`}
                        alt={image.caption}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-face-grey/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <p className="text-white text-lg font-bold leading-relaxed">
                            {image.caption}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl">
                          <Image className="h-6 w-6 text-face-sky-blue" />
                        </div>
                      </div>
                      {/* Image number indicator with FACE branding */}
                      <div className="absolute top-6 left-6">
                        <div className="bg-face-sky-blue text-white px-4 py-2 rounded-full text-lg font-bold shadow-xl">
                          {imageIndex + 1} of {event.images.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center">
          <button 
            className="absolute top-8 right-8 text-white hover:text-yellow-400 p-6 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 shadow-2xl border-2 border-white/20 hover:border-yellow-400"
            onClick={closeLightbox}
          >
            <X className="h-10 w-10" />
          </button>
          
          <button 
            className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 p-8 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 shadow-2xl border-2 border-white/20 hover:border-yellow-400"
            onClick={goToPrevImage}
          >
            <ChevronLeft className="h-12 w-12" />
          </button>
          
          <button 
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 p-8 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 shadow-2xl border-2 border-white/20 hover:border-yellow-400"
            onClick={goToNextImage}
          >
            <ChevronRight className="h-12 w-12" />
          </button>
          
          <div className="w-full max-w-7xl mx-8">
            <div className="relative">
              <img 
                src={galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images[currentImageIndex].url} 
                alt={galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images[currentImageIndex].caption}
                className="max-h-[85vh] mx-auto rounded-3xl shadow-2xl border-4 border-white/20"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-12 rounded-b-3xl">
                <div className="max-w-5xl">
                  <h3 className="text-white text-4xl font-black mb-6">
                    {galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].title}
                  </h3>
                  <p className="text-white/95 text-2xl mb-6 leading-relaxed font-medium">
                    {galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images[currentImageIndex].caption}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8 text-white/90 text-xl">
                      <span className="font-bold">{galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].location}</span>
                      <span className="text-yellow-400">•</span>
                      <span className="font-bold">{galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].date}</span>
                    </div>
                    <div className="text-white font-black text-xl bg-white/20 px-6 py-3 rounded-2xl border-2 border-white/30">
                      {currentImageIndex + 1} of {galleryData[selectedYear as keyof typeof galleryData][currentEventIndex].images.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Call to Action with FACE brand styling */}
      <section className="py-24 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-serif font-bold mb-8 text-white">
              Be Part of Our Next Celebration
            </h2>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              Join us at upcoming FACE Awards events and become part of our global community celebrating excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-6 px-12 rounded-full transform hover:scale-105 transition-all duration-300">
                Register for Next Event
              </button>
              <button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-6 px-12 rounded-full transform hover:scale-105 transition-all duration-300">
                View Current Nominees
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Gallery;