import Link from "next/link";
import {
  RESTAURANT_NAME,
  RESTAURANT_ADDRESS,
  RESTAURANT_CITY,
  RESTAURANT_STATE,
  RESTAURANT_ZIP,
  RESTAURANT_PHONE,
  BUSINESS_HOURS,
  SOCIAL_LINKS,
} from "@/app/lib/constants";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/app/components/ui";

const socialLinks = [
  { name: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { name: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { name: "Twitter", href: SOCIAL_LINKS.twitter, Icon: TwitterIcon },
] as const;

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{RESTAURANT_NAME}</h3>
            <address className="not-italic text-muted-foreground">
              <p>{RESTAURANT_ADDRESS}</p>
              <p>
                {RESTAURANT_CITY}, {RESTAURANT_STATE} {RESTAURANT_ZIP}
              </p>
              <p>Teléfono: {RESTAURANT_PHONE}</p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Horario</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Lunes - Viernes: {BUSINESS_HOURS.weekdays}</p>
              <p>Sábado: {BUSINESS_HOURS.saturday}</p>
              <p>Domingo: {BUSINESS_HOURS.sunday}</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Síguenos</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`Visitar ${name}`}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
