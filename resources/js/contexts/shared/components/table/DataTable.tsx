import { useMemo, useCallback } from 'react'
import { DataTableConfig, ColumnConfig } from '@/contexts/shared/libs/dataTable/types'
import { useDataTable } from '@/contexts/shared/hooks/useDataTable'
import { FilterIcon } from './FilterIcon'
import TableComponent from './TableComponent'
import TableFooter from './TableFooter'
import { TableRow } from './TableRow'
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

  const renderCell = useCallback((item: T, column: ColumnConfig<T>) => {
    if (column.render) {
      return column.render(item)
    }

    const value = (item as Record<string, unknown>)[column.key]
    if (value === null || value === undefined) return '-'
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint'
    ) {
      return String(value)
    }
    return '-'
  }, [])

  const getSortKey = useCallback((column: ColumnConfig<T>): string => {
    return column.sortKey ?? column.key
  }, [])

  const getSortIcon = useCallback(
    (column: ColumnConfig<T>) => {
      const sortKey = getSortKey(column)
      if (sortBy !== sortKey) return null
      return sortOrder === 'asc' ? (
        <ArrowUpIcon className="ml-1 h-3 w-3" />
      ) : (
        <ArrowDownIcon className="ml-1 h-3 w-3" />
      )
    },
    [sortBy, sortOrder, getSortKey]
  )

  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const isAllSelected = useMemo(() => {
    if (!enableSelection || !getId || data.length === 0) return false
    return data.every(item => selectedIdsSet.has(getId(item)))
  }, [enableSelection, getId, data, selectedIdsSet])

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (!onSelectionChange || !getId) return
      if (checked) {
        onSelectionChange(data.map(item => getId(item)))
      } else {
        onSelectionChange([])
      }
    },
    [data, getId, onSelectionChange]
  )

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
                    checked={isAllSelected}
                    onChange={e => handleSelectAll(e.target.checked)}
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
              data.map((item: T) => {
                const itemId = getId?.(item) ?? 0
                const isSelected = selectedIdsSet.has(itemId)
                return (
                  <TableRow
                    key={itemId}
                    item={item}
                    itemId={itemId}
                    columns={config.columns}
                    isSelected={isSelected}
                    enableSelection={enableSelection}
                    onRowClick={onRowClick}
                    onSelectionChange={onSelectionChange}
                    selectedIds={selectedIds}
                    renderCell={renderCell}
                  />
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
