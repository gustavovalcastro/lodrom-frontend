// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-4rem)] font-sans">
      <div className="w-full max-w-md p-8 flex flex-col items-center relative">
        
        {/* Botão de retorno à tela inicial */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-gray-600 text-xl"
        >
          ←
        </button>

        {/* Título */}
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 tracking-widest">
          Lodrom
        </h1>

        {/* Campos de entrada */}
        <div className="w-full space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />

          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
            />
            <span className="absolute right-4 top-3 text-gray-500 cursor-pointer">
              👁️ {/* Ícone para visibilidade de senha */}
            </span>
          </div>

          {/* Link "Esqueceu a senha?" */}
          <div className="text-right">
            <a
              onClick={() => navigate('/forgotPassword')}
              className="text-gray-500 text-sm cursor-pointer"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        {/* Botão "Entrar" */}
        <button
          onClick={() => navigate('/home')}
          className="w-full py-3 mt-8 text-white bg-gray-800 rounded-lg font-semibold tracking-wide shadow-md"
        >
          Entrar
        </button>

        {/* Texto "Não possui uma conta?" com link para cadastro */}
        <div className="text-center mt-6 text-gray-600">
          <span>Não possui uma conta? </span>
          <a
            onClick={() => navigate('/register')}
            className="text-green-500 font-semibold cursor-pointer"
          >
            Crie uma agora
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
