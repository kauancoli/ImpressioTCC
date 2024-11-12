import { motion, useAnimation } from "framer-motion";
import { List, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NavbarItemProps = {
  text: string;
  href: string;
};

const NavbarItem: React.FC<NavbarItemProps> = ({ text, href }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <motion.div
      className="cursor-pointer p-2 transition duration-300 ease-in-out transform hover:scale-[1.02]"
      animate={controls}
    >
      <Link to={href}>
        <span className="text-white text-sm font-bold hover:text-gray-500 uppercase p-2">
          {text}
        </span>
      </Link>
    </motion.div>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="p-3 bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src="/logo-full.svg" alt="Logo" className="h-8" />
          </Link>
          <div className="hidden lg:flex space-x-4">
            <NavbarItem text="Explorar" href="/" />
            <NavbarItem text="Adicionar" href="/add" />
          </div>
        </div>

        <div className="hidden lg:flex flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full h-10 px-10 text-black rounded-lg focus:outline-none"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <MagnifyingGlass size={20} />
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-4 ml-auto">
          <Link to="/login">
            <button className="bg-primary text-background px-6 py-2 rounded-2xl hover:opacity-80 transition font-medium">
              Entrar
            </button>
          </Link>

          <Link to={"/register"}>
            <button className="bg-background border border-primary text-white px-4 py-2 rounded-2xl hover:opacity-70 transition">
              Criar Conta
            </button>
          </Link>
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <List size={24} className="text-white" />
          </button>
        </div>
      </div>

      {!isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col mt-4 space-y-4 bg-gray-800 p-4 rounded-lg">
          <NavbarItem text="Explorar" href="/" />
          <NavbarItem text="Adicionar" href="/add" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full h-10 px-4 text-black rounded-lg focus:outline-none"
          />
          <div className="flex flex-col space-y-2">
            <Link to="/login">
              <button className="bg-primary text-background w-full py-2 rounded-lg hover:opacity-80 transition font-medium">
                Entrar
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-background border border-primary text-white w-full py-2 rounded-lg hover:opacity-70 transition">
                Criar Conta
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
