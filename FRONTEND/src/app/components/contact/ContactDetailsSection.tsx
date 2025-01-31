import { Mail, Phone } from "lucide-react";
import { RESTAURANT_EMAIL, RESTAURANT_PHONE } from "@/app/lib/constants";
import { motion } from "framer-motion";
import { fadeInLeft } from "@/app/animations";

export function ContactDetailsSection() {
  return (
    <motion.div variants={fadeInLeft}>
      <h2 className="mb-4 text-2xl font-semibold">Contacto</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Phone className="h-5 w-5 text-primary" />
          <span>{RESTAURANT_PHONE}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="h-5 w-5 text-primary" />
          <span>{RESTAURANT_EMAIL}</span>
        </div>
      </div>
    </motion.div>
  );
}
