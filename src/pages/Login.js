/*import React, { useState } from 'react';
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

export default Login; */





/*import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import mail from "../images/email.png";
import lock from "../images/lock.png";
import cim from "../images/cim.png";
import profile from "../images/icon.png";
import '../styles/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', senha: '', cim: '' });
  const [error, setError] = useState('');
  
  const { setUser, user, loading: userLoading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);  // Aqui você já tem o estado isLoading
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user) {
      if (user.is_admin) {
        navigate('/admin');
      } else {
        navigate('/inicial');
      }
    }
  }, [user, userLoading, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Começa o loading ao submeter o formulário

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors.map(err => err.msg).join(', ') : errorData.error);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify({ ...data.membro, token: data.token }));
      setUser({ ...data.membro, token: data.token });

      if (data.membro.is_admin) {
        navigate('/admin');
      } else {
        navigate('/inicial');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Para o loading após a resposta da requisição
    }
  };

  if (userLoading) {
    return <div>Carregando...</div>;
  } 

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <div className='sub-main'>
          <div>
            <div className='imgs'>
              <div className='container-image'>
                <img src={profile} alt='profile' className='profile'/>
              </div>
            </div>
            <div>
              <h1 className='LHeader'>Login</h1>

              {isLoading ? (
                <div className="loading-spinner">Carregando...</div> // Exibe o loading enquanto está processando
              ) : (
                <> 
                  <div className='input-container'>
                    <img src={mail} alt="email" className='icon' />
                    <input type="email" placeholder='Digite seu Email' className='fill' onChange={handleChange} name="email"/>
                  </div>

                  <div className='input-container'>
                    <img src={lock} alt='password' className='icon' />
                    <input type="password" placeholder='Digite sua Senha' className='fill' onChange={handleChange} name="senha"/>
                  </div>

                  <div className='input-container'>
                    <img src={cim} alt='cim' className='icon' />
                    <input type="cim" placeholder='Digite seu CIM' className='fill' onChange={handleChange} name="cim"/>
                  </div>

                  <div className='login-btn'>
                    <button type="submit">Login</button>
                  </div>
                  <div className='reg-link'>
                    <p>Ainda não tem uma conta ?</p>
                    <Link className='link' to='/register'>
                      <li>Registre-se</li>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login; */









import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import mail from "../images/email.png";
import lock from "../images/lock.png";
import cim from "../images/cim.png";
import profile from "../images/icon.png";
import '../styles/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', senha: '', cim: '' });
  const [error, setError] = useState('');
  
  const { setUser, user, loading: userLoading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);  // Aqui você já tem o estado isLoading
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user) {
      if (user.is_admin) {
        navigate('/admin');
      } else {
        navigate('/inicial');
      }
    }
  }, [user, userLoading, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Começa o loading ao submeter o formulário

    try {
      //const response = await fetch('http://localhost:5000/api/auth/login', {
      const response = await fetch('https://server-nv02.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors.map(err => err.msg).join(', ') : errorData.error);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify({ ...data.membro, token: data.token }));
      setUser({ ...data.membro, token: data.token });

      if (data.membro.is_admin) {
        navigate('/admin');
      } else {
        navigate('/inicial');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Para o loading após a resposta da requisição
    }
  };

  if (userLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <div className='sub-main'>
          <div>
            <div className='imgs'>
              <div className='container-image'>
                <img src={profile} alt='profile' className='profile'/>
              </div>
            </div>
            <div>
              <h1 className='LHeader'>Login</h1>

              {isLoading ? (
                <div className="loading-spinner">Carregando...</div> // Exibe o loading enquanto está processando
              ) : (
                <>
                  <div className='input-container'>
                    <img src={mail} alt="email" className='icon' />
                    <input type="email" placeholder='Digite seu Email' className='fill' onChange={handleChange} name="email"/>
                  </div>

                  <div className='input-container'>
                    <img src={lock} alt='password' className='icon' />
                    <input type="password" placeholder='Digite sua Senha' className='fill' onChange={handleChange} name="senha"/>
                  </div>

                  <div className='input-container'>
                    <img src={cim} alt='cim' className='icon' />
                    <input type="cim" placeholder='Digite seu CIM' className='fill' onChange={handleChange} name="cim"/>
                  </div>

                  <div className='login-btn'>
                    <button type="submit">Login</button>
                  </div>
                  <div className='reg-link'>
                    <p>Ainda não tem uma conta ?</p>
                    <Link className='link' to='/register'>
                      <li>Registre-se</li>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;