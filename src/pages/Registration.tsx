import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, MapPin, Users, Check, Trophy, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCreateRegistration } from '@/hooks/useApi';
import { extractContent } from '@/lib/contentUtils';
import { toast } from '@/components/ui/use-toast';
import { usePageContent } from '@/hooks/usePageContent';

interface RegistrationFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  country: string;
  city: string;
  dietary_requirements: string;
  ticket_type: 'standard' | 'vip' | 'corporate';
  event_date: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    organization: '',
    country: '',
    city: '',
    dietary_requirements: '',
    ticket_type: 'standard',
    event_date: '2024-11-15'
  });
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Content API Hook
  const { data: contentResponse, isLoading: contentLoading, error: contentError } = usePageContent('registration');
  
  // Registration mutation
  const createRegistrationMutation = useCreateRegistration();
  
  const pageContent = contentResponse?.data;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const result = await createRegistrationMutation.mutateAsync(formData);
      setRegistrationResult(result.data);
      setCurrentStep(3);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Registration failed. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep1 = () => {
    return formData.first_name && formData.last_name && formData.email && formData.phone;
  };

  const validateStep2 = () => {
    return formData.country && formData.city && formData.ticket_type;
  };

  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconMap = {
      calendar: Calendar,
      'map-pin': MapPin,
      users: Users
    };
    return iconMap[iconName as keyof typeof iconMap] || Calendar;
  };

  // Extract content with fallbacks
  const heroTitle = pageContent?.hero?.find(item => item.key === 'main_title')?.content || 'Event <span class="text-white">Registration</span>';
  const heroSubtitle = extractContent(pageContent?.hero, 'subtitle', 'Join us for a prestigious evening celebrating excellence and achievement from around the globe');
  const heroBackgroundImage = extractContent(pageContent?.hero, 'background_image', 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop');

  // Parse event badges from JSON content
  let eventBadges = [
    { icon: 'calendar', text: 'November 15, 2024' },
    { icon: 'map-pin', text: 'New York City' },
    { icon: 'users', text: 'Black Tie Event' }
  ];
  try {
    const badgesContent = pageContent?.hero?.find(item => item.key === 'event_badges')?.content;
    if (badgesContent) {
      const parsed = JSON.parse(badgesContent);
      if (Array.isArray(parsed)) {
        eventBadges = parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to parse event badges:', error);
  }

  const step1Title = extractContent(pageContent?.progress_steps, 'step_1_title', 'Personal Information');
  const step2Title = extractContent(pageContent?.progress_steps, 'step_2_title', 'Ticket Selection');
  const step3Title = extractContent(pageContent?.progress_steps, 'step_3_title', 'Confirmation');

  const registrationCompleteTitle = extractContent(pageContent?.success_messages, 'registration_complete_title', 'Registration Complete!');
  const registrationCompleteMessage = extractContent(pageContent?.success_messages, 'registration_complete_message', 'Thank you for registering for the FACE Awards ceremony. We\'ve sent a confirmation email with all the details.');
  const yourReservationTitle = extractContent(pageContent?.success_messages, 'your_reservation_title', 'Your Reservation');
  const arrivalInstruction = extractContent(pageContent?.success_messages, 'arrival_instruction', 'Please arrive 30 minutes early for registration');
  const ticketTypeLabel = extractContent(pageContent?.success_messages, 'ticket_type_label', 'Ticket Type:');
  const priceLabel = extractContent(pageContent?.success_messages, 'price_label', 'Price:');
  const referenceLabel = extractContent(pageContent?.success_messages, 'reference_label', 'Reference #:');
  const returnHomeButtonText = extractContent(pageContent?.success_messages, 'return_home_button_text', 'Return to Home');

  const eventDetailsTitle = extractContent(pageContent?.event_details, 'section_title', 'Event Details');
  const dateTimeTitle = extractContent(pageContent?.event_details, 'date_time_title', 'Date & Time');
  const locationTitle = extractContent(pageContent?.event_details, 'location_title', 'Location');
  const dressCodeTitle = extractContent(pageContent?.event_details, 'dress_code_title', 'Dress Code');
  const dressCodeText = extractContent(pageContent?.event_details, 'dress_code_text', 'Black Tie / Formal Evening Wear');
  const contactTitle = extractContent(pageContent?.event_details, 'contact_title', 'Contact');
  const contactMessage = pageContent?.event_details?.find(item => item.key === 'contact_message')?.content || 'For any questions or assistance:<br><a href="mailto:events@faceawards.org" class="text-face-sky-blue hover:underline font-medium">events@faceawards.org</a>';

  // Loading state
  if (contentLoading) {
    return (
      <div className="min-h-screen bg-face-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-face-sky-blue mx-auto mb-4" />
            <p className="text-xl text-face-grey/60 font-manrope">Loading registration...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-face-white rounded-full mb-8 shadow-2xl">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h1 
              className="text-4xl md:text-5xl font-clash font-bold mb-4 text-face-white"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            <p className="text-xl text-face-white/90 mb-12 font-manrope">
              {heroSubtitle}
            </p>
            
            {/* Event badges */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-face-white">
              {eventBadges.map((badge, index) => {
                const IconComponent = getIcon(badge.icon);
                return (
                  <div key={index} className="flex items-center gap-3 bg-face-white/30 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-face-white/40">
                    <IconComponent className="h-6 w-6 text-face-white" />
                    <span className="font-medium font-manrope">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {[
                { number: 1, title: step1Title },
                { number: 2, title: step2Title },
                { number: 3, title: step3Title }
              ].map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-face-sky-blue border-face-sky-blue text-face-white' 
                      : 'border-face-grey/30 text-face-grey/50'
                  }`}>
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </div>
                  <span className={`ml-3 font-medium font-manrope ${
                    currentStep >= step.number ? 'text-face-sky-blue' : 'text-face-grey/50'
                  }`}>
                    {step.title}
                  </span>
                  {index < 2 && (
                    <div className={`hidden md:block w-24 h-0.5 ml-8 ${
                      currentStep > step.number ? 'bg-face-sky-blue' : 'bg-face-grey/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-2 bg-face-grey/10" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="md:col-span-2">
              <Card className="border-face-sky-blue/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-clash text-face-grey">
                    {currentStep === 1 && step1Title}
                    {currentStep === 2 && step2Title}
                    {currentStep === 3 && step3Title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first_name" className="font-manrope">First Name *</Label>
                          <Input
                            id="first_name"
                            value={formData.first_name}
                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                            className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="last_name" className="font-manrope">Last Name *</Label>
                          <Input
                            id="last_name"
                            value={formData.last_name}
                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                            className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="font-manrope">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="font-manrope">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="organization" className="font-manrope">Organization</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange('organization', e.target.value)}
                          className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleNext}
                          disabled={!validateStep1()}
                          className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white font-manrope"
                        >
                          Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Step 2: Ticket Selection */}
                  {currentStep === 2 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country" className="font-manrope">Country *</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="font-manrope">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="ticket_type" className="font-manrope">Ticket Type *</Label>
                        <Select value={formData.ticket_type} onValueChange={(value) => handleInputChange('ticket_type', value)}>
                          <SelectTrigger className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope">
                            <SelectValue placeholder="Select ticket type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard - $150</SelectItem>
                            <SelectItem value="vip">VIP - $300</SelectItem>
                            <SelectItem value="corporate">Corporate Table - $1,500</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="dietary_requirements" className="font-manrope">Dietary Requirements</Label>
                        <Textarea
                          id="dietary_requirements"
                          value={formData.dietary_requirements}
                          onChange={(e) => handleInputChange('dietary_requirements', e.target.value)}
                          className="border-face-sky-blue/30 focus:border-face-sky-blue font-manrope"
                          placeholder="Please specify any dietary requirements or allergies"
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          onClick={handlePrevious}
                          variant="outline"
                          className="border-face-sky-blue text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white font-manrope"
                        >
                          Previous
                        </Button>
                        <Button 
                          onClick={handleSubmit}
                          disabled={!validateStep2() || isSubmitting}
                          className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white font-manrope"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Registering...
                            </>
                          ) : (
                            <>
                              Complete Registration <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Step 3: Confirmation */}
                  {currentStep === 3 && registrationResult && (
                    <div className="text-center space-y-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      
                      <h2 className="text-2xl font-clash font-bold text-face-grey">{registrationCompleteTitle}</h2>
                      <p className="text-face-grey/70 font-manrope">{registrationCompleteMessage}</p>
                      
                      <div className="bg-face-sky-blue/5 border border-face-sky-blue/20 rounded-lg p-6 text-left">
                        <h3 className="font-clash font-bold text-face-grey mb-4">{yourReservationTitle}</h3>
                        <div className="space-y-2 text-sm font-manrope">
                          <div className="flex justify-between">
                            <span className="text-face-grey/60">{ticketTypeLabel}</span>
                            <span className="font-medium text-face-grey">{registrationResult.ticket_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-face-grey/60">{priceLabel}</span>
                            <span className="font-medium text-face-grey">${registrationResult.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-face-grey/60">{referenceLabel}</span>
                            <span className="font-medium text-face-sky-blue">{registrationResult.reference_number}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-face-sky-blue/20">
                          <p className="text-sm text-face-grey/70 font-manrope">{arrivalInstruction}</p>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          navigate('/');
                          handleScrollToTop();
                        }}
                        className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white font-manrope"
                      >
                        {returnHomeButtonText}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Event Details Sidebar */}
            <div className="md:col-span-1">
              <Card className="border-face-sky-blue/20 shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="font-clash text-face-grey">{eventDetailsTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-clash font-semibold text-face-grey mb-2">{dateTimeTitle}</h4>
                    <p className="text-face-grey/70 font-manrope">November 15, 2024<br />7:00 PM - 11:00 PM</p>
                  </div>
                  
                  <div>
                    <h4 className="font-clash font-semibold text-face-grey mb-2">{locationTitle}</h4>
                    <p className="text-face-grey/70 font-manrope">Grand Ballroom<br />The Plaza Hotel<br />New York City, NY</p>
                  </div>
                  
                  <div>
                    <h4 className="font-clash font-semibold text-face-grey mb-2">{dressCodeTitle}</h4>
                    <p className="text-face-grey/70 font-manrope">{dressCodeText}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-clash font-semibold text-face-grey mb-2">{contactTitle}</h4>
                    <p 
                      className="text-face-grey/70 text-sm font-manrope"
                      dangerouslySetInnerHTML={{ __html: contactMessage }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Registration;