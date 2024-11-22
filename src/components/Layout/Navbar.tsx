import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContextType";
import { motion, useAnimation } from "framer-motion";
import { CaretDown, List, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarItemProps {
  text: string;
  href: string;
}

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
  const { user, signOut } = useAuth();
  const { search, setSearch, isMainPage } = useSearch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="p-3 bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img src="/logo-full.svg" alt="Logo" className="h-8" />
          </Link>
          <div className="hidden lg:flex space-x-4">
            <NavbarItem text="Explorar" href="/" />
            <NavbarItem text="Adicionar" href="/add" />
          </div>
        </div>

        {isMainPage && (
          <div className="hidden lg:flex flex-grow mx-4 relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={handleSearch}
              className="w-full h-10 px-10 text-black rounded-lg focus:outline-none"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <MagnifyingGlass size={20} />
            </div>
          </div>
        )}

        <div className="hidden lg:flex items-center space-x-4 ml-auto">
          {user ? (
            <div className="flex items-center gap-2">
              <p className="text-white text-sm">{user.apelido}</p>
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center focus:outline-none gap-2"
                >
                  {user.imagemUsuario ? (
                    <img
                      src={user.imagemUsuario}
                      alt={user.apelido || "Avatar"}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary">
                      <span className="text-background text-lg font-bold">
                        {user.apelido?.[0].toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div>
                    <CaretDown size={20} className="text-white" />
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Ver Perfil
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Deslogar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-primary text-background px-6 py-2 rounded-2xl hover:opacity-80 transition font-medium">
                  Entrar
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-background border border-primary text-white px-4 py-2 rounded-2xl hover:opacity-70 transition">
                  Criar Conta
                </button>
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <List size={24} className="text-white" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col mt-4 space-y-4 bg-gray-800 p-4 rounded-lg">
          <NavbarItem text="Explorar" href="/" />
          <NavbarItem text="Adicionar" href="/add" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={handleSearch}
            className="w-full h-10 px-4 text-black rounded-lg focus:outline-none"
          />
          <div className="flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="bg-primary text-background w-full py-2 rounded-lg hover:opacity-80 transition font-medium text-center"
                >
                  Ver Perfil
                </Link>
                <button
                  onClick={signOut}
                  className="bg-red-500 text-white w-full py-2 rounded-lg hover:opacity-80 transition"
                >
                  Deslogar
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
