import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchWithToken } from '../fetchUtils';
import '../styles/common-form.css';
import { useNavigate } from 'react-router-dom';
import voltar from '../images/voltar.png';  

const Esposa = ({ esposaId }) => {
  const [spouseName, setSpouseName] = useState('');
  const [spouseBirthDate, setSpouseBirthDate] = useState(new Date());
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEsposaData = async () => {
      try {
        const response = await fetchWithToken(`https://server-nv02.onrender.com/api/esposa/${esposaId}`);
        const data = await response.json();
        setSpouseName(data.nome);
        setSpouseBirthDate(moment(data.data_nascimento).format('YYYY-MM-DD'));
        setMemberId(data.cim);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message || 'Erro ao buscar dados. Tente novamente mais tarde.');
      }
    };

    if (esposaId) {
      fetchEsposaData();
    }
  }, [esposaId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!spouseName || !memberId) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetchWithToken('https://backend-v6ye.onrender.com:5000/api/esposa', {
        method: 'POST',
        body: JSON.stringify({ 
          nome: spouseName, 
          data_nascimento: spouseBirthDate, 
          cim: memberId 
        })
      });

      if (response) {
        setSuccessMessage(response.message.includes('atualizada') ? 'Dados atualizados com sucesso.' : 'Dados cadastrados com sucesso.');
      } else {
        setError('Erro inesperado na resposta.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError(error.message || 'Erro ao enviar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='common-form'>

     {/* Ícone de voltar */}
     <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} // Redireciona para a página inicial
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>{esposaId ? 'Atualizar Nome da Esposa' : 'Nome da Esposa'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Digite o CIM do membro"
            disabled={!!esposaId}
          />
        </div>

        <div className="form-group">
          <label>Nome da Esposa</label>
          <input
            type="text"
            value={spouseName}
            onChange={(e) => setSpouseName(e.target.value)}
            placeholder="Digite o nome da esposa"
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={spouseBirthDate}
            onChange={(e) => setSpouseBirthDate(e.target.value)}
            placeholder="Selecione uma data"
          />
        </div>

        <div className="form-group">
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button" disabled={loading}>Enviar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Esposa;
