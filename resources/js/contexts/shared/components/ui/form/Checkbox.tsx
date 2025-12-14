interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  onChange?: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className,
  onChange,
  checked,
  ...props
}) => {
  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  if (label) {
    return (
      <div className="mb-4 flex flex-col">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={inputId}
            checked={checked}
            onChange={handleChange}
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

  return (
    <input
      type="checkbox"
      id={inputId}
      checked={checked}
      onChange={handleChange}
      className={`h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500 ${className ?? ''}`}
      {...props}
    />
  )
}
