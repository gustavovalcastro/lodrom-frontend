// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import SidebarMenu from '../components/sideBarMenu';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 space-y-8">
        {/* Botão de retorno à tela inicial */}
        <button
          onClick={() => navigate('/login')}
          className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
        >
          ←
        </button>

        {/* Título */}
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">Esqueceu sua senha?</h1>

        {/* Campos de entrada para o código de recuperação */}
        <div className="space-y-4">
          <input
            type="text"
            maxLength="1"
            className="w-full px-4 py-3 text-center rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            maxLength="1"
            className="w-full px-4 py-3 text-center rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            maxLength="1"
            className="w-full px-4 py-3 text-center rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            maxLength="1"
            className="w-full px-4 py-3 text-center rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
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

export default ForgotPasswordPage;
