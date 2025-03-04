"use client";
import React from "react";

interface ButtonProps {
  color: string;
  hoverColor?: string;
  text: string;
  onClick?: (event: any) => void;
  type?: "submit" | "button" | "reset" | undefined;
  style?: string;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  text,
  onClick,
  type,
  style,
}: ButtonProps) => {
  const colorVariants: { [key: string]: string } = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    cancel:
      "bg-white text-blue-500 outline outline-blue-500 outline-2 hover:bg-gray-100 hover:text-blue-700 box-",
  };
  return (
    <button
      type={type}
      className={`${colorVariants[color]}  hover:duration-500 px-4 py-2 rounded-lg ${style}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

//bg-yellow-500
