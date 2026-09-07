import ProductoCard from './components/ProductoCard';
import './App.css';
import { useState, useEffect } from "react";
import { productos as productosIniciales } from "./data/productos";
import FormularioProducto from "./components/FormularioProducto";
import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Inventario from "./pages/Inventario";
import NuevoProducto from "./pages/NuevoProducto";
import Acerca from "./pages/Acerca";
import NoEncontrado from "./pages/NoEncontrado";
import Navbar from "./components/Navbar";



function App() {

  const obtenerProductosIniciales = () => {
    const guardados = localStorage.getItem("inventario");

    if (guardados) {
      return JSON.parse(guardados);
    }

    return productosIniciales;
  };

  const [productos, setProductos] = useState(obtenerProductosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [estadoStock, setEstadoStock] = useState("Todos");
  const [categoria, setCategoria] = useState("Todas");
  const [productoEditando, setProductoEditando] = useState(null);
  const [orden, setOrden] = useState("nombre");
  const [mensaje, setMensaje] = useState("");
useEffect(() => {
  localStorage.setItem(
    "inventario",
    JSON.stringify(productos)
  );
}, [productos]);
  const agregarProducto = (nuevoProducto) => {
    setProductos(prevProductos => [
      ...prevProductos,
      nuevoProducto
    ]);

    setMensaje("Producto agregado correctamente.");
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );

    if (!confirmar) {
      return;
    }

    setProductos(prevProductos =>
      prevProductos.filter(producto => producto.id !== id)
    );

    setMensaje("Producto eliminado.");
  };

  const editarProducto = (producto) => {
  setProductoEditando(producto);
};

  const actualizarProducto = (productoActualizado) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === productoActualizado.id
          ? productoActualizado
          : producto
      )
    );

    setProductoEditando(null);
    setMensaje("Producto actualizado correctamente.");
  };

  const modificarStock = (id, cambio) => {
    setProductos(prevProductos =>
      prevProductos.map(producto => {

        if (producto.id === id) {
          return {
            ...producto,
            stock: Math.max(
              0,
              producto.stock + cambio
            )
          };
        }

        return producto;
      })
    );

    setMensaje("Stock actualizado correctamente.");
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoria("Todas");
    setEstadoStock("Todos");
    setOrden("nombre");
    setMensaje("Filtros limpiados.");
  };

  const productosConDescuento = productos.map(producto => ({
    ...producto,
    descuento: 10,
    precioFinal: producto.precio * 0.90
  }));

  const productosFiltrados = productosConDescuento.filter(producto => {

    const coincideNombre =
      producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "Todas" ||
      producto.categoria === categoria;

    const coincideStock =
      estadoStock === "Todos" ||
      (estadoStock === "Disponibles" && producto.stock > 0) ||
      (estadoStock === "Agotados" && producto.stock === 0);

    return (
      coincideNombre &&
      coincideCategoria &&
      coincideStock
    );
  });

  const productosOrdenados = [...productosFiltrados].sort(
    (a, b) => {

      switch (orden) {

        case "nombre":
          return a.nombre.localeCompare(b.nombre);

        case "precioMenor":
          return a.precio - b.precio;

        case "precioMayor":
          return b.precio - a.precio;

        case "stockMenor":
          return a.stock - b.stock;

        case "stockMayor":
          return b.stock - a.stock;

        default:
          return 0;
      }
    }
  );

  const disponibles = productosConDescuento.filter(
    producto => producto.stock > 0
  );

  const productosAgotados = productos.filter(
    producto => producto.stock === 0
  );

  const valorInventario = productos.reduce(
    (total, producto) =>
      total + producto.precio * producto.stock,
    0
  );
  return (
    <main className="contenedor">

      <h1>Tienda tecnológica</h1>

      {mensaje && (
        <p className="mensaje">
          {mensaje}
        </p>
      )}
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/nuevo" element={<NuevoProducto />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      
      <section className="panel-control">

        <div className="buscador">

          <label>Buscar producto</label>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
          />

        </div>

        <FormularioProducto
          onAgregar={agregarProducto}
          productoEditando={productoEditando}
          onActualizar={actualizarProducto}
          onMensaje={setMensaje}
        />
      
        <div className="filtros">

          <select
            value={categoria}
            onChange={(evento) =>
              setCategoria(evento.target.value)
            }
          >
            <option value="Todas">
              Todas las categorías
            </option>

            <option value="Accesorios">
              Accesorios
            </option>

            <option value="Almacenamiento">
              Almacenamiento
            </option>

            <option value="Audio">
              Audio
            </option>

            <option value="Oficina">
              Oficina
            </option>

            <option value="Pantallas">
              Pantallas
            </option>

            <option value="Perifericos">
              Periféricos
            </option>

            <option value="Componentes">
              Componentes
            </option>

            <option value="Fabricación aditiva">
              Fabricación aditiva
            </option>
          </select>

          <select
            value={estadoStock}
            onChange={(evento) =>
              setEstadoStock(evento.target.value)
            }
          >
            <option value="Todos">
              Todos
            </option>

            <option value="Disponibles">
              Disponibles
            </option>

            <option value="Agotados">
              Agotados
            </option>
          </select>

          <select
            value={orden}
            onChange={(evento) =>
              setOrden(evento.target.value)
            }
          >
            <option value="nombre">
              Nombre A-Z
            </option>

            <option value="precioMenor">
              Precio menor a mayor
            </option>

            <option value="precioMayor">
              Precio mayor a menor
            </option>

            <option value="stockMenor">
              Stock menor a mayor
            </option>

            <option value="stockMayor">
              Stock mayor a menor
            </option>
          </select>

          <button
            className="btn-limpiar"
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>

        </div>

      </section>

      <section className="estadisticas">

        <div className="estadistica">
          <span className="estadistica-icono"></span>

          <div>
            <span>Productos registrados</span>
            <strong>{productos.length}</strong>
          </div>
        </div>

        <div className="estadistica">
          <span className="estadistica-icono"></span>

          <div>
            <span>Productos agotados</span>
            <strong>{productosAgotados.length}</strong>
          </div>
        </div>

        <div className="estadistica">
          <span className="estadistica-icono"></span>

          <div>
            <span>Valor del inventario</span>

            <strong>
              ${valorInventario.toLocaleString("es-CO")}
            </strong>
          </div>
        </div>

        <div className="estadistica">
          <span className="estadistica-icono"></span>

          <div>
            <span>Productos encontrados</span>
            <strong>{productosOrdenados.length}</strong>
          </div>
        </div>

      </section>

      <section className="seccion-productos">

        <h2>Productos</h2>

        <div className="productos">

          {productosOrdenados.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onEliminar={eliminarProducto}
              onEditar={editarProducto}
              modificarStock={modificarStock}
            />
          ))}

          {productosOrdenados.length === 0 && (
            <p className="sin-productos">
              No se encontraron productos.
            </p>
          )}

        </div>

      </section>

      <section className="seccion-productos">

        <h2>Productos disponibles</h2>

        <div className="productos">

          {disponibles.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onEliminar={eliminarProducto}
              onEditar={editarProducto}
              modificarStock={modificarStock}
            />
          ))}

        </div>

      </section>

    </main>
  );
}
// Responsabilidades actuales de:
// 1. Manejar el estado de los productos.
// 2. Filtrar y buscar productos.
// 3. Mostrar y organizar los componentes de la aplicación.
export default App;