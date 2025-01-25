"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          router.push("/admin/login");
        } else if (decodedToken.role !== "admin") {
          setIsAuthenticated(false);
          router.push("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    } else {
      setIsAuthenticated(false);
      router.push("/admin/login");
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return <>{isAuthenticated && children}</>;
};

export default ProtectedRoute;
