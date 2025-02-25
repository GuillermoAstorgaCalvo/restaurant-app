"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "@/app/types/index";
import {
  fetchMenuGroupedByCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  GroupedMenuItems,
} from "@/app/api/menu/menu";
import { AdminMenuList } from "@/app/components/admin/AdminMenuLists";
import MenuItemForm from "@/app/components/admin/MenuItemForm";

export default function AdminMenuManagement() {
  const [groupedItems, setGroupedItems] = useState<GroupedMenuItems>({});
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      const groupedItems = await fetchMenuGroupedByCategory();
      setGroupedItems(groupedItems);
    };
    loadMenuItems();
  }, []);

  const handleAddMenuItem = async (newItem: Omit<MenuItem, "id">) => {
    await addMenuItem(newItem);
    const groupedItems = await fetchMenuGroupedByCategory();
    setGroupedItems(groupedItems);
    setIsAdding(false);
  };

  const handleEditMenuItem = async (
    id: string,
    updatedItem: Omit<MenuItem, "id">,
  ) => {
    await updateMenuItem(id, updatedItem);
    const groupedItems = await fetchMenuGroupedByCategory();
    setGroupedItems(groupedItems);
    setEditingItem(null);
  };

  const handleDeleteMenuItem = async (id: string) => {
    try {
      await deleteMenuItem(id);
      const groupedItems = await fetchMenuGroupedByCategory();
      setGroupedItems(groupedItems);
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  return (
    <div className="pt-12 p-8 bg-white rounded shadow-md">
      <header className="relative flex items-center justify-center ">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Gestión del Menú
        </h1>
        <button
          onClick={() => setIsAdding(true)}
          className="absolute right-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium shadow-md transition-all"
        >
          Añadir nuevo plato
        </button>
      </header>

      <AdminMenuList
        groupedItems={groupedItems}
        onEdit={(item) => setEditingItem(item)}
        onDelete={handleDeleteMenuItem}
      />

      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Añadir nuevo plato</h2>
            <MenuItemForm onSubmit={handleAddMenuItem} />
            <button
              onClick={() => setIsAdding(false)}
              className="mt-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar plato</h2>
            <MenuItemForm
              initialData={editingItem}
              onSubmit={(updatedItem) =>
                handleEditMenuItem(editingItem.id, updatedItem)
              }
            />
            <button
              onClick={() => setEditingItem(null)}
              className="mt-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
