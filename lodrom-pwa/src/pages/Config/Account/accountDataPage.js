// src/pages/DadosContaPage.js
import React, { useState } from 'react';
import SidebarMenu from '../../../components/sideBarMenu';

function AccountDataPage() {
  const [username, setUsername] = useState('hernane');
  const [email, setEmail] = useState('hernane@lodrom.com');
  const [phone, setPhone] = useState('(31)99999-9997');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          </button>Dados da conta</h1>
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 w-full border rounded-md"
        />

        <button
          onClick={() => alert('Dados salvos!')}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        >
          Salvar
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default AccountDataPage;
