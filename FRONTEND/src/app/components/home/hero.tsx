"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, scaleUp, transitions } from "@/app/animations";

export function Hero() {
  return (
    <div className="relative h-[600px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
        alt="Interior del restaurante"
        fill
        className="object-cover brightness-50"
        priority
        sizes="100vw"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={transitions.default}
        className="absolute inset-0 flex flex-col items-center justify-center text-white"
      >
        <motion.h1
          variants={scaleUp}
          className="mb-4 text-center text-5xl font-bold"
        >
          Experiencia Gastronómica Única
        </motion.h1>
        <motion.p variants={fadeInUp} className="mb-8 text-center text-xl">
          Descubre la excelencia culinaria
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/reservations"
            className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-black transition-colors hover:bg-gray-100"
          >
            Hacer Reserva
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
