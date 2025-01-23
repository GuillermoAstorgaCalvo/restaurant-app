import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import { Header } from "@/app/components/layout/header";
import { ConditionalFooter } from "@/app/components/layout/ConditionalFooter";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Restaurante La Maison",
  description: "Your app description here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 w-full pt-16">{children}</main>
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
}
