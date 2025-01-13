"use client";

import ReservationManagement from "@/app/components/admin/ReservationManagement";

const Feature = ({ section }: { section: string }) => {
  return (
    <div>
      {section === "reservations" && <ReservationManagement />}
      {section === "menus" && <div>Manage your menu items here</div>}
    </div>
  );
};

export default Feature;
