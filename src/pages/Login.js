import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Login = () => {
  const [cim , setCim] = useState('');
  const [email , setEmail] = useState('');
  const [senha , setSenha] = useState('');
  const [formData, setFormData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://server-nv02.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Adicione esta linha se estiver lidando com cookies
        body: JSON.stringify({ cim, senha, email }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        alert('Login realizado com sucesso!');
        navigate('/inicial'); // Redireciona para a página inicial ou dashboard
      } else {
        setErrorMessage(result.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro interno no servidor.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cim" value={formData.cim} onChange={handleChange} placeholder="CIM" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required />
        <button type="submit">Entrar</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
