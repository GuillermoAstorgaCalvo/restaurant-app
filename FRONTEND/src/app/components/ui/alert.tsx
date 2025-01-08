import { cn } from "@/app/lib/utils";
import { HTMLAttributes } from "react";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: "info" | "success" | "warning" | "error";
  readonly title?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    error: XCircle,
  };

  const variantStyles = {
    info: {
      container: "bg-blue-50 border-blue-200",
      icon: "text-blue-500",
      title: "text-blue-800",
      text: "text-blue-700",
    },
    success: {
      container: "bg-green-50 border-green-200",
      icon: "text-green-500",
      title: "text-green-800",
      text: "text-green-700",
    },
    warning: {
      container: "bg-amber-50 border-amber-200",
      icon: "text-amber-500",
      title: "text-amber-800",
      text: "text-amber-700",
    },
    error: {
      container: "bg-red-50 border-red-200",
      icon: "text-red-500",
      title: "text-red-800",
      text: "text-red-700",
    },
  };

  const Icon = icons[variant];
  const styles = variantStyles[variant];

  return (
    <div
      className={cn("rounded-lg border p-4", styles.container, className)}
      {...props}
    >
      <div className="flex">
        <Icon className={cn("h-5 w-5 mr-3", styles.icon)} />
        <div>
          {title && (
            <h3 className={cn("font-medium mb-1", styles.title)}>{title}</h3>
          )}
          <div className={cn("text-sm", styles.text)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
