import React from "react";
import { Label } from "./Label";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
};
