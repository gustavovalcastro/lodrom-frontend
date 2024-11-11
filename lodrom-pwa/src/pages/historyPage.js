// src/pages/HistoryPage.js
import React, { useState } from 'react';
import SidebarMenu from '../components/sideBarMenu';

const historicoData = [
  {
    data: '30-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado por hernane' },
      { hora: '20:50:00', descricao: 'Portão destravado pelo gancho' },
      { hora: '20:49:58', descricao: 'Interfone foi atendido' },
      { hora: '20:49:00', descricao: 'Interfone tocou' },
    ],
  },
  {
    data: '29-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado pelo gancho' },
      { hora: '20:50:00', descricao: 'Portão destravado por matheus' },
      { hora: '19:50:10', descricao: 'Recados foram anunciados' },
      { hora: '19:49:00', descricao: 'Interfone tocou' },
    ],
  },
  {
    data: '28-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado por Pedro' },
    ],
  },
  {
    data: '27-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado por Gustavo' },
      { hora: '19:50:10', descricao: 'Recados foram anunciados' },
      { hora: '19:49:00', descricao: 'Interfone tocou' },
    ],
  },
  {
    data: '26-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado por João' },
      { hora: '23:59:00', descricao: 'Portão destravado por Gustavo' },
      { hora: '19:50:10', descricao: 'Recados foram anunciados' },
      { hora: '19:49:00', descricao: 'Interfone tocou' },
    ],
  },
  {
    data: '26-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado por Hernane' },
      { hora: '23:59:00', descricao: 'Portão destravado por Pedro' },
      { hora: '19:50:10', descricao: 'Recados foram anunciados' },
      { hora: '19:49:00', descricao: 'Interfone tocou' },
    ],
  },
  {
    data: '26-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado por João' },
      { hora: '23:59:00', descricao: 'Portão destravado por Gustavo' },
      { hora: '19:50:10', descricao: 'Recados foram anunciados' },
      { hora: '19:49:00', descricao: 'Interfone tocou' },
    ],
  },
  {
    data: '28-11-2024',
    eventos: [
      { hora: '23:59:00', descricao: 'Portão destravado por hernane' },
    ],
  },
];
function HistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="w-full max-w-md p-4">
        <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
        >
            ☰ {/* Ícone de menu */}
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Histórico</h1>

        {/* Container rolável para o conteúdo */}
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto space-y-4 mt-4">
          {historicoData.map((dia, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">{dia.data}</h2>
              <div className="space-y-1">
                {dia.eventos.map((evento, i) => (
                  <div key={i} className="p-2 bg-gray-200 rounded-md shadow-sm">
                    <span className="font-mono text-sm text-gray-600">{evento.hora}</span>
                    <p className="text-gray-800">{evento.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default HistoryPage;
