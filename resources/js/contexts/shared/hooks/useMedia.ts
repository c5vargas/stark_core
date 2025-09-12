import { useQuery } from '@tanstack/react-query'
import fetchMedia from '@/contexts/shared/actions/fetchMedia'

export const useMedia = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['media'],
    queryFn: fetchMedia,
  })

  return { media: data || [], isLoading, refetch }
}
