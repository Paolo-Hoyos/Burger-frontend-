import React, { useState } from "react";
import { RiPhoneLine, RiMapPin2Line } from "react-icons/ri";

export default function ContactoDesplegable({ empresa, darkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mb-4">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-sm p-2 border rounded-xl"
      >
        <span>Información del local</span>
        <span aria-hidden>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          className={`flex flex-col items-start text-sm mt-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <RiPhoneLine className="text-lg text-red-600" />
            <span>
              <strong>Teléfono: </strong>
              {empresa?.telefono || "No disponible"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <RiMapPin2Line className="text-lg text-red-600" />
            <span>
              <strong>Ubicación: </strong>
              {empresa?.ubicacion || "No registrada"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Para usar dentro de Header (debajo del buscador):
// import ContactoDesplegable from './ContactoDesplegable';
// <ContactoDesplegable empresa={empresa} darkMode={darkMode} />
