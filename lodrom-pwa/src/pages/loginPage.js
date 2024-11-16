import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('access', data.access);
        localStorage.setItem('username', username); // Armazenar o username
        console.log('Usuário autenticado com sucesso:', data);

        navigate('/home');
      } else if (response.status === 401) {
        const errorData = await response.json();
        if (errorData.detail === 'No active account found with the given credentials') {
          setErrorMessage('Usuário não encontrado com esses dados.');
        } else if (errorData.detail === 'Incorrect password') {
          setErrorMessage('Senha incorreta.');
        } else {
          setErrorMessage('Erro ao autenticar. Tente novamente.');
        }
      } else {
        setErrorMessage('Erro ao autenticar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setErrorMessage('Erro de conexão. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-4rem)] font-sans">
      <div className="w-full max-w-md p-8 flex flex-col items-center relative">

        {/* Botão de retorno à tela inicial */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-gray-600 text-xl"
        >
          ←
        </button>

        {/* Título */}
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 tracking-widest">
          Lodrom
        </h1>

        {errorMessage && (
          <div className="text-center text-red-500 mb-4">
            {errorMessage}
          </div>
        )}

        {/* Campos de entrada */}
        <div className="w-full space-y-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
            />
            <span className="absolute right-4 top-3 text-gray-500 cursor-pointer">
              👁️ {/* Ícone para visibilidade de senha */}
            </span>
          </div>

          {/* Link "Esqueceu a senha?" */}
          <div className="text-right">
            <a
              onClick={() => navigate('/forgotPassword')}
              className="text-gray-500 text-sm cursor-pointer"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        {/* Botão "Entrar" */}
        <button
          onClick={handleLogin}
          className="w-full py-3 mt-8 text-white bg-gray-800 rounded-lg font-semibold tracking-wide shadow-md"
        >
          Entrar
        </button>

        {/* Texto "Não possui uma conta?" com link para cadastro */}
        <div className="text-center mt-6 text-gray-600">
          <span>Não possui uma conta? </span>
          <a
            onClick={() => navigate('/register')}
            className="text-green-500 font-semibold cursor-pointer"
          >
            Crie uma agora
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
