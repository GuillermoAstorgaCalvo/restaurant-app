"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { RESTAURANT_NAME } from "@/app/lib/constants";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Menú", href: "/menu" },
  { name: "Reservas", href: "/reservations" },
  { name: "Contacto", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {RESTAURANT_NAME}
        </Link>
        <ul className="flex items-center gap-8">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
