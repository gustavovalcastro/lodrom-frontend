// src/pages/InsertPINPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function InsertPINPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-screen">
      <div className="w-full max-w-md p-4 space-y-4">
        <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
        >
            ☰ {/* Ícone de menu */}
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Inserir PIN</h1>
        
        <input
          type="password"
          maxLength="4"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        
        <button
          onClick={() => {
            if (pin === "1234") { // Exemplo de validação de PIN
              navigate('/control-portao');
            } else {
              alert("PIN incorreto");
            }
          }}
          className="w-full p-3 bg-gray-700 text-white rounded-lg flex justify-center items-center"
        >
          🔓 Abrir Portão
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default InsertPINPage;
