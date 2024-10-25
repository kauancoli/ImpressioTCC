import { motion, useAnimation } from "framer-motion";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect } from "react";

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
      <a
        href={href}
        className="text-white 
        2xl:text-sm 
        lg:text-xs
        text-md
        
        font-bold hover:text-gray-500 uppercase p-2"
      >
        {text}
      </a>
    </motion.div>
  );
};

export const Navbar = () => {
  return (
    <nav className="p-3">
      <div className="container mx-auto flex items-center">
        <div className="flex items-center space-x-0 lg:space-x-4">
          <div>
            <a href="/">
              <img src="/logo-full.svg" alt="Logo" className="h-8" />
            </a>
          </div>
          <NavbarItem text="Explorar" href="/" />
          <NavbarItem text="Adicionar" href="/" />
        </div>

        <div
          className="flex-grow mx-4 relative 
        lg:block hidden"
        >
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full h-10 px-10 text-black rounded-lg focus:outline-none"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <MagnifyingGlass size={20} />
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <a href="/login">
            <button className="bg-primary text-background px-6 py-2 rounded-2xl hover:opacity-80 transition font-medium">
              Entrar
            </button>
          </a>
          <button className="bg-background border border-primary text-white px-4 py-2 rounded-2xl hover:opacity-70 transition">
            Criar Conta
          </button>
        </div>
      </div>
    </nav>
  );
};
