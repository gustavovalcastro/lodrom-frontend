// src/pages/EditNotePage.js
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Aqui você pode buscar o recado pelo ID para preencher os campos
    // Exemplo: fetchNoteById(id).then((note) => { ... });
  }, [id]);

  const handleWeekDayToggle = (day) => {
    setWeekDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 space-y-4">

        <div className="flex justify-between w-full">
          <button
            onClick={() => navigate('/home')}
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
          Edit Note
        </h1>
        <input
          type="text"
          placeholder="Message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <div className="flex space-x-2">
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
            <button
              key={day}
              onClick={() => handleWeekDayToggle(day)}
              className={`p-2 rounded-lg ${weekDays.includes(day) ? 'bg-gray-300' : 'bg-gray-200'}`}
            >
              {day}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate('/recados-cadastrados')}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Save
        </button>
        <button
          onClick={() => navigate('/recados-cadastrados')}
          className="w-full p-3 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default EditNotePage;
