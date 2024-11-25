import React, { useState } from 'react';
import SidebarMenu from '../components/sideBarMenu';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Controle de visibilidade para senha
  const [deviceCode, setDeviceCode] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Controle de visibilidade para confirmar senha
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResetPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem. Tente novamente.');
      return;
    }

    try {
      const response = await fetch('https://lodrom.cubcl.com/contas/reset_password/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          device_code: deviceCode,
          password,
          password2: confirmPassword
        }),
      });

      if (response.ok) {
        setSuccessMessage('Senha redefinida com sucesso!');
        setTimeout(() => {
          navigate('/login'); // Redireciona para a página de login após sucesso
        }, 2000);
      } else if (response.status === 400 || response.status === 404) {
        const errorData = await response.json();
        // If the error response contains a detailed list of errors, display them
        const detailedErrors = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        setErrorMessage(
          detailedErrors ||
            "Erro na requisição. Verifique os dados e tente novamente."
        );
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao enviar a solicitação.");
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      setErrorMessage('Erro de conexão. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 space-y-8">
        {/* Botão de retorno à tela inicial */}
        <button
          onClick={() => navigate('/login')}
          className="text-gray-600 text-xl p-2 rounded-full hover:bg-gray-200"
        >
          ←
        </button>

        {/* Título */}
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Esqueceu sua senha?
        </h1>

        {/* Mensagens de erro e sucesso */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Campo Email */}
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
        />

        {/* Device Code */}
        <input
          type="text"
          placeholder="Digite o código do dispositivo"
          value={deviceCode}
          onChange={(e) => setDeviceCode(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
        />

        {/* Campo Nova Senha */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {/* Campo Confirmar Nova Senha */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-400"
          />
          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {/* Botão de redefinir senha */}
        <button
          onClick={handleResetPassword}
          className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold tracking-wide shadow-md"
        >
          Redefinir Senha
        </button>
      </div>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </div>
  );
}

export default ForgotPasswordPage;
