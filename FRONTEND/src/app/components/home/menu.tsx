"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/app/lib/utils/format";
import { staggerContainer, menuItem, transitions } from "@/app/animations";

const featuredItems = [
  {
    name: "Salmón a la Parrilla",
    description:
      "Salmón del Atlántico fresco con hierbas y salsa de mantequilla al limón",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
  },
  {
    name: "Solomillo de Ternera",
    description: "Corte premium con reducción de vino tinto",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
  },
  {
    name: "Pasta con Trufa",
    description: "Pasta artesanal con trufa negra y parmesano",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
  },
];

export function Menu() {
  return (
    <section className="bg-muted py-24">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitions.default}
          className="mb-12 text-center text-3xl font-bold"
        >
          Menú Destacado
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {featuredItems.map((item) => (
            <motion.div
              key={item.name}
              variants={menuItem}
              whileHover={{ y: -10 }}
              transition={transitions.default}
              className="group overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-lg font-medium text-primary">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
