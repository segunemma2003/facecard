// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Categories API
  async getCategories(params?: {
    region?: string;
    voting_only?: boolean;
  }): Promise<ApiResponse<Category[]>> {
    const queryParams = new URLSearchParams();
    if (params?.region) queryParams.append('region', params.region);
    if (params?.voting_only) queryParams.append('voting_only', 'true');
    
    const query = queryParams.toString();
    return this.request(`/categories${query ? `?${query}` : ''}`);
  }

  async getCategory(id: number): Promise<ApiResponse<CategoryDetails>> {
    return this.request(`/categories/${id}`);
  }

  async getCategoryStats(): Promise<ApiResponse<CategoryStats>> {
    return this.request('/categories/stats');
  }

  // Nominees API
  async getNominees(params?: {
    category_id?: number;
    category?: string;
    winners_only?: boolean;
    order_by?: 'votes' | 'name' | 'created_at';
    order_direction?: 'asc' | 'desc';
  }): Promise<ApiResponse<Nominee[]>> {
    const queryParams = new URLSearchParams();
    if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.winners_only) queryParams.append('winners_only', 'true');
    if (params?.order_by) queryParams.append('order_by', params.order_by);
    if (params?.order_direction) queryParams.append('order_direction', params.order_direction);
    
    const query = queryParams.toString();
    return this.request(`/nominees${query ? `?${query}` : ''}`);
  }

  async getNominee(id: number): Promise<ApiResponse<NomineeDetails>> {
    return this.request(`/nominees/${id}`);
  }

  async getTrendingNominees(): Promise<ApiResponse<TrendingNominee[]>> {
    return this.request('/nominees/trending');
  }

  // Voting API
  async voteForNominee(nomineeId: number, ipAddress: string): Promise<ApiResponse<VoteResponse>> {
    return this.request(`/votes/${nomineeId}`, {
      method: 'POST',
      body: JSON.stringify({ ip_address: ipAddress }),
    });
  }

  async checkVoteStatus(nomineeId: number, ipAddress?: string): Promise<ApiResponse<VoteCheck>> {
    const queryParams = new URLSearchParams();
    if (ipAddress) queryParams.append('ip_address', ipAddress);
    
    const query = queryParams.toString();
    return this.request(`/votes/${nomineeId}/check${query ? `?${query}` : ''}`);
  }

  async getUserVotes(ipAddress?: string): Promise<ApiResponse<UserVotes[]>> {
    const queryParams = new URLSearchParams();
    if (ipAddress) queryParams.append('ip_address', ipAddress);
    
    const query = queryParams.toString();
    return this.request(`/votes/user/categories${query ? `?${query}` : ''}`);
  }

  // Past Winners API
  async getPastWinners(params?: {
    year?: number;
    category?: string;
  }): Promise<ApiResponse<PastWinner[]>> {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append('year', params.year.toString());
    if (params?.category) queryParams.append('category', params.category);
    
    const query = queryParams.toString();
    return this.request(`/past-winners${query ? `?${query}` : ''}`);
  }

  async getPastWinnerYears(): Promise<ApiResponse<number[]>> {
    return this.request('/past-winners/years');
  }

  async getPastWinnerCategories(): Promise<ApiResponse<string[]>> {
    return this.request('/past-winners/categories');
  }

  // Gallery API
  async getGalleryEvents(params?: {
    year?: number;
    featured_only?: boolean;
  }): Promise<ApiResponse<GalleryEvent[]>> {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append('year', params.year.toString());
    if (params?.featured_only) queryParams.append('featured_only', 'true');
    
    const query = queryParams.toString();
    return this.request(`/gallery${query ? `?${query}` : ''}`);
  }

  async getGalleryEvent(id: number): Promise<ApiResponse<GalleryEventDetails>> {
    return this.request(`/gallery/${id}`);
  }

  async getGalleryYears(): Promise<ApiResponse<number[]>> {
    return this.request('/gallery/years');
  }

  // Registration API
  async createRegistration(data: RegistrationData): Promise<ApiResponse<RegistrationResponse>> {
    return this.request('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async lookupRegistration(data: {
    reference_number: string;
    email: string;
  }): Promise<ApiResponse<RegistrationDetails>> {
    return this.request('/registrations/lookup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Settings API
  async getSettings(): Promise<ApiResponse<Record<string, any>>> {
    return this.request('/settings');
  }

  async getSetting(key: string): Promise<ApiResponse<{ key: string; value: any }>> {
    return this.request(`/settings/${key}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string; version: string }>> {
    return this.request('/health');
  }
}

// Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  criteria: string[];
  region: string;
  current_nominees: number;
  voting_open: boolean;
  voting_ends_at: string | null;
  days_remaining: number;
  is_voting_active: boolean;
  color: string;
  icon: string;
  image_url: string | null;
  total_votes: number;
  nominees_count: number;
  winners_count: number;
}

export interface CategoryDetails extends Category {
  voting_starts_at: string | null;
  nominees: Nominee[];
}

export interface CategoryStats {
  total_categories: number;
  active_voting_categories: number;
  total_nominees: number;
  total_votes: number;
  regions: string[];
  category_breakdown: {
    name: string;
    nominees_count: number;
    total_votes: number;
    voting_open: boolean;
  }[];
}

export interface Nominee {
  id: number;
  name: string;
  organization: string;
  category: string;
  description: string;
  image_url: string | null;
  votes: number;
  voting_percentage: number;
  can_vote: boolean;
  is_winner: boolean;
  impact_summary: string | null;
  location: string | null;
}

export interface NomineeDetails extends Nominee {
  long_bio: string | null;
  position: string | null;
  cover_image_url: string | null;
  video_url: string | null;
  social_links: SocialLink[];
  achievements: Achievement[];
  testimonials: Testimonial[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url: string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
  image_url: string | null;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface TrendingNominee {
  id: number;
  name: string;
  category: string;
  votes: number;
  voting_percentage: number;
}

export interface VoteResponse {
  nominee_id: number;
  new_vote_count: number;
  new_percentage: number;
}

export interface VoteCheck {
  has_voted: boolean;
  nominee_id: number;
}

export interface UserVotes {
  category_id: number;
  category_name: string;
  voted_nominees: number[];
}

export interface PastWinner {
  id: number;
  name: string;
  organization: string;
  category: string;
  achievement: string;
  image_url: string;
  year: number;
}

export interface GalleryEvent {
  id: number;
  title: string;
  location: string;
  event_date: string;
  date: string;
  description: string;
  attendees: string | null;
  highlights: string | null;
  year: number;
  is_featured: boolean;
  image_count: number;
  featured_image: string | null;
  images: GalleryImage[];
}

export interface GalleryEventDetails extends GalleryEvent {
  images: GalleryImage[];
}

export interface GalleryImage {
  id: number;
  image_url: string;
  caption: string | null;
}

export interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization?: string;
  country: string;
  city: string;
  dietary_requirements?: string;
  ticket_type: 'standard' | 'vip' | 'corporate';
  event_date: string;
}

export interface RegistrationResponse {
  id: number;
  reference_number: string;
  full_name: string;
  email: string;
  ticket_type: string;
  amount: number;
  status: string;
  event_date: string;
}

export interface RegistrationDetails extends RegistrationResponse {
  phone: string;
  organization: string | null;
  country: string;
  city: string;
  dietary_requirements: string | null;
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Utility function to get user's IP address (for voting)
export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP address:', error);
    return '127.0.0.1'; // Fallback IP
  }
};