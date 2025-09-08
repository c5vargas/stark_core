interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
}

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label {...props} className={`mb-1 block text-sm font-medium ${className ?? ''}`}>
      {children}
    </label>
  )
}
