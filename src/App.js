import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CadastroPlacas from './components/CadastroPlacas';
import GerarRelatorio from './components/GerarRelatorio';
import ConsultarPlaca from './components/ConsultarPlaca';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Temp from './components/Temp';

function NavigationMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/cadastroPlacas">Cadastro de Placas</Link>
        </li>
        <li>
          <Link to="/relatorio">Gerar Relatório</Link>
        </li>
        <li>
          <Link to="/consulta">Consultar Placa</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Cadastro">Cadastro User</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div>
      <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/cadastroPlacas" element={<CadastroPlacas />} />
        <Route path="/relatorio" element={<GerarRelatorio />} />
        <Route path="/consulta" element={<ConsultarPlaca />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>
      </Router>
      <Temp/>
    </div>
    
  );
}

export default App;
