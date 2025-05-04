
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Users, Star, Trophy, User, Book, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-face-navy to-face-blue overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-block mb-6">
              <Award className="h-20 w-20 text-face-gold animate-bounce-slow" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              About the <span className="text-face-gold">FACE Awards</span>
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Celebrating Focus, Achievement, Courage, and Excellence across the globe since 2010.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-face-gold hover:bg-yellow-500 text-face-blue font-medium">
                <Link to="/award-process">Our Award Process</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                <Link to="/nominees">View Current Nominees</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our <span className="text-face-blue">Story</span></h2>
              <p className="text-lg text-gray-600">The journey of recognizing excellence across borders and industries</p>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                The Outstanding FACE Global Recognition Awards was established in 2010 by Mr. Thompson Alade, 
                a seasoned leadership and technology management expert with a passion for celebrating excellence 
                in all its forms. After witnessing remarkable achievements go unrecognized across various sectors 
                and regions, he founded the FACE Awards to create a truly global platform for acknowledging outstanding 
                contributions and impact.
              </p>
              
              <p>
                What began as a small initiative has grown into an internationally recognized awards program that 
                has honored over 240 recipients from 50 countries across 12 diverse categories. The name "FACE" 
                represents the core values we seek to celebrate: Focus, Achievement, Courage, and Excellence.
              </p>
              
              <p>
                Unlike many traditional awards programs that are limited by geography or industry, the FACE Awards 
                maintains a uniquely global and democratic approach. We believe that excellence can be found everywhere—from 
                bustling urban centers to remote rural communities, from established corporations to grassroots initiatives.
              </p>
              
              <p>
                Our nomination and selection process ensures that recognition comes directly from those who experience 
                the impact of our nominees' work. Through this people-centered approach, we've discovered and celebrated 
                remarkable individuals and organizations that might otherwise have remained in the shadows, bringing their 
                inspiring stories to a global audience.
              </p>
              
              <div className="my-8 grid sm:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="mb-4 text-face-gold">
                    <ShieldCheck className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Our Mission</h3>
                  <p className="text-gray-700">
                    To discover, celebrate, and promote outstanding examples of Focus, Achievement, Courage, 
                    and Excellence across all sectors and regions of the world, inspiring a global culture of 
                    excellence and positive impact.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="mb-4 text-face-gold">
                    <Star className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Our Vision</h3>
                  <p className="text-gray-700">
                    A world where exceptional contributions to human progress are recognized regardless of 
                    geography, background, or resources—where excellence is celebrated, shared, and inspires 
                    others to create positive change.
                  </p>
                </div>
              </div>
              
              <p>
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Success <span className="text-face-burgundy">Stories</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how FACE Award recognition has amplified impact and opened new opportunities for our recipients
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Success Story 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
                  alt="Success Story" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2 text-face-blue">EcoTech Solutions</h3>
                <p className="text-gray-600 text-sm mb-4">Technology Innovation Award, 2022</p>
                <p className="text-gray-700 mb-4">
                  After winning the FACE Award, this small sustainability startup secured $2 million in funding 
                  and expanded their water purification technology to 5 new countries, impacting over 100,000 lives.
                </p>
                <Link to="/impact-stories" className="text-face-burgundy font-medium hover:underline inline-flex items-center">
                  Read their story <Star className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Success Story 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e" 
                  alt="Success Story" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2 text-face-blue">Dr. Kwame Nkosi</h3>
                <p className="text-gray-600 text-sm mb-4">Humanitarian Impact Award, 2023</p>
                <p className="text-gray-700 mb-4">
                  Recognition from FACE Awards helped Dr. Nkosi's medical outreach program gain international attention, 
                  leading to partnerships with 3 major health organizations and expanded services to 12 remote communities.
                </p>
                <Link to="/impact-stories" className="text-face-burgundy font-medium hover:underline inline-flex items-center">
                  Read their story <Star className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Success Story 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                  alt="Success Story" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2 text-face-blue">Global Heritage Foundation</h3>
                <p className="text-gray-600 text-sm mb-4">Cultural Excellence Award, 2023</p>
                <p className="text-gray-700 mb-4">
                  Following their FACE Award win, this foundation's cultural preservation project received government 
                  support in 3 countries and established an international mentorship program reaching 500 young cultural ambassadors.
                </p>
                <Link to="/impact-stories" className="text-face-burgundy font-medium hover:underline inline-flex items-center">
                  Read their story <Star className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="bg-face-burgundy hover:bg-red-800">
              <Link to="/impact-stories">View All Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our <span className="text-face-blue">Team</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the diverse international team that makes the FACE Awards possible
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Founder */}
            <div className="bg-gray-50 rounded-lg overflow-hidden text-center group hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-face-blue">Thompson Alade</h3>
                <p className="text-sm text-gray-600 mb-2">Founder & Chairman</p>
                <p className="text-sm text-gray-700">
                  Leadership expert with 20+ years experience in tech management and global initiatives.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden text-center group hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-face-blue">Dr. Elena Marquez</h3>
                <p className="text-sm text-gray-600 mb-2">Global Partnerships Director</p>
                <p className="text-sm text-gray-700">
                  International relations specialist connecting FACE Awards across 4 continents.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden text-center group hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-face-blue">Jamal Ibrahim</h3>
                <p className="text-sm text-gray-600 mb-2">Awards Evaluation Lead</p>
                <p className="text-sm text-gray-700">
                  Former academic with expertise in developing objective evaluation frameworks across cultures.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden text-center group hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-face-blue">Sarah Okonjo</h3>
                <p className="text-sm text-gray-600 mb-2">Community Engagement Manager</p>
                <p className="text-sm text-gray-700">
                  Social media expert connecting nominees and winners in a global community of excellence.
                </p>
              </div>
            </div>
          </div>
          
          {/* Advisory Board */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-center mb-8">International Advisory Board</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* First row */}
              <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80" 
                    alt="Advisor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-blue">Dr. Cheng Wei</h4>
                  <p className="text-sm text-gray-600">Asia-Pacific Region</p>
                  <p className="text-xs text-gray-700 mt-1">Technology Innovation Expert</p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80" 
                    alt="Advisor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-blue">Amara Diallo</h4>
                  <p className="text-sm text-gray-600">Africa Region</p>
                  <p className="text-xs text-gray-700 mt-1">Sustainable Development Specialist</p>
                </div>
              </div>
              {/* Second row */}
              <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" 
                    alt="Advisor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-blue">Carlos Mendoza</h4>
                  <p className="text-sm text-gray-600">Americas Region</p>
                  <p className="text-xs text-gray-700 mt-1">Business & Leadership Expert</p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" 
                    alt="Advisor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-face-blue">Dr. Anna Schmidt</h4>
                  <p className="text-sm text-gray-600">Europe Region</p>
                  <p className="text-xs text-gray-700 mt-1">Education & Cultural Affairs Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-face-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join the FACE Awards Community</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Be part of a global network celebrating excellence and making a positive impact across the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-face-gold hover:bg-yellow-500 text-face-blue font-medium">
              <Link to="/nominees">Explore Current Nominees</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/categories">View Award Categories</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
