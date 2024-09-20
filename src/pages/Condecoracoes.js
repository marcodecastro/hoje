import React, { useState, useEffect } from 'react';

const Condecoracoes = () => {
  const [memberId, setMemberId] = useState('');
  const [condecoracoes, setCondecoracoes] = useState([{ titulo: '', data: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCondecoracaoChange = (index, key, value) => {
    const newCondecoracoes = [...condecoracoes];
    newCondecoracoes[index][key] = value;
    setCondecoracoes(newCondecoracoes);
  };

  const handleAddCondecoracao = () => {
    setCondecoracoes([...condecoracoes, { titulo: '', data: '', descricao: '' }]);
  };

  const handleRemoveCondecoracao = (index) => {
    const newCondecoracoes = condecoracoes.filter((_, i) => i !== index);
    setCondecoracoes(newCondecoracoes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validCondecoracoes = condecoracoes.filter(condec => condec.titulo && condec.data && condec.descricao);
      if (validCondecoracoes.length === 0) {
        throw new Error('Por favor, preencha todos os campos.');
      }
      const formattedCondecoracoes = validCondecoracoes.map(condec => {
        const [ano, mes, dia] = condec.data.split('-');
        const utcDate = new Date(Date.UTC(ano, mes - 1, dia));

        return {
          titulo: condec.titulo,
          data: utcDate.toISOString().split('T')[0], // Formato 'yyyy-MM-dd'
          descricao: condec.descricao
        };
      });

      const response = await fetch('https://server-nv02.onrender.com/api/condecoracoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cim: memberId, condecoracoes: formattedCondecoracoes })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errors ? result.errors[0].msg : 'Erro ao enviar dados para o servidor');
      }

      setCondecoracoes([{ titulo: '', data: '', descricao: '' }]);
      setSuccessMessage(result.message);
      setError(null);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <div className="form">
      <h2>Condecorações Maçônicas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder='Digite o CIM do membro'
          />
        </div>

        {condecoracoes.map((condec, index) => (
          <div key={`condecoracao-${index}`} className="form-group">
            <div>
              <label>Título</label>
              <select
                value={condec.titulo}
                onChange={(e) => handleCondecoracaoChange(index, 'titulo', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="Benemérito da Ordem">Benemérito da Ordem</option>
                <option value="Grande Benemérito da Ordem">Grande Benemérito da Ordem</option>
                <option value="Estrela da Distinção Maçônica">Estrela da Distinção Maçônica</option>
                <option value="Cruz da Perfeição Maçônica">Cruz da Perfeição Maçônica</option>
                <option value="Comenda da Ordem do Mérito de D. Pedro I">Comenda da Ordem do Mérito de D. Pedro I</option>
              </select>
            </div>
            <div>
              <label>Data</label>
              <input
                type="date"
                value={condec.data}
                onChange={(e) => handleCondecoracaoChange(index, 'data', e.target.value)}
                placeholder='Selecione a data'
              />
            </div>

            <div>
              <label>Descrição</label>
              <textarea
                value={condec.descricao}
                onChange={(e) => handleCondecoracaoChange(index, 'descricao', e.target.value)}
              />
            </div>

            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveCondecoracao(index)}>Remover</button>
            )}
          </div>
        ))}

        <div className="form-group">
          <button type="button" onClick={handleAddCondecoracao}>Adicionar Condecoração</button>
        </div>

        <div className="form-group">
          <button type="submit">Enviar</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      {loading && <div className="loading">Carregando...</div>}
    </div>
  );
}

export default Condecoracoes;
