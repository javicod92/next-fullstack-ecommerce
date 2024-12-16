"use client";

import React, { createContext, useState } from "react";
import { Button, Input } from "./components";

//Data Types ----------------------------------------------------
type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  title: string;
  children: React.ReactNode;
};

type FormValues = Record<string, string>;

type FormContextType = {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
};

//Context definition ----------------------------------------------
export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

//Main function ---------------------------------------------------
export default function Form({ title, children, ...props }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form {...props} onSubmit={handleSubmit}>
        <h2>{title}</h2>
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.Input = Input;
Form.Button = Button;
