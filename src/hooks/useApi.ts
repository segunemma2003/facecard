import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, getUserIP } from '@/lib/api';
import type { 
  Category, 
  CategoryDetails, 
  Nominee, 
  NomineeDetails, 
  PastWinner, 
  GalleryEvent,
  RegistrationData,
  RegistrationResponse
} from '@/lib/api';

// Categories Hooks
export const useCategories = (params?: { region?: string; voting_only?: boolean }) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => apiClient.getCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => apiClient.getCategory(id),
    enabled: !!id,
  });
};

export const useCategoryStats = () => {
  return useQuery({
    queryKey: ['category-stats'],
    queryFn: () => apiClient.getCategoryStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Nominees Hooks
export const useNominees = (params?: {
  category_id?: number;
  category?: string;
  winners_only?: boolean;
  order_by?: 'votes' | 'name' | 'created_at';
  order_direction?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: ['nominees', params],
    queryFn: () => apiClient.getNominees(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for voting data
  });
};

export const useNominee = (id: number) => {
  return useQuery({
    queryKey: ['nominee', id],
    queryFn: () => apiClient.getNominee(id),
    enabled: !!id,
  });
};

export const useTrendingNominees = () => {
  return useQuery({
    queryKey: ['trending-nominees'],
    queryFn: () => apiClient.getTrendingNominees(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Voting Hooks
export const useVote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ nomineeId }: { nomineeId: number }) => {
      const ipAddress = await getUserIP();
      return apiClient.voteForNominee(nomineeId, ipAddress);
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['nominees'] });
      queryClient.invalidateQueries({ queryKey: ['nominee', variables.nomineeId] });
      queryClient.invalidateQueries({ queryKey: ['category'] });
      queryClient.invalidateQueries({ queryKey: ['user-votes'] });
      queryClient.invalidateQueries({ queryKey: ['trending-nominees'] });
    },
  });
};

export const useVoteCheck = (nomineeId: number) => {
  return useQuery({
    queryKey: ['vote-check', nomineeId],
    queryFn: async () => {
      const ipAddress = await getUserIP();
      return apiClient.checkVoteStatus(nomineeId, ipAddress);
    },
    enabled: !!nomineeId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useUserVotes = () => {
  return useQuery({
    queryKey: ['user-votes'],
    queryFn: async () => {
      const ipAddress = await getUserIP();
      return apiClient.getUserVotes(ipAddress);
    },
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Past Winners Hooks
export const usePastWinners = (params?: { year?: number; category?: string }) => {
  return useQuery({
    queryKey: ['past-winners', params],
    queryFn: () => apiClient.getPastWinners(params),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const usePastWinnerYears = () => {
  return useQuery({
    queryKey: ['past-winner-years'],
    queryFn: () => apiClient.getPastWinnerYears(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const usePastWinnerCategories = () => {
  return useQuery({
    queryKey: ['past-winner-categories'],
    queryFn: () => apiClient.getPastWinnerCategories(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Gallery Hooks
export const useGalleryEvents = (params?: { year?: number; featured_only?: boolean }) => {
  return useQuery({
    queryKey: ['gallery-events', params],
    queryFn: () => apiClient.getGalleryEvents(params),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useGalleryEvent = (id: number) => {
  return useQuery({
    queryKey: ['gallery-event', id],
    queryFn: () => apiClient.getGalleryEvent(id),
    enabled: !!id,
  });
};

export const useGalleryYears = () => {
  return useQuery({
    queryKey: ['gallery-years'],
    queryFn: () => apiClient.getGalleryYears(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Registration Hooks
export const useCreateRegistration = () => {
  return useMutation({
    mutationFn: (data: RegistrationData) => apiClient.createRegistration(data),
  });
};

export const useLookupRegistration = () => {
  return useMutation({
    mutationFn: (data: { reference_number: string; email: string }) => 
      apiClient.lookupRegistration(data),
  });
};

// Settings Hooks
export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => apiClient.getSettings(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useSetting = (key: string) => {
  return useQuery({
    queryKey: ['setting', key],
    queryFn: () => apiClient.getSetting(key),
    enabled: !!key,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Health Check Hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health-check'],
    queryFn: () => apiClient.healthCheck(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};