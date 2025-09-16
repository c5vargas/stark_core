import { useState } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import useDebounce from '@/contexts/shared/hooks/useDebounce'

type PaginationParams = {
  page: number
  perPage: number
  query?: string
}

type UsePaginatedSearchOptions<T> = {
  queryKeyString: string
  perPage?: number
  debounceMs?: number
  queryFn: (params: PaginationParams) => Promise<T[]>
}

export const usePaginatedSearch = <T>({
  queryKeyString,
  perPage = 15,
  debounceMs = 400,
  queryFn,
}: UsePaginatedSearchOptions<T>) => {
  const [query, setQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const debouncedQuery = useDebounce(query, debounceMs)

  const queryResult: UseQueryResult<T[], unknown> = useQuery({
    queryKey: [queryKeyString, page, perPage, debouncedQuery],
    queryFn: () => queryFn({ page, perPage, query: debouncedQuery }),
  })

  const { data, isLoading, error, refetch } = queryResult
  const items: T[] = data ?? []

  const handleSearch = (val: string) => {
    setQuery(val)
    setPage(1)
  }

  const handlePagination = (sum: number) => {
    setPage(prev => Math.max(1, prev + sum))
  }

  return {
    data: items,
    isLoading,
    error,
    page,
    perPage,
    handlePagination,
    handleSearch,
    refetch,
  }
}
