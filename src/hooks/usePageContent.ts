import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export const usePageContent = (page: string, section?: string, key?: string) => {
  return useQuery({
    queryKey: ['page-content', page, section, key],
    queryFn: () => {
      if (key && section) {
        return apiClient.getSpecificContent(page, section, key);
      } else if (section) {
        return apiClient.getPageSectionContent(page, section);
      } else {
        return apiClient.getPageContent(page);
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAllPageContent = () => {
  return useQuery({
    queryKey: ['all-page-content'],
    queryFn: () => apiClient.getAllPageContent(),
    staleTime: 10 * 60 * 1000,
  });
};
