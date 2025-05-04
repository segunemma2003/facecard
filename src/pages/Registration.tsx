
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Calendar, Mail, MapPin, Users, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const Registration = () => {
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [ticketType, setTicketType] = useState('standard');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setFormStep(1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Registration Submitted!",
        description: "Your registration for the FACE Awards ceremony has been received. Check your email for confirmation details.",
      });
      setFormStep(3);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const getTicketPrice = () => {
    switch (ticketType) {
      case 'standard':
        return '$250';
      case 'vip':
        return '$450';
      case 'corporate':
        return '$1,800';
      default:
        return '$250';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-32 bg-face-blue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607748851476-e8babe4800d1')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 text-face-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Event Registration</h1>
            <p className="text-xl text-gray-200">
              Join us for a prestigious evening celebrating excellence and achievement from around the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Registration content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Progress steps */}
            <div className="mb-12">
              <div className="flex justify-between">
                <div className={`flex flex-col items-center ${formStep >= 1 ? 'text-face-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-face-gold' : 'bg-gray-200'}`}>
                    <span className="font-bold">1</span>
                  </div>
                  <span className="mt-2 text-sm">Personal Information</span>
                </div>
                <div className="flex-1 flex items-center mx-4">
                  <div className={`h-1 w-full ${formStep >= 2 ? 'bg-face-gold' : 'bg-gray-200'}`}></div>
                </div>
                <div className={`flex flex-col items-center ${formStep >= 2 ? 'text-face-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-face-gold' : 'bg-gray-200'}`}>
                    <span className="font-bold">2</span>
                  </div>
                  <span className="mt-2 text-sm">Ticket Selection</span>
                </div>
                <div className="flex-1 flex items-center mx-4">
                  <div className={`h-1 w-full ${formStep >= 3 ? 'bg-face-gold' : 'bg-gray-200'}`}></div>
                </div>
                <div className={`flex flex-col items-center ${formStep >= 3 ? 'text-face-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formStep >= 3 ? 'bg-face-gold' : 'bg-gray-200'}`}>
                    <span className="font-bold">3</span>
                  </div>
                  <span className="mt-2 text-sm">Confirmation</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              {formStep === 1 && (
                <form onSubmit={handleNextStep}>
                  <h2 className="text-2xl font-serif font-bold mb-6">Personal Information</h2>
                  <p className="text-gray-600 mb-8">Please provide your details for the event registration.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input id="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input id="lastName" placeholder="Enter your last name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input id="phone" placeholder="Enter your phone number" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="organization">Organization / Company</Label>
                      <Input id="organization" placeholder="Enter your organization name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country*</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City*</Label>
                      <Input id="city" placeholder="Enter your city" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="dietaryRequirements">Dietary Requirements or Allergies</Label>
                      <Textarea id="dietaryRequirements" placeholder="Please specify any dietary requirements or allergies" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-face-blue hover:bg-blue-800">
                      Next Step
                    </Button>
                  </div>
                </form>
              )}

              {formStep === 2 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-serif font-bold mb-6">Ticket Selection</h2>
                  <p className="text-gray-600 mb-8">Choose your ticket type for the FACE Awards ceremony.</p>
                  
                  <div className="space-y-6 mb-8">
                    <Label className="text-lg font-medium">Select Ticket Type*</Label>
                    <RadioGroup value={ticketType} onValueChange={setTicketType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`relative border rounded-lg p-4 ${ticketType === 'standard' ? 'border-face-gold bg-yellow-50' : 'border-gray-200'}`}>
                        <RadioGroupItem value="standard" id="standard" className="sr-only" />
                        <Label htmlFor="standard" className="flex flex-col cursor-pointer">
                          <span className="text-lg font-bold">Standard Attendance</span>
                          <span className="text-2xl font-bold text-face-gold mt-2">$250</span>
                          <ul className="mt-4 text-sm text-gray-600 space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Ceremony attendance</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Welcome reception</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Dinner and refreshments</span>
                            </li>
                          </ul>
                        </Label>
                        {ticketType === 'standard' && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-face-gold rounded-full p-1">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`relative border rounded-lg p-4 ${ticketType === 'vip' ? 'border-face-gold bg-yellow-50' : 'border-gray-200'}`}>
                        <RadioGroupItem value="vip" id="vip" className="sr-only" />
                        <Label htmlFor="vip" className="flex flex-col cursor-pointer">
                          <span className="text-lg font-bold">VIP Experience</span>
                          <span className="text-2xl font-bold text-face-gold mt-2">$450</span>
                          <ul className="mt-4 text-sm text-gray-600 space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Premium seating</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Exclusive VIP reception</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Meet & greet with awardees</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Complimentary gift bag</span>
                            </li>
                          </ul>
                        </Label>
                        {ticketType === 'vip' && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-face-gold rounded-full p-1">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`relative border rounded-lg p-4 ${ticketType === 'corporate' ? 'border-face-gold bg-yellow-50' : 'border-gray-200'}`}>
                        <RadioGroupItem value="corporate" id="corporate" className="sr-only" />
                        <Label htmlFor="corporate" className="flex flex-col cursor-pointer">
                          <span className="text-lg font-bold">Corporate Table</span>
                          <span className="text-2xl font-bold text-face-gold mt-2">$1,800</span>
                          <ul className="mt-4 text-sm text-gray-600 space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Reserved table for 8 guests</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Premium location seating</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>Company recognition in program</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span>VIP benefits for all guests</span>
                            </li>
                          </ul>
                        </Label>
                        {ticketType === 'corporate' && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-face-gold rounded-full p-1">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </RadioGroup>
                    
                    <div className="flex items-start space-x-2 pt-6">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the <a href="#" className="text-face-blue hover:underline">terms and conditions</a> and understand that tickets are non-refundable but transferable up to 14 days before the event.
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-face-blue text-face-blue"
                      onClick={handlePrevStep}
                    >
                      Previous Step
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-face-gold hover:bg-yellow-500 text-face-blue"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Complete Registration'
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {formStep === 3 && (
                <div className="text-center py-8">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Registration Complete!</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for registering for the FACE Awards ceremony. We've sent a confirmation email with all the details.
                  </p>
                  
                  <Card className="max-w-md mx-auto mb-8">
                    <CardHeader>
                      <CardTitle>Your Reservation</CardTitle>
                      <CardDescription>Registration details for the upcoming event</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-face-gold" />
                        <div>
                          <p className="font-medium">November 15, 2024</p>
                          <p className="text-sm text-gray-500">7:00 PM - 11:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-face-gold" />
                        <div>
                          <p className="font-medium">Grand Ballroom</p>
                          <p className="text-sm text-gray-500">The Prestigious Hotel, New York City</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-face-gold" />
                        <p className="text-sm text-gray-500">
                          Please arrive 30 minutes early for registration
                        </p>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2">
                        <div className="flex justify-between">
                          <span>Ticket Type:</span>
                          <span className="font-medium">{ticketType === 'standard' ? 'Standard Attendance' : ticketType === 'vip' ? 'VIP Experience' : 'Corporate Table'}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Price:</span>
                          <span className="font-bold text-face-gold">{getTicketPrice()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <div className="text-sm text-gray-500">
                        Reference #: FGR24-{Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <Button asChild className="bg-face-blue hover:bg-blue-800">
                    <a href="/">Return to Home</a>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Event details sidebar - only on step 1 and 2 */}
            {formStep < 3 && (
              <div className="mt-12">
                <h3 className="text-xl font-serif font-bold mb-4">Event Details</h3>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-face-gold mt-0.5" />
                      <div>
                        <h4 className="font-bold">Date & Time</h4>
                        <p className="text-gray-600">
                          November 15, 2024<br />
                          7:00 PM - 11:00 PM
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-face-gold mt-0.5" />
                      <div>
                        <h4 className="font-bold">Location</h4>
                        <p className="text-gray-600">
                          Grand Ballroom<br />
                          The Prestigious Hotel<br />
                          123 5th Avenue<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Users className="h-6 w-6 text-face-gold mt-0.5" />
                      <div>
                        <h4 className="font-bold">Dress Code</h4>
                        <p className="text-gray-600">
                          Black Tie / Formal Evening Wear
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-face-gold mt-0.5" />
                      <div>
                        <h4 className="font-bold">Contact</h4>
                        <p className="text-gray-600">
                          For any questions or assistance:<br />
                          <a href="mailto:events@faceawards.org" className="text-face-blue hover:underline">
                            events@faceawards.org
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Registration;
