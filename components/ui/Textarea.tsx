import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          {...props}
          className={cn(
            "min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        />
        {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
