
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { extractContent } from '@/lib/contentUtils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Heart, 
  Users, 
  Sprout, 
  Scale, 
  Home, 
  Car, 
  Briefcase, 
  Shield, 
  GraduationCap, 
  ShoppingBasket,
  BookOpen,
  UserCheck,
  ArrowRight,
  DollarSign,
  Target,
  Loader2,
  AlertCircle,
  Truck,
  Building,
  Utensils
} from 'lucide-react';

// Custom hook for page content with better error handling
const usePageContent = (page: string, section?: string, key?: string) => {
  return useQuery({
    queryKey: ['page-content', page, section, key],
    queryFn: async () => {
      try {
        console.log(`Fetching content for: page=${page}, section=${section}, key=${key}`);
        
        if (key && section) {
          const result = await apiClient.getSpecificContent(page, section, key);
          console.log(`API Response for ${page}/${section}/${key}:`, result);
          return result;
        } else if (section) {
          const result = await apiClient.getPageSectionContent(page, section);
          console.log(`API Response for ${page}/${section}:`, result);
          return result;
        } else {
          const result = await apiClient.getPageContent(page);
          console.log(`API Response for ${page}:`, result);
          return result;
        }
      } catch (error) {
        console.error(`API Error for ${page}/${section}/${key}:`, error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2, // Retry failed requests
    retryDelay: 1000, // Wait 1 second between retries
  });
};

const OurProjects = () => {
  const navigate = useNavigate();

  // Fetch content from API with loading and error states
  const { 
    data: heroContent, 
    isLoading: heroLoading, 
    error: heroError 
  } = usePageContent('projects', 'hero');
  
  const { 
    data: introContent, 
    isLoading: introLoading, 
    error: introError 
  } = usePageContent('projects', 'introduction');
  
  const { 
    data: homelessContent, 
    isLoading: homelessLoading, 
    error: homelessError 
  } = usePageContent('projects', 'for_homeless');
  
  const { 
    data: womenContent, 
    isLoading: womenLoading, 
    error: womenError 
  } = usePageContent('projects', 'for_women');
  
  const { 
    data: farmingContent, 
    isLoading: farmingLoading, 
    error: farmingError 
  } = usePageContent('projects', 'farming_food_justice');
  
  const { 
    data: socialJusticeContent, 
    isLoading: socialJusticeLoading, 
    error: socialJusticeError 
  } = usePageContent('projects', 'social_justice');
  
  const { 
    data: ctaContent, 
    isLoading: ctaLoading, 
    error: ctaError 
  } = usePageContent('projects', 'call_to_action');

  // Check if any critical data is still loading
  const isLoading = heroLoading || introLoading || homelessLoading || womenLoading || farmingLoading || socialJusticeLoading || ctaLoading;
  const hasErrors = heroError || introError || homelessError || womenError || farmingError || socialJusticeError || ctaError;

  // Content extraction helper
  const getContent = (source: any, key: string, fallback: string = '', options?: any) => {
    try {
      const contentData = source?.data?.content?.[key];
      
      if (!contentData) {
        console.warn(`No data found for key: ${key}, using fallback: ${fallback}`);
        return fallback;
      }
      
      let result = contentData.content;
      
      if (contentData.type === 'html' && typeof result === 'string') {
        if (options?.stripHTML) {
          result = result.replace(/<[^>]*>/g, '');
        }
      }
      
      console.log(`Extracted content for ${key}:`, result);
      return result || fallback;
    } catch (error) {
      console.error(`Error extracting content for ${key}:`, error);
      return fallback;
    }
  };

  // Parse JSON/Array content safely
  const parseJsonContent = (source: any, key: string, fallback: any[] = []) => {
    try {
      console.log(`Parsing content for key: ${key}`, source);
      const contentData = source?.data?.content?.[key];
      
      if (!contentData) {
        console.warn(`No content found for key: ${key}, using fallback`);
        return fallback;
      }
      
      let content = contentData.content;
      
      if (Array.isArray(content) || typeof content === 'object') {
        console.log(`Successfully extracted ${contentData.type} content for ${key}:`, content);
        return content;
      }
      
      if (typeof content === 'string' && contentData.type === 'json') {
        const parsed = JSON.parse(content);
        console.log(`Successfully parsed JSON for ${key}:`, parsed);
        return parsed;
      }
      
      console.warn(`Content for ${key} is not in expected format, using fallback`);
      return fallback;
    } catch (error) {
      console.error(`Failed to parse content for key: ${key}`, error);
      return fallback;
    }
  };

  // Icon mapping function for projects
  const getProjectIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      truck: Truck,
      car: Car,
      home: Home,
      building: Building,
      briefcase: Briefcase,
      shield: Shield,
      graduationcap: GraduationCap,
      sprout: Sprout,
      shoppingbasket: ShoppingBasket,
      utensils: Utensils,
      bookopen: BookOpen,
      scale: Scale,
      usercheck: UserCheck,
      users: Users,
      heart: Heart
    };
    return iconMap[iconName.toLowerCase()] || Heart;
  };

  // Format currency helper
  const formatCurrency = (amount: string | number) => {
    if (typeof amount === 'string') {
      return amount;
    }
    return `$${amount.toLocaleString()}`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-face-sky-blue mx-auto mb-4"></div>
          <p className="text-face-grey font-manrope">Loading our projects...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (hasErrors) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-face-grey mb-2 font-clash">Failed to Load Content</h2>
          <p className="text-face-grey/80 mb-4 font-manrope">
            There was an error loading the project information from the server.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-face-sky-blue hover:bg-face-sky-blue-dark text-face-white px-6 py-2 rounded-lg font-manrope"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Default project data with proper structure for fallbacks
  const defaultHomelessProjects = [
    {
      id: 1,
      icon: 'truck',
      title: 'Mobile Shower and Hygiene Unit',
      description: 'A mobile truck or trailer equipped with showers, toilets, and hygiene supplies.',
      estimated_cost: '$75,000–$120,000 (initial setup); $5,000/month (operational)',
      impact: 'Serves 100–200 people per week',
      timeline: '2025',
      status: 'Planning'
    },
    {
      id: 2,
      icon: 'home',
      title: 'Transitional Tiny Home Village',
      description: 'Build 10–20 tiny homes with shared facilities for people transitioning from homelessness.',
      estimated_cost: '$500,000 (20 units + infrastructure)',
      impact: '20–30 individuals housed annually',
      timeline: '2025-2026',
      status: 'Planning'
    },
    {
      id: 3,
      icon: 'briefcase',
      title: 'Homeless Employment & Skill Center',
      description: 'Job readiness training, resume help, digital literacy, and paid internships.',
      estimated_cost: '$150,000/year',
      impact: '75–150 people trained yearly',
      timeline: '2025',
      status: 'Planning'
    }
  ];

  const defaultWomenProjects = [
    {
      id: 1,
      icon: 'shield',
      title: 'Women\'s Safe Haven & Resource Center',
      description: 'Emergency shelter and long-term counseling for survivors of domestic violence or trafficking.',
      estimated_cost: '$400,000/year (leasing + staff + services)',
      impact: '200–300 women served annually',
      timeline: '2025',
      status: 'Planning'
    },
    {
      id: 2,
      icon: 'sprout',
      title: 'Women in Farming Program',
      description: 'Training and land access for women to learn sustainable agriculture and start micro-farms.',
      estimated_cost: '$180,000/year (includes tools, land lease, and stipends)',
      impact: '30–50 women per cohort',
      timeline: '2025-2026',
      status: 'Planning'
    },
    {
      id: 3,
      icon: 'users',
      title: 'Single Mother Support Network',
      description: 'Monthly stipends, childcare access, financial literacy, and mentorship.',
      estimated_cost: '$120,000/year (support for 40–60 mothers)',
      impact: 'Empowered and stable single-mother households',
      timeline: '2025',
      status: 'Planning'
    }
  ];

  const defaultFarmingProjects = [
    {
      id: 1,
      icon: 'sprout',
      title: 'Community Garden & Urban Farming Initiative',
      description: 'Convert vacant lots into urban farms with local community members growing and selling food.',
      estimated_cost: '$50,000 per site',
      impact: 'Improves food access for 100+ families per site',
      timeline: '2025',
      status: 'Planning'
    },
    {
      id: 2,
      icon: 'graduationcap',
      title: 'Youth Farming Apprenticeship Program',
      description: 'Engage at-risk youth in sustainable farming with paid apprenticeships.',
      estimated_cost: '$80,000/year (tools, stipends, training)',
      impact: '25–40 youth per year',
      timeline: '2025-2026',
      status: 'Planning'
    },
    {
      id: 3,
      icon: 'utensils',
      title: 'Food Rescue & Redistribution Hub',
      description: 'Collect surplus food from farms/restaurants and distribute to shelters and low-income families.',
      estimated_cost: '$100,000/year (van, staff, storage)',
      impact: '50,000+ meals per year',
      timeline: '2025',
      status: 'Planning'
    }
  ];

  const defaultSocialJusticeProjects = [
    {
      id: 1,
      icon: 'scale',
      title: 'Community Legal Aid Clinic',
      description: 'Free legal support for housing, immigration, and civil rights cases.',
      estimated_cost: '$250,000/year (lawyers, paralegals, outreach)',
      impact: '300–500 clients served annually',
      timeline: '2025',
      status: 'Planning'
    },
    {
      id: 2,
      icon: 'usercheck',
      title: 'Restorative Justice & Mediation Circles',
      description: 'Train facilitators to host community peacebuilding and justice alternatives.',
      estimated_cost: '$50,000/year',
      impact: 'Serves schools, families, and justice-involved youth',
      timeline: '2025-2026',
      status: 'Planning'
    },
    {
      id: 3,
      icon: 'bookopen',
      title: 'Civic Engagement Bootcamps for Marginalized Groups',
      description: 'Workshops on voting rights, organizing, leadership, and policy influence.',
      estimated_cost: '$60,000/year',
      impact: 'Trains 100–200 residents per cycle',
      timeline: '2025',
      status: 'Planning'
    }
  ];

  // Get dynamic content with fallbacks
  const homelessProjects = parseJsonContent(homelessContent, 'projects', defaultHomelessProjects);
  const womenProjects = parseJsonContent(womenContent, 'projects', defaultWomenProjects);
  const farmingProjects = parseJsonContent(farmingContent, 'projects', defaultFarmingProjects);
  const socialJusticeProjects = parseJsonContent(socialJusticeContent, 'projects', defaultSocialJusticeProjects);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleScrollToTop();
  };

  // Project Card Component
  const ProjectCard = ({ project, categoryColor }: { project: any; categoryColor: string }) => {
    const IconComponent = getProjectIcon(project.icon);
    
    return (
      <div className="bg-face-white rounded-2xl shadow-lg border border-face-sky-blue/10 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className={`h-2 bg-gradient-to-r ${categoryColor}`}></div>
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-full bg-gradient-to-r ${categoryColor} bg-opacity-10`}>
              <IconComponent className="h-6 w-6 text-face-sky-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-clash font-bold text-face-grey mb-2">{project.title}</h3>
              <p className="text-face-grey/80 font-manrope leading-relaxed">{project.description}</p>
            </div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-face-sky-blue" />
              <span className="font-medium font-manrope">Cost: {formatCurrency(project.estimated_cost)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="h-4 w-4 text-face-sky-blue" />
              <span className="font-medium font-manrope">Impact: {project.impact}</span>
            </div>
            {project.timeline && (
              <div className="flex items-center gap-3">
                <span className="font-medium text-face-grey/70 font-manrope">Timeline: {project.timeline}</span>
              </div>
            )}
            {project.status && (
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium font-manrope ${
                  project.status === 'Active' ? 'bg-green-100 text-green-800' :
                  project.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-face-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-face-grey overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getContent(heroContent, 'background_image', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')}
            alt="Community projects background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-face-sky-blue/95 via-face-sky-blue-dark/95 to-face-grey/95"></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-face-white rounded-full mb-8 shadow-2xl">
              <Heart className="h-12 w-12 text-face-sky-blue" />
            </div>
            
            <h1 
              className="text-6xl md:text-7xl font-clash font-bold mb-6 text-face-white"
              dangerouslySetInnerHTML={{
                __html: getContent(heroContent, 'main_title', 'Our <span class="text-face-sky-blue-light">Projects</span>')
              }}
            />
            
            <p className="text-2xl text-face-white mb-8 font-manrope font-medium max-w-3xl mx-auto leading-relaxed">
              {getContent(heroContent, 'subtitle', 'As a non-profit organization, all donations and support are directed toward the implementation of noble, community-based projects planned for the next two years (2025–2026).')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-lg text-face-white">
              <div className="flex items-center gap-3 bg-face-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-face-white/30">
                <Users className="h-6 w-6" />
                <span className="font-medium font-manrope">Community Impact</span>
              </div>
              <div className="flex items-center gap-3 bg-face-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-face-white/30">
                <Heart className="h-6 w-6" />
                <span className="font-medium font-manrope">Social Justice</span>
              </div>
              <div className="flex items-center gap-3 bg-face-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-face-white/30">
                <Sprout className="h-6 w-6" />
                <span className="font-medium font-manrope">Sustainability</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-6 text-face-grey">
              {getContent(introContent, 'title', 'Our Focus Areas')}
            </h2>
            <p className="text-lg text-face-grey/80 font-manrope leading-relaxed mb-12">
              {getContent(introContent, 'content', 'Our focus areas include support for the homeless, women\'s empowerment, sustainable farming, and social justice. Each project is designed to create lasting impact and positive change in communities.')}
            </p>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-face-sky-blue/5 rounded-xl border border-face-sky-blue/10">
                <Users className="h-12 w-12 text-face-sky-blue mx-auto mb-4" />
                <h3 className="font-clash font-bold text-face-grey mb-2">For the Homeless</h3>
                <p className="text-sm text-face-grey/70 font-manrope">Mobile services and transitional housing</p>
              </div>
              <div className="text-center p-6 bg-face-sky-blue/5 rounded-xl border border-face-sky-blue/10">
                <Heart className="h-12 w-12 text-face-sky-blue mx-auto mb-4" />
                <h3 className="font-clash font-bold text-face-grey mb-2">For Women</h3>
                <p className="text-sm text-face-grey/70 font-manrope">Empowerment and support programs</p>
              </div>
              <div className="text-center p-6 bg-face-sky-blue/5 rounded-xl border border-face-sky-blue/10">
                <Sprout className="h-12 w-12 text-face-sky-blue mx-auto mb-4" />
                <h3 className="font-clash font-bold text-face-grey mb-2">Farming & Food</h3>
                <p className="text-sm text-face-grey/70 font-manrope">Sustainable agriculture initiatives</p>
              </div>
              <div className="text-center p-6 bg-face-sky-blue/5 rounded-xl border border-face-sky-blue/10">
                <Scale className="h-12 w-12 text-face-sky-blue mx-auto mb-4" />
                <h3 className="font-clash font-bold text-face-grey mb-2">Social Justice</h3>
                <p className="text-sm text-face-grey/70 font-manrope">Legal aid and community support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For the Homeless Section */}
      <section className="py-16 bg-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">
                {getContent(homelessContent, 'title', 'For the Homeless')}
              </h2>
              <p className="text-lg text-face-grey/80 font-manrope max-w-3xl mx-auto">
                {getContent(homelessContent, 'subtitle', 'Comprehensive support programs addressing immediate needs and long-term housing solutions')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homelessProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  categoryColor="from-blue-500 to-blue-600" 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Women Section */}
      <section className="py-16 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">
                {getContent(womenContent, 'title', 'For Women')}
              </h2>
              <p className="text-lg text-face-grey/80 font-manrope max-w-3xl mx-auto">
                {getContent(womenContent, 'subtitle', 'Empowerment programs providing safety, education, and economic opportunities for women')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {womenProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  categoryColor="from-pink-500 to-purple-600" 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Farming & Food Justice Section */}
      <section className="py-16 bg-face-sky-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">
                {getContent(farmingContent, 'title', 'Farming & Food Justice')}
              </h2>
              <p className="text-lg text-face-grey/80 font-manrope max-w-3xl mx-auto">
                {getContent(farmingContent, 'subtitle', 'Sustainable agriculture and food security initiatives for communities in need')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {farmingProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  categoryColor="from-green-500 to-emerald-600" 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Justice Section */}
      <section className="py-16 bg-face-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">
                {getContent(socialJusticeContent, 'title', 'Social Justice')}
              </h2>
              <p className="text-lg text-face-grey/80 font-manrope max-w-3xl mx-auto">
                {getContent(socialJusticeContent, 'subtitle', 'Legal aid, restorative justice, and civic engagement programs for marginalized communities')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {socialJusticeProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  categoryColor="from-indigo-500 to-purple-600" 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-face-sky-blue via-face-sky-blue-dark to-face-grey">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-clash font-bold mb-8 text-face-white">
            {getContent(ctaContent, 'title', 'Support Our Mission')}
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 text-face-white/90 leading-relaxed font-manrope">
            {getContent(ctaContent, 'subtitle', 'Your support helps us implement these vital community projects. Together, we can create lasting positive change in the lives of those who need it most.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => handleNavigation('/contact')}
              className="bg-face-white text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white border-4 border-face-white hover:border-face-white shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 font-manrope"
            >
              {getContent(ctaContent, 'primary_button_text', 'Get Involved')}
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="border-4 border-face-white bg-transparent text-face-white hover:bg-face-white hover:text-face-sky-blue shadow-2xl text-xl font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 font-manrope"
            >
              {getContent(ctaContent, 'secondary_button_text', 'Learn More About Us')}
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OurProjects;