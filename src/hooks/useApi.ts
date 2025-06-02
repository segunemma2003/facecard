import { useState, useEffect, useCallback } from 'react';
import { 
  apiClient, 
  Category, 
  CategoryDetails, 
  Nominee, 
  NomineeDetails, 
  PastWinner, 
  GalleryEvent, 
  TrendingNominee,
  getUserIP 
} from '@/lib/api';

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<{ success: boolean; data: T }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Categories hooks
export function useCategories(params?: {
  region?: string;
  voting_only?: boolean;
}) {
  return useApi(
    () => apiClient.getCategories(params),
    [params?.region, params?.voting_only]
  );
}

export function useCategory(id: number) {
  return useApi(
    () => apiClient.getCategory(id),
    [id]
  );
}

export function useCategoryStats() {
  return useApi(() => apiClient.getCategoryStats());
}

// Nominees hooks
export function useNominees(params?: {
  category_id?: number;
  category?: string;
  winners_only?: boolean;
  order_by?: 'votes' | 'name' | 'created_at';
  order_direction?: 'asc' | 'desc';
}) {
  return useApi(
    () => apiClient.getNominees(params),
    [params?.category_id, params?.category, params?.winners_only, params?.order_by, params?.order_direction]
  );
}

export function useNominee(id: number) {
  return useApi(
    () => apiClient.getNominee(id),
    [id]
  );
}

export function useTrendingNominees() {
  return useApi(() => apiClient.getTrendingNominees());
}

// Past Winners hooks
export function usePastWinners(params?: {
  year?: number;
  category?: string;
}) {
  return useApi(
    () => apiClient.getPastWinners(params),
    [params?.year, params?.category]
  );
}

export function usePastWinnerYears() {
  return useApi(() => apiClient.getPastWinnerYears());
}

export function usePastWinnerCategories() {
  return useApi(() => apiClient.getPastWinnerCategories());
}

// Gallery hooks
export function useGalleryEvents(params?: {
  year?: number;
  featured_only?: boolean;
}) {
  return useApi(
    () => apiClient.getGalleryEvents(params),
    [params?.year, params?.featured_only]
  );
}

export function useGalleryEvent(id: number) {
  return useApi(
    () => apiClient.getGalleryEvent(id),
    [id]
  );
}

export function useGalleryYears() {
  return useApi(() => apiClient.getGalleryYears());
}

// Voting hooks
export function useVoting() {
  const [userIP, setUserIP] = useState<string>('');
  const [votingStatus, setVotingStatus] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserIP().then(setUserIP);
  }, []);

  const voteForNominee = useCallback(async (nomineeId: number) => {
    if (!userIP) return null;
    
    try {
      setLoading(true);
      const response = await apiClient.voteForNominee(nomineeId, userIP);
      if (response.success) {
        setVotingStatus(prev => ({ ...prev, [nomineeId]: true }));
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Voting failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userIP]);

  const checkVoteStatus = useCallback(async (nomineeId: number) => {
    if (!userIP) return false;
    
    try {
      const response = await apiClient.checkVoteStatus(nomineeId, userIP);
      if (response.success) {
        setVotingStatus(prev => ({ ...prev, [nomineeId]: response.data.has_voted }));
        return response.data.has_voted;
      }
      return false;
    } catch (error) {
      console.error('Check vote status failed:', error);
      return false;
    }
  }, [userIP]);

  const getUserVotes = useCallback(async () => {
    if (!userIP) return [];
    
    try {
      const response = await apiClient.getUserVotes(userIP);
      if (response.success) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('Get user votes failed:', error);
      return [];
    }
  }, [userIP]);

  return {
    userIP,
    votingStatus,
    loading,
    voteForNominee,
    checkVoteStatus,
    getUserVotes
  };
}

// Settings hook
export function useSettings() {
  return useApi(() => apiClient.getSettings());
}

export function useSetting(key: string) {
  return useApi(() => apiClient.getSetting(key), [key]);
}

// Registration hook
export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRegistration = useCallback(async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.createRegistration(data);
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const lookupRegistration = useCallback(async (data: {
    reference_number: string;
    email: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.lookupRegistration(data);
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Registration not found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lookup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createRegistration,
    lookupRegistration
  };
}