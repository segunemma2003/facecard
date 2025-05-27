
import { Link } from 'react-router-dom';
import { Award, Calendar, MapPin, Users } from 'lucide-react';
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

const RegistrationSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-grey via-brand-grey to-brand-blue relative overflow-hidden" id="register">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <Award className="h-10 w-10 text-brand-blue" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-white">
            Upcoming Award Ceremony
          </h2>
          <p className="text-lg text-brand-white/90">
            Join us for a prestigious evening celebrating excellence and achievement. 
            Register now to attend our next award ceremony.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="bg-brand-white/10 backdrop-blur-sm border-brand-blue/30 text-brand-white">
              <CardHeader>
                <CardTitle className="text-brand-blue text-2xl">2024 FACE Global Awards Ceremony</CardTitle>
                <CardDescription className="text-brand-white/80">
                  An evening of celebration, networking and recognition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-brand-blue" />
                  <div>
                    <p className="font-medium">November 15, 2024</p>
                    <p className="text-sm text-brand-white/80">7:00 PM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-brand-blue" />
                  <div>
                    <p className="font-medium">Grand Ballroom</p>
                    <p className="text-sm text-brand-white/80">The Prestigious Hotel, New York City</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-brand-blue" />
                  <div>
                    <p className="font-medium">Expected Attendance: 500+ guests</p>
                    <p className="text-sm text-brand-white/80">Industry leaders, nominees, and award recipients</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <Badge className="bg-brand-blue text-brand-white border-brand-blue">Black Tie Event</Badge>
                  <Badge variant="outline" className="border-brand-blue text-brand-blue bg-brand-white/20">Limited Seats</Badge>
                </div>
              </CardFooter>
            </Card>

            <div className="bg-brand-white/10 backdrop-blur-sm p-6 rounded-lg border border-brand-blue/30">
              <h3 className="text-xl font-serif font-semibold mb-4 text-brand-white">Ticket Information</h3>
              <div className="space-y-3 text-brand-white/90">
                <div className="flex justify-between items-center pb-2 border-b border-brand-blue/30">
                  <span>Standard Attendance</span>
                  <span className="font-medium text-brand-blue">$250</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-brand-blue/30">
                  <span>VIP Experience</span>
                  <span className="font-medium text-brand-blue">$450</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-brand-blue/30">
                  <span>Corporate Table (8 guests)</span>
                  <span className="font-medium text-brand-blue">$1,800</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-white rounded-lg p-8 shadow-xl animate-scale-up">
            <h3 className="text-2xl font-serif font-bold mb-6 text-brand-blue text-center">
              Register to Attend
            </h3>
            <p className="text-brand-grey/80 mb-6 text-center">
              Secure your place at the prestigious FACE Global Awards ceremony. 
              Fill out our complete registration form to reserve your tickets.
            </p>

            <div className="text-center">
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-grey text-brand-white font-medium">
                <Link to="/registration">Complete Registration</Link>
              </Button>
              <p className="mt-4 text-sm text-brand-grey/60">
                Registration closes on October 15, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
