
export interface NomineeAchievement {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

export interface NomineeTestimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
  imageUrl?: string;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
  icon: string;
}

export interface NomineeDetail {
  id: number;
  name: string;
  organization: string;
  category: string;
  description: string;
  longBio: string;
  imageUrl: string;
  coverImageUrl?: string;
  position: string;
  location: string;
  impactSummary: string;
  achievements: NomineeAchievement[];
  testimonials: NomineeTestimonial[];
  socialLinks: SocialMediaLink[];
  videoUrl?: string;
  votingPercentage: number;
  canVote: boolean;
}

// Mock extended nominees data
export const nomineesDetailData: Record<number, NomineeDetail> = {
  1: {
    id: 1,
    name: "Dr. Aisha Williams",
    organization: "AI Health Solutions",
    category: "Technology Innovation",
    description: "Developed an AI-powered diagnostic tool that detects early signs of neurological disorders with 94% accuracy.",
    longBio: "Dr. Aisha Williams is a pioneer in AI-powered medical diagnostics with over 15 years of experience in neuroscience and machine learning. After completing her Ph.D. at Stanford University, she dedicated her career to improving early detection methods for neurological disorders. Her groundbreaking work combines advanced machine learning algorithms with neuroimaging techniques to identify subtle patterns that human clinicians might miss.",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    coverImageUrl: "https://images.unsplash.com/photo-1581093196277-9f508d9f21e8?q=80&w=1470&auto=format&fit=crop",
    position: "Founder & Chief Scientist",
    location: "San Francisco, USA",
    impactSummary: "Dr. Williams' diagnostic tool has been implemented in 35 medical centers worldwide, helping to identify early signs of neurological disorders in over 15,000 patients. This early detection has led to earlier interventions and improved patient outcomes in 78% of cases.",
    achievements: [
      {
        id: 1,
        title: "Launched AI Health Solutions",
        date: "2018",
        description: "Founded AI Health Solutions to bring cutting-edge diagnostic tools to healthcare providers globally.",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692"
      },
      {
        id: 2,
        title: "FDA Approval for Neural Scanner",
        date: "2020",
        description: "Received FDA approval for the first AI-powered neural scanning technology for early detection of Alzheimer's disease.",
        imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69"
      },
      {
        id: 3,
        title: "Global Implementation in 35 Medical Centers",
        date: "2022",
        description: "Expanded technology implementation to 35 medical centers across 12 countries, providing access to advanced diagnostics in underserved regions.",
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118"
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "Dr. James Chen",
        role: "Neurologist",
        organization: "Mayo Clinic",
        content: "Dr. Williams' technology has revolutionized how we approach early detection. We've seen remarkable improvements in patient outcomes since implementing her system.",
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        role: "Patient Advocate",
        organization: "Global Neurology Foundation",
        content: "The early detection made possible by Dr. Williams' work gave my mother an additional two years of quality life through early intervention. Her contribution to this field is immeasurable.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
      }
    ],
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        icon: "linkedin"
      },
      {
        platform: "Twitter",
        url: "https://twitter.com",
        icon: "twitter"
      },
      {
        platform: "Website",
        url: "https://aihealth.example.com",
        icon: "globe"
      }
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    votingPercentage: 42,
    canVote: true
  },
  2: {
    id: 2,
    name: "Quantum Computing Group",
    organization: "Horizon Labs",
    category: "Technology Innovation",
    description: "Created a breakthrough quantum computing framework that solves complex climate modeling problems 100x faster than traditional methods.",
    longBio: "The Quantum Computing Group at Horizon Labs consists of a team of brilliant physicists, mathematicians, and software engineers dedicated to pushing the boundaries of quantum computing applications. Formed in 2015, the team has focused specifically on climate science applications, developing novel quantum algorithms that can process massive atmospheric data sets at unprecedented speeds.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    coverImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
    position: "Research Team",
    location: "Zurich, Switzerland",
    impactSummary: "Their quantum computing framework has reduced complex climate calculations from months to hours, enabling climate scientists to run more accurate simulations and better predict extreme weather events, potentially saving thousands of lives through improved early warning systems.",
    achievements: [
      {
        id: 1,
        title: "First Quantum Algorithm for Climate Modeling",
        date: "2019",
        description: "Developed the first practical quantum algorithm specifically designed for processing atmospheric data at scale.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
      },
      {
        id: 2,
        title: "Partnership with Global Climate Initiative",
        date: "2021",
        description: "Formed partnership with the Global Climate Initiative to implement quantum-powered models in 23 research institutions.",
        imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519"
      },
      {
        id: 3,
        title: "Open Source Quantum Framework Release",
        date: "2022",
        description: "Released core components of their quantum computing framework as open-source software, enabling broader adoption in scientific research.",
        imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd"
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "Dr. Maria Rodriguez",
        role: "Climate Scientist",
        organization: "NOAA",
        content: "The speed and accuracy of Horizon's quantum framework have transformed our ability to model hurricane patterns. We're now able to predict formation and intensity with much greater lead time.",
        imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5"
      },
      {
        id: 2,
        name: "Prof. Thomas Zhang",
        role: "Director",
        organization: "Institute for Advanced Computation",
        content: "Horizon Labs has achieved what many thought impossible: making quantum computing practical for real-world scientific applications. Their framework sets a new standard in the field.",
        imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f"
      }
    ],
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com",
        icon: "github"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        icon: "linkedin"
      },
      {
        platform: "Website",
        url: "https://horizonlabs.example.com",
        icon: "globe"
      }
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    votingPercentage: 35,
    canVote: true
  },
  3: {
    id: 3,
    name: "EcoTech Solutions",
    organization: "Green Innovations Inc.",
    category: "Technology Innovation",
    description: "Pioneered a water purification system that uses 90% less energy while purifying water in disaster zones.",
    longBio: "EcoTech Solutions was founded in 2017 by environmental engineers committed to solving the global water crisis. Their revolutionary approach combines solar-powered nanofiltration with biological purification methods inspired by natural ecosystems. The team has developed a compact, portable system that can be rapidly deployed in disaster zones, refugee camps, and remote communities lacking clean water infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1581093196277-9f508d9f21e8",
    coverImageUrl: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=1470&auto=format&fit=crop",
    position: "Engineering Team",
    location: "Nairobi, Kenya",
    impactSummary: "EcoTech's water purification system has been deployed in 17 disaster zones across 4 continents, providing clean water to over 250,000 people during critical emergency situations while using 90% less energy than conventional systems.",
    achievements: [
      {
        id: 1,
        title: "Prototype Development",
        date: "2019",
        description: "Created first working prototype of their energy-efficient water purification system, demonstrating 85% energy reduction compared to conventional methods.",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
      },
      {
        id: 2,
        title: "First Disaster Zone Deployment",
        date: "2020",
        description: "Successfully deployed systems in response to Cyclone Idai in Mozambique, providing clean water to 30,000 displaced people.",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
      },
      {
        id: 3,
        title: "Scale-up and Global Expansion",
        date: "2022",
        description: "Expanded production capacity and established regional response hubs in Southeast Asia, East Africa, and Central America for rapid disaster response.",
        imageUrl: "https://images.unsplash.com/photo-1541552511466-152af3b44cba"
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "Carlos Mendez",
        role: "Emergency Response Coordinator",
        organization: "International Red Cross",
        content: "EcoTech's systems were game-changers during the flooding crisis. We could deploy clean water solutions within hours, not days, and with minimal fuel requirements.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      {
        id: 2,
        name: "Dr. Amina Osei",
        role: "Public Health Officer",
        organization: "WHO",
        content: "The reduction in waterborne disease cases when EcoTech systems are deployed is remarkable. Their technology saves lives not just by providing water, but by ensuring it's genuinely safe to drink.",
        imageUrl: "https://images.unsplash.com/photo-1629747490241-624f07d70e1e"
      }
    ],
    socialLinks: [
      {
        platform: "Twitter",
        url: "https://twitter.com",
        icon: "twitter"
      },
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: "instagram"
      },
      {
        platform: "Website",
        url: "https://ecotech.example.org",
        icon: "globe"
      }
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    votingPercentage: 23,
    canVote: true
  },
};
