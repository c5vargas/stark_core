interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className, ...props }) => {
  const inputId = id || `checkbox-${label.replace(/\s+/g, '-')}`

  return (
    <div className="mb-4 flex flex-col">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={inputId}
          className={`h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className ?? ''}`}
          {...props}
        />
        <label htmlFor={inputId} className="ml-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
    </div>
  )
}
