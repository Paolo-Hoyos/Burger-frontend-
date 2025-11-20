import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiHome6Line,
  RiAddLine,
  RiTimeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiShoppingCart2Line,
} from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import Sidebar from "../../components/shared/Sidebar";
import Car from "../../components/shared/Car1";
import Header from "../../components/shared/Header";
import Card from "../../components/shared/Card";
import { motion, AnimatePresence } from "framer-motion";

const Home = ({ addToCart, cart, setCart }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [bannerUrl, setBannerUrl] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [horario, setHorario] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [empresaNombre, setEmpresaNombre] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const videoRef = useRef(null);

  // 🔹 Cargar productos
  useEffect(() => {
    fetch("https://apiricoton.cartavirtual.shop/api/producto")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  // 🔹 Recursos empresa (logo, portada)
  useEffect(() => {
    fetch("https://apiricoton.cartavirtual.shop/api/recursos-empresa")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.portada_url)
            setBannerUrl(`https://apiricoton.cartavirtual.shop/${data.portada_url}`);
          if (data.logo_url)
            setLogoUrl(`https://apiricoton.cartavirtual.shop/${data.logo_url}`);
        }
      })
      .catch(() => {});
  }, []);

  // 🔹 Datos empresa (nombre, horario, video)
  useEffect(() => {
    fetch("https://apiricoton.cartavirtual.shop/api/empresa")
      .then((res) => res.json())
      .then((data) => {
        setEmpresa(data); // << guarda todo el objeto
        
        if (data.nombre) setEmpresaNombre(data.nombre);
        if (data.horario) setHorario(data.horario);
        if (data.video_pres_url) setVideoUrl(data.video_pres_url);
      })
      .catch(() => {});
  }, []);

  // 🔹 Título dinámico + favicon
  useEffect(() => {
    if (empresaNombre) document.title = `${empresaNombre} / Home`;
    if (logoUrl) {
      const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
      favicon.rel = "icon";
      favicon.href = logoUrl;
      document.head.appendChild(favicon);
    }
  }, [empresaNombre, logoUrl]);

  // 🔹 Splash
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (videoUrl) setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };
  const handlePrev = () => {
    if (videoUrl) setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  // 🔹 Filtro
  let filteredProducts = products;
  if (searchTerm.trim() !== "") {
    filteredProducts = products.filter((p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (selectedCategory !== "Todos") {
    filteredProducts = products.filter(
      (p) => p.id_categoria === selectedCategory
    );
  }

  if (showSplash) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            className="w-48 h-auto object-contain"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#262837] text-gray-300" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar showMenu={showMenu} darkMode={darkMode} />
      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        darkMode={darkMode}
        cart={cart}
        setCart={setCart}
      />

      {/* ✅ NAV MÓVIL NUEVO (igual que Politica, con carrito añadido) */}
      <nav
        className={`lg:hidden fixed w-full bottom-0 left-0 text-2xl py-3 px-6 flex items-center justify-around z-20 border-t ${
          darkMode
            ? "bg-[#1F1D2B] border-gray-700 text-gray-400"
            : "bg-white shadow-lg border-gray-200 text-gray-700"
        }`}
      >
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            darkMode
              ? "text-amber-400 bg-amber-900/30"
              : "text-amber-600 bg-amber-100"
          }`}
        >
          <RiHome6Line className="text-2xl" />
          <span className="text-xs mt-1">Inicio</span>
        </button>

        <button
          onClick={() => navigate("/terminos")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-black hover:text-gray-800"
          }`}
        >
          <FaBook className="text-xl" />
          <span className="text-xs mt-1">Términos</span>
        </button>

        <button
          onClick={() => navigate("/politicas")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-black hover:text-gray-800"
          }`}
        >
          <BsShieldCheck className="text-2xl" />
          <span className="text-xs mt-1">Privacidad</span>
        </button>

        <button
          onClick={() => setShowOrder(true)}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-black hover:text-gray-800"
          }`}
        >
          <RiShoppingCart2Line className="text-2xl" />
          <span className="text-xs mt-1">Carrito</span>
        </button>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          <Header
            darkMode={darkMode}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSearch={setSearchTerm}
          />

          {selectedCategory === "Todos" && searchTerm.trim() === "" && bannerUrl && (
            <div className="relative w-full mb-24">
              <AnimatePresence mode="wait">
                {currentIndex === 0 ? (
                  <motion.img
                    key="banner"
                    src={bannerUrl}
                    alt="Banner"
                    className="w-full rounded-lg shadow-md mx-auto object-cover 
                               h-48 sm:h-64 md:h-80 lg:h-[450px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                ) : (
                  videoUrl &&
                  videoUrl.includes("youtube") && (
                    <motion.iframe
                      key="video"
                      ref={videoRef}
                      className="rounded-lg shadow-md w-full 
                                 h-48 sm:h-64 md:h-80 lg:h-[450px]"
                      src={`${videoUrl.replace("watch?v=", "embed/")}?enablejsapi=1`}
                      title="Presentación"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    ></motion.iframe>
                  )
                )}
              </AnimatePresence>

              {/* Contenedor bajo banner */}
              <div
                className="absolute left-30px right-0 mx-auto rounded-2xl shadow-lg 
                          flex flex-col items-center justify-center 
                          px-6 py-4 gap-1"
                style={{
                  backgroundColor: "#ffffff",
                  bottom: "-50px",
                  width: "fit-content",
                  maxWidth: "90%",
                }}
              >
                {/* Horario visible en todas las pantallas */}
                <div className="flex flex-col text-black justify-center items-center">
                  <div className="flex items-center gap-2 text-base md:text-lg font-semibold justify-center">
                    <RiTimeLine className="text-xl md:text-2xl text-[#F0320C]" />
                    <span>Hora de atención</span>
                  </div>

                  <span className="text-sm md:text-base font-medium text-center">
                    {horario || "Lunes a Domingo: 10:00 a.m. - 11:00 p.m."}
                  </span>
                </div>
              </div>

            </div>
          )}

          <Card darkMode={darkMode} products={filteredProducts} addToCart={addToCart} selectedCategory={selectedCategory} />
        </div>
      </main>
      {/* FOOTER */}
          <footer className="py-6 text-center text-sm mt-10">
            <p>
              © {new Date().getFullYear()}{" "}
              {empresa ? empresa.nombre : "Cargando..."}. Todos los derechos
              reservados.
            </p>
            {empresa && (
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-xs max-w-xl mx-auto">
                {empresa.ubicacion}
              </p>
            )}
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="/terminos"
                className="hover:text-amber-500 transition-colors"
              >
                Términos de Servicio
              </a>
              <span>•</span>
              <a href="/politicas" className="text-amber-500 font-medium">
                Política de Privacidad
              </a>
            </div>
          </footer>
    </div>
  );
};

export default Home;
