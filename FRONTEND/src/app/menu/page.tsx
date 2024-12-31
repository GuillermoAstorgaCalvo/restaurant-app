"use client";

import { useEffect, useState } from "react";
import { fetchMenuGroupedByCategory, GroupedMenuItems } from "@/app/api/menu";
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
    <div className="container py-24">
      <h1 className="text-center text-4xl font-bold">Menú</h1>
      <MenuList groupedItems={groupedMenuItems} />
    </div>
  );
}
