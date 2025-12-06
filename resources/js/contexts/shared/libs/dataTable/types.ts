export type FilterType = 'text' | 'select' | 'date' | 'dateRange'

export interface FilterOption {
  label: string
  value: string | number
}

export interface FilterConfig {
  type: FilterType
  options?: FilterOption[] // Para tipo 'select'
  placeholder?: string // Para tipos 'text' y 'date'
  label?: string // Label para el filtro
}

export interface ColumnConfig<T> {
  key: string
  label: string
  filter?: FilterConfig
  render?: (item: T) => React.ReactNode
  sortable?: boolean // Si es false, la columna no se puede ordenar
  sortKey?: string // Campo alternativo para ordenar (útil cuando key no es un campo de BD)
  className?: string
}

export interface DataTableConfig<T> {
  columns: ColumnConfig<T>[]
  endpoint: string
  queryFn: (params: DataTableParams) => Promise<DataTableResponse<T>>
  perPage?: number
  defaultSortBy?: string
  defaultSortOrder?: 'asc' | 'desc'
}

export interface DataTableParams {
  page: number
  perPage: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string | number | null>
  query?: string // Búsqueda semántica
}

export interface PaginationMeta {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
}

export interface DataTableResponse<T> {
  data: T[]
  meta: {
    pagination: PaginationMeta
  }
}

// Constantes para tipos de filtros
export const FILTER_TYPES: FilterOption[] = [
  { label: 'Texto', value: 'text' },
  { label: 'Selección', value: 'select' },
  { label: 'Fecha', value: 'date' },
  { label: 'Rango de Fechas', value: 'dateRange' },
]
