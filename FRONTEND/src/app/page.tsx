import { Hero } from "@/app/components/home/hero";
import { Features } from "@/app/components/home/features";
import { Menu } from "@/app/components/home/menu";

export const metadata = {
  public: true, // Indicates this is a public page
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Menu />
    </main>
  );
}
