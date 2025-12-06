import React from 'react'
import clsx from 'clsx'

export interface Tab {
  value: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (value: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={clsx('flex gap-2', className)}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            'rounded px-4 py-2 transition-colors',
            activeTab === tab.value ? 'bg-gray-200 font-medium' : 'bg-gray-100 hover:bg-gray-200'
          )}
          aria-selected={activeTab === tab.value}
          role="tab"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
