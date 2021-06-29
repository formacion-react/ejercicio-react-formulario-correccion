import { useContext, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { DatosContext } from "../contextos/DatosContext";
import { NavegacionContext } from "../contextos/NavegacionContext";
import { useFormulario } from "../hooks/useFormulario";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";

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
      <Row>
        <Col xs={12} as="h2">
          Paso 1: Datos personales
        </Col>
        <Col
          xs={12}
          as="form"
          noValidate
          autoComplete="off"
          onSubmit={enviarPaso}
        >
          <Row>
            <Form.Group className="col-3" controlId="nombre">
              <FormLabel>Nombre:</FormLabel>
              <FormControl
                type="text"
                className="form-control"
                ref={primerCampo}
                value={datos.nombre}
                onChange={setDato}
              />
            </Form.Group>
            <Form.Group controlId="apellidos" className="col-3">
              <FormLabel>Apellidos:</FormLabel>
              <FormControl
                type="text"
                className="form-control"
                value={datos.apellidos}
                onChange={setDato}
              />
            </Form.Group>
            <Form.Group controlId="fechaNacimiento" className="col-3">
              <FormLabel>Fecha de nacimiento:</FormLabel>
              <FormControl
                type="date"
                className="form-control"
                value={datos.fechaNacimiento}
                onChange={setDato}
              />
              <span>Edad: {edad}</span>
            </Form.Group>
            <Form.Group controlId="correo" className="col-3">
              <FormLabel>Correo electrónico:</FormLabel>
              <FormControl
                type="email"
                className="form-control"
                value={datos.correo}
                onChange={setDato}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="info"
              block={true}
              disabled={!formularioValido()}
            >
              Siguiente
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};
