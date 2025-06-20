// src/pages/AwardProcess.tsx - Updated with Content API integration
import { ArrowRight, Calendar, Check, Flag, Medal, Share2, Trophy, Users, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { extractContent } from "@/lib/contentUtils";
import { usePageContent } from "@/hooks/usePageContent";


const AwardProcess = () => {
  const navigate = useNavigate();

  // Content API Hook
  const { data: contentResponse, isLoading: contentLoading, error: contentError } = usePageContent('award_process');
  
  const pageContent = contentResponse?.data;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconMap = {
      share2: Share2,
      users: Users,
      flag: Flag,
      medal: Medal,
      check: Check,
      trophy: Trophy
    };
    return iconMap[iconName as keyof typeof iconMap] || Share2;
  };

  // Default steps data (fallback)
  const defaultSteps = [
    {
      id: 1,
      icon: "share2",
      title: "Social Media Nomination",
      description: "Candidates are nominated through social media platforms using our campaign hashtags. We track mentions, shares, and engagement to identify potential nominees.",
      extra_content: {
        type: "hashtags",
        data: ["#FACEAwards", "#FACEImpact"]
      },
      alignment: "right"
    },
    {
      id: 2,
      icon: "users",
      title: "Social Media Polls",
      description: "We conduct preliminary polls on our social media channels to gauge public interest and support for potential nominees. This helps us identify trending candidates.",
      extra_content: {
        type: "poll_example",
        data: [
          { name: "Candidate A", percentage: 45 },
          { name: "Candidate B", percentage: 55 }
        ]
      },
      alignment: "left"
    },
    {
      id: 3,
      icon: "flag",
      title: "Internal Screening",
      description: "Our panel of experts reviews each potential nominee. We verify their credentials, assess their impact in their category, and ensure they meet our criteria for excellence.",
      extra_content: {
        type: "checklist",
        data: [
          "Verify credentials",
          "Assess category fit",
          "Evaluate impact"
        ]
      },
      alignment: "right"
    },
    {
      id: 4,
      icon: "medal",
      title: "Nominee Shortlisting",
      description: "The top candidates who pass our internal screening are officially shortlisted. Their profiles are prepared for the public voting phase.",
      extra_content: {
        type: "nominee_grid",
        data: ["Nominee 1", "Nominee 2", "Nominee 3", "Nominee 4", "Nominee 5", "Nominee 6"]
      },
      alignment: "left"
    },
    {
      id: 5,
      icon: "check",
      title: "Public Voting",
      description: "Shortlisted nominees are presented on our platform for public voting. The voting period typically lasts for 30 days, during which supporters can cast their votes.",
      extra_content: {
        type: "voting_period",
        data: "30 Days Voting Period"
      },
      alignment: "right"
    },
    {
      id: 6,
      icon: "trophy",
      title: "Winner Announcement",
      description: "After the voting period ends, winners are announced during our prestigious award ceremony. Winners receive recognition, a digital certificate, and the iconic FACE Award trophy.",
      extra_content: {
        type: "award_badge",
        data: "FACE Award Winner 2024"
      },
      alignment: "left"
    }
  ];

  // Process steps from content or fallback
  let steps = defaultSteps;
  try {
    const stepsContent = pageContent?.process_timeline?.find(item => item.key === 'steps_data')?.content;
    if (stepsContent) {
      const parsedSteps = JSON.parse(stepsContent);
      if (Array.isArray(parsedSteps) && parsedSteps.length > 0) {
        steps = parsedSteps;
      }
    }
  } catch (error) {
    console.warn('Failed to parse steps data:', error);
  }

  // Render extra content based on type
  const renderExtraContent = (extraContent: any, alignment: string) => {
    if (!extraContent) return null;

    switch (extraContent.type) {
      case 'hashtags':
        return (
          <div className="inline-flex items-center gap-2 bg-face-sky-blue/10 p-3 rounded-lg border border-face-sky-blue/20">
            {extraContent.data.map((hashtag: string, index: number) => (
              <span key={index} className="text-face-sky-blue font-medium font-manrope">{hashtag}</span>
            ))}
          </div>
        );

      case 'poll_example':
        return (
          <div className="bg-face-white border border-face-sky-blue/20 rounded-lg p-4 shadow-sm">
            <div className="space-y-3">
              {extraContent.data.map((candidate: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-face-grey font-manrope">{candidate.name}</span>
                    <span className="text-face-sky-blue font-medium font-manrope">{candidate.percentage}%</span>
                  </div>
                  <Progress value={candidate.percentage} className="h-2 bg-face-sky-blue/10" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'checklist':
        return (
          <ul className="space-y-2 text-sm">
            {extraContent.data.map((item: string, index: number) => (
              <li key={index} className={`flex items-center ${alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                {alignment === 'right' ? (
                  <>
                    <span className="mr-2 text-face-grey font-manrope">{item}</span>
                    <Check className="h-4 w-4 text-green-500" />
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-face-grey font-manrope">{item}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        );

      case 'nominee_grid':
        return (
          <div className="grid grid-cols-3 gap-3">
            {extraContent.data.map((nominee: string, index: number) => (
              <div key={index} className="h-16 bg-face-sky-blue/10 rounded-lg flex items-center justify-center border border-face-sky-blue/20 hover:bg-face-sky-blue/20 transition-colors">
                <span className="text-sm font-medium text-face-sky-blue font-manrope">{nominee}</span>
              </div>
            ))}
          </div>
        );

      case 'voting_period':
        return (
          <div className="bg-face-sky-blue/10 p-4 rounded-lg inline-block border border-face-sky-blue/20">
            <div className="text-center">
              <Calendar className="h-6 w-6 text-face-sky-blue mx-auto mb-2" />
              <div className="text-sm text-face-sky-blue font-medium font-manrope">{extraContent.data}</div>
            </div>
          </div>
        );

      case 'award_badge':
        return (
          <div className="bg-face-gold/20 border border-face-gold p-4 rounded-lg text-center">
            <Trophy className="h-12 w-12 text-face-gold mx-auto mb-3" />
            <div className="text-face-sky-blue font-clash font-bold">{extraContent.data}</div>
          </div>
        );

      default:
        return null;
    }
  };

  // Loading state
  if (contentLoading) {
    return (
      <div className="min-h-screen bg-face-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-face-grey/60 font-manrope">Loading content...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract content with fallbacks
  const heroTitle = extractContent(pageContent?.hero, 'main_title', 'The Award Process');
  const heroSubtitle = extractContent(pageContent?.hero, 'subtitle', 'From social media nomination to the final announcement, discover the journey of our FACE Award nominees.');
  const heroBackgroundImage = extractContent(pageContent?.hero, 'background_image', 'https://images.unsplash.com/photo-1561489401-fc2876ced162');

  const ctaTitle = extractContent(pageContent?.call_to_action, 'title', 'Ready to be part of our journey?');
  const ctaPrimaryButton = extractContent(pageContent?.call_to_action, 'primary_button_text', 'View Current Nominees');
  const ctaSecondaryButton = extractContent(pageContent?.call_to_action, 'secondary_button_text', 'Register for Next Event');

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-face-white rounded-full mb-8 shadow-2xl">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-4 text-face-white">
              {heroTitle}
            </h1>
            <p className="text-xl text-face-white/90 font-manrope">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>
      
      {/* Process timeline */}
      <section className="py-16 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-face-sky-blue/20 transform -translate-x-1/2"></div>
              
              {steps.map((step, index) => {
                const IconComponent = getIcon(step.icon);
                const isRightAligned = step.alignment === 'right';
                const isLastStep = index === steps.length - 1;
                
                return (
                  <div key={step.id} className={`relative ${isLastStep ? '' : 'mb-16'}`}>
                    <div className="flex flex-col md:flex-row items-start">
                      <div className={`md:w-1/2 ${isRightAligned ? 'md:pr-12 md:text-right order-2 md:order-1' : 'md:pl-12 order-2'} mb-6 md:mb-0`}>
                        <h3 className="text-2xl font-clash font-bold mb-3 text-face-sky-blue">{step.title}</h3>
                        <p className="text-face-grey/80 mb-4 font-manrope">
                          {step.description}
                        </p>
                        {renderExtraContent(step.extra_content, step.alignment)}
                      </div>
                      <div className={`md:w-1/2 flex justify-start md:justify-center ${isRightAligned ? 'order-1 md:order-2' : 'order-1'} mb-4 md:mb-0`}>
                        <div className="bg-face-sky-blue rounded-full p-4 shadow-lg relative z-10 hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8 text-face-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Section */}
            <div className="mt-24 text-center">
              <h3 className="text-2xl font-clash font-bold mb-4 text-face-grey">{ctaTitle}</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Button 
                  onClick={() => {
                    navigate('/nominees');
                    handleScrollToTop();
                  }}
                  className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center font-manrope"
                >
                  {ctaPrimaryButton} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/registration');
                    handleScrollToTop();
                  }}
                  variant="outline"
                  className="border-face-sky-blue text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center font-manrope"
                >
                  {ctaSecondaryButton} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AwardProcess;