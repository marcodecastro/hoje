import React from 'react'
import withAdminProtection from '../withAdminProtection';

const AdminPage = () => {
  return (
    <div>
    <h1>Admin Settings Page</h1>
    <p>Only accessible to users with admin privileges.</p>
  </div>
  )
}

export default withAdminProtection(AdminPage); 