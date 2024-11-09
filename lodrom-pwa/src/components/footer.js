// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-2 text-sm font-sans">
      <div className="container text-center mx-auto">
        © {new Date().getFullYear()} Lodrom. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
