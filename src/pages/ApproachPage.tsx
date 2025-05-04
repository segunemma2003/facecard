
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Globe, Users, Trophy, Calendar, Handshake, Award } from 'lucide-react';

const ApproachPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-16 bg-gradient-to-b from-face-navy/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Award className="h-16 w-16 text-face-gold mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Our Award <span className="text-face-blue">Approach</span>
            </h1>
            <p className="text-xl text-gray-600">
              A unique process designed to recognize true excellence and impact across the globe.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <p className="text-lg leading-relaxed text-gray-700">
                The FACE Awards stands apart through its commitment to fairness, inclusivity, and global 
                representation. Our approach ensures that recognition is based on genuine impact and 
                excellence, not influence or connections. From nomination to final celebration, each 
                step in our process is designed to honor those who truly embody the principles of 
                Focus, Achievement, Courage, and Excellence.
              </p>
            </div>
            
            {/* Process Timeline */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-face-gold/50"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-face-gold text-face-blue rounded-full p-3 shadow-lg">
                    <Globe className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                  <h3 className="text-2xl font-serif font-bold text-face-blue mb-4">1. Global Reach, Local Impact</h3>
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e" 
                      alt="Global Impact" 
                      className="w-full h-64 object-cover rounded-lg mb-4" 
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    FACE is not limited by geography. We are committed to recognizing outstanding excellence 
                    wherever it exists — from local heroes in small communities to global brands making 
                    waves across continents.
                  </p>
                  <p className="text-gray-700">
                    Our nomination process extends across borders, languages, and cultures, ensuring 
                    that all forms of excellence have the opportunity to be recognized regardless of location.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-face-gold text-face-blue rounded-full p-3 shadow-lg">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                  <h3 className="text-2xl font-serif font-bold text-face-blue mb-4">2. People-Centered Nomination Process</h3>
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                      alt="Nomination Process" 
                      className="w-full h-64 object-cover rounded-lg mb-4" 
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Nominees are selected through open, inclusive polling systems. For example, if we are 
                    spotlighting the telecom sector in Nigeria, the public will vote on individuals or 
                    companies they believe are making the most impact.
                  </p>
                  <p className="text-gray-700">
                    This democratic model ensures that recognition comes from the people who experience 
                    the impact directly. Our internal screening team then verifies that nominees meet 
                    the category criteria before advancing to the final voting round.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-face-gold text-face-blue rounded-full p-3 shadow-lg">
                    <Trophy className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                  <h3 className="text-2xl font-serif font-bold text-face-blue mb-4">3. Award Delivery – Personal and Global</h3>
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
                      alt="Award Delivery" 
                      className="w-full h-64 object-cover rounded-lg mb-4" 
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Once nominees are selected and voting concludes, winners receive a beautifully crafted 
                    award trophy or plaque, which is sent via secure delivery, courier, or personally 
                    presented depending on the location and circumstance.
                  </p>
                  <p className="text-gray-700">
                    This approach makes sure that every honoree, regardless of their location, receives 
                    the recognition they deserve. Each award is custom-crafted to reflect the prestige 
                    and honor associated with the FACE Awards.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-face-gold text-face-blue rounded-full p-3 shadow-lg">
                    <Calendar className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                  <h3 className="text-2xl font-serif font-bold text-face-blue mb-4">4. End-of-Year Global Recognition Ceremony</h3>
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                      alt="Recognition Ceremony" 
                      className="w-full h-64 object-cover rounded-lg mb-4" 
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    While FACE primarily delivers awards globally throughout the year, we may also host an 
                    annual end-of-year grand recognition ceremony where awardees from around the world can 
                    gather, network, and be celebrated in an atmosphere of elegance and inspiration.
                  </p>
                  <p className="text-gray-700">
                    This optional event brings together diverse leaders and innovators, creating unique 
                    opportunities for collaboration and connection among those who exemplify excellence 
                    in their respective fields.
                  </p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-face-gold text-face-blue rounded-full p-3 shadow-lg">
                    <Handshake className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                  <h3 className="text-2xl font-serif font-bold text-face-blue mb-4">5. Diverse International Collaboration</h3>
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1466442929976-97f336a657be" 
                      alt="International Collaboration" 
                      className="w-full h-64 object-cover rounded-lg mb-4" 
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    FACE is built on strong global partnerships. We are assembling a multicultural, 
                    multinational team of professionals, advisors, and collaborators to ensure that our 
                    work remains relevant, inclusive, and representative of diverse voices worldwide.
                  </p>
                  <p className="text-gray-700">
                    This collaborative approach allows us to maintain cultural sensitivity while ensuring 
                    that our recognition standards remain consistently high across all regions and sectors 
                    we serve.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12 mb-8">
              <h3 className="text-2xl font-serif font-bold mb-4">Be Part of the FACE Awards Journey</h3>
              <p className="text-lg text-gray-600 mb-6">
                Whether as a nominee, voter, or supporter, you can contribute to recognizing excellence around the world.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href="/nominees" className="bg-face-blue hover:bg-face-navy text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  View Current Nominees
                </a>
                <a href="/categories" className="bg-face-gold hover:bg-yellow-500 text-face-blue font-medium py-3 px-6 rounded-lg transition-colors">
                  Explore Award Categories
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ApproachPage;
