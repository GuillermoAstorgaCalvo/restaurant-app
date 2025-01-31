"use client";

import { MenuItem } from "@/app/types/index";
import { MenuItemCard } from "./MenuItemCard";
import { motion } from "framer-motion";
import { fadeInContainer, fadeInItem } from "@/app/animations";

interface MenuListProps {
  readonly groupedItems: Record<string, MenuItem[]>;
}

export function MenuList({ groupedItems }: MenuListProps) {
  return (
    <motion.div
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={fadeInContainer}
    >
      {Object.entries(groupedItems).map(([category, items]) => (
        <motion.div key={category} variants={fadeInItem}>
          <h2 className="mb-6 text-2xl font-bold">{category}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
