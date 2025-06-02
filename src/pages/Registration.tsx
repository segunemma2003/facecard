import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Calendar, Mail, MapPin, Users, CheckCircle, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useCreateRegistration } from '@/hooks/useApi';
import { toast } from '@/components/ui/use-toast';
import type { RegistrationData } from '@/lib/api';

const Registration = () => {
  const [formStep, setFormStep] = useState(1);
  const [ticketType, setTicketType] = useState<'standard' | 'vip' | 'corporate'>('standard');
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const [registrationResult, setRegistrationResult] = useState<any>(null);

  const createRegistrationMutation = useCreateRegistration();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'country', 'city'];
    const missingFields = requiredFields.filter(field => !formDataObj.get(field));
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive"
      });
      return;
    }

    // Update form data
    const newFormData: Partial<RegistrationData> = {
      first_name: formDataObj.get('firstName') as string,
      last_name: formDataObj.get('lastName') as string,
      email: formDataObj.get('email') as string,
      phone: formDataObj.get('phone') as string,
      organization: formDataObj.get('organization') as string || undefined,
      country: formDataObj.get('country') as string,
      city: formDataObj.get('city') as string,
      dietary_requirements: formDataObj.get('dietaryRequirements') as string || undefined,
    };

    setFormData(newFormData);
    setFormStep(2);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setFormStep(1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.country || !formData.city) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields.",
        variant: "destructive"
      });
      return;
    }

    const registrationData: RegistrationData = {
      ...formData as Required<Pick<RegistrationData, 'first_name' | 'last_name' | 'email' | 'phone' | 'country' | 'city'>>,
      ticket_type: ticketType,
      event_date: new Date('2024-11-15T19:00:00').toISOString(),
      organization: formData.organization,
      dietary_requirements: formData.dietary_requirements,
    };

    try {
      const response = await createRegistrationMutation.mutateAsync(registrationData);
      setRegistrationResult(response.data);
      setFormStep(3);
      window.scrollTo(0, 0);
      
      toast({
        title: "Registration successful!",
        description: "Your registration has been confirmed. Check your email for details.",
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Registration failed. Please try again.";
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
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
      
      {/* Enhanced Hero section matching other pages */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        {/* Background hero image with stronger overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="FACE Awards registration background"
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
              <Award className="h-12 w-12 text-face-sky-blue" />
            </div>
            
            {/* Main heading with stronger contrast */}
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 text-white">
              Event <span className="text-white">Registration</span>
            </h1>
            
            {/* Subtitle with stronger visibility */}
            <p className="text-2xl text-white mb-8 font-semibold">
              Join us for a prestigious evening celebrating excellence and achievement from around the globe
            </p>
            
            {/* Stats with stronger contrast */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-white">
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Calendar className="h-6 w-6 text-white" />
                <span className="font-bold">November 15, 2024</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <MapPin className="h-6 w-6 text-white" />
                <span className="font-bold">New York City</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Users className="h-6 w-6 text-white" />
                <span className="font-bold">Black Tie Event</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Progress steps */}
            <div className="mb-16">
              <div className="flex justify-between">
                <div className={`flex flex-col items-center ${formStep >= 1 ? 'text-face-sky-blue' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${formStep >= 1 ? 'bg-face-sky-blue' : 'bg-gray-300'}`}>
                    {formStep > 1 ? <CheckCircle className="h-6 w-6" /> : '1'}
                  </div>
                  <span className="mt-3 text-sm font-medium">Personal Information</span>
                </div>
                <div className="flex-1 flex items-center mx-6">
                  <div className={`h-2 w-full rounded-full ${formStep >= 2 ? 'bg-face-sky-blue' : 'bg-gray-200'}`}></div>
                </div>
                <div className={`flex flex-col items-center ${formStep >= 2 ? 'text-face-sky-blue' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${formStep >= 2 ? 'bg-face-sky-blue' : 'bg-gray-300'}`}>
                    {formStep > 2 ? <CheckCircle className="h-6 w-6" /> : '2'}
                  </div>
                  <span className="mt-3 text-sm font-medium">Ticket Selection</span>
                </div>
                <div className="flex-1 flex items-center mx-6">
                  <div className={`h-2 w-full rounded-full ${formStep >= 3 ? 'bg-face-sky-blue' : 'bg-gray-200'}`}></div>
                </div>
                <div className={`flex flex-col items-center ${formStep >= 3 ? 'text-face-sky-blue' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${formStep >= 3 ? 'bg-face-sky-blue' : 'bg-gray-300'}`}>
                    {formStep >= 3 ? <CheckCircle className="h-6 w-6" /> : '3'}
                  </div>
                  <span className="mt-3 text-sm font-medium">Confirmation</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-2xl border border-face-sky-blue/10">
              {formStep === 1 && (
                <form onSubmit={handleNextStep}>
                  <h2 className="text-3xl font-serif font-bold mb-6 text-face-grey">Personal Information</h2>
                  <p className="text-gray-600 mb-10 text-lg">Please provide your details for the event registration.</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name*</label>
                      <input 
                        id="firstName" 
                        name="firstName"
                        defaultValue={formData.first_name}
                        placeholder="Enter your first name" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name*</label>
                      <input 
                        id="lastName" 
                        name="lastName"
                        defaultValue={formData.last_name}
                        placeholder="Enter your last name" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address*</label>
                      <input 
                        id="email" 
                        name="email"
                        type="email" 
                        defaultValue={formData.email}
                        placeholder="Enter your email" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
                      <input 
                        id="phone" 
                        name="phone"
                        defaultValue={formData.phone}
                        placeholder="Enter your phone number" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization / Company</label>
                      <input 
                        id="organization" 
                        name="organization"
                        defaultValue={formData.organization}
                        placeholder="Enter your organization name" 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country*</label>
                      <select 
                        id="country" 
                        name="country"
                        defaultValue={formData.country}
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      >
                        <option value="">Select your country</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Mexico">Mexico</option>
                        <option value="India">India</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City*</label>
                      <input 
                        id="city" 
                        name="city"
                        defaultValue={formData.city}
                        placeholder="Enter your city" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label htmlFor="dietaryRequirements" className="block text-sm font-medium text-gray-700">Dietary Requirements or Allergies</label>
                      <textarea 
                        id="dietaryRequirements" 
                        name="dietaryRequirements"
                        defaultValue={formData.dietary_requirements}
                        placeholder="Please specify any dietary requirements or allergies" 
                        className="w-full min-h-[100px] px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors resize-vertical"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Next Step
                    </button>
                  </div>
                </form>
              )}

              {formStep === 2 && (
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6 text-face-grey">Ticket Selection</h2>
                  <p className="text-gray-600 mb-10 text-lg">Choose your ticket type for the FACE Awards ceremony.</p>
                  
                  <div className="space-y-8 mb-10">
                    <label className="text-xl font-medium text-face-grey">Select Ticket Type*</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div 
                        className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${ticketType === 'standard' ? 'border-face-sky-blue bg-face-sky-blue/5 shadow-lg' : 'border-gray-200 hover:border-face-sky-blue/50'}`}
                        onClick={() => setTicketType('standard')}
                      >
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-face-grey">Standard Attendance</span>
                          <span className="text-3xl font-bold text-face-sky-blue mt-3">$250</span>
                          <ul className="mt-6 text-sm text-gray-600 space-y-3">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Ceremony attendance</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Welcome reception</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Dinner and refreshments</span>
                            </li>
                          </ul>
                        </div>
                        {ticketType === 'standard' && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-face-sky-blue rounded-full p-2">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${ticketType === 'vip' ? 'border-face-sky-blue bg-face-sky-blue/5 shadow-lg' : 'border-gray-200 hover:border-face-sky-blue/50'}`}
                        onClick={() => setTicketType('vip')}
                      >
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-face-grey">VIP Experience</span>
                          <span className="text-3xl font-bold text-face-sky-blue mt-3">$450</span>
                          <ul className="mt-6 text-sm text-gray-600 space-y-3">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Premium seating</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Exclusive VIP reception</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Meet & greet with awardees</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Complimentary gift bag</span>
                            </li>
                          </ul>
                        </div>
                        {ticketType === 'vip' && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-face-sky-blue rounded-full p-2">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${ticketType === 'corporate' ? 'border-face-sky-blue bg-face-sky-blue/5 shadow-lg' : 'border-gray-200 hover:border-face-sky-blue/50'}`}
                        onClick={() => setTicketType('corporate')}
                      >
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-face-grey">Corporate Table</span>
                          <span className="text-3xl font-bold text-face-sky-blue mt-3">$1,800</span>
                          <ul className="mt-6 text-sm text-gray-600 space-y-3">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Reserved table for 8 guests</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Premium location seating</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>Company recognition in program</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span>VIP benefits for all guests</span>
                            </li>
                          </ul>
                        </div>
                        {ticketType === 'corporate' && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-face-sky-blue rounded-full p-2">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 pt-8">
                      <input type="checkbox" id="terms" required className="mt-1" />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-face-sky-blue hover:underline font-medium">terms and conditions</a> and understand that tickets are non-refundable but transferable up to 14 days before the event.
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={handlePrevStep}
                      className="border-2 border-face-sky-blue text-face-sky-blue hover:bg-face-sky-blue hover:text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300"
                    >
                      Previous Step
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={createRegistrationMutation.isPending}
                      className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:transform-none"
                    >
                      {createRegistrationMutation.isPending ? (
                        <span className="flex items-center">
                          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                          Processing...
                        </span>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {formStep === 3 && registrationResult && (
                <div className="text-center py-12">
                  <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-6 text-face-grey">Registration Complete!</h2>
                  <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg">
                    Thank you for registering for the FACE Awards ceremony. We've sent a confirmation email with all the details.
                  </p>
                  
                  <div className="max-w-md mx-auto mb-10 bg-face-sky-blue/5 border border-face-sky-blue/20 rounded-2xl p-8">
                    <h3 className="text-xl font-bold mb-6 text-face-grey">Your Reservation</h3>
                    <div className="space-y-6 text-left">
                      <div className="flex items-center gap-4">
                        <Clock className="h-6 w-6 text-face-sky-blue" />
                        <p className="text-sm text-gray-500">
                          Please arrive 30 minutes early for registration
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Ticket Type:</span>
                          <span className="font-medium">
                            {ticketType === 'standard' ? 'Standard Attendance' : 
                             ticketType === 'vip' ? 'VIP Experience' : 'Corporate Table'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-bold text-face-sky-blue text-lg">${registrationResult.amount}</span>
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-500 bg-gray-100 py-3 rounded-lg">
                        Reference #: {registrationResult.reference_number}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Return to Home
                  </button>
                </div>
              )}
            </div>
            
            {/* Event details sidebar - only on step 1 and 2 */}
            {formStep < 3 && (
              <div className="mt-16">
                <h3 className="text-2xl font-serif font-bold mb-8 text-face-grey">Event Details</h3>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-face-sky-blue/10">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 p-4 bg-face-sky-blue/5 rounded-lg">
                      <Calendar className="h-8 w-8 text-face-sky-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-face-grey">Date & Time</h4>
                        <p className="text-gray-600">
                          November 15, 2024<br />
                          7:00 PM - 11:00 PM
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-face-sky-blue/5 rounded-lg">
                      <MapPin className="h-8 w-8 text-face-sky-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-face-grey">Location</h4>
                        <p className="text-gray-600">
                          Grand Ballroom<br />
                          The Prestigious Hotel<br />
                          123 5th Avenue<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-face-sky-blue/5 rounded-lg">
                      <Users className="h-8 w-8 text-face-sky-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-face-grey">Dress Code</h4>
                        <p className="text-gray-600">
                          Black Tie / Formal Evening Wear
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-face-sky-blue/5 rounded-lg">
                      <Mail className="h-8 w-8 text-face-sky-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-face-grey">Contact</h4>
                        <p className="text-gray-600">
                          For any questions or assistance:<br />
                          <a href="mailto:events@faceawards.org" className="text-face-sky-blue hover:underline font-medium">
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