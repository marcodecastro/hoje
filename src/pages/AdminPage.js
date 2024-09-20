import React from 'react'
import withAdminProtection from '../withAdminProtection';
import { useNavigate } from 'react-router-dom';
import voltar from '../images/voltar.png';

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <div>
    <h1>Admin Settings Page</h1>

     {/* Ícone de voltar */}
     <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} // Redireciona para a página inicial
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

    <p>Only accessible to users with admin privileges.</p>
  </div>
  )
}

export default withAdminProtection(AdminPage); 