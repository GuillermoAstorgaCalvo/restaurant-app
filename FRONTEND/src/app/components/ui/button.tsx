import { cn } from "@/app/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          // Variants
          variant === "primary" &&
            "bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800",
          variant === "secondary" &&
            "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
          variant === "outline" &&
            "border border-gray-200 bg-white hover:bg-gray-100 active:bg-gray-200",
          variant === "ghost" && "hover:bg-gray-100 active:bg-gray-200",
          // Sizes
          size === "sm" && "h-9 px-3 text-sm",
          size === "md" && "h-10 px-4 py-2",
          size === "lg" && "h-11 px-8 text-lg",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
