// src/pages/NotesPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

const recadosData = [
  {
    id: 1,
    mensagem: 'Olá! Aguarde um instante para ser atendido.',
    inicio: '17:00',
    fim: null,
    diasSemana: ['DOM', 'SEG', 'TER'],
    cadastradoPor: 'hernane',
    dataCadastro: '16/11/2024',
  },
  {
    id: 2,
    mensagem: 'Estou disponível de terça a sábado no horário da manhã.',
    inicio: '17:00',
    fim: '19:00',
    diasSemana: ['DOM', 'SEG', 'TER'],
    cadastradoPor: 'matheus',
    dataCadastro: '14/11/2024',
  },
];


function NotesPage() {
  const navigate = useNavigate();
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
          </button>Recados</h1>
        <button
          onClick={() => navigate('/cadastrar-recado')}
          className="flex items-center justify-center bg-gray-200 p-2 rounded-lg text-gray-800 shadow-md w-full"
        >
          + Criar
        </button>

        {recadosData.map((recado) => (
          <div key={recado.id} className="p-3 bg-gray-200 rounded-md shadow-sm space-y-2 mt-4">
            <p className="text-gray-800"><strong>Mensagem:</strong> {recado.mensagem}</p>
            <p className="text-gray-600">Começa às {recado.inicio}{recado.fim && ` - Termina às ${recado.fim}`}</p>
            <p className="text-gray-600">Dias da semana: {recado.diasSemana.join(', ')}</p>
            <p className="text-gray-600">Cadastrado por {recado.cadastradoPor} em {recado.dataCadastro}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/editar-recado/${recado.id}`)}
                className="p-2 bg-gray-300 rounded-lg"
              >
                🖉
              </button>
              <button
                className="p-2 bg-red-400 text-white rounded-lg"
                // Aqui você implementaria a função de exclusão
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default NotesPage;
