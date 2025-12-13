import { useQuery } from '@tanstack/react-query'
import getUserStatistics from '@/contexts/user/actions/getUserStatistics'
import { UserStatistics } from '@/contexts/user/libs/types'

export const useUserStatistics = () => {
  const { data, isLoading, error } = useQuery<UserStatistics>({
    queryKey: ['user-statistics'],
    queryFn: getUserStatistics,
  })

  return {
    statistics: data,
    isLoading,
    error,
  }
}
