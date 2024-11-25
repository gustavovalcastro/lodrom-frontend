import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function EditNotePage() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [weekDays, setWeekDays] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Função para buscar o recado pelo ID
  const fetchNoteById = async () => {
    const accessToken = localStorage.getItem('access');
    try {
      const response = await fetch('https://lodrom.cubcl.com/recados/list/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const selectedNote = data.find((recado) => recado.message_id.toString() === id);

        if (selectedNote) {
          setMessage(selectedNote.message || '');
          setStartTime(selectedNote.start_time || ''); // Converte null para string vazia
          setEndTime(selectedNote.end_time || ''); // Converte null para string vazia
          setWeekDays(JSON.parse(selectedNote.days_week || '[]'));
        } else {
          alert('Recado não encontrado.');
          navigate('/recados-cadastrados');
        }
      } else {
        console.error('Erro ao buscar o recado:', response.status);
        alert('Erro ao carregar os dados do recado.');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      alert('Erro ao buscar o recado.');
    }
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    const accessToken = localStorage.getItem('access');
    try {
      const body = {
        message,
        days_week: weekDays, // Sempre enviar o array, mesmo que esteja vazio
        start_time: startTime.trim() ? startTime : null, // Converte string vazia para null
        end_time: endTime.trim() ? endTime : null, // Converte string vazia para null
      };

      const response = await fetch(`https://lodrom.cubcl.com/recados/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSuccessMessage('Recado atualizado com sucesso!');
        setTimeout(() => {
          navigate('/recados-cadastrados');
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar o recado:', response.status, errorData);
        alert(
          `Erro ao atualizar o recado: ${
            errorData.start_time?.[0] || errorData.end_time?.[0] || 'Erro desconhecido'
          }`
        );
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      alert('Erro ao salvar o recado.');
    }
  };

  const handleWeekDayToggle = (day) => {
    setWeekDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  useEffect(() => {
    if (id) {
      fetchNoteById();
    }
  }, [id]);

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

        <h1 className="text-2xl font-semibold text-gray-800">Editar Recado</h1>

        {successMessage && (
          <p className="text-green-500 text-center font-semibold">{successMessage}</p>
        )}

        <input
          type="text"
          placeholder="Mensagem *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="Hora de início"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="Hora de término"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <div className="flex space-x-2">
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
            <button
              key={day}
              onClick={() => handleWeekDayToggle(day)}
              className={`p-2 rounded-lg ${
                weekDays.includes(day) ? 'bg-gray-300' : 'bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <button
          onClick={handleSave}
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

export default EditNotePage;
