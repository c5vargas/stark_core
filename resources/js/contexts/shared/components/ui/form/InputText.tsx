type InputTextProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputText: React.FC<InputTextProps> = (props) => (
  <input
    {...props}
    className={`w-full border rounded px-3 py-2 ${props.className ?? ""}`}
  />
);
