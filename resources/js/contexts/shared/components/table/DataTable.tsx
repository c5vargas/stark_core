import { DataTableConfig, ColumnConfig } from '@/contexts/shared/libs/dataTable/types'
import { useDataTable } from '@/contexts/shared/hooks/useDataTable'
import { FilterIcon } from './FilterIcon'
import TableComponent from './TableComponent'
import TableFooter from './TableFooter'
import { EmptyState } from '@/contexts/shared/components/ui/EmptyState'
import { ArrowUpIcon, ArrowDownIcon } from '../HugeIcons'

interface DataTableProps<T> {
  config: DataTableConfig<T>
}

export const DataTable = <T,>({ config }: DataTableProps<T>) => {
  const {
    data,
    isLoading,
    pagination,
    filters,
    sortBy,
    sortOrder,
    handlePageChange,
    handleFilterChange,
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

  if (isLoading) {
    return (
      <TableComponent loading={isLoading}>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
      </TableComponent>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <TableComponent loading={false}>
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
              data.map((item, index) => (
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
