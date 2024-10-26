import { errorMessages } from "@/app/form/formSchema";
import React from "react";
import { SpanError } from "../spanError";

interface InputTextProps {
  placeholder?: string;
  type: string;
  id: string;
  label?: string;
  value?: string;
  error?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  placeholder,
  type,
  id,
  label,
  value,
  error,
  name,
  onChange,
  onBlur,
}: InputTextProps) => {
  const colorVariants: { [key: string]: string } = {
    normal: "border border-gray-600 placeholder-gray-600",
    error:
      "box-border border border-red-600 placeholder-red-600 focus:ring-red-500 outline-none focus:ring-1",
  };

  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-700 font-semibold"
      >
        {label}
      </label>
      <input
        className={`${
          error ? colorVariants.error : colorVariants.normal
        } px-3 py-2 rounded-lg text-gray-900`}
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && (
        <SpanError
          message={id === "name" ? errorMessages.name : errorMessages.tags}
        />
      )}
    </>
  );
};
