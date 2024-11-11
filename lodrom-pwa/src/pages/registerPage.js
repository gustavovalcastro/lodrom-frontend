// src/pages/RegisterPage.js
import React, { useState } from 'react';
import SidebarMenu from '../components/sideBarMenu';

function RegisterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 space-y-8">
        <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
        >
            ☰ {/* Ícone de menu */}
        </button>
        {/* Título */}
        <h1 className="text-center text-xl font-semibold text-gray-900 mb-8">
          Preencha os campos para realizar o cadastro no Lodrom!
        </h1>

        {/* Campos de entrada para o cadastro */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            placeholder="Usuário"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Botão de Cadastrar */}
        <button className="w-full py-3 mt-8 bg-gray-800 text-white rounded-lg font-semibold tracking-wide shadow-md">
          Cadastrar
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default RegisterPage;
