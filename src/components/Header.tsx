import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center w-fit text-center bg-[#383838] rounded-[20px] mx-auto mt-[5px] p-[5px_10px] text-[15px]">
      <nav>
        <a 
          href="#" 
          className="text-white no-underline mx-[1em] transition-colors duration-300 hover:text-[#FC6704]"
        >
          Inicio
        </a>
        <a 
          href="#" 
          className="text-white no-underline mx-[1em] transition-colors duration-300 hover:text-[#FC6704]"
        >
          Acerca de
        </a>
        <a 
          href="#" 
          className="text-white no-underline mx-[1em] transition-colors duration-300 hover:text-[#FC6704]"
        >
          Contacto
        </a>
        <a 
          href="#" 
          className="text-white no-underline mx-[1em] transition-colors duration-300 hover:text-[#FC6704]"
        >
          Login
        </a>
      </nav>
    </header>
  );
};

export default Header;