import React from "react";

export default function CategoriasCarrusel({ categories, selectedCategory, onSelectCategory, darkMode }) {
  return (
    <nav
      className={`px-2 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b ${
        darkMode ? "text-gray-300" : "text-black"
      } md:overflow-visible md:flex-wrap md:gap-4`}
    >
      <button
        onClick={() => onSelectCategory("Todos")} 
        className={`relative py-2 px-4 whitespace-nowrap ${
          selectedCategory === "Todos"
            ? "text-[#ec7c6a] before:w-1/2 before:h-[2px] before:absolute before:bg-[#ec7c6a] before:left-0 before:rounded-full before:-bottom-[1px]"
            : ""
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id_categoria}
          onClick={() => onSelectCategory(cat.id_categoria)}
          className={`relative py-2 px-4 whitespace-nowrap ${
            selectedCategory === cat.id_categoria
              ? "text-[#ec7c6a] before:w-1/2 before:h-[2px] before:absolute before:bg-[#ec7c6a] before:left-0 before:rounded-full before:-bottom-[1px]"
              : ""
          }`}
        >
          {cat.nombre}
        </button>
      ))}
    </nav>
  );
}
