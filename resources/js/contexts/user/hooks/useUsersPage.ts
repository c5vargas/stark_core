import getUsers from '@/contexts/user/actions/getUsers'
import { usePaginatedSearch } from '@/contexts/shared/hooks/usePaginatedQuery'
import { User } from '@/contexts/user/libs/types'

export const useUsersPage = () => {
  const {
    data: users,
    isLoading,
    error,
    page,
    perPage,
    handleSearch,
    handlePagination,
  } = usePaginatedSearch<User>({
    queryKeyString: 'users',
    queryFn: ({ page, perPage, query }) => getUsers({ page, perPage, query }),
    perPage: 15,
  })

  return {
    users,
    isLoading,
    error,
    page,
    perPage,
    handlePagination,
    handleSearch,
  }
}
