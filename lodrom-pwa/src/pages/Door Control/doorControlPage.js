// src/pages/DoorControlPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

const historicoAbertura = [
  { data: '11/11/2024', hora: '23:59:00', usuario: 'hernane' },
  { data: '10/11/2024', hora: '23:59:00', usuario: 'matheus' },
  { data: '09/11/2024', hora: '23:59:00', usuario: 'joão' },
];

function DoorControlPage() {
  const navigate = useNavigate();

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
        <h1 className="text-2xl font-semibold text-gray-800">Controle de portão</h1>
        
        <button
          onClick={() => navigate('/inserir-pin')}
          className="w-full p-3 bg-gray-200 rounded-lg text-gray-800 shadow-md flex justify-center items-center"
        >
          🔓 Abrir Portão
        </button>
        
        <h2 className="text-lg font-semibold text-gray-700 mt-6">Últimas aberturas do portão</h2>
        <div className="space-y-2">
          {historicoAbertura.map((entrada, index) => (
            <div key={index} className="text-gray-600 p-2 border-b">
              <p>{entrada.data} às {entrada.hora}</p>
              <p>Aberto por {entrada.usuario}</p>
            </div>
          ))}
        </div>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default DoorControlPage;
