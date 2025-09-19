"use client";

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link href="/">SeuNome</Link>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">Sobre</Link>
        <Link href="/projects">Projetos</Link>
        <Link href="/contact">Contato</Link>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
        aria-label="Menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-purple-800 flex flex-col items-center space-y-4 py-4">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>Sobre</Link>
          <Link href="/projects" onClick={() => setIsOpen(false)}>Projetos</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contato</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
