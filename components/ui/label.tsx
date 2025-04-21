import React from "react";
import { cn } from "@/lib/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
    >
      {children}
    </label>
  );
};
