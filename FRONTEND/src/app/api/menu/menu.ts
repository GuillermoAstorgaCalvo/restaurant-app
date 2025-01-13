import { api } from "../config";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type GroupedMenuItems = Record<string, MenuItem[]>;

export async function fetchMenuGroupedByCategory(): Promise<GroupedMenuItems> {
  const response = await api.get<MenuItem[]>("/menu");
  const items = response.data;

  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as GroupedMenuItems);
}
