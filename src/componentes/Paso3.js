import { useContext, useEffect, useRef, useState } from "react";
import { DatosContext } from "../contextos/DatosContext";
import { NavegacionContext } from "../contextos/NavegacionContext";
import { useFormulario } from "../hooks/useFormulario";

export const Paso3 = () => {
  const { avanzar, retroceder } = useContext(NavegacionContext);
  const { datosRegistro, datosLogin, setDatosLogin } = useContext(DatosContext);
  const { datos, setDato, formularioValido } = useFormulario({
    username: "",
    password: "",
    recordarPassword: false,
  });
  const [error, setError] = useState(false);
  const primerCampo = useRef(null);
  const enviarPaso = (e) => {
    e.preventDefault();
    comprobarCredenciales();
  };
  const comprobarCredenciales = () => {
    if (
      datosRegistro.username === datos.username &&
      datosRegistro.password === datos.password
    ) {
      setError(false);
      setDatosLogin({ recordarPassword: datos.recordarPassword });
      avanzar();
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    primerCampo.current.focus();
  }, []);
  return (
    <>
      <h2>Paso 3: Login</h2>
      <form noValidate autoComplete="off" onSubmit={enviarPaso}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            ref={primerCampo}
            value={datos.username}
            onChange={setDato}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={datos.password}
            onChange={setDato}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="recordarPassword"
            className="form-check-input"
            checked={datos.recordarPassword}
            onChange={setDato}
          />
          <label htmlFor="recordarPassword" className="form-check-label">
            Recordar contraseña
          </label>
        </div>
        <button type="button" className="btn btn-info" onClick={retroceder}>
          Anterior
        </button>
        <button
          className="btn btn-info"
          type="submit"
          disabled={!formularioValido()}
        >
          Acceder
        </button>
        {error && <p class="error">Credenciales erróneas</p>}
      </form>
    </>
  );
};
