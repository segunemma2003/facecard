import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Globe, Users, Trophy, Calendar, Handshake, Award, ArrowRight, CheckCircle } from 'lucide-react';

const ApproachPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      icon: Globe,
      title: "Global Reach, Local Impact",
      subtitle: "Worldwide Recognition Without Boundaries",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "FACE is not limited by geography. We are committed to recognizing outstanding excellence wherever it exists — from local heroes in small communities to global brands making waves across continents.",
      details: "Our nomination process extends across borders, languages, and cultures, ensuring that all forms of excellence have the opportunity to be recognized regardless of location.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: Users,
      title: "People-Centered Nomination Process",
      subtitle: "Democratic Recognition by the People",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "Nominees are selected through open, inclusive polling systems. For example, if we are spotlighting the telecom sector in Nigeria, the public will vote on individuals or companies they believe are making the most impact.",
      details: "This democratic model ensures that recognition comes from the people who experience the impact directly. Our internal screening team then verifies that nominees meet the category criteria before advancing to the final voting round.",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      icon: Trophy,
      title: "Award Delivery – Personal and Global",
      subtitle: "Excellence Delivered to Your Doorstep",
      image: "https://images.pexels.com/photos/8761456/pexels-photo-8761456.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "Once nominees are selected and voting concludes, winners receive a beautifully crafted award trophy or plaque, which is sent via secure delivery, courier, or personally presented depending on the location and circumstance.",
      details: "This approach makes sure that every honoree, regardless of their location, receives the recognition they deserve. Each award is custom-crafted to reflect the prestige and honor associated with the FACE Awards.",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      icon: Calendar,
      title: "End-of-Year Global Recognition Ceremony",
      subtitle: "A Grand Celebration of Excellence",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "While FACE primarily delivers awards globally throughout the year, we may also host an annual end-of-year grand recognition ceremony where awardees from around the world can gather, network, and be celebrated in an atmosphere of elegance and inspiration.",
      details: "This optional event brings together diverse leaders and innovators, creating unique opportunities for collaboration and connection among those who exemplify excellence in their respective fields.",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      icon: Handshake,
      title: "Diverse International Collaboration",
      subtitle: "United by Excellence, Strengthened by Diversity",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      description: "FACE is built on strong global partnerships. We are assembling a multicultural, multinational team of professionals, advisors, and collaborators to ensure that our work remains relevant, inclusive, and representative of diverse voices worldwide.",
      details: "This collaborative approach allows us to maintain cultural sensitivity while ensuring that our recognition standards remain consistently high across all regions and sectors we serve.",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-face-sky-blue via-face-sky-blue-dark to-face-grey overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white transform rotate-45 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-8 shadow-2xl">
              <Award className="h-10 w-10 text-face-sky-blue" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white">
              Our Award <span className="text-white">Approach</span>
            </h1>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              A unique process designed to recognize true excellence and impact across the globe
            </p>
            
            {/* Process Overview Cards */}
            <div className="flex flex-wrap justify-center gap-6 mt-16">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                  <step.icon className="h-5 w-5 text-white" />
                  <span className="text-white font-medium text-sm">Step {step.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 border border-face-sky-blue/10">
              <h2 className="text-3xl font-serif font-bold text-face-grey mb-8">
                Excellence Without Compromise
              </h2>
              <p className="text-xl leading-relaxed text-gray-700">
                The FACE Awards stands apart through its commitment to fairness, inclusivity, and global 
                representation. Our approach ensures that recognition is based on genuine impact and 
                excellence, not influence or connections. From nomination to final celebration, each 
                step in our process is designed to honor those who truly embody the principles of 
                <span className="font-bold text-face-sky-blue"> Focus, Achievement, Courage, and Excellence</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Process Flow */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-serif font-bold text-face-grey mb-6">
                Our Recognition Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Five carefully crafted steps that ensure excellence is recognized fairly and globally
              </p>
            </div>

            {/* Process Visualization */}
            <div className="relative mb-20">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 hidden lg:block">
                <div 
                  className="h-full bg-gradient-to-r from-face-sky-blue to-face-sky-blue-dark transition-all duration-1000 ease-out"
                  style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
                ></div>
              </div>
              
              {/* Step Indicators */}
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 relative">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center text-center lg:w-1/5">
                    <div 
                      className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 transform ${
                        index <= activeStep 
                          ? 'bg-face-sky-blue border-face-sky-blue-dark scale-110 shadow-lg' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {index <= activeStep ? (
                        <CheckCircle className="h-8 w-8 text-white" />
                      ) : (
                        <step.icon className="h-6 w-6 text-gray-400" />
                      )}
                      
                      {index <= activeStep && (
                        <div className="absolute inset-0 rounded-full bg-face-sky-blue animate-ping opacity-20"></div>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-face-grey mt-4 text-sm lg:text-base">
                      {step.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Steps */}
            <div className="space-y-24">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                    {/* Image Section */}
                    <div className="lg:w-1/2">
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                        <img 
                          src={step.image}
                          alt={step.title}
                          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        <div className="absolute top-6 left-6">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                            <step.icon className="h-6 w-6 text-face-sky-blue" />
                          </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                            <div className="flex items-center gap-3">
                              <div className="bg-face-sky-blue text-white rounded-full px-3 py-1 text-sm font-bold">
                                Step {step.id}
                              </div>
                              <span className="text-face-grey font-medium text-sm">{step.subtitle}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2">
                      <div className="bg-white rounded-2xl shadow-xl p-8 border border-face-sky-blue/10 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-face-sky-blue/10 rounded-full p-3">
                            <step.icon className="h-8 w-8 text-face-sky-blue" />
                          </div>
                          <div>
                            <span className="text-face-sky-blue font-bold text-sm">STEP {step.id}</span>
                            <h3 className="text-2xl font-serif font-bold text-face-grey">{step.title}</h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                          {step.description}
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed">
                          {step.details}
                        </p>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center text-face-sky-blue font-medium">
                            <span>Learn more about this step</span>
                            <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-8 text-white">
              Be Part of the FACE Awards Journey
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Whether as a nominee, voter, or supporter, you can contribute to recognizing excellence around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white border-4 border-white hover:border-white shadow-2xl text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300">
                View Current Nominees
              </button>
              <button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300">
                Explore Award Categories
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ApproachPage;