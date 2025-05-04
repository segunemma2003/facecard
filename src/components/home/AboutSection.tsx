
import { Award, CheckCircle, Globe, Users, Trophy, Calendar, Handshake } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-3">
            <Award className="h-10 w-10 text-face-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            About <span className="text-face-blue">FACE Awards</span>
          </h2>
          <p className="text-lg text-gray-600">
            The Outstanding FACE Global Recognition Awards is an international platform created by Mr. Thompson Alade, 
            a seasoned and professional leadership and tech management expert, to celebrate and honor individuals, 
            organizations, and institutions making remarkable contributions across diverse sectors worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-serif font-semibold mb-3 text-face-blue">FACE Represents</h3>
              <div className="space-y-4 ml-2">
                <div className="flex gap-3">
                  <div className="mt-1 text-face-gold">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold">F</span>ocus - The unwavering commitment to vision and purpose
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-face-gold">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold">A</span>chievement - Significant accomplishments and measurable success
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-face-gold">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold">C</span>ourage - The boldness to innovate and overcome challenges
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-face-gold">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold">E</span>xcellence - The pursuit of the highest standards in every endeavor
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-serif font-semibold mb-3 text-face-burgundy">Our Approach</h3>
              <ul className="space-y-3 ml-2">
                <li className="flex gap-3">
                  <div className="mt-1 text-face-burgundy">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span><b>Global Reach, Local Impact</b> - Recognizing excellence worldwide, from local heroes to global brands making waves across continents</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-burgundy">
                    <Users className="h-5 w-5" />
                  </div>
                  <span><b>People-Centered Nomination</b> - Open, inclusive polling systems that ensure recognition comes directly from those who experience the impact</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-burgundy">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span><b>Personal Award Delivery</b> - Beautifully crafted trophies and plaques delivered securely or presented personally to honorees worldwide</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-burgundy">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span><b>End-of-Year Ceremony</b> - Optional annual grand recognition event for networking and celebration in an atmosphere of elegance</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-burgundy">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <span><b>Diverse International Collaboration</b> - A multicultural team of professionals ensuring our work remains relevant and inclusive globally</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-face-gold/20 rounded-full"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-face-burgundy/20 rounded-full"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl animate-scale-up">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="FACE Awards Event" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white text-lg font-serif">Celebrating excellence across borders and industries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
