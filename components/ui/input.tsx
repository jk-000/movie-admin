import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
};

export const Input = ({ className, error, helperText, ...props }: InputProps) => {
  return (
    <div className="w-full">
      <input
        {...props}
        className={cn(
          "w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      />
      {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
