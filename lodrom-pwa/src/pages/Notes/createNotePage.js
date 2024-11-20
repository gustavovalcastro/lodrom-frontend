import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function CreateNotePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [start_time, setStart_time] = useState('');
  const [end_time, setEnd_time] = useState('');
  const [days_week, setDays_week] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dayMapping = {
    dom: 'sun',
    seg: 'mon',
    ter: 'tue',
    qua: 'wed',
    qui: 'thu',
    sex: 'fri',
    sáb: 'sat',
  };

  const handleDiaSemanaToggle = (dia) => {
    setDays_week((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateNote = async () => {
    const accessToken = localStorage.getItem('access');
    const mappedDays = days_week.map((dia) => dayMapping[dia]);

    // Montar o objeto do recado, adicionando campos opcionais somente se não estiverem vazios
    const recado = {
      message,
      days_week: mappedDays,
      ...(start_time && { start_time }), // Inclui start_time se estiver preenchido
      ...(end_time && { end_time }),    // Inclui end_time se estiver preenchido
    };

    try {
      const response = await fetch('http://localhost:8000/recados/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(recado),
      });

      if (response.ok) {
        navigate('/recados-cadastrados'); // Navegar para a página de recados cadastrados após o sucesso
      } else {
        const errorData = await response.json();
        console.error('Erro ao criar recado:', errorData);
        alert('Erro ao criar o recado: ' + (errorData.message || 'Erro desconhecido.'));
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 space-y-4">
        <div className="flex justify-between w-full">
          <button
            onClick={() => navigate('/recados-cadastrados')}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
          >
            ⌂ {/* Ícone de voltar */}
          </button>
          <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
          >
            ☰ {/* Ícone de menu */}
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Criar recado
        </h1>
        <input
          type="text"
          placeholder="message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="Horário de início"
          value={start_time}
          onChange={(e) => setStart_time(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="Horário de fim"
          value={end_time}
          onChange={(e) => setEnd_time(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <div className="flex space-x-2">
          {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map((dia) => (
            <button
              key={dia}
              onClick={() => handleDiaSemanaToggle(dia)}
              className={`p-2 rounded-lg ${days_week.includes(dia) ? 'bg-gray-300' : 'bg-gray-200'}`}
            >
              {dia}
            </button>
          ))}
        </div>
        <button
          onClick={handleCreateNote}
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
