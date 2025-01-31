"use client";

const Sidebar = ({
  setSelectedSection,
}: {
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-gray-200 p-6 shadow-md flex flex-col">
      <h2 className="text-2xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2">
        Herramientas
      </h2>

      <ul className="space-y-4">
        <li>
          <button
            onClick={() => handleSectionSelect("reservations")}
            className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all text-white font-medium shadow"
          >
            Administrar Reservas
          </button>
        </li>
        <li>
          <button
            onClick={() => handleSectionSelect("menus")}
            className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all text-white font-medium shadow"
          >
            Administrar Menús
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
