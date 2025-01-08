import { useEffect, useState } from "react";
import { reservationsApi } from "@/app/api/reservations";
import { Reservation } from "@/app/types/reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Spinner } from "../ui/spinner";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "../ui/button";

export function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const data = await reservationsApi.getAll();
      setReservations(data);
    } catch (error) {
      console.error("Error loading reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await reservationsApi.update(id, status);
      await loadReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{reservation.name}</h3>
                <div className="mt-1 space-y-2">
                  <p className="text-sm text-gray-600">{reservation.email}</p>
                  <p className="text-sm text-gray-600">{reservation.phone}</p>
                </div>
              </div>
              <Badge variant={getStatusVariant(reservation.status)}>
                {getStatusLabel(reservation.status)}
              </Badge>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {format(new Date(reservation.date), "d 'de' MMMM", {
                    locale: es,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {format(new Date(reservation.date), "HH:mm", { locale: es })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{reservation.guests} personas</span>
              </div>
            </div>

            {reservation.status === "pendiente" && (
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    handleStatusUpdate(reservation.id, "confirmada")
                  }
                >
                  Confirmar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleStatusUpdate(reservation.id, "cancelada")
                  }
                >
                  Cancelar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case "confirmada":
      return "success";
    case "pendiente":
      return "warning";
    case "cancelada":
      return "error";
    default:
      return "default";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "confirmada":
      return "Confirmada";
    case "pendiente":
      return "Pendiente";
    case "cancelada":
      return "Cancelada";
    case "finalizada":
      return "Finalizada";
    default:
      return status;
  }
}
