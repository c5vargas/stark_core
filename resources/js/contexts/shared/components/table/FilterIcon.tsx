import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { SearchIcon } from '@/contexts/shared/components/Icons'
import { FilterConfig } from '@/contexts/shared/libs/dataTable/types'
import { TextFilter } from './filters/TextFilter'
import { SelectFilter } from './filters/SelectFilter'
import { DateFilter } from './filters/DateFilter'
import { DateRangeFilter } from './filters/DateRangeFilter'
import { Button } from '../Button'

interface FilterIconProps {
  filter: FilterConfig
  value: string | number | null
  onChange: (value: string | number | null) => void
  isActive: boolean
}

export const FilterIcon: React.FC<FilterIconProps> = ({ filter, value, onChange, isActive }) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Calcular posición del popover
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.right + window.scrollX - 256, // 256px = w-64
        })
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const renderFilter = () => {
    switch (filter.type) {
      case 'text':
        return (
          <TextFilter
            value={value}
            onChange={onChange}
            placeholder={filter.placeholder}
            label={filter.label}
          />
        )
      case 'select':
        return (
          <SelectFilter
            value={value}
            onChange={onChange}
            options={filter.options ?? []}
            label={filter.label}
            placeholder={filter.placeholder}
          />
        )
      case 'date':
        return (
          <DateFilter
            value={value}
            onChange={onChange}
            placeholder={filter.placeholder}
            label={filter.label}
          />
        )
      case 'dateRange':
        return (
          <DateRangeFilter
            value={value as { start: string | null; end: string | null } | null}
            onChange={() => {
              // Para dateRange, necesitamos convertir el objeto a un formato que el backend pueda entender
              // Por ahora, pasamos null y manejaremos esto en el DataTable
              onChange(null)
            }}
            label={filter.label}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center rounded p-1 transition-colors ${
          isActive
            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
        }`}
        title="Filtrar"
      >
        <SearchIcon className="h-3 w-3" />
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={popoverRef}
            className="fixed z-[1000] w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {renderFilter()}
            <div className="mt-3 flex gap-2">
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => {
                  onChange(null)
                  setIsOpen(false)
                }}
              >
                Limpiar
              </Button>
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Aplicar
              </Button>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
