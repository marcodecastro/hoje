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
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Inclua isso se estiver usando cookies de autenticação.
  body: JSON.stringify({ cim, senha, email }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Login bem-sucedido:', data);
  })
  .catch((error) => {
    console.error('Erro ao fazer login:', error);
  });

  if (response.ok) {
    navigate('/inicial'); // Redireciona para a página inicial
  }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao fazer login. Verifique os dados e tente novamente.');
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
