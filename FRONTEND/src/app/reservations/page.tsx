import { ReservationForm } from "@/app/components/reservations/ReservationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Toaster } from "@/app/components/ui/sonner";

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container max-w-2xl px-4">
        <Card className="backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">
              Reserva tu mesa
            </CardTitle>
            <CardDescription className="text-lg">
              Completa el formulario para hacer tu reserva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReservationForm />
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
