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
    <header className="bg-gray-900 text-gray-200 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-extrabold tracking-wide text-white">
          Panel de Administración
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all shadow"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
