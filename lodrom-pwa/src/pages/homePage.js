// src/pages/MenuPage.js
import React, { useState } from 'react';
import SidebarMenu from '../components/sideBarMenu';
import { useNavigate } from 'react-router-dom';

function MenuPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const username = "username"; // Substitua pelo nome real do usuário
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans relative min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 space-y-6">
        {/* Saudação e Botão de Menu Lateral */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-gray-800">
          <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
          >
            ☰ {/* Ícone de menu */}
          </button>Olá, <span className="font-bold">{username}</span>
          </h1>
        </div>

        {/* Opções principais */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => navigate('/controle-portao')}
            className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg text-gray-800 shadow-md"
          >
            <span role="img" aria-label="portao" className="text-2xl">🔒</span>
            Controle do Portão
          </button>
          <button
            onClick={() => navigate('/recados-cadastrados')}
            className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg text-gray-800 shadow-md"
          >
            <span role="img" aria-label="recados" className="text-2xl">📋</span>
            Recados Cadastrados
          </button>
          <button
            onClick={() => navigate('/historico')}
            className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg text-gray-800 shadow-md"
          >
            <span role="img" aria-label="historico" className="text-2xl">📜</span>
            Acessar Histórico
          </button>
          <button
            onClick={() => navigate('/cadastrar-recado')}
            className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg text-gray-800 shadow-md"
          >
            <span role="img" aria-label="cadastrar" className="text-2xl">✏️</span>
            Cadastrar Recado
          </button>
        </div>
      </div>

      {/* Menu Lateral */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default MenuPage;
