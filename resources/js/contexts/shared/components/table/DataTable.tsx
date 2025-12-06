import { DataTableConfig, ColumnConfig } from '@/contexts/shared/libs/dataTable/types'
import { useDataTable } from '@/contexts/shared/hooks/useDataTable'
import { FilterIcon } from './FilterIcon'
import TableComponent from './TableComponent'
import TableFooter from './TableFooter'
import { EmptyState } from '@/contexts/shared/components/ui/EmptyState'
import { ArrowUpIcon, ArrowDownIcon } from '../HugeIcons'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { SearchIcon } from '@/contexts/shared/components/Icons'

interface DataTableProps<T> {
  config: DataTableConfig<T>
  headerActions?: React.ReactNode
}

export const DataTable = <T,>({ config, headerActions }: DataTableProps<T>) => {
  const {
    data,
    isFetching,
    pagination,
    filters,
    searchQuery,
    sortBy,
    sortOrder,
    handlePageChange,
    handleFilterChange,
    handleSearch,
    handleSort,
  } = useDataTable<T>(config)

  const renderCell = (item: T, column: ColumnConfig<T>) => {
    if (column.render) {
      return column.render(item)
    }
    // Fallback: intentar acceder a la propiedad directamente
    const value = (item as Record<string, unknown>)[column.key]
    return value !== null && value !== undefined ? String(value) : '-'
  }

  const getSortKey = (column: ColumnConfig<T>): string => {
    return column.sortKey ?? column.key
  }

  const getSortIcon = (column: ColumnConfig<T>) => {
    const sortKey = getSortKey(column)
    if (sortBy !== sortKey) return null
    return sortOrder === 'asc' ? (
      <ArrowUpIcon className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDownIcon className="ml-1 h-3 w-3" />
    )
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative max-w-[200px]">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <InputText
            type="text"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Buscar..."
          />
        </div>
        {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
      </div>
      <div className="overflow-x-auto">
        <TableComponent loading={isFetching}>
          <thead>
            <tr className="border-b">
              {config.columns.map(column => (
                <th key={column.key} className={`px-4 py-3 text-left ${column.className ?? ''}`}>
                  <div className="flex items-center gap-1">
                    {column.sortable !== false ? (
                      <button
                        type="button"
                        onClick={() => handleSort(getSortKey(column))}
                        className="flex items-center font-medium hover:text-blue-600"
                      >
                        {column.label}
                        {getSortIcon(column)}
                      </button>
                    ) : (
                      <span className="font-medium">{column.label}</span>
                    )}
                    {column.filter && (
                      <FilterIcon
                        filter={column.filter}
                        value={filters[column.key] ?? null}
                        onChange={value => handleFilterChange(column.key, value)}
                        isActive={!!filters[column.key]}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={config.columns.length} className="px-4 py-12 text-center">
                  <EmptyState title="No se encontraron resultados" />
                </td>
              </tr>
            ) : (
              data.map((item: T, index: number) => (
                <tr key={index} className="border-b">
                  {config.columns.map(column => (
                    <td key={column.key} className={`px-4 py-3 ${column.className ?? ''}`}>
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </TableComponent>
      </div>
      {pagination && (
        <TableFooter
          page={pagination.currentPage}
          onPageChange={handlePageChange}
          hasNextPage={pagination.hasNextPage}
          total={pagination.total}
          showing={pagination.count}
        />
      )}
    </>
  )
}
