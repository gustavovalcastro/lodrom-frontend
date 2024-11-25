import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function InsertPINPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPin, setShowPin] = useState(false); // Estado para visibilidade do PIN

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenGate = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      alert('Usuário não autenticado. Faça login novamente.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://lodrom.cubcl.com/controle_portao/open/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Incluindo o token de acesso no cabeçalho
        },
        body: JSON.stringify({ pin }), // Enviando o PIN no corpo da requisição
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Portão aberto com sucesso!');
        setTimeout(() => {
          navigate('/controle-portao'); // Redireciona para a página de controle do portão
        }, 2000); // Aguarda 2 segundos antes de redirecionar
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'PIN incorreto. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao abrir o portão:', error);
      setErrorMessage('Erro de conexão. Tente novamente.');
    }
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
          Inserir PIN
        </h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Campo PIN com visibilidade alternada */}
        <div className="relative">
          <input
            type={showPin ? 'text' : 'password'}
            maxLength="4"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="p-2 w-full border rounded-md"
          />
          <span
            className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
            onClick={() => setShowPin(!showPin)}
          >
            {showPin ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          onClick={handleOpenGate}
          className="w-full p-3 bg-gray-700 text-white rounded-lg flex justify-center items-center"
        >
          🔓 Abrir Portão
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default InsertPINPage;
