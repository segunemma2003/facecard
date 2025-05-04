
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-face-navy to-face-blue overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="text-face-gold">Touch</span>
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Have questions about the FACE Awards? We're here to help you with any inquiries.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Send us a <span className="text-face-blue">Message</span></h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input id="first-name" placeholder="John" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input id="last-name" placeholder="Doe" className="w-full" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  
                  <Button type="submit" className="bg-face-blue hover:bg-blue-800 w-full flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Contact <span className="text-face-burgundy">Information</span></h2>
                <p className="text-gray-600 mb-8">
                  Our team is available to assist you with any questions regarding nominations,
                  event details, or general inquiries about the FACE Awards.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-face-blue/10 p-3">
                      <Mail className="h-6 w-6 text-face-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <p className="text-gray-600">For general inquiries:</p>
                      <a href="mailto:info@faceawards.org" className="text-face-blue hover:text-face-burgundy transition">
                        info@faceawards.org
                      </a>
                      <p className="text-gray-600 mt-2">For nominations:</p>
                      <a href="mailto:nominations@faceawards.org" className="text-face-blue hover:text-face-burgundy transition">
                        nominations@faceawards.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-face-blue/10 p-3">
                      <Phone className="h-6 w-6 text-face-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600">International:</p>
                      <a href="tel:+12345678901" className="text-face-blue hover:text-face-burgundy transition">
                        +1 (234) 567-8901
                      </a>
                      <p className="text-gray-600 mt-2">Toll Free:</p>
                      <a href="tel:+18005551000" className="text-face-blue hover:text-face-burgundy transition">
                        1-800-555-1000
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-face-blue/10 p-3">
                      <MapPin className="h-6 w-6 text-face-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        FACE Awards Global Headquarters<br />
                        123 Recognition Avenue<br />
                        Suite 456<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-face-blue/10 p-3">
                      <Clock className="h-6 w-6 text-face-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM (EST)<br />
                        Saturday & Sunday: Closed
                      </p>
                      <p className="text-gray-600 mt-2">
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our <span className="text-face-blue">Location</span></h2>
            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg">
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
      <section className="py-16 bg-gradient-to-r from-face-navy to-face-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8">
              Check out our frequently asked questions section for more information about the FACE Awards.
            </p>
            <Button asChild size="lg" className="bg-face-gold hover:bg-yellow-500 text-face-blue font-medium">
              <Link to="/award-process">View Award Process FAQs</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
