// src/pages/ForgotPasswordPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 space-y-8">
        {/* Botão de Voltar */}
        <button
          onClick={() => navigate('/login')}
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
    </div>
  );
}

export default ForgotPasswordPage;
