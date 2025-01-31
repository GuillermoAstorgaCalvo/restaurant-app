import { FormData } from "./types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormField, FormLabel } from "../ui/form";
import { User, Mail, Phone } from "lucide-react";

interface Props {
  readonly formData: FormData;
  readonly setFormData: (data: FormData) => void;
  readonly onNext: () => void;
}

export function PersonalInfo({ formData, setFormData, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField>
        <FormLabel htmlFor="name" required>
          Nombre completo
        </FormLabel>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="name"
            className="pl-10"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Juan Pérez"
          />
        </div>
      </FormField>

      <FormField>
        <FormLabel htmlFor="email" required>
          Correo electrónico
        </FormLabel>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            className="pl-10"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            placeholder="juan@ejemplo.com"
          />
        </div>
      </FormField>

      <FormField>
        <FormLabel htmlFor="phone" required>
          Teléfono
        </FormLabel>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="phone"
            type="tel"
            className="pl-10"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
            placeholder="+34 600 000 000"
          />
        </div>
      </FormField>

      <Button type="submit" className="w-full">
        Siguiente
      </Button>
    </form>
  );
}
