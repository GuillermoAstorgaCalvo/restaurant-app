import { BUSINESS_HOURS } from "@/app/lib/constants";
import { motion } from "framer-motion";
import { fadeIn } from "@/app/animations";

export function BusinessHoursSection() {
  return (
    <motion.div variants={fadeIn}>
      <h2 className="mb-4 text-2xl font-semibold">Horario</h2>
      <div className="space-y-2">
        <p>Lunes - Viernes: {BUSINESS_HOURS.weekdays}</p>
        <p>Sábado: {BUSINESS_HOURS.saturday}</p>
        <p>Domingo: {BUSINESS_HOURS.sunday}</p>
      </div>
    </motion.div>
  );
}
