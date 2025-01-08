import { Inter } from "next/font/google";
import PublicLayout from "@/app/layouts/PublicLayout";
import ProtectedLayout from "@/app/layouts/ProtectedLayout";
import { Providers } from "@/app/providers";
import "@/app/styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

interface RootLayoutProps {
  readonly children: React.ReactNode;
  readonly isPublic?: boolean;
}

export default function RootLayout({
  children,
  isPublic = true,
}: RootLayoutProps) {
  const Layout = isPublic ? PublicLayout : ProtectedLayout;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Restaurante La Maison</title>
        <meta name="description" content="Your app description here" />
        {}
      </head>
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
