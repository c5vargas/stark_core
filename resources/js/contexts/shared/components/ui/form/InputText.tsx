type InputTextProps = React.InputHTMLAttributes<HTMLInputElement>

export const InputText: React.FC<InputTextProps> = props => (
  <input {...props} className={`w-full rounded border px-3 py-2 ${props.className ?? ''}`} />
)
