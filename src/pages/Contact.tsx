import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { extractContent } from '@/lib/contentUtils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useGlobalSettings, usePageContent } from '@/hooks/usePageContent';


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

  // Fetch content from API
  const { data: heroContent } = usePageContent('contact', 'hero');
  const { data: formContent } = usePageContent('contact', 'contact_form');
  const { data: contactInfoContent } = usePageContent('contact', 'contact_information');
  const { data: formMessages } = usePageContent('contact', 'form_messages');
  const { data: mapContent } = usePageContent('contact', 'map_section');
  const { data: faqContent } = usePageContent('contact', 'faq_cta');
  const { data: globalSettings } = useGlobalSettings();

  // Content extraction helper
  const getContent = (source: any, key: string, fallback: string = '', options?: any) => {
    if (!source?.data?.data) return fallback;
    return extractContent(source.data.data, key, fallback, options);
  };

  // Parse stats badges from JSON
  const getStatsBadges = () => {
    try {
      const statsContent = heroContent?.data?.data?.stats_badges?.content;
      if (statsContent) {
        const stats = JSON.parse(statsContent);
        return stats.map((stat: any) => ({
          icon: getIconComponent(stat.icon),
          text: stat.text
        }));
      }
    } catch (error) {
      console.error('Failed to parse stats badges:', error);
    }
    
    // Fallback stats
    return [
      { icon: Clock, text: '24-48 Hour Response' },
      { icon: Phone, text: 'Global Support' },
      { icon: MapPin, text: 'Worldwide' }
    ];
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      clock: Clock,
      phone: Phone,
      'map-pin': MapPin
    };
    return iconMap[iconName] || Clock;
  };

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
    
    // Basic validation
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
      // Using Formspree to handle form submission
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

      // Reset form
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

  // Get dynamic content
  const mainTitle = getContent(heroContent, 'main_title', 'Get in <span class="text-face-sky-blue-light">Touch</span>');
  const subtitle = getContent(heroContent, 'subtitle', "Have questions about the FACE Awards? We're here to help you with any inquiries");
  const backgroundImage = getContent(heroContent, 'background_image', 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop');
  
  const statsBadges = getStatsBadges();

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        {/* Background hero image with stronger overlay */}
        <div className="absolute inset-0">
          <img 
            src={backgroundImage}
            alt="Professional contact and communication background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-face-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-face-white rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border-2 border-face-white transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* FACE Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-face-white rounded-full mb-8 shadow-2xl">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-12 w-auto"
              />
            </div>
            
            {/* Main heading */}
            <h1 
              className="text-6xl md:text-7xl font-clash font-bold mb-6 text-face-white"
              dangerouslySetInnerHTML={{ __html: mainTitle }}
            />
            
            {/* Subtitle */}
            <p className="text-2xl text-face-white mb-8 font-semibold font-manrope">
              {subtitle}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-face-white">
              {statsBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 bg-face-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-face-white/60 hover:bg-face-white/50 transition-all duration-300">
                  <badge.icon className="h-6 w-6 text-face-white" />
                  <span className="font-bold font-manrope">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave effect */}
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
                  className="text-4xl font-clash font-bold mb-6 text-face-grey"
                  dangerouslySetInnerHTML={{ 
                    __html: getContent(formContent, 'form_title', 'Send us a <span class="text-face-sky-blue">Message</span>')
                  }}
                />
                <p className="text-face-grey/60 mb-8 text-lg font-manrope">
                  {getContent(formContent, 'form_subtitle', 'Fill out the form below and our team will get back to you as soon as possible.')}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-face-grey mb-2 font-manrope">
                        {getContent(formContent, 'first_name_label', 'First Name *')}
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={getContent(formContent, 'first_name_placeholder', 'John')}
                        className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue font-manrope"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-face-grey mb-2 font-manrope">
                        {getContent(formContent, 'last_name_label', 'Last Name *')}
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={getContent(formContent, 'last_name_placeholder', 'Doe')}
                        className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue font-manrope"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-face-grey mb-2 font-manrope">
                      {getContent(formContent, 'email_label', 'Email Address *')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={getContent(formContent, 'email_placeholder', 'john.doe@example.com')}
                      className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue font-manrope"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-face-grey mb-2 font-manrope">
                      {getContent(formContent, 'subject_label', 'Subject *')}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={getContent(formContent, 'subject_placeholder', 'How can we help you?')}
                      className="w-full border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue font-manrope"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-face-grey mb-2 font-manrope">
                      {getContent(formContent, 'message_label', 'Message *')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={getContent(formContent, 'message_placeholder', 'Please provide details about your inquiry...')}
                      className="w-full min-h-[150px] border-face-sky-blue/30 focus:ring-face-sky-blue focus:border-face-sky-blue resize-vertical font-manrope"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white w-full py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg font-manrope"
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
                  className="text-4xl font-clash font-bold mb-6 text-face-grey"
                  dangerouslySetInnerHTML={{
                    __html: getContent(contactInfoContent, 'info_title', 'Contact <span class="text-face-sky-blue">Information</span>')
                  }}
                />
                <p className="text-face-grey/60 mb-8 text-lg font-manrope">
                  {getContent(contactInfoContent, 'info_subtitle', 'Our team is available to assist you with any questions regarding nominations, event details, or general inquiries about the FACE Awards.')}
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Mail className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey font-clash">
                        {getContent(contactInfoContent, 'email_section_title', 'Email Us')}
                      </h3>
                      <p className="text-face-grey/60 mb-1 font-manrope">
                        {getContent(contactInfoContent, 'email_general_label', 'For general inquiries:')}
                      </p>
                      <a 
                        href={`mailto:${getContent(globalSettings, 'primary_email', 'info@faceawards.org')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg font-manrope"
                      >
                        {getContent(globalSettings, 'primary_email', 'info@faceawards.org')}
                      </a>
                      <p className="text-face-grey/60 mt-3 mb-1 font-manrope">
                        {getContent(contactInfoContent, 'email_nominations_label', 'For nominations:')}
                      </p>
                      <a 
                        href={`mailto:${getContent(globalSettings, 'nominations_email', 'nominations@faceawards.org')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg font-manrope"
                      >
                        {getContent(globalSettings, 'nominations_email', 'nominations@faceawards.org')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Phone className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey font-clash">
                        {getContent(contactInfoContent, 'phone_section_title', 'Call Us')}
                      </h3>
                      <p className="text-face-grey/60 mb-1 font-manrope">
                        {getContent(contactInfoContent, 'phone_international_label', 'International:')}
                      </p>
                      <a 
                        href={`tel:${getContent(globalSettings, 'phone_international', '+1 (234) 567-8901').replace(/[^+\d]/g, '')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg font-manrope"
                      >
                        {getContent(globalSettings, 'phone_international', '+1 (234) 567-8901')}
                      </a>
                      <p className="text-face-grey/60 mt-3 mb-1 font-manrope">
                        {getContent(contactInfoContent, 'phone_toll_free_label', 'Toll Free:')}
                      </p>
                      <a 
                        href={`tel:${getContent(globalSettings, 'phone_toll_free', '1-800-555-1000').replace(/[^+\d]/g, '')}`}
                        className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg font-manrope"
                      >
                        {getContent(globalSettings, 'phone_toll_free', '1-800-555-1000')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <MapPin className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey font-clash">
                        {getContent(contactInfoContent, 'address_section_title', 'Visit Us')}
                      </h3>
                      <div 
                        className="text-face-grey/60 leading-relaxed font-manrope"
                        dangerouslySetInnerHTML={{
                          __html: getContent(globalSettings, 'full_address', 
                            'FACE Awards Global Headquarters<br>3120 Southwest freeway 1st floor<br>2003 Houston TX 77098<br>United States',
                            { stripHtml: false }
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
                      <h3 className="font-bold text-xl mb-2 text-face-grey font-clash">
                        {getContent(contactInfoContent, 'office_hours_section_title', 'Office Hours')}
                      </h3>
                      <div 
                        className="text-face-grey/60 leading-relaxed font-manrope"
                        dangerouslySetInnerHTML={{
                          __html: getContent(globalSettings, 'office_hours', 
                            'Monday - Friday: 9:00 AM - 5:00 PM (EST)<br>Saturday & Sunday: Closed',
                            { stripHtml: false }
                          )
                        }}
                      />
                      <p className="text-face-grey/60 mt-3 font-manrope">
                        {getContent(contactInfoContent, 'response_time_label', 'Response Time:')} {getContent(globalSettings, 'response_time', 'Within 24-48 business hours')}
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
              className="text-4xl font-clash font-bold mb-12 text-center text-face-grey"
              dangerouslySetInnerHTML={{
                __html: getContent(mapContent, 'title', 'Our <span class="text-face-sky-blue">Location</span>')
              }}
            />
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-face-white">
              <iframe 
                src={getContent(globalSettings, 'google_maps_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1653486359204!5m2!1sen!2sca')}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="FACE Awards Global Headquarters Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ CTA Section */}
      <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-clash font-bold mb-8 text-face-white">
              {getContent(faqContent, 'title', 'Still Have Questions?')}
            </h2>
            <p className="text-xl mb-12 text-face-white/90 leading-relaxed font-manrope">
              {getContent(faqContent, 'subtitle', 'Check out our award process or explore our categories for more information about the FACE Awards.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => {
                  navigate('/award-process');
                  handleScrollToTop();
                }}
                className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white border-4 border-face-white hover:border-face-white shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 font-manrope"
              >
                {getContent(faqContent, 'primary_button_text', 'View Award Process')}
              </Button>
              <Button
                onClick={() => {
                  navigate('/categories');
                  handleScrollToTop();
                }}
                variant="outline"
                className="border-4 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 font-manrope"
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