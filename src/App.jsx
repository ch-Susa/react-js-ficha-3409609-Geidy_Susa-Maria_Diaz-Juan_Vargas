import './App.css';
import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Inventario from "./pages/Inventario";
import NuevoProducto from "./pages/NuevoProducto";
import Acerca from "./pages/Acerca";
import NoEncontrado from "./pages/NoEncontrado";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./components/Navbar";

function App() {
  const productos = JSON.parse(
  localStorage.getItem("inventario")
) || [];
  return (
    <main className="contenedor">

      <h1>Tienda tecnológica</h1>

      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/nuevo" element={<NuevoProducto />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="*" element={<NoEncontrado />} />
        <Route
  path="/productos/:id"
  element={<DetalleProducto productos={productos} />}/>
      </Routes>

    </main>
  );
}

export default App;