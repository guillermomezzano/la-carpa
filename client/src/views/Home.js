import "../App.css";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { findAllArtistas } from "../services/artistaServices";
// import { Form, Button } from "react-bootstrap";
import NavBarLogin from '../components/NavBarLogin'

const Home = () => {
  // const [artistas, setArtistas] = useState([]);
  // const [resultArtistas, setResultArtistas] = useState();
  // const [errArtistas, setErrArtistas] = useState();
  // const [busquedaPorDisciplina, setBusquedaPorDisciplina] = useState();
  // const [busquedaPorRegion, setBusquedaPorRegion] = useState();

  // useEffect(() => {
  //   findAllArtistas(setArtistas, setErrArtistas);
  // }, []);

  // const buscarArtistas = (e) => {
  //   e.preventDefault();

  //   if (
  //     busquedaPorRegion !== undefined &&
  //     busquedaPorDisciplina === undefined
  //   ) {
  //     let filtroArtistas = artistas.filter((unArtistas) => {
  //       if (unArtistas.region.includes(busquedaPorRegion)) {
  //         return unArtistas;
  //       }
  //     });

  //     setResultArtistas(filtroArtistas);
  //   } else if (busquedaPorDisciplina !== undefined && busquedaPorRegion === undefined) {
  //     let artistasDisciplinas = [];
  //     artistas.map((unArtista) => {
  //       unArtista.disciplinas.map((unDisciplina) => {
  //         if (unDisciplina.nombreDisciplina === busquedaPorDisciplina) {
  //           artistasDisciplinas.push(unArtista);
  //         }
  //       });
  //     });

  //     console.log(artistasDisciplinas);
  //     setResultArtistas(artistasDisciplinas);
  //   } else if (
  //     busquedaPorDisciplina !== undefined &&
  //     busquedaPorRegion !== undefined
  //   ) {
  //     let artistasDisciplinas = [];
  //     artistas.map((unArtista) => {
  //       unArtista.disciplinas.map((unDisciplina) => {
  //         if (unDisciplina.nombreDisciplina === busquedaPorDisciplina) {
  //           artistasDisciplinas.push(unArtista);
  //         }
  //       });
  //     });
  //     let artistasDisciplinasRegion = artistasDisciplinas.filter(
  //       (unArtistas) => {
  //         if (unArtistas.region.includes(busquedaPorRegion)) {
  //           return unArtistas;
  //         }
  //       }
  //     );
  //     setResultArtistas(artistasDisciplinasRegion);
  //   } else {
  //     alert("no ha ingresado ningun dato de busqueda");
  //   }

  // };

  return (
      <div>
        <NavBarLogin />
        {/* <h2 className="color">ingrese busqueda</h2>
        <Form onSubmit={buscarArtistas}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="disciplina"
              placeholder="Ingrese disciplina"
              onChange={(e) => setBusquedaPorDisciplina(e.target.value)}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setBusquedaPorRegion(e.target.value)}
          >
            <option>seleccione region</option>
            <option value="metropolitana">metropolitana</option>
            <option value="los lagos">los lagos</option>
            <option value="valparaiso">valparaiso</option>
            <option value="del maule">del maule</option>
          </Form.Select>
          <Button variant="primary" type="submit">
            buscar
          </Button>
        </Form>
      </div>
      <div className="titulos">
        <h2>Telon de artistas</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Artistas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resultArtistas?.map((unArtista, index) => (
            <tr key={index}>
              <td>{unArtista.nombre}</td>
              <td className="acciones">
                <Link to={`/detalle/${unArtista._id}`}>
                  <Button variant="info">detalle</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Home;
