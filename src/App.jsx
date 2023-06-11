import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './componentes/Home'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from './componentes/MenuPrivado'
import Portao from './componentes/telas/portao/Portao';
import Modelo from './componentes/telas/modeloVeiculos/Modelo';
import Carro from './componentes/telas/carro/Carro';
import Login from './componentes/telas/login/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MenuPublico />}>
          <Route index element={<Home />} />
          <Route exact="true" path='/login' element={<Login />} />
        </Route>

        <Route path='/privado' element={<MenuPrivado />}>
          <Route index element={<Home />} />
          <Route exact="true" path="portoes" element={<Portao/>}/>
          <Route exact="true" path="modelos" element={<Modelo/>}/>
          <Route exact="true" path="carros" element={<Carro/>}/>
          <Route exact="true" path='login' element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;