// src/pages/CreateNotePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function CreateNotePage() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [diasSemana, setDiasSemana] = useState([]);

  const handleDiaSemanaToggle = (dia) => {
    setDiasSemana((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 space-y-4">
        <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
        >
            ☰ {/* Ícone de menu */}
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Criar recado</h1>
        <input
          type="text"
          placeholder="Mensagem *"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="Horário de início"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="Horário de fim"
          value={fim}
          onChange={(e) => setFim(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <div className="flex space-x-2">
          {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map((dia) => (
            <button
              key={dia}
              onClick={() => handleDiaSemanaToggle(dia)}
              className={`p-2 rounded-lg ${diasSemana.includes(dia) ? 'bg-gray-300' : 'bg-gray-200'}`}
            >
              {dia}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate('/recados-cadastrados')}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Salvar
        </button>
        <button
          onClick={() => navigate('/recados-cadastrados')}
          className="w-full p-3 bg-red-500 text-white rounded-lg"
        >
          Cancelar
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default CreateNotePage;
