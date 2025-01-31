import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type Role = "ADMIN" | "STAFF" | "CUSTOMER";
export type Status = "PENDING" | "CONFIRMED" | "CANCELLED";
export type Category = "ENTRANTE" | "PRINCIPAL" | "POSTRE" | "BEBIDA";

export const CategoryLabels: Record<Category, string> = {
  ENTRANTE: "Entrantes",
  PRINCIPAL: "Platos Principales",
  POSTRE: "Postres",
  BEBIDA: "Bebidas",
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
  imageUrl: string;
}
