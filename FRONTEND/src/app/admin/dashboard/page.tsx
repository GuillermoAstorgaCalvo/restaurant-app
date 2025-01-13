"use client";

import { useState } from "react";
import Sidebar from "@/app/components/admin/sidebar";
import DashboardContainer from "@/app/components/admin/DashboardContainer";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import AdminHeader from "@/app/components/admin/AdminHeader";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] =
    useState<string>("reservations");

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <AdminHeader />
        <div className="flex flex-grow">
          <Sidebar setSelectedSection={setSelectedSection} />
          <DashboardContainer selectedSection={selectedSection} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
