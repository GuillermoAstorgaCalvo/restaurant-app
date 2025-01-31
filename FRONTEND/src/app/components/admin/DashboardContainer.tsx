"use client";

import Feature from "@/app/components/admin/Feature";

const DashboardContainer = ({
  selectedSection,
}: {
  selectedSection: string;
}) => {
  return (
    <div
      className="flex-1 p-8 relative bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/admin/admin-background.webp')`,
      }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative z-10 p-6">
        <Feature section={selectedSection} />
      </div>
    </div>
  );
};

export default DashboardContainer;
