import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import { Header } from "@/app/components/layout/header";
import { ConditionalFooter } from "@/app/components/layout/ConditionalFooter";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Restaurante La Maison",
  description: "Restaurante La Maison",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={inter.className} // Lock the font class name
      style={{ colorScheme: "light" }} // Lock color scheme to light
    >
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full pt-16">{children}</main>
            <ConditionalFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
