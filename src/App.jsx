import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portao from './componentes/telas/portao/Portao';
import Modelo from './componentes/telas/modeloVeiculos/Modelo';
import Carro from './componentes/telas/carro/Carro';

function App() {
  return (
      <Router>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact="true" path="/portoes" element={<Portao/>}/>
          <Route exact="true" path="/modelos" element={<Modelo/>}/>
          <Route exact="true" path="/carros" element={<Carro/>}/>
        </Routes>
      </Router>
  );
}

export default App;
