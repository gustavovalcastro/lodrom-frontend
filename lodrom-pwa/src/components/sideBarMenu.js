import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SidebarMenu({ isOpen, onClose }) {
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState(''); // Estado para controlar a animação
  const [isVisible, setIsVisible] = useState(isOpen); // Estado para controlar a visibilidade
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass('animate-fade-in');
    } else {
      setAnimationClass('animate-fade-out');
      const timeout = setTimeout(() => setIsVisible(false), 300); // 300ms é a duração da animação
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleNavigate = (path) => {
    onClose();
    setIsSettingsDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    // Limpa os campos "refresh", "access" e "username" do localStorage
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('username');

    // Fecha o menu e redireciona para a página inicial
    onClose();
    navigate('/');
  };

  const handleSettingsDropdownToggle = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  return (
    isVisible && (
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 flex flex-col p-4 space-y-4 min-h-[calc(100vh-4rem)] w-3/4 sm:w-64 md:w-80 lg:w-96 ${animationClass}`}
      >
        <button onClick={onClose} className="self-end text-gray-600 text-2xl">
          ✕ {/* Ícone de fechar */}
        </button>

        <button onClick={() => handleNavigate('/home')} className="text-left text-gray-800 font-semibold text-lg">
          Início
        </button>

        {/* Configurações com Dropdown */}
        <div>
          <button
            onClick={handleSettingsDropdownToggle}
            className="text-left text-gray-800 font-semibold text-lg w-full flex justify-between items-center"
          >
            Configurações
            <span className="text-gray-600">{isSettingsDropdownOpen ? '▲' : '▼'}</span>
          </button>
          {isSettingsDropdownOpen && (
            <div className="pl-4 mt-2 space-y-2">
              <button onClick={() => handleNavigate('/dados-conta')} className="text-left text-gray-700 text-md w-full">
                Dados da Conta
              </button>
              <button onClick={() => handleNavigate('/redefinir-senha')} className="text-left text-gray-700 text-md w-full">
                Redefinir Senha
              </button>
              <button onClick={() => handleNavigate('/editar-pin')} className="text-left text-gray-700 text-md w-full">
                Redefinir PIN
              </button>
              <button onClick={() => handleNavigate('/criar-pin')} className="text-left text-gray-700 text-md w-full">
                Criar PIN
              </button>
            </div>
          )}
        </div>

        <button onClick={() => handleNavigate('/controle-portao')} className="text-left text-gray-800 font-semibold text-lg">
          Controle do Portão
        </button>
        <button onClick={() => handleNavigate('/recados-cadastrados')} className="text-left text-gray-800 font-semibold text-lg">
          Recados Cadastrados
        </button>
        <button onClick={() => handleNavigate('/historico')} className="text-left text-gray-800 font-semibold text-lg">
          Acessar Histórico
        </button>
        <button onClick={() => handleNavigate('/cadastrar-recado')} className="text-left text-gray-800 font-semibold text-lg">
          Cadastrar Recado
        </button>

        {/* Botão "Sair" que limpa o localStorage */}
        <button onClick={handleLogout} className="text-left text-red-500 font-semibold text-lg">
          Sair
        </button>
      </div>
    )
  );
}

export default SidebarMenu;
