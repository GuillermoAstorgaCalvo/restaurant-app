import { AddressSection } from "../components/contact/AdressSection";
import { BusinessHoursSection } from "../components/contact/BusinessHoursSection";
import { ContactDetailsSection } from "../components/contact/ContactDetailsSection";
import { MapSection } from "../components/contact/MapSection";

export default function ContactPage() {
  return (
    <div className="container py-24">
      <h1 className="mb-12 text-center text-4xl font-bold">Contacto</h1>
      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <AddressSection />
          <BusinessHoursSection />
          <ContactDetailsSection />
        </div>
        <MapSection />
      </div>
    </div>
  );
}
