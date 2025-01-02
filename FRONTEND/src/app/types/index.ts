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

export type ReservationStatus =
  | "pendiente"
  | "confirmada"
  | "finalizada"
  | "cancelada";

export interface Reservation {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  status: ReservationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
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
