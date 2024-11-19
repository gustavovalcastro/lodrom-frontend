import React, { useState, useEffect } from 'react';
import SidebarMenu from '../components/sideBarMenu';
import { useNavigate } from 'react-router-dom';

function HistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [historicoData, setHistoricoData] = useState([]); // Estado para armazenar os dados do histórico
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchHistorico = async () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      alert('Usuário não autenticado. Faça login novamente.');
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
        const data = await response.json();

        console.log("Dados originais da API:", data); // Log para verificar os dados da API

        // Agrupa os eventos por data
        const groupedData = data.reduce((acc, evento) => {
          // Extrai e converte a data e a hora
          const eventDate = new Date(evento.event_time);
          const date = eventDate.toLocaleDateString('pt-BR'); // Data no formato DD/MM/YYYY
          const time = eventDate.toLocaleTimeString('pt-BR'); // Hora no formato HH:mm:ss

          if (!acc[date]) {
            acc[date] = [];
          }

          // Adiciona descrição extra para eventos do tipo 2
          const descricaoExtra = evento.event_type === "2" && evento.account_username
            ? `${evento.event_description} por ${evento.account_username}`
            : evento.event_description;

          acc[date].push({
            hora: time,
            descricao: descricaoExtra,
          });
          return acc;
        }, {});

        console.log("Dados agrupados por data:", groupedData); // Log para verificar o agrupamento

        // Converte o agrupamento em um array e ordena os dias e eventos
        const sortedData = Object.entries(groupedData)
          .sort((a, b) => new Date(b[0].split('/').reverse().join('-')) - new Date(a[0].split('/').reverse().join('-'))) // Ordena os dias em ordem decrescente
          .map(([data, eventos]) => ({
            data, // Já está no formato DD/MM/YYYY
            eventos: eventos.sort((a, b) => b.hora.localeCompare(a.hora)), // Ordena os eventos por hora decrescente
          }));

        console.log("Dados ordenados e formatados:", sortedData); // Log para verificar os dados finais

        setHistoricoData(sortedData);
      } else {
        console.error('Erro ao buscar histórico:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de conexão ao buscar histórico:', error);
    }
  };

  useEffect(() => {
    fetchHistorico(); // Busca o histórico ao carregar a página
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)] overflow-hidden">
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
          Histórico
        </h1>

        {/* Container rolável para o conteúdo */}
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto space-y-4 mt-4">
          {historicoData.length > 0 ? (
            historicoData.map((dia, index) => (
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
            ))
          ) : (
            <p className="text-gray-500 text-center">Nenhum histórico disponível.</p>
          )}
        </div>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default HistoryPage;
