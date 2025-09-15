import { useQuery } from '@tanstack/react-query'
import getUserById from '../actions/getUserById'
import { useParams } from 'react-router-dom'

export const useUserPage = () => {
  const { id } = useParams()
  const userId = id ? parseInt(id) : undefined

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById({ userId }),
    enabled: !!userId,
  })

  return {
    user,
    isLoading,
    error,
  }
}
