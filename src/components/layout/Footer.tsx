
import { Link } from 'react-router-dom';
import { Award, Mail, MapPin, Users, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <footer className="bg-gradient-to-br from-brand-grey via-brand-grey to-brand-blue-dark text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col items-start space-y-4">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-20 w-auto"
              />
              <div>
                <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Clash Display' }}>
                  FACE Awards
                </h3>
                <p className="text-lg text-brand-blue-light font-medium">
                  Focus • Achievement • Courage • Excellence
                </p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed max-w-md">
              Celebrating outstanding individuals and organizations making meaningful impact across the globe. 
              Recognizing excellence in innovation, leadership, and social contribution.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-brand-blue hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-6" style={{ fontFamily: 'Clash Display' }}>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { title: 'Home', path: '/' },
                { title: 'Current Nominees', path: '/nominees' },
                { title: 'Past Winners', path: '/past-winners' },
                { title: 'Gallery', path: '/gallery' },
                { title: 'Registration', path: '/registration' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-brand-blue-light transition-colors duration-300 font-medium hover:translate-x-2 inline-block transform transition-transform" 
                    onClick={() => handleNavigation(link.path)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-6" style={{ fontFamily: 'Clash Display' }}>
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-white/90 leading-relaxed">
                  Global Headquarters<br />
                  123 Recognition Avenue<br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <a 
                  href="mailto:info@faceawards.org" 
                  className="text-white/90 hover:text-brand-blue-light transition-colors duration-300 font-medium"
                >
                  info@faceawards.org
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-white/90">
                  Join our global network of FACE honorees
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-center md:text-left">
              © {currentYear} Outstanding FACE Global Recognition Awards. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-brand-blue" />
              <span className="text-white/70">Excellence Recognized Globally</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
