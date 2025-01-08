import { cn } from "@/app/lib/utils";
import { HTMLAttributes, useState } from "react";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  readonly content: string;
  readonly position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({
  content,
  position = "top",
  children,
  className,
  ...props
}: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block" {...props}>
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-expanded={show}
        aria-label={content}
        className="focus:outline-none"
      >
        {children}
      </button>
      {show && (
        <div
          className={cn(
            "absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm",
            position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            position === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
            position === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
            className,
          )}
          role="tooltip"
          aria-hidden={!show}
        >
          {content}
          <div
            className={cn(
              "absolute border-4 border-transparent",
              position === "top" &&
                "top-full left-1/2 -translate-x-1/2 border-t-gray-900",
              position === "bottom" &&
                "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900",
              position === "left" &&
                "left-full top-1/2 -translate-y-1/2 border-l-gray-900",
              position === "right" &&
                "right-full top-1/2 -translate-y-1/2 border-r-gray-900",
            )}
          />
        </div>
      )}
    </div>
  );
}
