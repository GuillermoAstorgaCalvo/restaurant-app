export type Role = "ADMIN" | "STAFF" | "CUSTOMER";
export type Status = "PENDING" | "CONFIRMED" | "CANCELLED";
export type Category = "APPETIZER" | "MAIN" | "DESSERT" | "BEVERAGE";

export const CategoryLabels: Record<Category, string> = {
  APPETIZER: "Entrantes",
  MAIN: "Platos Principales",
  DESSERT: "Postres",
  BEVERAGE: "Bebidas",
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: string;
  date: Date;
  time: string;
  guests: number;
  status: Status;
  specialRequests?: string | null;
  userId: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
