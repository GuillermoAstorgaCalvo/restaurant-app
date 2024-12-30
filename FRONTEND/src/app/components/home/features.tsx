"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Clock, Award } from "lucide-react";
import { staggerContainer, featureItem, transitions } from "@/app/animations";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Cocina Exquisita",
    description:
      "Experimente los platos cuidadosamente elaborados por nuestro chef con los mejores ingredientes.",
  },
  {
    icon: Clock,
    title: "Reservas Sencillas",
    description:
      "Sistema de reservas online para planificar su experiencia perfecta.",
  },
  {
    icon: Award,
    title: "Premiado",
    description: "Reconocido por la excelencia en gastronomía y servicio.",
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={featureItem}
              transition={transitions.default}
              className="flex flex-col items-center text-center"
            >
              <feature.icon className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
