export interface RestaurantConfig {
  reservations: {
    maxPerHour: number;
    minHoursInAdvance: number;
    interval: number;
  };
  shifts: {
    lunch: { start: number; end: number };
    dinner: { start: number; end: number };
  };
  details: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  reservations: {
    maxPerHour: 8,
    minHoursInAdvance: 2,
    interval: 30,
  },
  shifts: {
    lunch: { start: 13, end: 16 },
    dinner: { start: 20, end: 23 },
  },
  details: {
    name: "La Maison",
    address: "Calle del Restaurante 123",
    city: "Málaga",
    state: "Málaga",
    zip: "29001",
    phone: "(+34) 91 123 4567",
    email: "info@lamaison.com",
  },
  socialLinks: {
    facebook: "https://facebook.com/lamaisonrestaurante",
    instagram: "https://instagram.com/lamaisonrestaurante",
    twitter: "https://twitter.com/lamaisonrest",
  },
} as const;

export const RESTAURANT_NAME = RESTAURANT_CONFIG.details.name;
export const RESTAURANT_ADDRESS = RESTAURANT_CONFIG.details.address;
export const RESTAURANT_CITY = RESTAURANT_CONFIG.details.city;
export const RESTAURANT_STATE = RESTAURANT_CONFIG.details.state;
export const RESTAURANT_ZIP = RESTAURANT_CONFIG.details.zip;
export const RESTAURANT_PHONE = RESTAURANT_CONFIG.details.phone;
export const RESTAURANT_EMAIL = RESTAURANT_CONFIG.details.email;
export const SOCIAL_LINKS = RESTAURANT_CONFIG.socialLinks;
