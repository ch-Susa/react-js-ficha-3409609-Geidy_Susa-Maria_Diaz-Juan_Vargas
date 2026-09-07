  import { NavLink } from "react-router";

  function ProductoCard({
    producto,
    onEliminar,
    onEditar,
    modificarStock
  }) {

    return (
      <article className="producto-card">

        <h2>{producto.nombre}</h2>

        <p>
          <strong>Categoría:</strong>{" "}
          {producto.categoria}
        </p>

        <p>
          Precio original:{" "}
          <s>
            ${producto.precio.toLocaleString("es-CO")}
          </s>
        </p>

        <p className="precio-descuento">
          Precio con descuento: $
          {producto.precioFinal.toLocaleString("es-CO")}
        </p>

        <span className="descuento">
          {producto.descuento}% de descuento
        </span>

        <div className="stock">

          <p>
            <strong>Stock:</strong>{" "}
            {producto.stock} unidades
          </p>

          <div className="stock-controles">

            <button
              className="btn-stock btn-menos"
              onClick={() =>
                modificarStock(producto.id, -1)
              }
              disabled={producto.stock === 0}
            >
              −
            </button>

            <span className="stock-numero">
              {producto.stock}
            </span>

            <button
              className="btn-stock btn-mas"
              onClick={() =>
                modificarStock(producto.id, 1)
              }
            >
              +
            </button>

          </div>

        </div>

        {producto.stock === 0 ? (

          <span className="agotado">
            ✕ Agotado
          </span>

        ) : producto.stock <= 2 ? (

          <span className="stock-bajo">
            ⚠ Stock bajo
          </span>

        ) : (

          <span className="disponible">
            ✓ Disponible
          </span>

        )}

        <button
          className="btn-eliminar"
          onClick={() =>
            onEliminar(producto.id)
          }
        >
          Eliminar producto
        </button>

        <br />

        <button
    className="btn-editar"
    onClick={() => onEditar(producto)}
  >
    Editar
  </button>
  <NavLink to={`/productos/${producto.id}`}>
  Ver detalle
</NavLink>

      </article>
    );
  }

  export default ProductoCard;