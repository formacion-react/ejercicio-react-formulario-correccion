import { useContext } from "react";
import { DatosContext } from "../contextos/DatosContext";
import { NavegacionContext } from "../contextos/NavegacionContext";

export const Resumen = () => {
  const { retroceder } = useContext(NavegacionContext);
  const { datosPersonales, datosRegistro } = useContext(DatosContext);
  return (
    <>
      <h2>Resumen</h2>
      <pre>{JSON.stringify(datosPersonales, null, 2)}</pre>
      <button className="btn btn-info" onClick={retroceder}>
        Anterior
      </button>
    </>
  );
};
