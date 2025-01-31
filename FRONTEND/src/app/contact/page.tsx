"use client";

import { AddressSection } from "../components/contact/AdressSection";
import { BusinessHoursSection } from "../components/contact/BusinessHoursSection";
import { ContactDetailsSection } from "../components/contact/ContactDetailsSection";
import { MapSection } from "../components/contact/MapSection";
import { motion } from "framer-motion";
import { staggerContainer, waveEffect } from "@/app/animations";

export default function ContactPage() {
  const sections = [
    { key: "address", component: <AddressSection />, delayIndex: 1 },
    { key: "hours", component: <BusinessHoursSection />, delayIndex: 2 },
    { key: "details", component: <ContactDetailsSection />, delayIndex: 3 },
    { key: "map", component: <MapSection />, delayIndex: 4 },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="container py-24"
    >
      <motion.h1
        variants={waveEffect(0)}
        className="mb-12 text-center text-4xl font-bold"
      >
        Contacto
      </motion.h1>

      <div className="grid max-w-4xl gap-12 md:grid-cols-2 mx-auto">
        <motion.div className="space-y-8" variants={staggerContainer}>
          {sections.slice(0, 3).map(({ key, component, delayIndex }) => (
            <motion.div key={key} variants={waveEffect(delayIndex)}>
              {component}
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={waveEffect(4)} className="h-full">
          <MapSection />
        </motion.div>
      </div>
    </motion.div>
  );
}
