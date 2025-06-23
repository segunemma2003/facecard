import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

// Custom hook for page content with better error handling (same as About page)
const usePageContent = (page: string, section?: string, key?: string) => {
  return useQuery({
    queryKey: ['page-content', page, section, key],
    queryFn: async () => {
      try {
        console.log(`Fetching content for: page=${page}, section=${section}, key=${key}`);
        
        if (key && section) {
          const result = await apiClient.getSpecificContent(page, section, key);
          console.log(`API Response for ${page}/${section}/${key}:`, result);
          return result;
        } else if (section) {
          const result = await apiClient.getPageSectionContent(page, section);
          console.log(`API Response for ${page}/${section}:`, result);
          return result;
        } else {
          const result = await apiClient.getPageContent(page);
          console.log(`API Response for ${page}:`, result);
          return result;
        }
      } catch (error) {
        console.error(`API Error for ${page}/${section}/${key}:`, error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Fetch contact page content
  const { 
    data: heroContent, 
    isLoading: heroLoading, 
    error: heroError 
  } = usePageContent('contact', 'hero');
  
  const { 
    data: formContent, 
    isLoading: formLoading, 
    error: formError 
  } = usePageContent('contact', 'contact_form');
  
  const { 
    data: contactInfoContent, 
    isLoading: contactInfoLoading, 
    error: contactInfoError 
  } = usePageContent('contact', 'contact_information');
  
  const { 
    data: formMessages, 
    isLoading: formMessagesLoading, 
    error: formMessagesError 
  } = usePageContent('contact', 'form_messages');
  
  const { 
    data: mapContent, 
    isLoading: mapLoading, 
    error: mapError 
  } = usePageContent('contact', 'map_section');
  
  const { 
    data: faqContent, 
    isLoading: faqLoading, 
    error: faqError 
  } = usePageContent('contact', 'faq_cta');

  // Fetch global settings
  const { 
    data: globalSettings, 
    isLoading: globalLoading, 
    error: globalError 
  } = usePageContent('global_settings');

  // Debug: Log all data states
  React.useEffect(() => {
    console.log('Contact Component render - Data states:', {
      heroContent,
      formContent,
      contactInfoContent,
      formMessages,
      mapContent,
      faqContent,
      globalSettings,
      errors: {
        heroError,
        formError,
        contactInfoError,
        formMessagesError,
        mapError,
        faqError,
        globalError
      }
    });
  }, [heroContent, formContent, contactInfoContent, formMessages, mapContent, faqContent, globalSettings]);

  // Check if any critical data is still loading
  const isLoading = heroLoading || formLoading || contactInfoLoading || formMessagesLoading || mapLoading || faqLoading || globalLoading;
  const hasErrors = heroError || formError || contactInfoError || formMessagesError || mapError || faqError || globalError;

  // Content extraction helper (same as About page)
  const getContent = (source: any, key: string, fallback: string = '', options?: any) => {
    try {
      const contentData = source?.data?.content?.[key];
      
      if (!contentData) {
        console.warn(`No data found for key: ${key}, using fallback: ${fallback}`);
        return fallback;
      }
      
      let result = contentData.content;
      
      if (contentData.type === 'html' && typeof result === 'string') {
        if (options?.stripHTML) {
          result = result.replace(/<[^>]*>/g, '');
        }
      }
      
      console.log(`Extracted content for ${key}:`, result);
      return result || fallback;
    } catch (error) {
      console.error(`Error extracting content for ${key}:`, error);
      return fallback;
    }
  };

  // Parse JSON content (same as About page)
  const parseJsonContent = (source: any, key: string, fallback: any[] = []) => {
    try {
      console.log(`Parsing content for key: ${key}`, source);
      const contentData = source?.data?.content?.[key];
      
      if (!contentData) {
        console.warn(`No content found for key: ${key}, using fallback`);
        return fallback;
      }
      
      let content = contentData.content;
      
      if (Array.isArray(content) || typeof content === 'object') {
        console.log(`Successfully extracted ${contentData.type} content for ${key}:`, content);
        return content;
      }
      
      if (typeof content === 'string' && contentData.type === 'json') {
        const parsed = JSON.parse(content);
        console.log(`Successfully parsed JSON for ${key}:`, parsed);
        return parsed;
      }
      
      console.warn(`Content for ${key} is not in expected format, using fallback`);
      return fallback;
    } catch (error) {
      console.error(`Failed to parse content for key: ${key}`, error);
      return fallback;
    }
  };

  // Get global settings content
  const getGlobalContent = (section: string, key: string, fallback: string = '') => {
    try {
      const contentData = globalSettings?.data?.content?.[section]?.[key] || 
                         globalSettings?.data?.content?.[key];
      
      if (!contentData) {
        console.warn(`No global data found for ${section}/${key}, using fallback: ${fallback}`);
        return fallback;
      }
      
      let result = contentData.content || contentData;
      console.log(`Extracted global content for ${section}/${key}:`, result);
      return result || fallback;
    } catch (error) {
      console.error(`Error extracting global content for ${section}/${key}:`, error);
      return fallback;
    }
  };

  // Get icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      clock: Clock,
      phone: Phone,
      'map-pin': MapPin
    };
    return iconMap[iconName.toLowerCase()] || Clock;
  };

  // Show loading state (same as About page)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page content...</p>
        </div>
      </div>
    );
  }

  // Show error state (same as About page)
  if (hasErrors) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Content</h2>
          <p className="text-gray-600 mb-4">There was an error loading the page content from the server.</p>
          <div className="text-left bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Error Details:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {heroError && <li>• Hero section: {heroError.message}</li>}
              {formError && <li>• Form section: {formError.message}</li>}
              {contactInfoError && <li>• Contact info: {contactInfoError.message}</li>}
              {formMessagesError && <li>• Form messages: {formMessagesError.message}</li>}
              {mapError && <li>• Map section: {mapError.message}</li>}
              {faqError && <li>• FAQ section: {faqError.message}</li>}
              {globalError && <li>• Global settings: {globalError.message}</li>}
            </ul>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: getContent(formMessages, 'validation_error_title', 'Please fill in all fields'),
        description: getContent(formMessages, 'validation_error_message', 'All fields are required to submit your message.'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `FACE Awards Contact: ${formData.subject}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast({
        title: getContent(formMessages, 'success_title', 'Message sent successfully!'),
        description: getContent(formMessages, 'success_message', "Thank you for contacting us. We'll get back to you within 24-48 hours."),
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: getContent(formMessages, 'error_title', 'Failed to send message'),
        description: getContent(formMessages, 'error_message', 'Please try again or contact us directly at info@faceawards.org'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get dynamic content with fallbacks
  const statsBadges = parseJsonContent(heroContent, 'stats_badges', [
    { icon: 'clock', text: '24-48 Hour Response' },
    { icon: 'phone', text: 'Global Support' },
    { icon: 'map-pin', text: 'Worldwide' }
  ]);

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getContent(heroContent, 'background_image', 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')}
            alt="Professional contact and communication background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-face-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-face-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-face-white rounded-full mb-8 shadow-2xl">
              <Mail className="h-12 w-12 text-face-sky-blue" />
            </div>
            
            <h1 
              className="text-6xl md:text-7xl font-serif font-bold mb-6 text-face-white"
              dangerouslySetInnerHTML={{
                __html: getContent(heroContent, 'main_title', 'Get in <span class="text-face-sky-blue-light">Touch</span>')
              }}
            />
            
            <p className="text-2xl text-face-white mb-8 font-semibold">
              {getContent(heroContent, 'subtitle', "Have questions about the FACE Awards? We're here to help you with any inquiries")}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-lg text-face-white">
              {statsBadges.map((badge: any, index: number) => {
                const IconComponent = getIconComponent(badge.icon);
                return (
                  <div key={index} className="flex items-center gap-3 bg-face-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-face-white/60 hover:bg-face-white/50 transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-face-white" />
                    <span className="font-bold">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="#FFFFFF" 
              fillOpacity="1" 
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Contact Details Section */}
      <section className="py-20 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 
                  className="text-4xl font-serif font-bold mb-6 text-face-grey"
                  dangerouslySetInnerHTML={{ 
                    __html: getContent(formContent, 'form_title', 'Send us a <span class="text-face-sky-blue">Message</span>')
                  }}
                />
                <p className="text-face-grey/60 mb-8 text-lg">
                  {getContent(formContent, 'form_subtitle', 'Fill out the form below and our team will get back to you as soon as possible.')}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-face-grey mb-2">
                        {getContent(formContent, 'first_name_label', 'First Name *')}
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={getContent(formContent, 'first_name_placeholder', 'John')}
                        className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-face-grey mb-2">
                        {getContent(formContent, 'last_name_label', 'Last Name *')}
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={getContent(formContent, 'last_name_placeholder', 'Doe')}
                        className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-face-grey mb-2">
                      {getContent(formContent, 'email_label', 'Email Address *')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={getContent(formContent, 'email_placeholder', 'john.doe@example.com')}
                      className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-face-grey mb-2">
                      {getContent(formContent, 'subject_label', 'Subject *')}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={getContent(formContent, 'subject_placeholder', 'How can we help you?')}
                      className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-face-grey mb-2">
                      {getContent(formContent, 'message_label', 'Message *')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={getContent(formContent, 'message_placeholder', 'Please provide details about your inquiry...')}
                      className="w-full min-h-[150px] border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue resize-vertical"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white w-full py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {getContent(formContent, 'sending_button_text', 'Sending...')}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        {getContent(formContent, 'submit_button_text', 'Send Message')}
                      </>
                    )}
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 
                  className="text-4xl font-serif font-bold mb-6 text-face-grey"
                  dangerouslySetInnerHTML={{
                    __html: getContent(contactInfoContent, 'info_title', 'Contact <span class="text-face-sky-blue">Information</span>')
                  }}
                />
                <p className="text-face-grey/60 mb-8 text-lg">
                  {getContent(contactInfoContent, 'info_subtitle', 'Our team is available to assist you with any questions regarding nominations, event details, or general inquiries about the FACE Awards.')}
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Mail className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">
                        {getContent(contactInfoContent, 'email_section_title', 'Email Us')}
                      </h3>
                      <p className="text-face-grey/60 mb-1">
                        {getContent(contactInfoContent, 'email_general_label', 'For general inquiries:')}
                      </p>
                      <a 
                        href={`mailto:${getGlobalContent('contact_info', 'primary_email', 'info@faceawards.org')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg"
                      >
                        {getGlobalContent('contact_info', 'primary_email', 'info@faceawards.org')}
                      </a>
                      <p className="text-face-grey/60 mt-3 mb-1">
                        {getContent(contactInfoContent, 'email_nominations_label', 'For nominations:')}
                      </p>
                      <a 
                        href={`mailto:${getGlobalContent('contact_info', 'nominations_email', 'nominations@faceawards.org')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg"
                      >
                        {getGlobalContent('contact_info', 'nominations_email', 'nominations@faceawards.org')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Phone className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">
                        {getContent(contactInfoContent, 'phone_section_title', 'Call Us')}
                      </h3>
                      <p className="text-face-grey/60 mb-1">
                        {getContent(contactInfoContent, 'phone_international_label', 'International:')}
                      </p>
                      <a 
                        href={`tel:${getGlobalContent('contact_info', 'phone_international', '+1 (234) 567-8901').replace(/[^+\d]/g, '')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg"
                      >
                        {getGlobalContent('contact_info', 'phone_international', '+1 (234) 567-8901')}
                      </a>
                      <p className="text-face-grey/60 mt-3 mb-1">
                        {getContent(contactInfoContent, 'phone_toll_free_label', 'Toll Free:')}
                      </p>
                      <a 
                        href={`tel:${getGlobalContent('contact_info', 'phone_toll_free', '1-800-555-1000').replace(/[^+\d]/g, '')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg"
                      >
                        {getGlobalContent('contact_info', 'phone_toll_free', '1-800-555-1000')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <MapPin className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">
                        {getContent(contactInfoContent, 'address_section_title', 'Visit Us')}
                      </h3>
                      <div 
                        className="text-face-grey/60 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: getGlobalContent('contact_info', 'full_address', 
                            'FACE Awards Global Headquarters<br>3120 Southwest freeway 1st floor<br>2003 Houston TX 77098<br>United States'
                          )
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Clock className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">
                        {getContent(contactInfoContent, 'office_hours_section_title', 'Office Hours')}
                      </h3>
                      <div 
                        className="text-face-grey/60 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: getGlobalContent('contact_info', 'office_hours', 
                            'Monday - Friday: 9:00 AM - 5:00 PM (EST)<br>Saturday & Sunday: Closed'
                          )
                        }}
                      />
                      <p className="text-face-grey/60 mt-3">
                        {getContent(contactInfoContent, 'response_time_label', 'Response Time:')} {getGlobalContent('contact_info', 'response_time', 'Within 24-48 business hours')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20 bg-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 
                className="text-4xl font-serif font-bold mb-12 text-center text-face-grey"
             dangerouslySetInnerHTML={{
               __html: getContent(mapContent, 'title', 'Our <span class="text-face-sky-blue">Location</span>')
             }}
           />
           <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-face-white">
             <iframe 
               src={getGlobalContent('contact_info', 'google_maps_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1653486359204!5m2!1sen!2sca')}
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="FACE Awards Global Headquarters Location"
             />
           </div>
         </div>
       </div>
     </section>
     
     {/* FAQ CTA Section */}
     <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
       <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-face-white">
             {getContent(faqContent, 'title', 'Still Have Questions?')}
           </h2>
           <p className="text-xl mb-12 text-face-white/90 leading-relaxed">
             {getContent(faqContent, 'subtitle', 'Check out our award process or explore our categories for more information about the FACE Awards.')}
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Button
               onClick={() => {
                 navigate('/award-process');
                 handleScrollToTop();
               }}
               className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white border-4 border-face-white hover:border-face-white shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300"
             >
               {getContent(faqContent, 'primary_button_text', 'View Award Process')}
             </Button>
             <Button
               onClick={() => {
                 navigate('/categories');
                 handleScrollToTop();
               }}
               variant="outline"
               className="border-4 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300"
             >
               {getContent(faqContent, 'secondary_button_text', 'Explore Categories')}
             </Button>
           </div>
         </div>
       </div>
     </section>
     
     <Footer />
   </div>
 );
};

export default Contact;