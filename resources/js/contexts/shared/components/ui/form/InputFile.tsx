import React, { useState } from 'react'

interface InputFileProps {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  className?: string
}

export const InputFile: React.FC<InputFileProps> = ({ name, onChange, accept, className }) => {
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file?.name || '')
    onChange(e)
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <label
          htmlFor={name}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Select File
        </label>
        <span className="truncate text-sm text-gray-500">{fileName || 'No file selected'}</span>
      </div>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
