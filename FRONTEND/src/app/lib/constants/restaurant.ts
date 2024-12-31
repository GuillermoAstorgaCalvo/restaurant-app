// Extract restaurant-specific constants
export const RESTAURANT_CONFIG = {
  name: "La Maison",
  address: "Calle del Restaurante 123",
  city: "Madrid",
  state: "Madrid",
  zip: "28001",
  phone: "(+34) 91 123 4567",
  email: "info@lamaison.com",
  social: {
    facebook: "https://facebook.com/lamaisonrestaurante",
    instagram: "https://instagram.com/lamaisonrestaurante",
    twitter: "https://twitter.com/lamaisonrest",
  },
} as const;

export const RESTAURANT_NAME = RESTAURANT_CONFIG.name;
export const RESTAURANT_ADDRESS = RESTAURANT_CONFIG.address;
export const RESTAURANT_CITY = RESTAURANT_CONFIG.city;
export const RESTAURANT_STATE = RESTAURANT_CONFIG.state;
export const RESTAURANT_ZIP = RESTAURANT_CONFIG.zip;
export const RESTAURANT_PHONE = RESTAURANT_CONFIG.phone;
export const RESTAURANT_EMAIL = RESTAURANT_CONFIG.email;
export const SOCIAL_LINKS = RESTAURANT_CONFIG.social;
