import FormularioProducto from "../components/FormularioProducto";
import { useNavigate } from "react-router";

function NuevoProducto() {

  const navigate = useNavigate();

  const agregarProducto = (nuevoProducto) => {

    const guardados = localStorage.getItem("inventario");

    const productos = guardados
      ? JSON.parse(guardados)
      : [];

    productos.push(nuevoProducto);

    localStorage.setItem(
      "inventario",
      JSON.stringify(productos)
    );

    alert("Producto agregado correctamente.");

    navigate("/inventario");
  };

  const mostrarMensaje = (mensaje) => {
    alert(mensaje);
  };

  return (
    <section>

      <h1>Nuevo Producto</h1>

      <FormularioProducto
        onAgregar={agregarProducto}
        onMensaje={mostrarMensaje}
      />

    </section>
  );
}

export default NuevoProducto;