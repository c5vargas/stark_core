import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  DataTableConfig,
  DataTableParams,
  DataTableResponse,
} from '@/contexts/shared/libs/dataTable/types'
import useDebounce from '@/contexts/shared/hooks/useDebounce'

export const useDataTable = <T>(config: DataTableConfig<T>) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(config.perPage ?? 15)
  const [filters, setFilters] = useState<Record<string, string | number | null>>({})
  const [sortBy, setSortBy] = useState<string | undefined>(config.defaultSortBy)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(config.defaultSortOrder ?? 'desc')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 400)

  const processedFilters = useMemo(
    () =>
      Object.keys(filters).reduce(
        (acc, key) => {
          if (filters[key] !== null && filters[key] !== '') {
            acc[key] = filters[key]
          }
          return acc
        },
        {} as Record<string, string | number>
      ),
    [filters]
  )

  const filtersKey = useMemo(() => JSON.stringify(processedFilters), [processedFilters])

  const params: DataTableParams = useMemo(
    () => ({
      page,
      perPage,
      sortBy,
      sortOrder,
      filters: processedFilters,
      query: debouncedQuery || undefined,
    }),
    [page, perPage, sortBy, sortOrder, filtersKey, debouncedQuery]
  )

  const queryKey = useMemo(() => [config.endpoint, params], [config.endpoint, params])

  const { data, isLoading, isFetching, error, refetch } = useQuery<DataTableResponse<T>>({
    queryKey,
    queryFn: () => config.queryFn(params),
    placeholderData: previousData => previousData,
  })

  const handlePageChange = useCallback((delta: number) => {
    setPage(prev => Math.max(1, prev + delta))
  }, [])

  const handleFilterChange = useCallback((key: string, value: string | number | null) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      if (value === null || value === '') {
        delete newFilters[key]
      }
      return newFilters
    })
    setPage(1)
  }, [])

  const handleSort = useCallback(
    (field: string) => {
      if (sortBy === field) {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortBy(field)
        setSortOrder('asc')
      }
      setPage(1)
    },
    [sortBy]
  )

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setPage(1)
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({})
    setSearchQuery('')
    setPage(1)
  }, [])

  const pagination = data?.meta?.pagination

  const paginationData = useMemo(
    () =>
      pagination
        ? {
            total: pagination.total,
            count: pagination.count,
            perPage: pagination.per_page,
            currentPage: pagination.current_page,
            totalPages: pagination.total_pages,
            hasNextPage: pagination.current_page < pagination.total_pages,
            hasPreviousPage: pagination.current_page > 1,
          }
        : undefined,
    [pagination]
  )

  return {
    data: data?.data ?? [],
    isLoading,
    isFetching,
    error,
    pagination: paginationData,
    page,
    perPage,
    filters,
    searchQuery,
    sortBy,
    sortOrder,
    handlePageChange,
    handleFilterChange,
    handleSearch,
    handleSort,
    resetFilters,
    refetch,
  }
}
