// src/pages/RedefinirSenhaPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../../components/sideBarMenu';

function PasswordRestorePage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const resetPassword = async () => {
    const accessToken = localStorage.getItem('access');

    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const passwordData = {
      current_password: currentPassword,
      new_password: newPassword,
      new_password2: confirmPassword,
    };

    try {
      const response = await fetch('https://lodrom.cubcl.com/config/contas/reset_password/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        setSuccessMessage('Senha redefinida com sucesso!');
        setErrorMessage('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage('A senha atual está invalida tente novamente.');
        setTimeout(() => setErrorMessage(''), 6000);
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setErrorMessage('Erro ao se comunicar com o servidor.');
      setTimeout(() => setErrorMessage(''), 3000);
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
          Redefinir senha
        </h1>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md">
            {errorMessage}
          </div>
        )}

        <input
          type="password"
          placeholder="Senha atual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 w-full border rounded-md"
        />

        <button
          onClick={resetPassword}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Salvar
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default PasswordRestorePage;
