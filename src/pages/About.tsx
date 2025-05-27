import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Users, Star, Trophy, User, Book, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero section matching gallery page design with better image */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        {/* Background hero image with stronger overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="FACE Awards ceremony background"
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
              About the <span className="text-white">FACE Awards</span>
            </h1>
            
            {/* Subtitle with stronger visibility */}
            <p className="text-2xl text-white mb-8 font-semibold">
              Celebrating Focus, Achievement, Courage, and Excellence across the globe since 2010
            </p>
            
            {/* Stats with stronger contrast */}
            <div className="flex flex-wrap justify-center gap-6 text-lg text-white">
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Trophy className="h-6 w-6 text-white" />
                <span className="font-bold">240+ Recipients</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Users className="h-6 w-6 text-white" />
                <span className="font-bold">50+ Countries</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-white/60">
                <Star className="h-6 w-6 text-white" />
                <span className="font-bold">12+ Categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our <span className="text-face-sky-blue">Story</span></h2>
              <p className="text-lg text-gray-600">The journey of recognizing excellence across borders and industries</p>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                The Outstanding FACE Global Recognition Awards was established in 2010 by Mr. Thompson Alade, 
                a seasoned leadership and technology management expert with a passion for celebrating excellence 
                in all its forms. After witnessing remarkable achievements go unrecognized across various sectors 
                and regions, he founded the FACE Awards to create a truly global platform for acknowledging outstanding 
                contributions and impact.
              </p>
              
              <p className="text-lg leading-relaxed">
                What began as a small initiative has grown into an internationally recognized awards program that 
                has honored over 240 recipients from 50 countries across 12 diverse categories. The name "FACE" 
                represents the core values we seek to celebrate: Focus, Achievement, Courage, and Excellence.
              </p>
              
              <p className="text-lg leading-relaxed">
                Unlike many traditional awards programs that are limited by geography or industry, the FACE Awards 
                maintains a uniquely global and democratic approach. We believe that excellence can be found everywhere—from 
                bustling urban centers to remote rural communities, from established corporations to grassroots initiatives.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our nomination and selection process ensures that recognition comes directly from those who experience 
                the impact of our nominees' work. Through this people-centered approach, we've discovered and celebrated 
                remarkable individuals and organizations that might otherwise have remained in the shadows, bringing their 
                inspiring stories to a global audience.
              </p>
              
              <div className="my-12 grid sm:grid-cols-2 gap-8">
                <div className="bg-face-sky-blue/5 border border-face-sky-blue/20 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6 text-face-sky-blue">
                    <ShieldCheck className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-face-grey">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To discover, celebrate, and promote outstanding examples of Focus, Achievement, Courage, 
                    and Excellence across all sectors and regions of the world, inspiring a global culture of 
                    excellence and positive impact.
                  </p>
                </div>
                
                <div className="bg-face-sky-blue/5 border border-face-sky-blue/20 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6 text-face-sky-blue">
                    <Star className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-face-grey">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A world where exceptional contributions to human progress are recognized regardless of 
                    geography, background, or resources—where excellence is celebrated, shared, and inspires 
                    others to create positive change.
                  </p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed">
                As we continue to grow, we remain committed to our founding principles of inclusivity, 
                fairness, and global representation. Every year, we expand our reach to new regions and 
                sectors, discover inspiring stories of impact, and bring together a diverse community of 
                excellence from around the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Success <span className="text-face-sky-blue">Stories</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how FACE Award recognition has amplified impact and opened new opportunities for our recipients
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Success Story 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" 
                  alt="EcoTech Solutions Success Story" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2 text-face-sky-blue">EcoTech Solutions</h3>
                <p className="text-gray-600 text-sm mb-4 font-medium">Technology Innovation Award, 2022</p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  After winning the FACE Award, this small sustainability startup secured $2 million in funding 
                  and expanded their water purification technology to 5 new countries, impacting over 100,000 lives.
                </p>
                <button className="text-face-sky-blue font-medium hover:underline inline-flex items-center transition-colors">
                  Read their story <Star className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            {/* Success Story 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" 
                  alt="Dr. Kwame Nkosi Success Story" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2 text-face-sky-blue">Dr. Kwame Nkosi</h3>
                <p className="text-gray-600 text-sm mb-4 font-medium">Humanitarian Impact Award, 2023</p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Recognition from FACE Awards helped Dr. Nkosi's medical outreach program gain international attention, 
                  leading to partnerships with 3 major health organizations and expanded services to 12 remote communities.
                </p>
                <button className="text-face-sky-blue font-medium hover:underline inline-flex items-center transition-colors">
                  Read their story <Star className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            {/* Success Story 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" 
                  alt="Global Heritage Foundation Success Story" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2 text-face-sky-blue">Global Heritage Foundation</h3>
                <p className="text-gray-600 text-sm mb-4 font-medium">Cultural Excellence Award, 2023</p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Following their FACE Award win, this foundation's cultural preservation project received government 
                  support in 3 countries and established an international mentorship program reaching 500 young cultural ambassadors.
                </p>
                <button className="text-face-sky-blue font-medium hover:underline inline-flex items-center transition-colors">
                  Read their story <Star className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg">
              View All Success Stories
            </button>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our <span className="text-face-sky-blue">Team</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the diverse international team that makes the FACE Awards possible
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Founder */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&q=80" 
                  alt="Thompson Alade" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-face-sky-blue text-lg">Thompson Alade</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">Founder & Chairman</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Leadership expert with 20+ years experience in tech management and global initiatives.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                  alt="Dr. Elena Marquez" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-face-sky-blue text-lg">Dr. Elena Marquez</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">Global Partnerships Director</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  International relations specialist connecting FACE Awards across 4 continents.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
                  alt="Jamal Ibrahim" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-face-sky-blue text-lg">Jamal Ibrahim</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">Awards Evaluation Lead</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Former academic with expertise in developing objective evaluation frameworks across cultures.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" 
                  alt="Sarah Okonjo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-face-sky-blue text-lg">Sarah Okonjo</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">Community Engagement Manager</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Social media expert connecting nominees and winners in a global community of excellence.
                </p>
              </div>
            </div>
          </div>
          
          {/* Advisory Board */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-center mb-10 text-face-grey">International Advisory Board</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* First row */}
              <div className="flex gap-4 items-center bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80" 
                    alt="Dr. Cheng Wei" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-sky-blue">Dr. Cheng Wei</h4>
                  <p className="text-sm text-gray-600 font-medium">Asia-Pacific Region</p>
                  <p className="text-xs text-gray-700 mt-1">Technology Innovation Expert</p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80" 
                    alt="Amara Diallo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-sky-blue">Amara Diallo</h4>
                  <p className="text-sm text-gray-600 font-medium">Africa Region</p>
                  <p className="text-xs text-gray-700 mt-1">Sustainable Development Specialist</p>
                </div>
              </div>
              {/* Second row */}
              <div className="flex gap-4 items-center bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" 
                    alt="Carlos Mendoza" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-sky-blue">Carlos Mendoza</h4>
                  <p className="text-sm text-gray-600 font-medium">Americas Region</p>
                  <p className="text-xs text-gray-700 mt-1">Business & Leadership Expert</p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" 
                    alt="Dr. Anna Schmidt" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-sky-blue">Dr. Anna Schmidt</h4>
                  <p className="text-sm text-gray-600 font-medium">Europe Region</p>
                  <p className="text-xs text-gray-700 mt-1">Education & Cultural Affairs Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-white">Join the FACE Awards Community</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 text-white/90 leading-relaxed">
            Be part of a global network celebrating excellence and making a positive impact across the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300">
              Explore Current Nominees
            </button>
            <button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300">
              View Award Categories
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;