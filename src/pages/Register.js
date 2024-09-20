import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cim: '',
    email: '',
    data_nascimento: '',
    celular: '',
    senha: '',
  });
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
      //const response = await fetch('https://server-nv02.onrender.com/api/register', {
      const response = await fetch('https://server-nv02.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login'); // Redireciona para a página de login
      } else {
        setErrorMessage(result.errors ? result.errors.map(err => err.msg).join(', ') : 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setErrorMessage('Erro interno no servidor.');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
        <input type="text" name="cim" value={formData.cim} onChange={handleChange} placeholder="CIM" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} placeholder="Data de Nascimento" required />
        <input type="text" name="celular" value={formData.celular} onChange={handleChange} placeholder="Celular" required />
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Register;
