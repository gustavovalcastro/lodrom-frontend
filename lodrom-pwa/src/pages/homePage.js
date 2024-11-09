// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';

function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false); // Inicia o efeito de fade-out da tela de splash
      setTimeout(() => setShowSplash(false), 500); // Aguarda o fade-out e troca a tela
    }, 3000); // 3 segundos de splash screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-200 min-h-[calc(100vh-5rem)] font-sans">
      <div className="bg-black rounded-[35px] p-4 w-full max-w-sm max-h-[50vh] min-h-[calc(92vh-4rem)] flex items-center justify-center">
        <div className="bg-white w-full rounded-[30px] border border-gray-300 shadow-lg relative overflow-hidden flex flex-col h-full p-4">
          {/* Notch do celular */}
          <div className="absolute top-0 w-full h-3 bg-gray-300 rounded-b-lg"></div>

          {/* Título com animação */}
          <div
            className={`transition-all duration-500 absolute left-0 right-0 flex justify-center ${fade ? 'top-1/2 transform -translate-y-1/2' : 'top-8 transform-none'
              }`}
          >
            <h1 className="text-2xl font-bold text-gray-800 tracking-widest">Lodrom</h1>
          </div>

          {/* Conteúdo principal */}
          {!showSplash && (
            <div className="flex flex-col justify-end h-full pt-24">
              {/* Espaço flexível para manter os botões na parte inferior */}
              <div className="flex-grow"></div>

              {/* Botões com fade-in */}
              <div className="flex flex-col items-center w-full space-y-3 mb-6">
                <button className="w-full py-2 text-white bg-gray-800 rounded-lg font-semibold tracking-wider shadow-md">
                  Entrar
                </button>
                <button className="w-full py-2 text-gray-800 bg-white border border-gray-800 rounded-lg font-semibold tracking-wider shadow-sm">
                  Cadastrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
