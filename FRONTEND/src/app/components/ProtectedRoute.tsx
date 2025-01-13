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
        // Decode the JWT token and check if it's valid
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
        const currentTime = Date.now() / 1000; // Get current time in seconds

        // Check if token is expired
        if (decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          localStorage.removeItem("token"); // Remove expired token
          router.push("/admin/login"); // Redirect to login
        } else if (decodedToken.role !== "admin") {
          // Ensure the role is 'admin'
          setIsAuthenticated(false);
          router.push("/admin/login"); // Redirect to unauthorized page
        } else {
          // If the token is valid, set the user as authenticated
          setIsAuthenticated(true);
        }
      } catch {
        // Catch errors (e.g., invalid token format)
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    } else {
      // If no token is found, redirect to login
      setIsAuthenticated(false);
      router.push("/admin/login");
    }
  }, [router]);

  // Show loading state while checking the token
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render children if authenticated
  return <>{isAuthenticated && children}</>;
};

export default ProtectedRoute;
