"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/api/admin/login";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginAdmin(formData.email, formData.password);

      localStorage.setItem("token", response.token);

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado. Inténtalo nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Inicio de sesión
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Introduce tu email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            label="Contraseña"
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
      placeholder={placeholder}
      required
    />
  </div>
);
