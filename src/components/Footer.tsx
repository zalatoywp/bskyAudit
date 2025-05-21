import React from 'react';
import { GithubIcon } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-[#7d7878] text-center mt-[30px] mb-[10px] text-[10px] font-bold">
      <a 
        href="#" 
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline text-[#7d7878] hover:text-[#FC6704] transition-colors duration-300"
      >
        Zalatoy {currentYear} | <GithubIcon className="inline" size={10} />
      </a>
    </footer>
  );
};

export default Footer;