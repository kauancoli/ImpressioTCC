import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

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
      className="cursor-pointer p-2 transition duration-300 ease-in-out transform hover:scale-10"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <a
        href={href}
        className="text-white 2xl:text-sm xl:text-xs lg:text-[0.65rem] font-bold hover:text-gray-500 uppercase p-2"
      >
        {text}
      </a>
    </motion.div>
  );
};

export const Navbar = () => {
  return (
    <nav className="p-8">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center 2xl:space-x-8 xl:space-x-2lg:space-x-0">
          <div>
            <a href="#">
              <img src="/logo-full.svg" alt="Logo" className="h-8" />
            </a>
          </div>
          <NavbarItem text="Explorar" href="#" />
          <NavbarItem text="Explorar" href="#" />
          <NavbarItem text="Explorar" href="#" />
          <NavbarItem text="Explorar" href="#" />
        </div>
      </div>
    </nav>
  );
};
