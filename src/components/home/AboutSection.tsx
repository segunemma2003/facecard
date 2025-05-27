import { Award, CheckCircle, Globe, Users, Trophy, Calendar, Handshake, Star, Sparkles, Target, Heart, Zap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-blue/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Section Header */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-2xl shadow-2xl mb-8 relative">
            <Award className="h-10 w-10 text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-brand-blue" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-brand-grey" style={{ fontFamily: 'Clash Display' }}>
            About <span className="bg-gradient-to-r from-brand-blue to-brand-blue-dark bg-clip-text text-transparent">FACE Awards</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-brand-grey/80 leading-relaxed max-w-4xl mx-auto">
            The world's most prestigious international platform, founded by visionary leader{' '}
            <span className="font-semibold text-brand-blue">Mr. Thompson Alade</span>, celebrating extraordinary individuals 
            and organizations making transformative impacts across diverse sectors globally.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            
            {/* Left Column - FACE Definition */}
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-3xl transform -rotate-1"></div>
                <div className="relative bg-white p-10 rounded-3xl shadow-2xl border border-brand-blue/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-2xl flex items-center justify-center shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-brand-grey" style={{ fontFamily: 'Clash Display' }}>
                        What FACE Represents
                      </h3>
                      <p className="text-brand-grey/60">Our core values and principles</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    {[
                      { 
                        letter: 'F', 
                        word: 'Focus', 
                        desc: 'Unwavering commitment to vision and purposeful action',
                        icon: Target,
                        gradient: 'from-blue-500 to-blue-600'
                      },
                      { 
                        letter: 'A', 
                        word: 'Achievement', 
                        desc: 'Remarkable accomplishments with measurable global impact',
                        icon: Trophy,
                        gradient: 'from-brand-blue to-brand-blue-dark'
                      },
                      { 
                        letter: 'C', 
                        word: 'Courage', 
                        desc: 'Boldness to innovate and overcome seemingly impossible challenges',
                        icon: Zap,
                        gradient: 'from-brand-blue-dark to-brand-blue'
                      },
                      { 
                        letter: 'E', 
                        word: 'Excellence', 
                        desc: 'Relentless pursuit of the highest standards in every endeavor',
                        icon: Heart,
                        gradient: 'from-brand-blue to-blue-500'
                      }
                    ].map((item, index) => (
                      <div key={index} className="group flex items-start gap-6 p-4 rounded-2xl hover:bg-brand-blue/5 transition-all duration-300">
                        <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-white font-bold text-2xl">{item.letter}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-brand-grey text-2xl" style={{ fontFamily: 'Clash Display' }}>{item.word}</h4>
                            <item.icon className="h-5 w-5 text-brand-blue opacity-60" />
                          </div>
                          <p className="text-brand-grey/70 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-blue/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-blue/15 rounded-2xl transform rotate-12"></div>
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop" 
                  alt="FACE Awards Ceremony" 
                  className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-white text-sm font-medium uppercase tracking-wider">Global Recognition</div>
                    </div>
                    <h4 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: 'Clash Display' }}>
                      Celebrating Excellence Across Continents
                    </h4>
                    <p className="text-white/90 leading-relaxed">
                      From local heroes to global innovators, we recognize transformative achievements 
                      that shape our world and inspire future generations.
                    </p>
                  </div>
                </div>
                
                {/* Floating stats */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-white/80 text-xs uppercase tracking-wider">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Approach Section */}
          <div className="relative">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-grey mb-4" style={{ fontFamily: 'Clash Display' }}>
                Our <span className="text-brand-blue">Approach</span>
              </h3>
              <p className="text-xl text-brand-grey/70 max-w-3xl mx-auto">
                Five pillars that define our commitment to recognizing authentic excellence worldwide
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: 'Global Reach, Local Impact',
                  desc: 'Discovering excellence everywhere—from bustling cities to remote villages, recognizing impact that transcends borders.'
                },
                {
                  icon: Users,
                  title: 'People-Centered Recognition',
                  desc: 'Democratic nomination process ensuring recognition comes from those who witness and experience the impact firsthand.'
                },
                {
                  icon: Trophy,
                  title: 'Premium Award Delivery',
                  desc: 'Handcrafted trophies and personalized presentations delivered globally with the dignity every honoree deserves.'
                },
                {
                  icon: Calendar,
                  title: 'Prestigious Annual Ceremony',
                  desc: 'World-class recognition events bringing together global leaders in an atmosphere of celebration and networking.'
                },
                {
                  icon: Handshake,
                  title: 'International Collaboration',
                  desc: 'Diverse global team ensuring cultural sensitivity and inclusive representation across all regions and sectors.'
                }
              ].map((approach, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                  <div className="relative bg-white p-8 rounded-3xl shadow-lg border border-brand-blue/10 hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <approach.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-brand-grey text-xl mb-4" style={{ fontFamily: 'Clash Display' }}>
                      {approach.title}
                    </h4>
                    <p className="text-brand-grey/70 leading-relaxed">
                      {approach.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;