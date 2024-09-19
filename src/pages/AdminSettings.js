import React from 'react';
import withAdminProtection from '../withAdminProtection';
import { Link } from 'react-router-dom';
import '../styles/AdminSettings.css';

const AdminSettings = () => {
  return (
    <div className="admin-settings">
      <h1>Admin Settings</h1>
      
      <div className="settings-section">
        <h2>Gerenciamento de Membros</h2>
        <ul>
          <li><Link to="/admin/add-member">Adicionar Novo Membro</Link></li>
          <li><Link to="/membro">Adicionar Novo Membro</Link></li>
          <li><Link to="/admin/edit-member">Editar Membro</Link></li>
          <li><Link to="/admin/delete-member">Excluir Membro</Link></li>
          <li><Link to="/admin/search-member">Buscar Membro</Link></li>
        </ul>
      </div>

      <div className="settings-section">
        <h2>Gerenciamento de Eventos</h2>
        <ul>
          <li><Link to="/events">Adicionar Novo Evento</Link></li>
          <li><Link to="/admin/edit-event">Editar Evento</Link></li>
          <li><Link to="/admin/delete-event">Excluir Evento</Link></li>
          <li><Link to="/admin/search-event">Buscar Evento</Link></li>
        </ul>
      </div>

      <div className="settings-section">
        <h2>Configurações de Presenças</h2>
        <ul>
          <li><Link to="/admin/add-attendance">Adicionar Presença</Link></li>
          <li><Link to="/admin/view-attendance">Visualizar Presenças</Link></li>
          <li><Link to="/admin/attendance-reports">Relatórios de Presença</Link></li>
        </ul>
      </div>

      <div className="settings-section">
        <h2>Configurações de Acesso e Segurança</h2>
        <ul>
          <li><Link to="/admin/user-permissions">Gerenciamento de Usuários e Permissões</Link></li>
          <li><Link to="/admin/reset-passwords">Reset de Senhas</Link></li>
          <li><Link to="/admin/two-factor-auth">Autenticação em Duas Etapas</Link></li>
        </ul>
      </div>

      <div className="settings-section">
        <h2>Configurações Gerais do Sistema</h2>
        <ul>
          <li><Link to="/admin/email-settings">Configurações de E-mail</Link></li>
          <li><Link to="/admin/system-logs">Logs do Sistema</Link></li>
          <li><Link to="/admin/backup-restore">Backup e Restauração</Link></li>
        </ul>
      </div>

      <div className="settings-section">
        <h2>Dashboard e Relatórios</h2>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard Resumido</Link></li>
          <li><Link to="/admin/custom-reports">Relatórios Personalizados</Link></li>
        </ul>
      </div>

      <div className="settings-section">
        <h2>Suporte e Documentação</h2>
        <ul>
          <li><Link to="/admin/faq">FAQ</Link></li>
          <li><Link to="/admin/documentation">Documentação</Link></li>
          <li><Link to="/admin/support">Contato para Suporte</Link></li>
        </ul>
      </div>
    </div>
  );
};


export default withAdminProtection(AdminSettings);
