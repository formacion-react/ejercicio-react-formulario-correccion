import { useContext, useEffect, useRef, useState } from "react";
import { DatosContext } from "../contextos/DatosContext";
import { NavegacionContext } from "../contextos/NavegacionContext";
import { useFormulario } from "../hooks/useFormulario";

export const Paso2 = () => {
  const { avanzar, retroceder } = useContext(NavegacionContext);
  const { datosRegistro, setDatosRegistro } = useContext(DatosContext);
  const { datos, setDato, formularioValido } = useFormulario(datosRegistro);
  const primerCampo = useRef(null);
  const enviarPaso = (e) => {
    e.preventDefault();
    setDatosRegistro(datos);
    avanzar();
  };
  useEffect(() => {
    primerCampo.current.focus();
  }, []);
  return (
    <>
      <h2>Paso 2: Datos de acceso</h2>
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
        <div className="form-group">
          <label htmlFor="repitePassword">Repetir contraseña:</label>
          <input
            type="password"
            id="repitePassword"
            className="form-control"
            value={datos.repitePassword}
            onChange={setDato}
          />
        </div>
        <button type="button" className="btn btn-info" onClick={retroceder}>
          Anterior
        </button>
        <button
          type="submit"
          className="btn btn-info"
          disabled={!formularioValido()}
        >
          Siguiente
        </button>
      </form>
    </>
  );
};
