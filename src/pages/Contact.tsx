import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Enhanced Hero Section matching gallery/about page design */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        {/* Background hero image with stronger overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Professional contact and communication background"
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
              <Mail className="h-12 w-12 text-face-sky-blue" />
            </div>
            
            {/* Main heading with stronger contrast */}
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 text-white">
              Get in <span className="text-white">Touch</span>
            </h1>
            
            {/* Subtitle with stronger visibility */}
            <p className="text-2xl text-white mb-8 font-semibold">
              Have questions about the FACE Awards? We're here to help you with any inquiries
            </p>
            
            {/* Stats with stronger contrast */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-white">
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Clock className="h-6 w-6 text-white" />
                <span className="font-bold">24-48 Hour Response</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Phone className="h-6 w-6 text-white" />
                <span className="font-bold">Global Support</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <MapPin className="h-6 w-6 text-white" />
                <span className="font-bold">Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Details Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-4xl font-serif font-bold mb-6">Send us a <span className="text-face-sky-blue">Message</span></h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input 
                        id="first-name" 
                        placeholder="John" 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input 
                        id="last-name" 
                        placeholder="Doe" 
                        className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input 
                      id="email" 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input 
                      id="subject" 
                      placeholder="How can we help you?" 
                      className="w-full px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      className="w-full min-h-[150px] px-4 py-3 border border-face-sky-blue/30 rounded-lg focus:ring-2 focus:ring-face-sky-blue focus:border-face-sky-blue transition-colors resize-vertical"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white w-full py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Send className="h-5 w-5" />
                    Send Message
                  </button>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-4xl font-serif font-bold mb-6">Contact <span className="text-face-sky-blue">Information</span></h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Our team is available to assist you with any questions regarding nominations,
                  event details, or general inquiries about the FACE Awards.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Mail className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">Email Us</h3>
                      <p className="text-gray-600 mb-1">For general inquiries:</p>
                      <a href="mailto:info@faceawards.org" className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg">
                        info@faceawards.org
                      </a>
                      <p className="text-gray-600 mt-3 mb-1">For nominations:</p>
                      <a href="mailto:nominations@faceawards.org" className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg">
                        nominations@faceawards.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Phone className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">Call Us</h3>
                      <p className="text-gray-600 mb-1">International:</p>
                      <a href="tel:+12345678901" className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg">
                        +1 (234) 567-8901
                      </a>
                      <p className="text-gray-600 mt-3 mb-1">Toll Free:</p>
                      <a href="tel:+18005551000" className="text-face-sky-blue hover:text-face-sky-blue-dark transition font-medium text-lg">
                        1-800-555-1000
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <MapPin className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">Visit Us</h3>
                      <p className="text-gray-600 leading-relaxed">
                        FACE Awards Global Headquarters<br />
                        123 Recognition Avenue<br />
                        Suite 456<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-face-sky-blue/5 rounded-2xl border border-face-sky-blue/20 hover:shadow-lg transition-shadow">
                    <div className="rounded-full bg-face-sky-blue/20 p-4">
                      <Clock className="h-8 w-8 text-face-sky-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-face-grey">Office Hours</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Monday - Friday: 9:00 AM - 5:00 PM (EST)<br />
                        Saturday & Sunday: Closed
                      </p>
                      <p className="text-gray-600 mt-3">
                        Response Time: Within 24-48 business hours
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-12 text-center">Our <span className="text-face-sky-blue">Location</span></h2>
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1653486359204!5m2!1sen!2sca" 
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-white">Still Have Questions?</h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed">
              Check out our frequently asked questions section for more information about the FACE Awards.
            </p>
            <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300">
              View Award Process FAQs
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;