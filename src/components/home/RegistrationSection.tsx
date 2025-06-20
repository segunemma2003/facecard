// components/home/RegistrationSection.tsx
import { Link } from 'react-router-dom';
import { Award, Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { usePageContent } from '@/hooks/usePageContent';
import { ContentRenderer, extractContent } from '@/lib/contentUtils';

const RegistrationSection = () => {
  const { data: content, isLoading: contentLoading } = usePageContent('homepage', 'award_ceremony');
  const contentData = content?.data?.content || {};

  // Extract content
  const title = extractContent(contentData, 'title', 'Upcoming Award Ceremony');
  const subtitle = extractContent(contentData, 'subtitle', '2025 FACE Global Awards Ceremony');
  const description = extractContent(contentData, 'description', 'An evening of celebration, networking and recognition...');
  const eventDate = extractContent(contentData, 'event_date', 'December 15, 2024');
  const venue = extractContent(contentData, 'venue', 'Grand Ballroom, The Prestigious Hotel, New York City');
  const dressCode = extractContent(contentData, 'dress_code', 'Black Tie Event');
  const attendance = extractContent(contentData, 'expected_attendance', 'Expected Attendance: 500+ guests');
  const registrationMessage = extractContent(
    contentData, 
    'registration_open_message', 
    'Register now to attend our next award ceremony.'
  );
  const registrationButtonText = extractContent(contentData, 'registration_button_text', 'Complete Registration');
  
  // Parse ticket info
  const ticketInfo = contentData.ticket_info?.content || [
    { type: 'Standard Attendance', price: '$250', description: 'General admission with dinner' },
    { type: 'VIP Experience', price: '$450', description: 'Premium seating with cocktail reception' },
    { type: 'Corporate Table (8 guests)', price: '$1,800', description: 'Reserved table for corporate sponsors' }
  ];

  // Determine if registration is open
  const registrationOpen = contentData.registration_open?.content !== 'false';

  if (contentLoading) {
    return (
      <section className="section-padding bg-gradient-to-br from-face-grey via-face-grey to-face-sky-blue relative overflow-hidden" id="register">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
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

  return (
    <section className="section-padding bg-gradient-to-br from-face-grey via-face-grey to-face-sky-blue relative overflow-hidden" id="register">
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-white">
            {title}
          </h2>
          <p className="text-lg text-face-white/90 font-manrope">
            {registrationOpen ? registrationMessage : 'Registration will open soon.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="bg-face-white/10 backdrop-blur-sm border-face-sky-blue/30 text-face-white">
              <CardHeader>
                <CardTitle className="text-face-sky-blue text-2xl font-clash">
                  {subtitle}
                </CardTitle>
                <CardDescription className="text-face-white/80 font-manrope">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-face-sky-blue" />
                  <div>
                    <p className="font-medium font-manrope">{eventDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-face-sky-blue" />
                  <div>
                    <p className="font-medium font-manrope">{venue.split(',')[0]}</p>
                    <p className="text-sm text-face-white/80 font-manrope">{venue.split(',').slice(1).join(',')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-face-sky-blue" />
                  <div>
                    <p className="font-medium font-manrope">{attendance}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Badge className="bg-face-sky-blue text-face-white border-face-sky-blue font-manrope">
                  {dressCode}
                </Badge>
              </CardFooter>
            </Card>

            <div className="bg-face-white/10 backdrop-blur-sm p-6 rounded-lg border border-face-sky-blue/30">
              <h3 className="text-xl font-clash font-semibold mb-4 text-face-white">Ticket Information</h3>
              <div className="space-y-3 text-face-white/90">
                {ticketInfo.map((ticket: any, index: number) => (
                  <div key={index} className="flex justify-between items-center pb-2 border-b border-face-sky-blue/30">
                    <span className="font-manrope">{ticket.type}</span>
                    <span className="font-medium text-face-sky-blue font-manrope">{ticket.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-face-white rounded-lg p-8 shadow-xl animate-scale-up">
            <h3 className="text-2xl font-clash font-bold mb-6 text-face-sky-blue text-center">
              {registrationOpen ? 'Register to Attend' : 'Registration Coming Soon'}
            </h3>
            <p className="text-face-grey/80 mb-6 text-center font-manrope">
              {registrationOpen 
                ? 'Secure your place at the prestigious FACE Global Awards ceremony.'
                : 'Registration for the FACE Global Awards ceremony will open soon.'
              }
            </p>

            <div className="text-center">
              {registrationOpen ? (
                <Button asChild size="lg" className="bg-face-sky-blue hover:bg-face-grey text-face-white font-medium font-manrope">
                  <Link to="/registration">{registrationButtonText}</Link>
                </Button>
              ) : (
                <Button 
                  disabled 
                  size="lg" 
                  className="bg-face-grey/50 text-face-white/70 font-medium font-manrope cursor-not-allowed"
                >
                  Registration Closed
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;