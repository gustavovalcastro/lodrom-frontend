// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Finaliza a tela de splash e exibe o conteúdo principal
    }, 3000); // Splash screen de 3 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 flex flex-col items-center ">
        {/* Título com efeito de arrastar para cima sem desaparecer */}
        <h1
          className={`text-4xl font-bold text-gray-800 tracking-widest mb-12 transition-all duration-700 ${
            showSplash ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-100'
          }`}
        >
          Lodrom
        </h1>

        {/* Conteúdo principal: Botões com efeito de revelação */}
        <div
          className={`flex flex-col items-center w-full space-y-4 transition-all duration-700 ${
            showSplash ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 text-white bg-gray-800 rounded-lg font-semibold tracking-wide shadow-md"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full py-3 text-gray-800 bg-white border border-gray-800 rounded-lg font-semibold tracking-wide shadow-sm"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
