"use client";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary p-4 flex flex-col justify-between items-center md:flex-row">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="text-white hover:text-gray-300">
          <h1 className="text-white text-lg">Aluguel de Carros</h1>
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
        <ul className="md:flex items-center md:space-x-4">
          <li>
            <Link href="/cores" className="text-white hover:text-gray-300">
              Cores
            </Link>
          </li>
          <li>
            <Link href="/carros" className="text-white hover:text-gray-300">
              Carros
            </Link>
          </li>
          <li>
            <Link href="/clientes" className="text-white hover:text-gray-300">
              Clientes
            </Link>
          </li>
          <li>
            <Link href="/aluguel" className="text-white hover:text-gray-300">
              Aluguel
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
