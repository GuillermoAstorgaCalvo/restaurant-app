import MenuItem from "../models/menu";

async function seedMenuItems() {
  await MenuItem.bulkCreate([
    {
      name: "Sopa de Tomate",
      description: "Sopa caliente de tomate con hierbas frescas",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
      category: "Entrantes",
    },
    {
      name: "Filete de Res",
      description: "Filete de res jugoso con salsa de pimienta",
      price: 15.99,
      imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
      category: "Platos principales",
    },
    {
      name: "Tarta de Queso",
      description: "Tarta de queso cremosa con base de galleta",
      price: 4.99,
      imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
      category: "Postres",
    },
    {
      name: "Coca-Cola",
      description: "Bebida gaseosa refrescante",
      price: 2.99,
      imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
      category: "Bebidas",
    },
  ]);
}

seedMenuItems().then(() => console.log("Seeded menu items."));
