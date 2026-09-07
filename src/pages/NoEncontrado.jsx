import { NavLink } from "react-router";

function NoEncontrado() {
  return (
    <section>
      <h1>Página no encontrada</h1>

      <p>La página que buscas no existe.</p>

      <NavLink to="/">
        Volver a Inicio
      </NavLink>
    </section>
  );
}

export default NoEncontrado;