import { useQuery } from '@tanstack/react-query'
import getMedia from '../actions/getMedia'

export const useMedia = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['media'],
    queryFn: getMedia,
  })

  return { media: data || [], isLoading, refetch }
}
