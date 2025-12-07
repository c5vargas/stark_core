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

  const params: DataTableParams = useMemo(
    () => ({
      page,
      perPage,
      sortBy,
      sortOrder,
      filters: Object.keys(filters).reduce(
        (acc, key) => {
          if (filters[key] !== null && filters[key] !== '') {
            acc[key] = filters[key]
          }
          return acc
        },
        {} as Record<string, string | number>
      ),
      query: debouncedQuery || undefined,
    }),
    [page, perPage, sortBy, sortOrder, filters, debouncedQuery]
  )

  const { data, isLoading, isFetching, error, refetch } = useQuery<DataTableResponse<T>>({
    queryKey: [config.endpoint, params],
    queryFn: () => config.queryFn(params),
    placeholderData: previousData => previousData, // Mantener datos anteriores mientras se carga para evitar parpadeo
  })

  const handlePageChange = useCallback((delta: number) => {
    setPage(prev => Math.max(1, prev + delta))
  }, [])

  const handleFilterChange = useCallback((key: string, value: string | number | null) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      // Si el valor está vacío o es null, eliminar el filtro
      if (value === null || value === '') {
        delete newFilters[key]
      }
      return newFilters
    })
    setPage(1) // Reset a la primera página cuando se cambia un filtro
  }, [])

  const handleSort = useCallback(
    (field: string) => {
      if (sortBy === field) {
        // Si ya está ordenando por este campo, cambiar el orden
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
      } else {
        // Si es un nuevo campo, ordenar ascendente por defecto
        setSortBy(field)
        setSortOrder('asc')
      }
      setPage(1) // Reset a la primera página cuando se cambia el ordenamiento
    },
    [sortBy]
  )

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setPage(1) // Reset a la primera página cuando se cambia la búsqueda
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({})
    setSearchQuery('')
    setPage(1)
  }, [])

  const pagination = data?.meta?.pagination

  return {
    data: data?.data ?? [],
    isLoading,
    isFetching,
    error,
    pagination: pagination
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
