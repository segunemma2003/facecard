import { Award, CheckCircle, Globe, Users, Trophy, Calendar, Handshake } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="face-section bg-face-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-3">
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-10 w-auto animate-pulse"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-6 text-face-grey">
            About <span className="text-face-sky-blue">FACE Awards</span>
          </h2>
          <p className="text-lg text-face-grey/80 font-manrope">
            The Outstanding FACE Global Recognition Awards is an international platform created by Mr. Thompson Alade, 
            a seasoned and professional leadership and tech management expert, to celebrate and honor individuals, 
            organizations, and institutions making remarkable contributions across diverse sectors worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="face-card p-6 shadow-sm hover:shadow-md transition-shadow border border-face-sky-blue/20">
              <h3 className="text-xl font-clash font-semibold mb-3 text-face-sky-blue">FACE Represents</h3>
              <div className="space-y-4 ml-2">
                <div className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="text-face-grey/80 font-manrope">
                    <span className="font-semibold text-face-grey">F</span>ocus - The unwavering commitment to vision and purpose
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="text-face-grey/80 font-manrope">
                    <span className="font-semibold text-face-grey">A</span>chievement - Significant accomplishments and measurable success
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="text-face-grey/80 font-manrope">
                    <span className="font-semibold text-face-grey">C</span>ourage - The boldness to innovate and overcome challenges
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="text-face-grey/80 font-manrope">
                    <span className="font-semibold text-face-grey">E</span>xcellence - The pursuit of the highest standards in every endeavor
                  </div>
                </div>
              </div>
            </div>

            <div className="face-card p-6 shadow-sm hover:shadow-md transition-shadow border border-face-sky-blue/20">
              <h3 className="text-xl font-clash font-semibold mb-3 text-face-grey">Our Approach</h3>
              <ul className="space-y-3 ml-2">
                <li className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span className="text-face-grey/80 font-manrope"><b className="text-face-grey">Global Reach, Local Impact</b> - Recognizing excellence worldwide, from local heroes to global brands making waves across continents</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="text-face-grey/80 font-manrope"><b className="text-face-grey">People-Centered Nomination</b> - Open, inclusive polling systems that ensure recognition comes directly from those who experience the impact</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="text-face-grey/80 font-manrope"><b className="text-face-grey">Personal Award Delivery</b> - Beautifully crafted trophies and plaques delivered securely or presented personally to honorees worldwide</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-face-grey/80 font-manrope"><b className="text-face-grey">End-of-Year Ceremony</b> - Optional annual grand recognition event for networking and celebration in an atmosphere of elegance</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-face-sky-blue">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <span className="text-face-grey/80 font-manrope"><b className="text-face-grey">Diverse International Collaboration</b> - A multicultural team of professionals ensuring our work remains relevant and inclusive globally</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-face-sky-blue/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-face-grey/20 rounded-full animate-float"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl animate-scale-up face-card-hover">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" 
                alt="FACE Awards Ceremony" 
                className="w-full h-full object-cover"
              />
              <div className="face-overlay flex items-end">
                <div className="p-6">
                  <p className="text-face-white text-lg font-clash">Celebrating excellence across borders and industries</p>
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