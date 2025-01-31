import { XCircle } from "lucide-react";
import { Alert } from "../ui/alert";

interface Props {
  readonly type: "validation" | "availability" | "server" | "network";
  readonly message: string;
  readonly onClose?: () => void;
}

export function ErrorDisplay({ type, message, onClose }: Props) {
  const getTitle = () => {
    switch (type) {
      case "validation":
        return "Error de validación";
      case "availability":
        return "Error de disponibilidad";
      case "server":
        return "Error del servidor";
      case "network":
        return "Error de conexión";
      default:
        return "Error";
    }
  };

  return (
    <Alert
      variant="error"
      title={getTitle()}
      className="mb-6 animate-in fade-in slide-in-from-top-1"
    >
      <div className="flex items-start justify-between">
        <p>{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </Alert>
  );
}
