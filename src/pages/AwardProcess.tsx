import { ArrowRight, Calendar, Check, Flag, Medal, Share2, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const AwardProcess = () => {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1561489401-fc2876ced162')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-face-white rounded-full mb-8 shadow-2xl">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-4 text-face-white">The Award Process</h1>
            <p className="text-xl text-face-white/90 font-manrope">
              From social media nomination to the final announcement, discover the journey of our FACE Award nominees.
            </p>
          </div>
        </div>
      </section>
      
      {/* Process timeline */}
      <section className="py-16 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-face-sky-blue/20 transform -translate-x-1/2"></div>
              
              {/* Step 1: Nomination */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-clash font-bold mb-3 text-face-sky-blue">Social Media Nomination</h3>
                    <p className="text-face-grey/80 mb-4 font-manrope">
                      Candidates are nominated through social media platforms using our campaign hashtags. 
                      We track mentions, shares, and engagement to identify potential nominees.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-face-sky-blue/10 p-3 rounded-lg border border-face-sky-blue/20">
                      <span className="text-face-sky-blue font-medium font-manrope">#FACEAwards</span>
                      <span className="text-face-sky-blue font-medium font-manrope">#FACEImpact</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-face-sky-blue rounded-full p-4 shadow-lg relative z-10 hover:scale-110 transition-transform duration-300">
                      <Share2 className="h-8 w-8 text-face-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Social Media Polls */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2">
                    <h3 className="text-2xl font-clash font-bold mb-3 text-face-sky-blue">Social Media Polls</h3>
                    <p className="text-face-grey/80 mb-4 font-manrope">
                      We conduct preliminary polls on our social media channels to gauge public interest 
                      and support for potential nominees. This helps us identify trending candidates.
                    </p>
                    <div className="bg-face-white border border-face-sky-blue/20 rounded-lg p-4 shadow-sm">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-face-grey font-manrope">Candidate A</span>
                            <span className="text-face-sky-blue font-medium font-manrope">45%</span>
                          </div>
                          <Progress value={45} className="h-2 bg-face-sky-blue/10" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-face-grey font-manrope">Candidate B</span>
                            <span className="text-face-sky-blue font-medium font-manrope">55%</span>
                          </div>
                          <Progress value={55} className="h-2 bg-face-sky-blue/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 mb-4 md:mb-0">
                    <div className="bg-face-sky-blue rounded-full p-4 shadow-lg relative z-10 hover:scale-110 transition-transform duration-300">
                      <Users className="h-8 w-8 text-face-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3: Internal Screening */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-clash font-bold mb-3 text-face-sky-blue">Internal Screening</h3>
                    <p className="text-face-grey/80 mb-4 font-manrope">
                      Our panel of experts reviews each potential nominee. We verify their credentials, 
                      assess their impact in their category, and ensure they meet our criteria for excellence.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-end">
                        <span className="mr-2 text-face-grey font-manrope">Verify credentials</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </li>
                      <li className="flex items-center justify-end">
                        <span className="mr-2 text-face-grey font-manrope">Assess category fit</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </li>
                      <li className="flex items-center justify-end">
                        <span className="mr-2 text-face-grey font-manrope">Evaluate impact</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-face-sky-blue rounded-full p-4 shadow-lg relative z-10 hover:scale-110 transition-transform duration-300">
                      <Flag className="h-8 w-8 text-face-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4: Shortlisting */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2">
                    <h3 className="text-2xl font-clash font-bold mb-3 text-face-sky-blue">Nominee Shortlisting</h3>
                    <p className="text-face-grey/80 mb-4 font-manrope">
                      The top candidates who pass our internal screening are officially shortlisted. 
                      Their profiles are prepared for the public voting phase.
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-16 bg-face-sky-blue/10 rounded-lg flex items-center justify-center border border-face-sky-blue/20 hover:bg-face-sky-blue/20 transition-colors">
                          <span className="text-sm font-medium text-face-sky-blue font-manrope">Nominee {i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 mb-4 md:mb-0">
                    <div className="bg-face-sky-blue rounded-full p-4 shadow-lg relative z-10 hover:scale-110 transition-transform duration-300">
                      <Medal className="h-8 w-8 text-face-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 5: Public Voting */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-clash font-bold mb-3 text-face-sky-blue">Public Voting</h3>
                    <p className="text-face-grey/80 mb-4 font-manrope">
                      Shortlisted nominees are presented on our platform for public voting. 
                      The voting period typically lasts for 30 days, during which supporters can cast their votes.
                    </p>
                    <div className="bg-face-sky-blue/10 p-4 rounded-lg inline-block border border-face-sky-blue/20">
                      <div className="text-center">
                        <Calendar className="h-6 w-6 text-face-sky-blue mx-auto mb-2" />
                        <div className="text-sm text-face-sky-blue font-medium font-manrope">30 Days Voting Period</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-face-sky-blue rounded-full p-4 shadow-lg relative z-10 hover:scale-110 transition-transform duration-300">
                      <Check className="h-8 w-8 text-face-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 6: Winner Announcement */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2">
                    <h3 className="text-2xl font-clash font-bold mb-3 text-face-sky-blue">Winner Announcement</h3>
                    <p className="text-face-grey/80 mb-4 font-manrope">
                      After the voting period ends, winners are announced during our prestigious award ceremony. 
                      Winners receive recognition, a digital certificate, and the iconic FACE Award trophy.
                    </p>
                    <div className="bg-face-gold/20 border border-face-gold p-4 rounded-lg text-center">
                      <Trophy className="h-12 w-12 text-face-gold mx-auto mb-3" />
                      <div className="text-face-sky-blue font-clash font-bold">FACE Award Winner 2024</div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 mb-4 md:mb-0">
                    <div className="bg-face-sky-blue rounded-full p-4 shadow-lg relative z-10 hover:scale-110 transition-transform duration-300">
                      <Trophy className="h-8 w-8 text-face-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-24 text-center">
              <h3 className="text-2xl font-clash font-bold mb-4 text-face-grey">Ready to be part of our journey?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Button 
                  onClick={() => {
                    navigate('/nominees');
                    handleScrollToTop();
                  }}
                  className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center font-manrope"
                >
                  View Current Nominees <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/registration');
                    handleScrollToTop();
                  }}
                  variant="outline"
                  className="border-face-sky-blue text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center font-manrope"
                >
                  Register for Next Event <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AwardProcess;