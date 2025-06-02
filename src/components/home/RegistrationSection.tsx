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
import { useSettings, useSetting } from '@/hooks/useApi';

const RegistrationSection = () => {
  // Fetch settings from API
  const { data: settingsResponse, isLoading: settingsLoading } = useSettings();
  const { data: registrationOpenResponse } = useSetting('registration_open');
  const { data: eventDateResponse } = useSetting('event_date');
  
  const settings = settingsResponse?.data || {};
  const registrationOpen = registrationOpenResponse?.data?.value !== false;
  const eventDate = eventDateResponse?.data?.value || settings.event_date;

  // Parse event date
  const eventDateTime = eventDate ? new Date(eventDate) : new Date('2024-12-15T19:00:00');
  const eventDateFormatted = eventDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const eventTimeFormatted = eventDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Registration deadline (typically 30 days before event)
  const registrationDeadline = new Date(eventDateTime);
  registrationDeadline.setDate(registrationDeadline.getDate() - 30);
  const deadlineFormatted = registrationDeadline.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Loading state
  if (settingsLoading) {
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
              Upcoming Award Ceremony
            </h2>
            <p className="text-lg text-face-white/90 font-manrope">Loading event details...</p>
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
      {/* Overlay */}
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
            Upcoming Award Ceremony
          </h2>
          <p className="text-lg text-face-white/90 font-manrope">
            Join us for a prestigious evening celebrating excellence and achievement. 
            {registrationOpen ? 'Register now to attend our next award ceremony.' : 'Registration will open soon.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="bg-face-white/10 backdrop-blur-sm border-face-sky-blue/30 text-face-white">
              <CardHeader>
                <CardTitle className="text-face-sky-blue text-2xl font-clash">
                  {eventDateTime.getFullYear()} FACE Global Awards Ceremony
                </CardTitle>
                <CardDescription className="text-face-white/80 font-manrope">
                  An evening of celebration, networking and recognition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-face-sky-blue" />
                  <div>
                    <p className="font-medium font-manrope">{eventDateFormatted}</p>
                    <p className="text-sm text-face-white/80 font-manrope">{eventTimeFormatted} - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-face-sky-blue" />
                  <div>
                    <p className="font-medium font-manrope">Grand Ballroom</p>
                    <p className="text-sm text-face-white/80 font-manrope">The Prestigious Hotel, New York City</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-face-sky-blue" />
                  <div>
                    <p className="font-medium font-manrope">Expected Attendance: 500+ guests</p>
                    <p className="text-sm text-face-white/80 font-manrope">Industry leaders, nominees, and award recipients</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <Badge className="bg-face-sky-blue text-face-white border-face-sky-blue font-manrope">Black Tie Event</Badge>
                  <Badge variant="outline" className="border-face-sky-blue text-face-sky-blue bg-face-white/20 font-manrope">
                    {registrationOpen ? 'Limited Seats' : 'Registration Closed'}
                  </Badge>
                </div>
              </CardFooter>
            </Card>

            <div className="bg-face-white/10 backdrop-blur-sm p-6 rounded-lg border border-face-sky-blue/30">
              <h3 className="text-xl font-clash font-semibold mb-4 text-face-white">Ticket Information</h3>
              <div className="space-y-3 text-face-white/90">
                <div className="flex justify-between items-center pb-2 border-b border-face-sky-blue/30">
                  <span className="font-manrope">Standard Attendance</span>
                  <span className="font-medium text-face-sky-blue font-manrope">$250</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-face-sky-blue/30">
                  <span className="font-manrope">VIP Experience</span>
                  <span className="font-medium text-face-sky-blue font-manrope">$450</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-face-sky-blue/30">
                  <span className="font-manrope">Corporate Table (8 guests)</span>
                  <span className="font-medium text-face-sky-blue font-manrope">$1,800</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-face-white rounded-lg p-8 shadow-xl animate-scale-up">
            <h3 className="text-2xl font-clash font-bold mb-6 text-face-sky-blue text-center">
              {registrationOpen ? 'Register to Attend' : 'Registration Coming Soon'}
            </h3>
            <p className="text-face-grey/80 mb-6 text-center font-manrope">
              {registrationOpen 
                ? 'Secure your place at the prestigious FACE Global Awards ceremony. Fill out our complete registration form to reserve your tickets.'
                : 'Registration for the FACE Global Awards ceremony will open soon. Check back for updates or follow us for announcements.'
              }
            </p>

            <div className="text-center">
              {registrationOpen ? (
                <>
                  <Button asChild size="lg" className="bg-face-sky-blue hover:bg-face-grey text-face-white font-medium font-manrope">
                    <Link to="/registration">Complete Registration</Link>
                  </Button>
                  <p className="mt-4 text-sm text-face-grey/60 font-manrope">
                    Registration closes on {deadlineFormatted}
                  </p>
                </>
              ) : (
                <>
                  <Button 
                    disabled 
                    size="lg" 
                    className="bg-face-grey/50 text-face-white/70 font-medium font-manrope cursor-not-allowed"
                  >
                    Registration Closed
                  </Button>
                  <p className="mt-4 text-sm text-face-grey/60 font-manrope">
                    Follow us for updates on future events
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;