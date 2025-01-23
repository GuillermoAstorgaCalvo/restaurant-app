"use client";

import { useEffect, useState } from "react";
import {
  fetchMenuGroupedByCategory,
  GroupedMenuItems,
} from "@/app/api/menu/menu";
import { MenuList } from "@/app/components/menu/MenuList";

export default function MenuPage() {
  const [groupedMenuItems, setGroupedMenuItems] = useState<GroupedMenuItems>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenuGroupedByCategory();
        setGroupedMenuItems(data);
      } catch {
        setError("Error fetching menu items.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative min-h-screen bg-white">
      <div className="relative container mx-auto py-24">
        <h1 className="text-center text-5xl font-bold text-gray-800">Menú</h1>
        <MenuList groupedItems={groupedMenuItems} />
      </div>
    </div>
  );
}
