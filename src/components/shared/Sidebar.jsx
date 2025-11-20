import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { RiHome6Line, RiLogoutCircleRLine } from "react-icons/ri";
import { BsShieldCheck } from "react-icons/bs"; 
import { FaBook } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";


const Sidebar = ({ showMenu, darkMode }) => {
  const location = useLocation();
  const [active, setActive] = useState("/home"); // por defecto
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await fetch("https://apiricoton.cartavirtual.shop/api/empresa");
        const data = await response.json();
        setEmpresa(data); // tu API NO tiene property "data", viene directo
      } catch (error) {
        console.error("Error al cargar empresa:", error);
      }
    };

    fetchEmpresa();
  }, []);



  useEffect(() => {
    // Cada vez que cambia la ruta, actualizamos el activo
    setActive(location.pathname);
  }, [location.pathname]);

  const bgSidebar = "bg-[#141414]";
  const bgItemHover = darkMode ? "hover:bg-[#262837]" : "hover:bg-gray-100";
  const iconColor = "text-[#F0320C]";
  const textHover = "group-hover:text-white";
  const bgActive = darkMode ? "bg-[#262837]" : "bg-gray-100";
  const bgButtonActive = "bg-[#F0320C] text-white";

  const menuItems = [
    { path: "/home", icon: <RiHome6Line className="text-2xl" /> },
    { path: "/politicas", icon: <BsShieldCheck className="text-2xl" /> },
    { path: "/terminos", icon: <FaBook className="text-2xl" /> },
  ];

  return (
    <div
      className={`${bgSidebar} fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${
        showMenu ? "left-0" : "-left-full"
      }`}
    >
      {/* Sección superior: Logo + Menú */}
      <div>
        <ul className="pl-4">
          <li>
            <h1 className={`text-2xl uppercase font-bold text-center my-5 ${iconColor}`}>
              
            </h1>
          </li>

          {menuItems.map((item, index) => {
            const isActive = active === item.path;
            return (
              <li
                key={index}
                className={`p-4 rounded-tl-xl rounded-bl-xl group transition-colors cursor-pointer ${
                  isActive ? bgActive : bgItemHover
                } mt-2`}
                onClick={() => setActive(item.path)}
              >
                <Link
                  to={item.path}
                  className={`flex justify-center items-center p-4 rounded-xl transition-colors ${
                    isActive
                      ? `${bgButtonActive}`
                      : `group-hover:bg-[#F0320C] ${iconColor} group-hover:text-white`
                  }`}
                >
                  {item.icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Redes Sociales */}
      {empresa && (
    <div className="mb-6 flex flex-col items-center gap-6">
      {empresa.facebook_url && (
        <a
          href={empresa.facebook_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-3xl hover:text-[#F0320C] transition-colors"
        >
          <i className="ri-facebook-fill"></i>
        </a>
      )}

      {empresa.instagram_url && (
        <a
          href={empresa.instagram_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-3xl hover:text-[#F0320C] transition-colors"
        >
          <i className="ri-instagram-line"></i>
        </a>
      )}

      {empresa.tiktok_url && (
        <a
          href={empresa.tiktok_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-3xl hover:text-[#F0320C] transition-colors"
        >
          <i className="ri-tiktok-fill"></i>
        </a>
      )}
    </div>
)}

      {/* Sección inferior: Logout */}
      
    </div>
  );
};

export default Sidebar;
