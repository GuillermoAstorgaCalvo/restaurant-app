import { useState } from "react";
import { combineDateAndTime } from "@/app/lib/utils/date";
import { useReservations } from "@/app/hooks/useReservations";
import { useValidation } from "@/app/hooks/useValidation";
import { useNotifications } from "@/app/hooks/useNotifications";
import { PersonalInfo } from "./PersonalInfo";
import { ReservationDetails } from "./ReservationDetails";
import { ConfirmationStep } from "./ConfirmationStep";
import { StepIndicator } from "./StepIndicator";
import { ValidationErrors } from "./ValidationErrors";
import { Card, CardContent } from "../ui/card";
import { Alert } from "../ui/alert";
import { FormData, initialFormData } from "./types";
import { createReservationSchema } from "@/app/lib/validations/reservation";

export function ReservationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { loading, createReservation } = useReservations();
  const { errors, validate, clearError } = useValidation();
  const { notify } = useNotifications();

  const handleSubmit = async () => {
    const dateTime = combineDateAndTime(new Date(formData.date), formData.time);

    const isValid = await validate(createReservationSchema, {
      ...formData,
      date: dateTime,
    });

    if (!isValid) {
      notify("Por favor, corrige los errores antes de continuar", {
        type: "error",
      });
      return;
    }

    const success = await createReservation({
      ...formData,
      date: dateTime,
    });

    if (success) {
      setFormData(initialFormData);
      setStep(1);
      notify("¡Reserva creada con éxito!", { type: "success" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator currentStep={step} />

      {errors.length > 0 && (
        <div className="mt-6">
          <ValidationErrors errors={errors} onDismiss={clearError} />
        </div>
      )}

      <Card className="mt-8">
        <CardContent className="p-8">
          {step === 1 && (
            <>
              <Alert
                variant="info"
                title="Información personal"
                className="mb-6"
              >
                Por favor, completa tus datos de contacto
              </Alert>
              <PersonalInfo
                formData={formData}
                setFormData={setFormData}
                onNext={() => setStep(2)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <Alert
                variant="info"
                title="Detalles de la reserva"
                className="mb-6"
              >
                Selecciona la fecha y hora de tu preferencia
              </Alert>
              <ReservationDetails
                formData={formData}
                setFormData={setFormData}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            </>
          )}

          {step === 3 && (
            <ConfirmationStep
              formData={formData}
              loading={loading}
              onBack={() => setStep(2)}
              onConfirm={handleSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
