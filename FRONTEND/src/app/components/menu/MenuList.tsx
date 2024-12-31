"use client";

import { MenuItem } from "@/app/api/menu";
import { MenuItemCard } from "./MenuItemCard";

interface MenuListProps {
  readonly groupedItems: Record<string, MenuItem[]>; // Use grouped menu items type
}

export function MenuList({ groupedItems }: MenuListProps) {
  return (
    <div className="space-y-12">
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category}>
          <h2 className="mb-6 text-2xl font-bold">{category}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
