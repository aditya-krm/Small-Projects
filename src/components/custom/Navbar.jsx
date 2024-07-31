import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaBars } from "react-icons/fa";

function Navbar({ toggleSidebar }) {
  return (
    <header className="shadow sticky z-50 top-0 ">
      <nav className="flex items-center justify-between bg-slate-800 p-4">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl text-white">
            Small Projects
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li className="hidden md:block">
            <a
              href="https://github.com/aditya-krm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Github
            </a>
          </li>
          <li className="hidden md:block">
            <a
              href="https://www.linkedin.com/in/aditya-karmakar-a0342b15a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              LinkedIn
            </a>
          </li>
          <li className="hidden md:block">
            <a
              href="https://x.com/Aditya_KMK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Twitter
            </a>
          </li>
          <li className="md:hidden">
            <a
              href="https://github.com/aditya-krm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaGithub />
            </a>
          </li>
          <li className="md:hidden">
            <a
              href="https://www.linkedin.com/in/aditya-karmakar-a0342b15a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaLinkedin />
            </a>
          </li>
          <li className="md:hidden">
            <a
              href="https://x.com/Aditya_KMK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaTwitter />
            </a>
          </li>
          <li className="md:hidden">
            <button onClick={toggleSidebar} className="text-white">
              <FaBars />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
