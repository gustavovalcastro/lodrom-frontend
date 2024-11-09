// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white p-2 font-sans">
      <nav className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-lg font-bold">Lodrom</Link>
      </nav>
    </header>
  );
}

export default Header;
