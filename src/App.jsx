// eslint-disable-next-line no-unused-vars
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Roles from "./components/Roles";
import Unidades from "./components/Unidades";
import SeleccionarRol from "./components/SeleccionarRol";
import Reporte from "./components/Reporte";
import Datos from "./components/Datos"


function App() {
  return (
    <HashRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/roles" element={<Roles />} />
            <Route path="/" element={<Unidades />} />
            <Route path="/seleccionarrol" element={<SeleccionarRol />} />
            <Route path="/reporte" element={<Reporte />} />
            <Route path="/datos" element={<Datos />} />
          </Routes>
        </div>
    </HashRouter>
  );
}

export default App;
