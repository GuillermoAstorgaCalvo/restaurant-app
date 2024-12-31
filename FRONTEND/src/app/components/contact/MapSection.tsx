"use client";

import { config } from "dotenv";

config();

export function MapSection() {
  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.347345280471!2d-4.43984538795598!3d36.71421837215608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f79dc085d749%3A0x9bebfdf2d91da2b5!2sMes%C3%B3n%20Astorga!5e0!3m2!1ses!2ses!4v1735598117900!5m2!1ses!2ses";

  if (!apiKey) {
    console.error("GOOGLE_MAPS_API_KEY is not defined in .env file.");
  }

  return (
    <div className="h-[450px] overflow-hidden rounded-lg bg-white shadow-lg">
      <iframe
        title="Ubicación del restaurante"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={apiKey}
      />
    </div>
  );
}
