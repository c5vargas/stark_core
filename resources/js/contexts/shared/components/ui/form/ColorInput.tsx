import React from "react";

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export const ColorInput: React.FC<ColorInputProps> = ({ value, className, ...props }) => {
  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-label="color preview"
        style={{ backgroundColor: value }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full pointer-events-none"
      />
      <input
        type="color"
        value={value}
        {...props}
        className={`w-full border rounded px-10 py-4 ${className ?? ""}`}
      />
    </div>
  );
};
