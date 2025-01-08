import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";

interface PublicLayoutProps {
  readonly children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
