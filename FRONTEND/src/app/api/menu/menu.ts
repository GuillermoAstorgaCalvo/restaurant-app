import { api } from "../config";
import { MenuItem, CategoryLabels } from "@/app/types/index";

export type GroupedMenuItems = Record<string, MenuItem[]>;

export async function fetchMenuGroupedByCategory(): Promise<GroupedMenuItems> {
  const response = await api.get<MenuItem[]>("/menu");
  const items = response.data;

  const grouped = items.reduce((acc, item) => {
    const categoryLabel = CategoryLabels[item.category];
    if (!categoryLabel) {
      console.warn(`Unknown category: ${item.category}`);
      return acc;
    }

    if (!acc[categoryLabel]) acc[categoryLabel] = [];
    acc[categoryLabel].push(item);
    return acc;
  }, {} as GroupedMenuItems);

  const sortedCategories: GroupedMenuItems = {};
  const categoryOrder = Object.values(CategoryLabels);

  for (const category of categoryOrder) {
    if (grouped[category]) {
      sortedCategories[category] = grouped[category];
    }
  }

  return sortedCategories;
}

export async function addMenuItem(
  item: Omit<MenuItem, "id">,
): Promise<MenuItem> {
  const response = await api.post<MenuItem>("/menu", item);
  return response.data;
}

export async function updateMenuItem(
  id: string,
  item: Omit<MenuItem, "id">,
): Promise<MenuItem> {
  const response = await api.put<MenuItem>(`/menu/${id}`, item);
  return response.data;
}

export async function deleteMenuItem(id: string): Promise<void> {
  await api.delete(`/menu/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { id },
  });
}
