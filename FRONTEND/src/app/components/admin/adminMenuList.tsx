"use client";

import { MenuItem, Category, CategoryLabels } from "@/app/types/index";
import { AdminMenuItemCard } from "@/app/components/admin/AdminMenuItemCard";

interface AdminMenuListProps {
  readonly groupedItems: Record<string, MenuItem[]>;
  readonly onEdit: (item: MenuItem) => void;
  readonly onDelete: (id: string, category: string) => void;
}

export function AdminMenuList({
  groupedItems,
  onEdit,
  onDelete,
}: AdminMenuListProps) {
  const orderedCategories = Object.keys(CategoryLabels) as Category[];

  return (
    <div className="space-y-12">
      {orderedCategories.map((categoryKey) => {
        const label = CategoryLabels[categoryKey];
        const items = groupedItems[label] || [];

        if (items.length === 0) return null;

        return (
          <div key={categoryKey} className="ml-4">
            <h2 className="mb-6 text-2xl font-bold">{label}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {items.map((item) => (
                <AdminMenuItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item.id, item.category)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
