import { XCircle } from "lucide-react";
import { Alert } from "../ui/alert";

interface ValidationError {
  field: string;
  message: string;
}

interface Props {
  readonly errors: ValidationError[];
  readonly onDismiss?: (field: string) => void;
}

export function ValidationErrors({ errors, onDismiss }: Props) {
  if (errors.length === 0) return null;

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <Alert
          key={`${error.field}-${index}`}
          variant="error"
          className="flex items-center justify-between"
        >
          <span>{error.message}</span>
          {onDismiss && (
            <button
              onClick={() => onDismiss(error.field)}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </Alert>
      ))}
    </div>
  );
}
