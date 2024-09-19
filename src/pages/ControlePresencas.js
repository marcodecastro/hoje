import React from 'react';
import PresencaForm from '../components/PresencaForm';
import PresencaGraficos from '../components/PresencaGraficos';
import withAdminProtection from '../hoc/withAdminProtection';

const ControlePresencas = () => {
  return (
    <div>
      <h1>Controle de Presenças</h1>
      <PresencaForm />
      <PresencaGraficos />
    </div>
  );
};

export default withAdminProtection(ControlePresencas);
