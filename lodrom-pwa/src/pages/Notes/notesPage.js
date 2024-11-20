import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function NotesPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recados, setRecados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recadoToDelete, setRecadoToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchRecados = async () => {
    const accessToken = localStorage.getItem('access');
    try {
      const response = await fetch('http://localhost:8000/recados/list/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecados(data); // Atualiza o estado com os recados recebidos
      } else {
        console.error('Erro ao buscar recados');
        alert('Erro ao carregar os recados. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  };

  const handleDeleteRecado = async () => {
    if (!recadoToDelete) return;
    const accessToken = localStorage.getItem('access');
    try {
      const response = await fetch(`http://localhost:8000/recados/delete/${recadoToDelete}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Recado excluído com sucesso!');
        fetchRecados(); // Atualiza a lista de recados após a exclusão
        setTimeout(() => setSuccessMessage(''), 3000); // Remove a mensagem após 3 segundos
      } else {
        console.error('Erro ao excluir recado');
        alert('Erro ao excluir o recado. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
    setShowModal(false); // Fecha o modal
    setRecadoToDelete(null); // Limpa o recado selecionado
  };

  const confirmDeleteRecado = (id) => {
    setRecadoToDelete(id); // Define o recado a ser excluído
    setShowModal(true); // Exibe o modal de confirmação
  };

  useEffect(() => {
    fetchRecados();
  }, []); // O array vazio garante que a requisição seja feita apenas uma vez ao montar o componente

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

        <h1 className="text-2xl font-semibold text-gray-800">Recados</h1>

        {/* Mensagem de sucesso */}
        {successMessage && (
          <p className="text-green-500 text-center font-semibold">{successMessage}</p>
        )}

        <button
          onClick={() => navigate('/cadastrar-recado')}
          className="flex items-center justify-center bg-gray-200 p-2 rounded-lg text-gray-800 shadow-md w-full"
        >
          + Criar
        </button>

        {/* Bloco rolável para mensagens */}
        <div className="overflow-y-auto h-96 space-y-4">
          {recados.length > 0 ? (
            recados.map((recado) => {
              // Processar dias da semana para converter de string JSON para array
              let diasSemana = [];
              try {
                diasSemana = JSON.parse(recado.days_week || '[]');
              } catch (error) {
                console.error('Erro ao parsear days_week:', error);
              }

              // Mapeamento dos dias da semana
              const diasMapeados = {
                sun: 'dom',
                mon: 'seg',
                tue: 'ter',
                wed: 'qua',
                thu: 'qui',
                fri: 'sex',
                sat: 'sáb',
              };

              // Converter dias em português
              const diasSemanaEmPortugues = diasSemana.map((day) => diasMapeados[day] || day);

              return (
                <div
                  key={recado.message_id}
                  className="p-3 bg-gray-200 rounded-md shadow-sm space-y-2"
                >
                  <p className="text-gray-800">
                    <strong>Mensagem:</strong> {recado.message}
                  </p>
                  <p className="text-gray-600">
                    {recado.start_time ? `Começa às ${recado.start_time.slice(0, 5)}` : ''}
                    {recado.end_time ? ` - Termina às ${recado.end_time.slice(0, 5)}` : ''}
                  </p>
                  <p className="text-gray-600">
                    {diasSemanaEmPortugues.length > 0
                      ? 'Dias da semana: ' + diasSemanaEmPortugues.join(', ')
                      : ''}
                  </p>
                  <p className="text-gray-600">
                    Cadastrado por {recado.username} em{' '}
                    {new Date(recado.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600">
                    <strong>Dispositivo:</strong> {recado.device_code}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/editar-recado/${recado.message_id}`)}
                      className="p-2 bg-gray-300 rounded-lg"
                    >
                      🖉
                    </button>
                    <button
                      onClick={() => confirmDeleteRecado(recado.message_id)}
                      className="p-2 bg-red-400 text-white rounded-lg"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 mt-4">Nenhum recado encontrado.</p>
          )}
        </div>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <p className="text-lg font-semibold text-center">
              Tem certeza que deseja excluir este recado?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteRecado}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Sim
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default NotesPage;
