"use client";

import { motion } from "framer-motion";
import { smoothFadeIn } from "@/app/animations/index";
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
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("/images/reservations/reservations-background.webp")',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur"></div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="container max-w-2xl px-4">
          <motion.div
            variants={smoothFadeIn}
            initial="hidden"
            animate="visible"
          >
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
          </motion.div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
