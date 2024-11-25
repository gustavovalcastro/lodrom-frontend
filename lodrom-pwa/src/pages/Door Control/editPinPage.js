import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../components/sideBarMenu';

function EditPINPage() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPin, setShowPin] = useState(false); // Estado para visibilidade do PIN
  const [showConfirmPin, setShowConfirmPin] = useState(false); // Estado para visibilidade do PIN de confirmação
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResetPin = async () => {
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
      const response = await fetch('https://lodrom.cubcl.com/config/controle_portao/reset_pin/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ pin1: pin, pin2: confirmPin }),
      });

      if (response.ok) {
        setSuccessMessage('PIN redefinido com sucesso!');
        setTimeout(() => {
          navigate('/controle-portao');
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao redefinir o PIN. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao redefinir o PIN:', error);
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
          Editar PIN
        </h1>
        <p className="text-gray-600">Insira novo PIN numérico de 4 dígitos</p>

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

        {/* Campo Confirmar PIN com visibilidade alternada */}
        <div className="relative">
          <input
            type={showConfirmPin ? 'text' : 'password'}
            maxLength="4"
            placeholder="Confirmar PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            className="p-2 w-full border rounded-md"
          />
          <span
            className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirmPin(!showConfirmPin)}
          >
            {showConfirmPin ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          onClick={handleResetPin}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Salvar
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default EditPINPage;
