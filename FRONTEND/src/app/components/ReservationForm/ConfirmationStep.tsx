import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FormData } from "./types";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check, CalendarDays, Users, Phone, Mail } from "lucide-react";
import { Alert } from "../ui/alert";

interface Props {
  formData: FormData;
  loading: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

export function ConfirmationStep({
  formData,
  loading,
  onBack,
  onConfirm,
}: Readonly<Props>) {
  const formattedDate = formData.date
    ? format(new Date(formData.date), "EEEE d 'de' MMMM 'de' yyyy", {
        locale: es,
      })
    : "";

  return (
    <div className="space-y-6">
      <Alert variant="success" title="Confirma tu reserva" className="mb-6">
        Revisa los detalles antes de confirmar tu reserva
      </Alert>

      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">
                Resumen de la reserva
              </h3>
              <Badge variant="warning" className="mt-1">
                Pendiente de confirmación
              </Badge>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">{formData.name}</p>
                <p className="text-sm text-gray-600">
                  {formData.guests} personas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">{formattedDate}</p>
                <p className="text-sm text-gray-600">{formData.time}h</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <p className="text-gray-900">{formData.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <p className="text-gray-900">{formData.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          className="flex-1"
        >
          Atrás
        </Button>
        <Button onClick={onConfirm} disabled={loading} className="flex-1">
          {loading ? "Confirmando..." : "Confirmar reserva"}
        </Button>
      </div>
    </div>
  );
}
