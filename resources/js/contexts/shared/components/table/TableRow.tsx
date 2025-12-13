import { memo, useCallback } from 'react'
import { ColumnConfig } from '@/contexts/shared/libs/dataTable/types'

interface TableRowProps<T> {
  item: T
  itemId: number
  columns: ColumnConfig<T>[]
  isSelected: boolean
  enableSelection: boolean
  onRowClick?: (item: T) => void
  onSelectionChange?: (ids: number[]) => void
  selectedIds: number[]
  renderCell: (item: T, column: ColumnConfig<T>) => React.ReactNode
}

const TableRowComponent = <T,>({
  item,
  itemId,
  columns,
  isSelected,
  enableSelection,
  onRowClick,
  onSelectionChange,
  selectedIds,
  renderCell,
}: TableRowProps<T>) => {
  const handleRowClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement>) => {
      if ((e.target as HTMLElement).tagName !== 'INPUT') {
        onRowClick?.(item)
      }
    },
    [item, onRowClick]
  )

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onSelectionChange) return
      if (e.target.checked) {
        onSelectionChange([...selectedIds, itemId])
      } else {
        onSelectionChange(selectedIds.filter(id => id !== itemId))
      }
    },
    [itemId, selectedIds, onSelectionChange]
  )

  const handleCheckboxClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <tr
      className={`border-b ${onRowClick ? 'cursor-pointer transition-colors hover:bg-gray-100' : ''}`}
      onClick={handleRowClick}
    >
      {enableSelection && (
        <td className="px-4 py-3" onClick={handleCheckboxClick}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300"
          />
        </td>
      )}
      {columns.map(column => (
        <td key={column.key} className={`px-4 py-3 ${column.className ?? ''}`}>
          {renderCell(item, column)}
        </td>
      ))}
    </tr>
  )
}

export const TableRow = memo(TableRowComponent) as <T>(
  props: TableRowProps<T>
) => React.ReactElement
