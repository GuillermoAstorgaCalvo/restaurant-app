import { cn } from "@/app/lib/utils";
import { HTMLAttributes, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      const handleCancel = (event: Event) => {
        event.preventDefault(); // Prevents closing on "Esc" key if desired
        onClose();
      };

      dialog.addEventListener("cancel", handleCancel); // Listens for Esc key or native close
      if (open) {
        if (!dialog.open) dialog.showModal();
        document.body.style.overflow = "hidden";
      } else {
        if (dialog.open) dialog.close();
        document.body.style.overflow = "unset";
      }

      return () => {
        dialog.removeEventListener("cancel", handleCancel);
        document.body.style.overflow = "unset";
      };
    }
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-50 bg-transparent backdrop-blur-sm flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <main className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
        {title && (
          <header className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </header>
        )}
        <div className="p-4">{children}</div>
      </main>
    </dialog>
  );
}
