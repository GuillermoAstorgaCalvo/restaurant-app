import { MenuItem } from "@/app/api/menu";
import Image from "next/image";

interface MenuItemCardProps {
  readonly item: MenuItem; // Mark props as readonly
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
      {/* Replace <img> with <Image> for optimized images */}
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={300} // Provide appropriate width
        height={200} // Provide appropriate height
        className="h-48 w-full object-cover"
        priority // Ensures images load quickly for better LCP
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <p className="mt-2 text-lg font-bold text-primary">
          ${item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
