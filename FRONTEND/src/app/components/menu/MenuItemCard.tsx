import { MenuItem } from "@/app/types/index";
import Image from "next/image";
import { formatEuro } from "@/app/lib/utils/format";

interface MenuItemCardProps {
  readonly item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={300}
        height={200}
        className="h-48 w-full object-cover"
        priority
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <p className="mt-2 text-lg font-bold text-primary">
          {formatEuro(item.price)}
        </p>
      </div>
    </div>
  );
}
