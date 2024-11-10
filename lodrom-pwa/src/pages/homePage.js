// src/pages/MenuPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuPage() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();
  const username = "username"; // Substitua pelo nome real do usuário

  const handleOverlayToggle = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleNavigate = (path) => {
    setIsOverlayOpen(false);
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen font-sans relative min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 space-y-6">
        
        {/* Saudação e Botão de Menu Lateral */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleOverlayToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
          >
            ☰ {/* Ícone de menu */}
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">
            Olá, <span className="font-bold">{username}</span>
          </h1>
        </div>

        {/* Opções principais */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => navigate('/control-portao')}
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

      {/* Overlay lateral responsivo */}
      {isOverlayOpen && (
        <div className="fixed top-0 left-0 h-full bg-white shadow-lg z-50 flex flex-col p-4 space-y-4 min-h-[calc(100vh-4rem)] w-3/4 sm:w-64 md:w-80 lg:w-96">
          <button
            onClick={handleOverlayToggle}
            className="self-end text-gray-600 text-2xl"
          >
            ✕ {/* Ícone de fechar */}
          </button>
          <button
            onClick={() => handleNavigate('/home')}
            className="text-left text-gray-800 font-semibold text-lg"
          >
            Início
          </button>
          <button
            onClick={() => handleNavigate('/configuracoes')}
            className="text-left text-gray-800 font-semibold text-lg"
          >
            Configurações
          </button>
          <button
            onClick={() => handleNavigate('/')}
            className="text-left text-gray-800 font-semibold text-lg"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
