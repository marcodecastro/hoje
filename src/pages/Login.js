import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para redirecionamento
import '../App.css';

const Login = () => {
  // Estados para armazenar os valores dos campos de entrada e mensagens de erro
  const [cim, setCim] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Hook de navegação para redirecionar após o login
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const onSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    try {
      // Realiza a requisição para o backend
      const response = await fetch('https://server-nv02.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Permite o envio de cookies e credenciais
        body: JSON.stringify({ cim, senha, email }), // Converte os dados para JSON
      });

      // Verifica se a resposta não foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao fazer login');
      }

      // Processa os dados da resposta
      const data = await response.json();
      console.log('Login bem-sucedido:', data);

      // Redireciona para a página inicial após login bem-sucedido
      navigate('/inicial'); // Substitua '/home' pelo caminho da sua tela inicial
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage(error.message); // Define a mensagem de erro para exibir no frontend
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="cim">CIM:</label>
          <input
            type="text"
            id="cim"
            value={cim}
            onChange={(e) => setCim(e.target.value)}
            placeholder="Digite seu CIM"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua Senha"
            required
          />
        </div>
        <button type="submit">Entrar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;

