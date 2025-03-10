import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  RESTAURANT_ADDRESS,
  RESTAURANT_CITY,
  RESTAURANT_ZIP,
} from "@/app/lib/constants";

export function AddressSection() {
  return (
    <motion.div>
      <h2 className="mb-4 text-2xl font-semibold">Ubicación</h2>
      <div className="flex items-start space-x-4">
        <MapPin className="mt-1 h-5 w-5 text-primary" />
        <address className="not-italic">
          <p>{RESTAURANT_ADDRESS}</p>
          <p>
            {RESTAURANT_CITY}, {RESTAURANT_ZIP}
          </p>
        </address>
      </div>
    </motion.div>
  );
}
