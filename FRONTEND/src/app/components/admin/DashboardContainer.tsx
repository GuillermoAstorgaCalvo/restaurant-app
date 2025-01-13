"use client";

import Feature from "@/app/components/admin/Feature";

const DashboardContainer = ({
  selectedSection,
}: {
  selectedSection: string;
}) => {
  return (
    <div className="flex-1 p-8">
      <Feature section={selectedSection} />
    </div>
  );
};

export default DashboardContainer;
