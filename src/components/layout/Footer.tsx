import { Link } from 'react-router-dom';
import { Award, Mail, MapPin, Users, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <footer className="bg-gradient-to-br from-face-grey via-face-grey-light to-face-grey-dark text-face-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col items-start space-y-4">
              {/* Updated brand logo area */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                  alt="FACE Awards Logo" 
                  className="h-16 w-auto"
                />
               
              </div>
            </div>
            <p className="text-face-white/90 leading-relaxed max-w-md font-manrope">
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
                  className="w-12 h-12 bg-face-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-face-white hover:bg-face-sky-blue hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-6 font-clash">
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
                    className="text-face-white/80 hover:text-face-sky-blue-light transition-colors duration-300 font-medium hover:translate-x-2 inline-block transform transition-transform font-manrope" 
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
            <h4 className="text-xl font-bold mb-6 font-clash">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-face-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-face-white" />
                </div>
                <span className="text-face-white/90 leading-relaxed font-manrope">
                  Global Headquarters<br />
                  123 Recognition Avenue<br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-face-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-face-white" />
                </div>
                <a 
                  href="mailto:info@faceawards.org" 
                  className="text-face-white/90 hover:text-face-sky-blue-light transition-colors duration-300 font-medium font-manrope"
                >
                  info@faceawards.org
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-face-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-face-white" />
                </div>
                <span className="text-face-white/90 font-manrope">
                  Join our global network of FACE honorees
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-face-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-face-white/70 text-center md:text-left font-manrope">
              © {currentYear} Outstanding FACE Global Recognition Awards. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-face-sky-blue" />
              <span className="text-face-white/70 font-manrope">Excellence Recognized Globally</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;