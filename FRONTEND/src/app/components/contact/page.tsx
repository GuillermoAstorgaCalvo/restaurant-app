import { Mail, MapPin, Phone } from "lucide-react";
import {
  RESTAURANT_NAME,
  RESTAURANT_ADDRESS,
  RESTAURANT_CITY,
  RESTAURANT_STATE,
  RESTAURANT_ZIP,
  RESTAURANT_PHONE,
  BUSINESS_HOURS,
} from "@/app/lib/constants";

export default function ContactPage() {
  const mapAddress = encodeURIComponent(
    `${RESTAURANT_ADDRESS}, ${RESTAURANT_CITY}, ${RESTAURANT_STATE} ${RESTAURANT_ZIP}`,
  );

  return (
    <div className="container py-24">
      <h1 className="mb-12 text-center text-4xl font-bold">Contacto</h1>
      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Ubicación</h2>
            <div className="flex items-start space-x-4">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <address className="not-italic">
                <p>{RESTAURANT_ADDRESS}</p>
                <p>
                  {RESTAURANT_CITY}, {RESTAURANT_STATE} {RESTAURANT_ZIP}
                </p>
              </address>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Horario</h2>
            <div className="space-y-2">
              <p>Lunes - Viernes: {BUSINESS_HOURS.weekdays}</p>
              <p>Sábado: {BUSINESS_HOURS.saturday}</p>
              <p>Domingo: {BUSINESS_HOURS.sunday}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-primary" />
                <span>{RESTAURANT_PHONE}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-primary" />
                <span>
                  info@{RESTAURANT_NAME.toLowerCase().replace(" ", "")}.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[450px] overflow-hidden rounded-lg bg-white shadow-lg">
          <iframe
            title="Ubicación del restaurante"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${mapAddress}&zoom=15`}
          />
        </div>
      </div>
    </div>
  );
}
