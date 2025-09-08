import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label {...props} className={`block text-sm font-medium mb-1 ${className ?? ""}`}>
      {children}
    </label>
  );
};
