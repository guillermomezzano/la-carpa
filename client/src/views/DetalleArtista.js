import "../App.css";
import React, { useState, useEffect } from "react";
import eliminar from "../image/eliminar.png";
import NavBarLogged from '../components/NavBarLogged'
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  findOneSingleArtista,
  deleteAnExistingArtista,
  updateExistingArtistaDisciplinaDelete,
  newComentarioExistingArtista,
} from "../services/artistaServices";
import {Button} from 'react-bootstrap';

const DetalleArtista = () => {
  const { id } = useParams();
  const [artista, setArtista] = useState({});
  const [alertMsg, setAlertMsg] = useState([]);
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const desc = ['terrible', 'malo', 'normal', 'bueno', 'muy bueno'];
  // const [value, setValue] = useState(3);

  useEffect(() => {
    findOneSingleArtista(id, setArtista);
  },[]);

  const eliminarArtista = () => {
    deleteAnExistingArtista(artista._id);
    navigate("/");
  };

  const eliminarDisciplina =(idDisciplina)=>{
  
    let filterdisciplinas = artista.disciplinas.filter(unDisciplinas=>unDisciplinas._id!==idDisciplina) 

    let artistaForm;
    artistaForm = {
      nombre: artista.nombre,
      email:artista.email,
      password:artista.password,
      region: artista.region,
      comuna: artista.comuna,
      fono: artista.fono,
      rs: artista.rs,
      descripcion: artista.descripcion,
      disciplinas: filterdisciplinas,
      comnetarios: artista.comentarios,
    };
     
    console.log(filterdisciplinas)  
    console.log(idDisciplina)
    console.log(artistaForm)
    console.log(id)    

    updateExistingArtistaDisciplinaDelete(id, artistaForm, setAlertMsg, alertMsg)
  }
  useEffect(() => {
    findOneSingleArtista(id, setArtista);
  }, [artista]);


  const agregarComentario = (data)=>{

    let artistaForm;
    artistaForm = {
      nombre: artista.nombre,
      email:artista.email,
      password:artista.password,
      region: artista.region,
      comuna: artista.comuna,
      fono: artista.fono,
      rs: artista.rs,
      descripcion: artista.descripcion,
      disciplinas: artista.disciplinas,
      comentarios: [{
        nombreAutorComentario:data.nombreAutorComentario,
        texto: data.texto,
        calificacion: data.calificacion,
      }],
    };
    newComentarioExistingArtista(id, artistaForm, setAlertMsg, alertMsg)
    setArtista({
      ...artista,
      comentarios:[
        ...artista.comentarios,
        {
          nombreAutorComentario:data.nombreAutorComentario,
          texto: data.texto,
          calificacion: data.calificacion,
        }
      ]
    })
    
  }
  // useEffect(() => {
  //   console.log(artista);
  // }, [artista]);

  // useEffect(() => {
  //   console.log(artista._id);
  // }, [artista._id]);

  return (
    <div className="tableIngreso2">
      <NavBarLogged />
        <div className="titulosHome">
          <div className="tableEncabezado">
            <h1>La Carpa</h1>
            <h4><Link to={"/search"}><p>inicio</p></Link></h4>
          </div>
        </div>
      <div>
        <div className="tableIngresoComentarios">
        <div>
            <h1>Detalles de {artista.nombre}</h1>
            <Link to={`/update/${artista._id}`}>
              <Button variant="warning">editar perfil</Button>
            </Link>
          </div>
        <table className="table">
          <thead>
            <tr>
              <th>telefono</th>
              <th>region</th>
              <th>comuna</th>
              <th>redes sociales</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td>{artista.fono}</td>
                <td>{artista.region}</td>
                <td>{artista.comuna}</td>
                <td> <a href={`https://www.instagram.com/${artista.rs}/`}>{artista.rs}</a></td>
              </tr>
          </tbody>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th>disciplina</th>
              <th>nivel</th>
              <th>eliminar disciplina</th>
            </tr>
          </thead>
          <tbody>
            {artista.disciplinas?.map((unDisciplinas, index) => (
              <tr key={index}>
                <td>{unDisciplinas.nombreDisciplina}</td>
                <td>{unDisciplinas.nivel}</td>
                <td><img className="imagenEliminar" src={eliminar} onClick={() => eliminarDisciplina(unDisciplinas._id)}></img></td>
              </tr>
            ))}
          </tbody>
          <Link to={`/ingresar/disciplina/${artista._id}`}><Button variant="success">agregar disciplina</Button></Link>
        </table>
        <div className="tableDescripcion">
          <h3 className="color">descripcion</h3>
          {artista.descripcion}
        </div>
        <Button variant="danger" onClick={(e) => eliminarArtista()}> eliminar artista</Button>

        </div>
         
        <div>
        <h2 className="color">comentarios</h2>
        <table className="table">
        <thead>
            <tr>
              <th>nombre</th>
              <th>calificacion</th>
              <th>comentario</th>
            </tr>
        </thead>
        <tbody>
            {artista.comentarios?.map((unComentarios, index) => (
              <tr key={index}>
                <td>{unComentarios.nombreAutorComentario}</td>
                <td>{unComentarios.calificacion}</td>
                <td>{unComentarios.texto}</td>
              </tr>
            ))} 
          </tbody>
        </table>
        </div>
        <div>
          <form className="tableIngresoComentarios" onSubmit={handleSubmit(agregarComentario)}>
            <h3>deja tu comentario</h3>
            <p>nombre</p>
            <input
              type="text"
              name="nombreAutorComentario"
              {...register("nombreAutorComentario", { required: true})}
            ></input>
            {errors.nombreAutorComentario?.type === "required" && (
              <p>este campo es requerido</p>
            )}
            <p>comentario</p>
            <textarea
              rows="10"
              cols="50"
              name="texto"
              {...register("texto", {required: true})}
            ></textarea>
            {errors.texto?.type === "required" && (
              <p>este campo es requerido</p>
            )}
            <p>calificar</p>
                <select {...register("calificacion", { required: true })}>
                  <option value="">elige una opcion</option>
                  <option value="muy malo">muy malo</option>
                  <option value="malo">malo</option>
                  <option value="regular">regular</option>
                  <option value="bueno">bueno</option>
                  <option value="muy bueno">muy bueno</option>
                </select>
              {errors.calificacion?.type === "required" && (
                <p>este campo es requerido</p>
               )}
            <Button variant="success" type="submit">comentar</Button>
           </form>
         </div>
      </div>
    </div>
  );
};

export default DetalleArtista;

