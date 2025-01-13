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
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Herramientas</h2>
      <ul>
        <li>
          <button onClick={() => handleSectionSelect("reservations")}>
            Administrar Reservas
          </button>
        </li>
        <li>
          <button onClick={() => handleSectionSelect("menus")}>
            Administrar Menús
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
