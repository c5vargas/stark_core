type InputTextProps = React.InputHTMLAttributes<HTMLInputElement>

export const InputText: React.FC<InputTextProps> = props => {
  const normalizedValue = props.value === null || props.value === undefined ? '' : props.value

  return (
    <input
      {...props}
      value={normalizedValue}
      className={`h-[42px] w-full rounded border px-3 ${props.className ?? ''}`}
    />
  )
}
