
import { ArrowRight, Calendar, Check, Flag, Medal, Share2, Trophy, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AwardProcess = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-20 bg-face-blue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1561489401-fc2876ced162')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Trophy className="h-16 w-16 text-face-gold mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">The Award Process</h1>
            <p className="text-xl text-gray-200">
              From social media nomination to the final announcement, discover the journey of our FACE Award nominees.
            </p>
          </div>
        </div>
      </section>
      
      {/* Process timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              {/* Step 1: Nomination */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-face-blue">Social Media Nomination</h3>
                    <p className="text-gray-700 mb-4">
                      Candidates are nominated through social media platforms using our campaign hashtags. 
                      We track mentions, shares, and engagement to identify potential nominees.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                      <span className="text-face-gold font-medium">#FACEAwards</span>
                      <span className="text-face-gold font-medium">#FACEImpact</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-face-blue rounded-full p-4 shadow-lg relative z-10">
                      <Share2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Social Media Polls */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-face-blue">Social Media Polls</h3>
                    <p className="text-gray-700 mb-4">
                      We conduct preliminary polls on our social media channels to gauge public interest 
                      and support for potential nominees. This helps us identify trending candidates.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Candidate A</span>
                            <span>45%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full mt-1">
                            <div className="h-full bg-face-gold rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Candidate B</span>
                            <span>55%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full mt-1">
                            <div className="h-full bg-face-gold rounded-full" style={{ width: "55%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 mb-4 md:mb-0">
                    <div className="bg-face-blue rounded-full p-4 shadow-lg relative z-10">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3: Internal Screening */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-face-blue">Internal Screening</h3>
                    <p className="text-gray-700 mb-4">
                      Our panel of experts reviews each potential nominee. We verify their credentials, 
                      assess their impact in their category, and ensure they meet our criteria for excellence.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-end">
                        <span className="mr-2">Verify credentials</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </li>
                      <li className="flex items-center justify-end">
                        <span className="mr-2">Assess category fit</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </li>
                      <li className="flex items-center justify-end">
                        <span className="mr-2">Evaluate impact</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-face-blue rounded-full p-4 shadow-lg relative z-10">
                      <Flag className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4: Shortlisting */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-face-blue">Nominee Shortlisting</h3>
                    <p className="text-gray-700 mb-4">
                      The top candidates who pass our internal screening are officially shortlisted. 
                      Their profiles are prepared for the public voting phase.
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-500">Nominee {i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 mb-4 md:mb-0">
                    <div className="bg-face-blue rounded-full p-4 shadow-lg relative z-10">
                      <Medal className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 5: Public Voting */}
              <div className="relative mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-face-blue">Public Voting</h3>
                    <p className="text-gray-700 mb-4">
                      Shortlisted nominees are presented on our platform for public voting. 
                      The voting period typically lasts for 30 days, during which supporters can cast their votes.
                    </p>
                    <div className="bg-face-blue/10 p-4 rounded-lg inline-block">
                      <div className="text-center">
                        <Calendar className="h-6 w-6 text-face-blue mx-auto mb-2" />
                        <div className="text-sm text-face-blue font-medium">30 Days Voting Period</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="bg-face-blue rounded-full p-4 shadow-lg relative z-10">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 6: Winner Announcement */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-face-blue">Winner Announcement</h3>
                    <p className="text-gray-700 mb-4">
                      After the voting period ends, winners are announced during our prestigious award ceremony. 
                      Winners receive recognition, a digital certificate, and the iconic FACE Award trophy.
                    </p>
                    <div className="bg-face-gold/20 border border-face-gold p-4 rounded-lg text-center">
                      <Trophy className="h-12 w-12 text-face-gold mx-auto mb-3" />
                      <div className="text-face-blue font-serif font-bold">FACE Award Winner 2024</div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start md:justify-center order-1 mb-4 md:mb-0">
                    <div className="bg-face-blue rounded-full p-4 shadow-lg relative z-10">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-24 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">Ready to be part of our journey?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <a href="/nominees" className="bg-face-gold hover:bg-yellow-500 text-face-blue px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center">
                  View Current Nominees <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="/registration" className="bg-face-blue hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center">
                  Register for Next Event <ArrowRight className="ml-2 h-4 w-4" />
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

export default AwardProcess;
