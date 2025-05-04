
export interface PastWinner {
  year: number;
  name: string;
  organization: string;
}

export interface CategoryNominee {
  id: number;
  name: string;
  organization: string;
  image: string;
  bio: string;
  votes: number;
  impact: string;
  testimonials: string[];
}

export interface CategoryStats {
  countries: { name: string; percentage: number }[];
  gender: { male: number; female: number; other: number };
  impactLevel: { high: number; medium: number; emerging: number };
}

export interface Category {
  id: number;
  name: string;
  description: string;
  criteria: string[];
  currentNominees: number;
  pastWinners: PastWinner[];
  nominees: CategoryNominee[];
  stats: CategoryStats;
  votingOpen: boolean;
  votingEnds: Date;
  color: string;
  region: string;
}

export interface UpcomingVote {
  id: number;
  category: string;
  startsAt: Date;
  endsAt: Date;
  nominees: number;
}

// Sample category data with enhanced information
export const categoriesData: Category[] = [
  {
    id: 1,
    name: "Technology Innovation",
    description: "Recognizing groundbreaking technological advancements and digital solutions that solve real-world problems.",
    criteria: [
      "Demonstrated innovation in technology application",
      "Measurable impact on target users or industry",
      "Sustainability and scalability of the solution",
      "User experience and accessibility considerations"
    ],
    currentNominees: 8,
    pastWinners: [
      { year: 2023, name: "Dr. Aisha Williams", organization: "EcoTech Solutions" },
      { year: 2022, name: "Global AI Initiative", organization: "Technology For All Foundation" }
    ],
    nominees: [
      {
        id: 101,
        name: "Dr. Aisha Williams",
        organization: "AI Health Solutions",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        bio: "Pioneering AI diagnostic tools that have revolutionized early disease detection in underserved communities.",
        votes: 42,
        impact: "High impact across 12 countries in the Global South, improving healthcare outcomes for over 2 million patients.",
        testimonials: ["Dr. Williams' technology has transformed our rural clinic's diagnostic capabilities.", "The AI system has improved our diagnosis accuracy by 87%."]
      },
      {
        id: 102,
        name: "Quantum Computing Group",
        organization: "Horizon Labs",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        bio: "Creating breakthrough quantum algorithms that address complex climate and energy challenges.",
        votes: 35,
        impact: "Reduced computation time for climate models from months to days, enabling more accurate forecasting.",
        testimonials: ["Their quantum solutions helped us identify new sustainable materials 10x faster.", "Revolutionary approach to solving previously impossible computational problems."]
      }
    ],
    stats: {
      countries: [
        { name: "United States", percentage: 25 },
        { name: "India", percentage: 18 },
        { name: "Nigeria", percentage: 15 },
        { name: "China", percentage: 12 },
        { name: "Others", percentage: 30 }
      ],
      gender: { male: 55, female: 42, other: 3 },
      impactLevel: { high: 65, medium: 25, emerging: 10 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 14)),
    color: "bg-blue-50",
    region: "Global"
  },
  {
    id: 2,
    name: "Business Leadership",
    description: "Celebrating exceptional business leaders who demonstrate strategic vision, ethical practices, and deliver outstanding results.",
    criteria: [
      "Demonstrable business growth or transformation",
      "Ethical leadership and governance",
      "Innovation in business model or practices",
      "Positive impact on employees and stakeholders"
    ],
    currentNominees: 12,
    pastWinners: [
      { year: 2023, name: "Marcus Chen", organization: "Sustainable Futures Inc." },
      { year: 2022, name: "Olivia Martins", organization: "Global Finance Group" }
    ],
    nominees: [
      {
        id: 201,
        name: "Maria Gonzalez",
        organization: "Global Enterprises",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
        bio: "Transformed a struggling company into a market leader while implementing groundbreaking diversity initiatives.",
        votes: 51,
        impact: "Created over 5,000 jobs and increased female leadership by 200% in a traditionally male-dominated industry.",
        testimonials: ["Maria's leadership style combines empathy with strategic vision.", "Her inclusive approach transformed our corporate culture completely."]
      },
      {
        id: 202,
        name: "David Chen",
        organization: "Nexus Foundation",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        bio: "Led international coalition efforts that provided educational resources to over 2 million children in conflict zones.",
        votes: 49,
        impact: "Programs in 15 countries with measurable improvements in literacy and academic achievement.",
        testimonials: ["David's leadership during crisis situations has been exceptional.", "His ability to unite diverse stakeholders behind a common goal is unparalleled."]
      }
    ],
    stats: {
      countries: [
        { name: "United Kingdom", percentage: 22 },
        { name: "South Africa", percentage: 20 },
        { name: "Brazil", percentage: 18 },
        { name: "Canada", percentage: 15 },
        { name: "Others", percentage: 25 }
      ],
      gender: { male: 48, female: 51, other: 1 },
      impactLevel: { high: 70, medium: 20, emerging: 10 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 10)),
    color: "bg-teal-50",
    region: "Americas"
  },
  {
    id: 3,
    name: "Humanitarian Impact",
    description: "Honoring organizations and individuals making significant contributions to human welfare and social causes globally.",
    criteria: [
      "Scale and significance of humanitarian contribution",
      "Sustainable and lasting positive impact",
      "Innovation in addressing social challenges",
      "Community engagement and empowerment"
    ],
    currentNominees: 7,
    pastWinners: [
      { year: 2023, name: "Dr. Kwame Nkosi", organization: "Doctors Beyond Borders" },
      { year: 2022, name: "Water For All Initiative", organization: "Global Relief Foundation" }
    ],
    nominees: [
      {
        id: 301,
        name: "Doctors Beyond Borders",
        organization: "Non-profit Organization",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d",
        bio: "Provided critical medical care to over 500,000 people in crisis regions across three continents.",
        votes: 38,
        impact: "Established 25 permanent health facilities in regions with limited medical access.",
        testimonials: ["Their rapid response saved thousands during the recent natural disaster.", "They don't just treat patients, they build sustainable healthcare systems."]
      },
      {
        id: 302,
        name: "Clean Water Initiative",
        organization: "Environmental Action Group",
        image: "https://images.unsplash.com/photo-1541089404510-5c9a779841fc",
        bio: "Developed and installed sustainable water systems in 120 villages, impacting over 300,000 lives.",
        votes: 33,
        impact: "Reduced waterborne disease by 78% in target communities and improved agricultural yields.",
        testimonials: ["Their water systems have completely transformed our village.", "The educational component ensures long-term sustainability of the projects."]
      }
    ],
    stats: {
      countries: [
        { name: "Kenya", percentage: 28 },
        { name: "Bangladesh", percentage: 22 },
        { name: "Haiti", percentage: 18 },
        { name: "Syria", percentage: 12 },
        { name: "Others", percentage: 20 }
      ],
      gender: { male: 40, female: 58, other: 2 },
      impactLevel: { high: 85, medium: 10, emerging: 5 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 21)),
    color: "bg-red-50",
    region: "Africa"
  },
  {
    id: 4,
    name: "Educational Excellence",
    description: "Recognizing transformative educational initiatives, institutions, and leaders advancing learning worldwide.",
    criteria: [
      "Innovation in educational methods or accessibility",
      "Measurable improvement in learning outcomes",
      "Scalability and adaptability of educational model",
      "Inclusion and diversity considerations"
    ],
    currentNominees: 10,
    pastWinners: [
      { year: 2023, name: "Future Skills Academy", organization: "Education First Trust" },
      { year: 2022, name: "Prof. Sarah Johnson", organization: "Global Learning Initiative" }
    ],
    nominees: [],
    stats: {
      countries: [
        { name: "India", percentage: 30 },
        { name: "Ghana", percentage: 20 },
        { name: "Mexico", percentage: 15 },
        { name: "Australia", percentage: 15 },
        { name: "Others", percentage: 20 }
      ],
      gender: { male: 35, female: 63, other: 2 },
      impactLevel: { high: 60, medium: 25, emerging: 15 }
    },
    votingOpen: false,
    votingEnds: new Date(new Date().setDate(new Date().getDate() - 5)),
    color: "bg-amber-50",
    region: "Asia Pacific"
  },
  {
    id: 5,
    name: "Sustainable Development",
    description: "Celebrating initiatives and organizations driving environmental sustainability and responsible resource management.",
    criteria: [
      "Measurable environmental impact and conservation",
      "Innovation in sustainable practices or technologies",
      "Community engagement and education",
      "Scalability and long-term viability"
    ],
    currentNominees: 9,
    pastWinners: [
      { year: 2023, name: "Green Cities Initiative", organization: "Eco Solutions Global" },
      { year: 2022, name: "Dr. Isabella Martinez", organization: "Sustainable Future Research" }
    ],
    nominees: [],
    stats: {
      countries: [
        { name: "Denmark", percentage: 22 },
        { name: "Costa Rica", percentage: 18 },
        { name: "Singapore", percentage: 15 },
        { name: "Kenya", percentage: 15 },
        { name: "Others", percentage: 30 }
      ],
      gender: { male: 45, female: 52, other: 3 },
      impactLevel: { high: 75, medium: 20, emerging: 5 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 7)),
    color: "bg-green-50",
    region: "Europe"
  },
  {
    id: 6,
    name: "Cultural Excellence",
    description: "Recognizing outstanding contributions to arts, heritage preservation, and cultural exchange.",
    criteria: [
      "Significant cultural preservation or expression",
      "Innovation in cultural presentation or exchange",
      "Community engagement and education",
      "Cross-cultural understanding and collaboration"
    ],
    currentNominees: 6,
    pastWinners: [
      { year: 2023, name: "Global Heritage Foundation", organization: "Arts For All" },
      { year: 2022, name: "Traditional Futures Collective", organization: "Cultural Preservation Trust" }
    ],
    nominees: [],
    stats: {
      countries: [
        { name: "Japan", percentage: 25 },
        { name: "Morocco", percentage: 20 },
        { name: "Peru", percentage: 18 },
        { name: "Ireland", percentage: 12 },
        { name: "Others", percentage: 25 }
      ],
      gender: { male: 48, female: 50, other: 2 },
      impactLevel: { high: 60, medium: 30, emerging: 10 }
    },
    votingOpen: true,
    votingEnds: new Date(new Date().setDate(new Date().getDate() + 18)),
    color: "bg-purple-50",
    region: "Middle East"
  }
];

// Upcoming voting periods
export const upcomingVotes: UpcomingVote[] = [
  { 
    id: 1, 
    category: "Healthcare Innovation", 
    startsAt: new Date(new Date().setDate(new Date().getDate() + 10)), 
    endsAt: new Date(new Date().setDate(new Date().getDate() + 40)),
    nominees: 0
  },
  { 
    id: 2, 
    category: "Community Development", 
    startsAt: new Date(new Date().setDate(new Date().getDate() + 15)), 
    endsAt: new Date(new Date().setDate(new Date().getDate() + 45)),
    nominees: 0
  }
];
