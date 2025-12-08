import { DataTableConfig, ColumnConfig } from '@/contexts/shared/libs/dataTable/types'
import { useDataTable } from '@/contexts/shared/hooks/useDataTable'
import { FilterIcon } from './FilterIcon'
import TableComponent from './TableComponent'
import TableFooter from './TableFooter'
import { EmptyState } from '@/contexts/shared/components/ui/EmptyState'
import { ArrowUpIcon, ArrowDownIcon } from '../HugeIcons'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { SearchIcon } from '@/contexts/shared/components/Icons'
import { useTranslation } from 'react-i18next'

interface DataTableProps<T> {
  config: DataTableConfig<T>
  headerActions?: React.ReactNode
  onRowClick?: (item: T) => void
  enableSelection?: boolean
  selectedIds?: number[]
  onSelectionChange?: (ids: number[]) => void
  getId?: (item: T) => number
}

export const DataTable = <T,>({
  config,
  headerActions,
  onRowClick,
  enableSelection = false,
  selectedIds = [],
  onSelectionChange,
  getId,
}: DataTableProps<T>) => {
  const { t } = useTranslation()
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
            placeholder={t('common.search')}
          />
        </div>
        {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
      </div>
      <div className="overflow-x-auto">
        <TableComponent loading={isFetching}>
          <thead>
            <tr className="border-b">
              {enableSelection && (
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 &&
                      data.every(item => selectedIds.includes(getId?.(item) ?? 0))
                    }
                    onChange={e => {
                      if (e.target.checked) {
                        onSelectionChange?.(data.map(item => getId?.(item) ?? 0))
                      } else {
                        onSelectionChange?.([])
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
              )}
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
                <td
                  colSpan={config.columns.length + (enableSelection ? 1 : 0)}
                  className="px-4 py-12 text-center"
                >
                  <EmptyState title={t('common.no_results')} />
                </td>
              </tr>
            ) : (
              data.map((item: T, index: number) => {
                const itemId = getId?.(item) ?? 0
                const isSelected = selectedIds.includes(itemId)
                return (
                  <tr
                    key={index}
                    className={`border-b ${onRowClick ? 'cursor-pointer transition-colors hover:bg-gray-100' : ''}`}
                    onClick={e => {
                      if ((e.target as HTMLElement).tagName !== 'INPUT') {
                        onRowClick?.(item)
                      }
                    }}
                  >
                    {enableSelection && (
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={e => {
                            if (e.target.checked) {
                              onSelectionChange?.([...selectedIds, itemId])
                            } else {
                              onSelectionChange?.(selectedIds.filter(id => id !== itemId))
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </td>
                    )}
                    {config.columns.map(column => (
                      <td key={column.key} className={`px-4 py-3 ${column.className ?? ''}`}>
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                )
              })
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
