"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1 className="text-xl font-bold">Panel de administración</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </header>
  );
};

export default AdminHeader;
