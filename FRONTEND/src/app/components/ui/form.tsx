import { cn } from "@/app/lib/utils";
import { HTMLAttributes, LabelHTMLAttributes } from "react";

export function FormField({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

interface FormLabelProps
  extends Readonly<LabelHTMLAttributes<HTMLLabelElement>> {
  readonly required?: boolean;
}

export function FormLabel({
  className,
  required,
  children,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-gray-700",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export function FormDescription({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />;
}

export function FormMessage({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p
      className={cn("text-sm font-medium text-red-500", className)}
      {...props}
    />
  );
}
