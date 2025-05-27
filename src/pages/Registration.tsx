import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Calendar, Mail, MapPin, Users, CheckCircle, Clock } from 'lucide-react';

const Registration = () => {
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [ticketType, setTicketType] = useState('standard');

  const handleNextStep = (e) => {
    e.preventDefault();
    setFormStep(2);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setFormStep(1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
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
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6 text-face-grey">Personal Information</h2>
                  <p className="text-gray-600 mb-10 text-lg">Please provide your details for the event registration.</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name*</label>
                      <input 
                        id="firstName" 
                        placeholder="Enter your first name" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name*</label>
                      <input 
                        id="lastName" 
                        placeholder="Enter your last name" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address*</label>
                      <input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
                      <input 
                        id="phone" 
                        placeholder="Enter your phone number" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization / Company</label>
                      <input 
                        id="organization" 
                        placeholder="Enter your organization name" 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country*</label>
                      <select 
                        id="country" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      >
                        <option value="">Select your country</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City*</label>
                      <input 
                        id="city" 
                        placeholder="Enter your city" 
                        required 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label htmlFor="dietaryRequirements" className="block text-sm font-medium text-gray-700">Dietary Requirements or Allergies</label>
                      <textarea 
                        id="dietaryRequirements" 
                        placeholder="Please specify any dietary requirements or allergies" 
                        className="w-full min-h-[100px] px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors resize-vertical"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={handleNextStep} 
                      className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
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
                      disabled={submitting}
                      className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:transform-none"
                    >
                      {submitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
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
                        <Calendar className="h-6 w-6 text-face-sky-blue" />
                        <div>
                          <p className="font-medium">November 15, 2024</p>
                          <p className="text-sm text-gray-500">7:00 PM - 11:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-face-sky-blue" />
                        <div>
                          <p className="font-medium">Grand Ballroom</p>
                          <p className="text-sm text-gray-500">The Prestigious Hotel, New York City</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock className="h-6 w-6 text-face-sky-blue" />
                        <p className="text-sm text-gray-500">
                          Please arrive 30 minutes early for registration
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Ticket Type:</span>
                          <span className="font-medium">{ticketType === 'standard' ? 'Standard Attendance' : ticketType === 'vip' ? 'VIP Experience' : 'Corporate Table'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-bold text-face-sky-blue text-lg">{getTicketPrice()}</span>
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-500 bg-gray-100 py-3 rounded-lg">
                        Reference #: FGR24-{Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg">
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