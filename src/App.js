import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CadastroPlacas from './components/CadastroPlacas';
import GerarRelatorio from './components/GerarRelatorio';
import ConsultarPlaca from './components/ConsultarPlaca';

function NavigationMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/cadastro">Cadastro de Placas</Link>
        </li>
        <li>
          <Link to="/relatorio">Gerar Relatório</Link>
        </li>
        <li>
          <Link to="/consulta">Consultar Placa</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/cadastro" element={<CadastroPlacas />} />
        <Route path="/relatorio" element={<GerarRelatorio />} />
        <Route path="/consulta" element={<ConsultarPlaca />} />
      </Routes>
    </Router>
  );
}

export default App;
