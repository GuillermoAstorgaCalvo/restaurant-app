import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";

interface ProtectedLayoutProps {
  readonly children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex-1 pt-16 px-4">{children}</main>
      <Footer />
    </div>
  );
}
