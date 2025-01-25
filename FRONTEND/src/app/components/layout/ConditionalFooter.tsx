"use client";

import { Footer } from "@/app/components/layout/footer";
import { usePathname } from "next/navigation";

export function ConditionalFooter() {
  const pathname = usePathname();

  // Routes where the footer should NOT appear
  const excludedFooterRoutes = ["/admin/dashboard", "/admin/login"];

  // Check if the current route starts with any of the excluded routes
  const shouldRenderFooter = !excludedFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!shouldRenderFooter) return null;

  return <Footer />;
}
