import { useState } from "react";
import { toast } from "sonner";

interface NotificationOptions {
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<string[]>([]);

  const notify = (message: string, options: NotificationOptions = {}) => {
    const { type = "info", duration = 5000 } = options;

    setNotifications((prev) => [...prev, message]);

    switch (type) {
      case "success":
        toast.success(message, { duration });
        break;
      case "error":
        toast.error(message, { duration });
        break;
      case "warning":
        toast.warning(message, { duration });
        break;
      default:
        toast(message, { duration });
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    notify,
    clearNotifications,
  };
}
