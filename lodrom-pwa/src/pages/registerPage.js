import React, { useState } from 'react';
import SidebarMenu from '../components/sideBarMenu';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    username: '',
    password: '',
    password2: '',
    phone_number: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/contas/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
          phone_number: formData.phone_number,
          device_code: 'ALVORADA', // Substitua conforme necessário
        }),
      });

      if (!response.ok) {
        throw new Error('Falha no cadastro');
      }

      const result = await response.json();
      console.log('Cadastro realizado com sucesso:', result);

      // Exibir a mensagem de sucesso
      setSuccessMessage('Cadastro realizado com sucesso! Retornando para a tela de login.');

      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate('/login'); // Substitua "/login" pela rota correta para o menu de login
      }, 3000);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setSuccessMessage('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 space-y-8">
        <button
          onClick={handleSidebarToggle}
          className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
        >
          ☰ {/* Ícone de menu */}
        </button>
        <h1 className="text-center text-xl font-semibold text-gray-900 mb-8">
          Preencha os campos para realizar o cadastro no Lodrom!
        </h1>

        {successMessage && (
          <div className="text-center text-green-500 mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Nome"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Usuário"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <InputMask
            mask="(99)99999-9999"
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Número de telefone"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleInputChange}
            placeholder="Confirmar Senha"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="w-full py-3 mt-8 bg-gray-800 text-white rounded-lg font-semibold tracking-wide shadow-md"
          >
            Cadastrar
          </button>
        </form>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default RegisterPage;
