import { CheckCircle, Globe, Users, Trophy, Calendar, Handshake, Loader2 } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';
import { ContentRenderer, extractContent, getPlainText } from '@/lib/contentUtils';

const AboutSection = () => {
  // Fetch about section content
  const { data: aboutContent, isLoading: aboutLoading } = usePageContent('homepage', 'about');
  const { data: approachContent, isLoading: approachLoading } = usePageContent('homepage', 'approach');
  
  const aboutData = aboutContent?.data?.content || {};
  const approachData = approachContent?.data?.content || {};
  
  // Extract content with fallbacks
  const title = extractContent(aboutData, 'title', 'About FACE Awards');
  const content = extractContent(aboutData, 'content', 'The Outstanding FACE Global Recognition Awards is an international platform created by Mr. Thompson Alade...');
  const contentType = aboutData.content?.type || 'html';
  
  // Parse FACE meanings from API or use fallbacks
  const faceMeanings = aboutData.face_meanings?.content || [
    { letter: 'F', word: 'Focus', description: 'The unwavering commitment to vision and purpose' },
    { letter: 'A', word: 'Achievement', description: 'Significant accomplishments and measurable success' },
    { letter: 'C', word: 'Courage', description: 'The boldness to innovate and overcome challenges' },
    { letter: 'E', word: 'Excellence', description: 'The pursuit of the highest standards in every endeavor' }
  ];

  // Parse approach items from API or use fallbacks
   const approachTitle = extractContent(approachData, 'approach_title', 'Our Approach');
  const approachItems = approachData.approach_items?.content || [
    {
      title: 'Global Reach, Local Impact',
      description: 'Recognizing excellence worldwide...',
      icon: 'globe'
    },
    {
      title: 'People-Centered Nomination',
      description: 'Open, inclusive polling systems that ensure recognition comes directly from those who experience the impact',
      icon: 'users'
    },
    {
      title: 'Personal Award Delivery',
      description: 'Beautifully crafted trophies and plaques delivered securely or presented personally to honorees worldwide',
      icon: 'trophy'
    },
    {
      title: 'End-of-Year Ceremony',
      description: 'Optional annual grand recognition event for networking and celebration in an atmosphere of elegance',
      icon: 'calendar'
    },
    {
      title: 'Diverse International Collaboration',
      description: 'A multicultural team of professionals ensuring our work remains relevant and inclusive globally',
      icon: 'handshake'
    }
  ];

  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      globe: Globe,
      users: Users,
      trophy: Trophy,
      calendar: Calendar,
      handshake: Handshake,
    };
    return iconMap[iconName] || Globe;
  };

  // Loading state
 if (aboutLoading || approachLoading) {
    return (
      <section className="face-section bg-face-white" id="about">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
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
            <div className="flex justify-center mt-8">
              <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="face-section bg-face-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-3">
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-6 text-face-grey">
            {title.includes('FACE') ? (
              <>
                {title.split('FACE')[0]}
                <span className="text-face-sky-blue">FACE</span>
                {title.split('FACE')[1]}
              </>
            ) : (
              title
            )}
          </h2>
          
          <ContentRenderer
            content={content}
            type={contentType}
            className="text-lg text-face-grey/80 font-manrope"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="face-card p-6 shadow-sm hover:shadow-md transition-shadow border border-face-sky-blue/20">
              <h3 className="text-xl font-clash font-semibold mb-3 text-face-sky-blue">
                {extractContent(aboutData, 'face_sub_title', 'FACE Represents')}
              </h3>
              <div className="space-y-4 ml-2">
                {faceMeanings.map((item: any, index: number) => (
                  <div key={index} className="flex gap-3">
                    <div className="mt-1 text-face-sky-blue">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="text-face-grey/80 font-manrope">
                      <span className="font-semibold text-face-grey">{item.letter}</span>
                      {item.word.toLowerCase()} - {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="face-card p-6 shadow-sm hover:shadow-md transition-shadow border border-face-sky-blue/20">
              <h3 className="text-xl font-clash font-semibold mb-3 text-face-grey">{approachTitle}</h3>
              <ul className="space-y-3 ml-2">
                {approachItems.map((item: any, index: number) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <li key={index} className="flex gap-3">
                      <div className="mt-1 text-face-sky-blue">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-face-grey/80 font-manrope">
                        <b className="text-face-grey">{item.title}</b> - {item.description}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl animate-scale-up">
            <img 
              src={extractContent(aboutData, 'hero_image', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87')} 
              alt={JSON.parse(aboutData.hero_image?.meta || '{}').alt || 'FACE Awards Ceremony'} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = extractContent(aboutData, 'hero_image_fallback', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622');
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <p className="text-white text-lg font-serif">
                  {extractContent(aboutData, 'image_caption', 'Celebrating excellence across borders and industries')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;