"use client";

import ReservationManagement from "@/app/components/admin/ReservationManagement";
import AdminMenuManagement from "@/app/components/admin/MenuManagement";

const Feature = ({ section }: { section: string }) => {
  return (
    <div>
      {section === "reservations" && <ReservationManagement />}
      {section === "menus" && <AdminMenuManagement />}
    </div>
  );
};

export default Feature;
