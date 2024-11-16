// src/pages/DadosContaPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../../components/sideBarMenu';

function AccountDataPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchAccountData = async () => {
    const accessToken = localStorage.getItem('access');
    try {
      const response = await fetch('http://127.0.0.1:8000/config/contas/account_data/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data[0].username || '');
        setEmail(data[0].email || '');
        setPhone_number(data[0].phone_number || '');
      } else {
        console.error('Erro ao buscar os dados da conta');
        alert('Erro ao carregar os dados da conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  };

  const updateAccountData = async () => {
    const accessToken = localStorage.getItem('access');
    const accountData = {
      username,
      email,
      phone_number,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/config/contas/account_data/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        setSuccessMessage('Dados atualizados com sucesso!');
        setTimeout(() => setSuccessMessage(''), 3000); // Remove a mensagem após 3 segundos
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar os dados:', errorData);
        alert('Erro ao atualizar os dados: ' + (errorData.message || 'Erro desconhecido.'));
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []); // O array vazio garante que a requisição seja feita apenas uma vez ao montar o componente

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
          Dados da conta
        </h1>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 rounded-md">
            {successMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Nome do usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <input
          type="text"
          placeholder="Celular"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
          className="p-2 w-full border rounded-md"
        />

        <button
          onClick={updateAccountData}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Salvar
        </button>

        <button
          onClick={() => navigate('/redefinir-senha')}
          className="w-full p-3 bg-blue-500 text-white rounded-lg"
        >
          Redefinir Senha
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default AccountDataPage;
