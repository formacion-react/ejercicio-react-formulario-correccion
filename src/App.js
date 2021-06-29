import { useState } from "react";
import { Container } from "react-bootstrap";
import { Paso1 } from "./componentes/Paso1";
import { Paso2 } from "./componentes/Paso2";
import { Paso3 } from "./componentes/Paso3";
import { Resumen } from "./componentes/Resumen";
import { DatosContext } from "./contextos/DatosContext";
import { NavegacionContext } from "./contextos/NavegacionContext";

function App() {
  const [paso, setPaso] = useState(1);
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    correo: "",
  });
  const [datosRegistro, setDatosRegistro] = useState({
    username: "",
    password: "",
    repitePassword: "",
  });
  const [datosLogin, setDatosLogin] = useState({
    recordarPassword: false,
  });
  const avanzar = () => {
    if (paso === 4) {
      return;
    }
    setPaso(paso + 1);
  };
  const retroceder = () => {
    if (paso === 1) {
      return;
    }
    setPaso(paso - 1);
  };
  return (
    <Container>
      <NavegacionContext.Provider value={{ avanzar, retroceder }}>
        <DatosContext.Provider
          value={{
            datosPersonales,
            datosRegistro,
            datosLogin,
            setDatosPersonales,
            setDatosRegistro,
            setDatosLogin,
          }}
        >
          {paso === 1 && <Paso1 />}
          {paso === 2 && <Paso2 />}
          {paso === 3 && <Paso3 />}
          {paso === 4 && <Resumen />}
        </DatosContext.Provider>
      </NavegacionContext.Provider>
    </Container>
  );
}

export default App;
