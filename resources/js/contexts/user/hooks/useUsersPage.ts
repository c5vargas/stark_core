import { useQuery } from '@tanstack/react-query'
import getUsers from '@/contexts/user/actions/getUsers'
import { useMemo, useState } from 'react'

export const useUsersPage = () => {
  const [query, setQuery] = useState<string>('')

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const handleSearch = (val: string) => {
    setQuery(val)
  }

  const filtered = useMemo(
    () => users?.filter(usr => usr.name.toLowerCase().includes(query.toLowerCase())),
    [users, query]
  )

  return {
    users: filtered,
    isLoading,
    error,
    refetch,
    handleSearch,
  }
}
