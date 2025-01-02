import MenuItem from "../models/menu";

(async () => {
  try {
    const menuItems = [
      {
        name: "Ensalada César",
        description:
          "Ensalada fresca con aderezo César, crutones y queso parmesano.",
        price: 10.99,
        imageUrl:
          "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
        category: "Entrantes",
      },
      {
        name: "Hamburguesa Clásica",
        description: "Jugosa hamburguesa con queso cheddar, lechuga y tomate.",
        price: 12.99,
        imageUrl:
          "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
        category: "Platos principales",
      },
      {
        name: "Tarta de Queso",
        description: "Postre cremoso con base de galleta.",
        price: 6.99,
        imageUrl:
          "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
        category: "Postres",
      },
      {
        name: "Coca-Cola",
        description: "Bebida refrescante.",
        price: 2.99,
        imageUrl:
          "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
        category: "Bebidas",
      },
    ];

    await MenuItem.bulkCreate(menuItems);
    console.log("Sample menu items seeded successfully.");
  } catch (error) {
    console.error("Error seeding menu items:", error);
  } finally {
    process.exit();
  }
})();
