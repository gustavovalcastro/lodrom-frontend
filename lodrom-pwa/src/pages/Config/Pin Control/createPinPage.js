// src/pages/CreatePINPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../../components/sideBarMenu';

function CreatePINPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
          >
            ☰ {/* Ícone de menu */}
          </button>Criar PIN</h1>
        <p className="text-gray-600">Crie um PIN numérico de 4 dígitos</p>
        
        <input
          type="password"
          maxLength="4"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="password"
          maxLength="4"
          placeholder="Confirmar PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        
        <button
          onClick={() => navigate('/control-portao')}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Salvar
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default CreatePINPage;
