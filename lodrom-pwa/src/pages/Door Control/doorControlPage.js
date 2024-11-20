import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function DoorControlPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [historico, setHistorico] = useState([]); // Estado para armazenar o histórico

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchHistorico = async () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      alert('Usuário não autenticado. Faça login novamente.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/historico/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Incluindo o token de acesso no cabeçalho
        },
      });

      if (response.ok) {
        const data = await response.json(); // Processa o JSON corretamente
        // Filtra apenas os eventos cujo "event_type" seja igual a "2"
        const filteredHistorico = data.filter((evento) => evento.event_type === "2");
        setHistorico(filteredHistorico);
      } else {
        console.error('Erro ao buscar histórico:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de conexão ao buscar histórico:', error);
    }
  };


  const checkPin = async () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      alert('Usuário não autenticado. Faça login novamente.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/controle_portao/check_pin/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Incluindo o token de acesso no cabeçalho
        },
      });

      const data = await response.json();
      if (data.message === 'PIN has already been created.') {
        navigate('/inserir-pin'); // Redireciona para inserir o PIN
      } else if (data.detail && data.detail.includes("PIN hasn't been set yet.")) {
        setShowModal(true); // Exibe o modal se o PIN ainda não estiver configurado
      } else {
        console.error('Resposta inesperada:', data);
      }
    } catch (error) {
      console.error('Erro de conexão ao verificar o PIN:', error);
    }
  };

  useEffect(() => {
    fetchHistorico(); // Busca o histórico ao carregar a página
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-4 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          <button
            onClick={handleSidebarToggle}
            className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
          >
            ☰ {/* Ícone de menu */}
          </button>
          Controle de portão
        </h1>

        <button
          onClick={checkPin}
          className="w-full p-3 bg-gray-200 rounded-lg text-gray-800 shadow-md flex justify-center items-center"
        >
          🔓 Abrir Portão
        </button>

        <h2 className="text-lg font-semibold text-gray-700 mt-6">Últimas aberturas do portão</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2 bg-white shadow-sm">
          {historico.length > 0 ? (
            historico.map((entrada, index) => {
              const eventDate = new Date(entrada.event_time); // Converte o "event_time" para um objeto Date
              const formattedDate = eventDate.toLocaleDateString('pt-BR'); // Formata a data no formato DD/MM/YYYY
              const formattedTime = eventDate.toLocaleTimeString('pt-BR'); // Formata a hora no formato HH:mm:ss

              return (
                <div key={index} className="text-gray-600 p-2 border-b">
                  <p>Aberto por {entrada.account_username || 'Desconhecido'}</p>
                  <p>{formattedDate} às {formattedTime}</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">Nenhum histórico disponível.</p>
          )}
        </div>
      </div>

      {/* Modal para criar PIN */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">PIN não encontrado</h2>
            <p className="text-gray-600 mb-6">Para abrir o portão, crie um PIN de segurança.</p>
            <button
              onClick={() => navigate('/criar-pin')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Criar PIN
            </button>
          </div>
        </div>
      )}

      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default DoorControlPage;
