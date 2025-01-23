interface Props {
  readonly currentStep: number;
}

export function StepIndicator({ currentStep }: Props) {
  const steps = [
    { number: 1, title: "Datos personales" },
    { number: 2, title: "Detalles de la reserva" },
    { number: 3, title: "Confirmación" },
  ];

  return (
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                currentStep >= step.number
                  ? "bg-amber-600 text-white ring-4 ring-amber-100"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`text-sm mt-2 font-medium ${
                currentStep >= step.number ? "text-amber-900" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-24 mx-4 mt-5 transition-all duration-200 ${
                currentStep > step.number ? "bg-amber-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
