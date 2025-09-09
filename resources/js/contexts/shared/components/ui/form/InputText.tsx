type InputTextProps = React.InputHTMLAttributes<HTMLInputElement>

export const InputText: React.FC<InputTextProps> = props => (
  <input {...props} className={`h-[42px] w-full rounded border px-3 ${props.className ?? ''}`} />
)
