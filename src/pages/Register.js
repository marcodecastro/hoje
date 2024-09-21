/*import React, { useState } from 'react';
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
      //const response = await fetch('http://localhost:5000/api/auth/register', {
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

export default Register; */


































/*import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mail from "../images/email.png";
import lock from "../images/lock.png";
import profile from "../images/icon.png";
import '../styles/Register.css';
//import '../styles/Registrar.css'

//import '../styles/Login.css';
import { UserContext } from '../UserContext';

function Register() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '', cim: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/inicial');
      }, 2000);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (form.senha !== form.confirmarSenha) {
      setError('As senhas não correspondem!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro desconhecido');
      }

      const data = await response.json();
      const tokenExpiry = new Date().getTime() + 3600 * 1000; // 1 hora de validade
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiry', tokenExpiry);
      localStorage.setItem('userData', JSON.stringify({ nome: data.membro.nome, cim: data.membro.cim, email: data.membro.email, is_admin: data.membro.is_admin }));
      setUser({ nome: data.membro.nome, cim: data.membro.cim, email: data.membro.email, is_admin: data.membro.is_admin, token: data.token });
      navigate('/inicial');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <div className='sub-main'>
          <div>
            <div>
              <h1>Registre-se</h1>
              <div>
                <img src={profile} alt="nome" className='email' />
                <input type="text" placeholder='Digite seu Nome' className='fill' value={form.nome} onChange={handleChange} name="nome"/>
              </div>
              <div className='mail-id'>
                <img src={mail} alt="email" className='email' />
                <input type="email" placeholder='Digite seu Email' className='fill' value={form.email} onChange={handleChange} name="email"/>
              </div>
              <div className='mail-id'>
                <img src={lock} alt="senha" className='email' />
                <input type="password" placeholder='Digite a Senha' className='fill' value={form.senha} onChange={handleChange} name="senha"/>
              </div>
              <div className='mail-id'>
                <img src={lock} alt="confirmarSenha" className='email' />
                <input type="password" placeholder='Confirme a Senha' className='fill' value={form.confirmarSenha} onChange={handleChange} name="confirmarSenha"/>
              </div>
              <div className='mail-id'>
                <img src={profile} alt="cim" className='email' />
                <input type="text" placeholder='Digite seu CIM' className='fill' value={form.cim} onChange={handleChange} name="cim"/>
              </div>
              <div className='login-btn'>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Registrando...' : 'Registrar'}
                </button>
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <div className='reg-link'>
                <p>Já tem uma conta?</p>
                <Link className='link' to='/login'>
                  Faça Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register; */






import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mail from "../images/email.png";
import lock from "../images/lock.png";
import cadastro from "../images/cadastro.png";
import cim from "../images/cim.png";
import '../styles/Register.css';
import { UserContext } from '../UserContext';

function Register() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '', cim: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/inicial');
      }, 2000);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (form.senha !== form.confirmarSenha) {
      setError('As senhas não correspondem!');
      setIsLoading(false);
      return;
    }

    try {
      //const response = await fetch('http://localhost:5000/api/auth/register', {
      const response = await fetch('https://server-nv02.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro desconhecido');
      }

      const data = await response.json();
      const tokenExpiry = new Date().getTime() + 3600 * 1000; // 1 hora de validade
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiry', tokenExpiry);
      localStorage.setItem('userData', JSON.stringify({ nome: data.membro.nome, cim: data.membro.cim, email: data.membro.email, is_admin: data.membro.is_admin }));
      setUser({ nome: data.membro.nome, cim: data.membro.cim, email: data.membro.email, is_admin: data.membro.is_admin, token: data.token });
      setSuccess('Registro realizado com sucesso!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <div className='sub-main'>
          <div className='imgs'>
            <div className='container-image'>
              <img src={cadastro} alt='cadastro' className='cadastro'/>
            </div>
          </div>
          <div>
            <h1 className='LHeader'>Registre-se</h1>
            <div className='input-container'>
              <img src={cadastro} alt="nome" className='icon' />
              <input type="text" placeholder='Digite seu Nome' className='fill' value={form.nome} onChange={handleChange} name="nome"/>
            </div>

            <div className='input-container'>
              <img src={mail} alt="email" className='icon' />
              <input type="email" placeholder='Digite seu Email' className='fill' value={form.email} onChange={handleChange} name="email"/>
            </div>

            <div className='input-container'>
              <img src={lock} alt="senha" className='icon' />
              <input type="password" placeholder='Digite sua Senha' className='fill' value={form.senha} onChange={handleChange} name="senha"/>
            </div>

            <div className='input-container'>
              <img src={lock} alt="confirmarSenha" className='icon' />
              <input type="password" placeholder='Confirme a Senha' className='fill' value={form.confirmarSenha} onChange={handleChange} name="confirmarSenha"/>
            </div>

            <div className='input-container'>
              <img src={cim} alt="cim" className='icon' />
              <input type="text" placeholder='Digite seu CIM' className='fill' value={form.cim} onChange={handleChange} name="cim"/>
            </div>

            <div className='login-btn'>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrar'}
              </button>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <div className='reg-link'>
              <p>Já tem uma conta?</p>
              <Link className='link' to='/login'>
                Faça Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;

