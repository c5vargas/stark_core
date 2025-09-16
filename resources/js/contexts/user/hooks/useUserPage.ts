import { useOutletContext } from 'react-router-dom'
import { User } from '@/contexts/user/libs/types'

export const useUserPage = () => {
  const { user } = useOutletContext<{ user: User }>()

  return {
    user,
  }
}
