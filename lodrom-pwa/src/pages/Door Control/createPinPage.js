import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function CreatePINPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSavePin = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (pin !== confirmPin) {
      setErrorMessage('Os PINs não coincidem. Tente novamente.');
      return;
    }

    if (pin.length !== 4 || isNaN(pin)) {
      setErrorMessage('O PIN deve ser um número de 4 dígitos.');
      return;
    }

    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      setErrorMessage('Usuário não autenticado. Faça login novamente.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/controle_portao/set_pin/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Incluindo o token de acesso no cabeçalho
        },
        body: JSON.stringify({ pin1: pin, pin2: confirmPin }), // Alteração do formato do body
      });

      if (response.ok) {
        setSuccessMessage('PIN criado com sucesso!');
        setTimeout(() => {
          navigate('/controle-portao'); // Redireciona para a página de controle do portão após sucesso
        }, 2000); // Aguarda 2 segundos antes de redirecionar
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao criar o PIN. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar o PIN:', error);
      setErrorMessage('Erro de conexão. Tente novamente.');
    }
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
          </button>Criar PIN
        </h1>
        <p className="text-gray-600">Crie um PIN numérico de 4 dígitos</p>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <input
          type="password"
          maxLength="4"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="password"
          maxLength="4"
          placeholder="Confirmar PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="p-2 w-full border rounded-md"
        />

        <button
          onClick={handleSavePin}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Salvar
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default CreatePINPage;
