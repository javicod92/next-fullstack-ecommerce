"use client";

import { useContext } from "react";
import { FormContext } from "..";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export function Input({ label, name, ...props }: InputProps) {
  const { formValues, setFormValues } = useContext(FormContext)!;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <input
      className="w-full border p-1 mb-1 rounded-sm"
      {...props}
      name={name}
      value={formValues[name] || ""}
      onChange={handleChange}
    />
  );
}
