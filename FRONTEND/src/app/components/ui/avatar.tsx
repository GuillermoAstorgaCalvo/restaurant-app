import { cn } from "@/app/lib/utils";
import { HTMLAttributes } from "react";
import Image from "next/image";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  readonly src?: string;
  readonly alt?: string;
  readonly fallback?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-block h-10 w-10 rounded-full overflow-hidden",
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? "Avatar"}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      ) : (
        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {fallback?.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
