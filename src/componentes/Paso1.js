import { useContext, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { DatosContext } from "../contextos/DatosContext";
import { NavegacionContext } from "../contextos/NavegacionContext";
import { useFormulario } from "../hooks/useFormulario";

export const Paso1 = () => {
  const { avanzar } = useContext(NavegacionContext);
  const { datosPersonales, setDatosPersonales } = useContext(DatosContext);
  const { datos, setDato, formularioValido } = useFormulario(datosPersonales);
  const [edad, setEdad] = useState(null);
  const primerCampo = useRef(null);
  const enviarPaso = (e) => {
    e.preventDefault();
    setDatosPersonales(datos);
    avanzar();
  };
  useEffect(() => {
    if (datos.fechaNacimiento !== "") {
      const fechaLuxon = DateTime.fromFormat(
        datos.fechaNacimiento,
        "yyyy-MM-dd"
      );
      setEdad(Math.trunc(Math.abs(fechaLuxon.diffNow("years").years)));
    }
  }, [datos.fechaNacimiento]);
  useEffect(() => {
    primerCampo.current.focus();
  }, []);
  return (
    <>
      <h2>Paso 1: Datos personales</h2>
      <form noValidate autoComplete="off" onSubmit={enviarPaso}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            ref={primerCampo}
            value={datos.nombre}
            onChange={setDato}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            className="form-control"
            value={datos.apellidos}
            onChange={setDato}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            className="form-control"
            value={datos.fechaNacimiento}
            onChange={setDato}
          />
          <span>Edad: {edad}</span>
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            className="form-control"
            value={datos.correo}
            onChange={setDato}
          />
        </div>
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
