import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'; // Supondo que você tenha uma página de Dashboard
import Inicial from './pages/Inicial';
import Membro from './pages/Membro';
import Esposa from './pages/Esposa';
import Filhos from './pages/Filhos';
import Casamento from './pages/Casamento';
import Comemoracoes from './pages/Comemoracoes';
import Comanderia from './pages/Comanderia';
import Condecoracoes from './pages/Condecoracoes';
import CapituloRealArco from './pages/CapituloRealArco';
import Instalacao from './pages/Instalacao';
import Reassuncao from './pages/Reassuncao';
import Simbolicos from './pages/Simbolicos';
import Filosoficos from './pages/Filosoficos';
import Adicionais from './pages/Adicionais';
import Apostolado from './pages/Apostolado';


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
        <Route path="/esposa" element={<Esposa />} />
        <Route path="/filhos" element={<Filhos />} />
        <Route path="/casamento" element={<Casamento />} />
        <Route path="/comanderia" element={<Comanderia />} />
        <Route path="comemoracoes" element={<Comemoracoes />} />
        <Route path="/simbolicos" element={<Simbolicos />} />
        <Route path="/filosoficos" element={<Filosoficos />} />
        <Route path="/adicionais" element={<Adicionais />} />
        <Route path="/apostolado" element={<Apostolado />} />
        <Route path="/capitulorealarco" element={<CapituloRealArco />} />
        <Route path="/comanderia" element={<Comanderia/>} />
        <Route path="/Condecoracoes" element={<Condecoracoes/>} />
        <Route path="/instalacao" element={<Instalacao/>} />
        <Route path="/reassuncao" element={<Reassuncao/>} />
      </Routes>
    </Router>
  );
};

export default App;

