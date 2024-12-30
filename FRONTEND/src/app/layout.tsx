import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import "@/app/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "La Maison - Restaurante",
  description: "Alta cocina y reservas",
} as const;

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
