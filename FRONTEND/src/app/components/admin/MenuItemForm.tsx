"use client";

import { useState } from "react";
import { MenuItem, Category, CategoryLabels } from "@/app/types/index";

interface MenuItemFormProps {
  onSubmit: (item: Omit<MenuItem, "id">) => void;
  initialData?: MenuItem;
}

const MenuItemForm = ({ onSubmit, initialData }: MenuItemFormProps) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [price, setPrice] = useState(initialData?.price.toString() ?? "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [category, setCategory] = useState<Category | "">(
    initialData?.category ?? "",
  );

  const categories: Category[] = ["ENTRANTE", "PRINCIPAL", "POSTRE", "BEBIDA"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNaN(Number(price))) {
      alert("Por favor, introduce un precio válido");
      return;
    }
    onSubmit({
      name,
      description,
      price: Number(price),
      imageUrl,
      category: category as Category,
    });
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-lg mx-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del plato"
        className="block w-full p-2 mb-2 border rounded bg-white text-black"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="block w-full p-2 mb-2 border rounded bg-white text-black"
        required
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio"
        className="block w-full p-2 mb-2 border rounded bg-white text-black"
        required
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="URL de la imagen"
        className="block w-full p-2 mb-2 border rounded bg-white text-black"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-black mb-2"
        required
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {CategoryLabels[cat]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {initialData ? "Actualizar plato" : "Añadir plato"}
      </button>
    </form>
  );
};

export default MenuItemForm;
