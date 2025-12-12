import { useQuery } from '@tanstack/react-query'
import getPublicSettings, { PublicSettings } from '../actions/getPublicSettings'

export const usePublicSettings = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['publicSettings'],
    queryFn: getPublicSettings,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })

  return {
    settings: data || ({} as PublicSettings),
    loading: isLoading,
    error,
  }
}
