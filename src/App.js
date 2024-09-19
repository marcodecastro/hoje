import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'; // Supondo que você tenha uma página de Dashboard
import Inicial from './pages/Inicial';
import Membro from './pages/Membro';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/inicial" element={<Inicial />} />
        {/* Adicione outras rotas conforme necessário */}
        <Route path="/membro" element={<Membro />} />
      </Routes>
    </Router>
  );
};

export default App;

