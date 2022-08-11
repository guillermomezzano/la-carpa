import "../App.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  createNewArtista,
  findOneSingleArtista,
  updateExistingArtista,
} from "../services/artistaServices";
import { useNavigate, Link, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import Autocomplete from '@mui/material/Button';


// const axios = require("axios");

const FormIngresarArtista = () => {
  const { id } = useParams();
  const [artista, setArtista] = useState();
  const [artista_id, setArtista_id] = useState();


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState([]);
  const [tituloPag, setTituloPag] = useState();

  // const apretarSubmit = () =>{
  // id ? editarArtista : crearArtista

  const onSubmit = (data) => {
    let artistaForm;
    id
      ? (artistaForm = {
          nombre: data.nombre,
          email:data.email,
          password:data.password,
          confirmPassword:data.confirmPassword,
          region: data.region,
          comuna: data.comuna,
          fono: data.fono,
          rs: data.rs,
          descripcion: data.descripcion,
          disciplinas: artista.disciplinas[{
            nombreDisciplina: artista.nombreDisciplina,
            nivel: artista.nivel,
          }],
        })
      : (artistaForm = {
          nombre: data.nombre,
          email:data.email,
          password:data.password,
          confirmPassword:data.confirmPassword,
          region: data.region,
          comuna: data.comuna,
          fono: data.fono,
          rs: data.rs,
          descripcion: data.descripcion,
          disciplinas: [
            {
              nombreDisciplina: data.nombreDisciplina,
              nivel: data.nivel,
            },
          ],
        });

    console.log(artistaForm);

    if(id !== undefined){
      updateExistingArtista(id, artistaForm, setAlertMsg, alertMsg)
      navigate(`/detalle/${id}`);
    } else {
      createNewArtista(artistaForm,setAlertMsg, alertMsg);
      // console.log(artista_id)
      navigate('/login');
      // navigate(`/detalle/${artista_id}`);
    }
  };

  useEffect(() => {
    reset(artista);
  }, [artista]);

  useEffect(() => {
    id && findOneSingleArtista(id, setArtista);
  }, []);

  useEffect(() => {
    id ? setTituloPag("editar informacion") : setTituloPag("crear artista");
  }, []);

  useEffect(() => {
    console.log(id);
  }, []);

  useEffect(() => {
    console.log(artista);
  }, [artista]);

  return (
    <div>
      <div className="titulosHome">
        <div>
          <h1>La Carpa</h1>
          <h2>{tituloPag}</h2>
        </div>
        <Link to={"/"}>
          <p>home</p>
        </Link>
      </div>
      <form className="tableIngreso" onSubmit={handleSubmit(onSubmit)}>
        <div className="divTableIngreso">
          <div className="divInput">
            <p>nombre de artista</p>
            <input
              type="text"
              name="nombre"
              {...register("nombre", { required: true})}
            ></input>
            {errors.nombre?.type === "required" && (
              <p>este campo es requerido</p>
            )}
            <p>email</p>
            <input
              type="text"
              name="email"
              {...register("email", { required: true})}
            ></input>
            {errors.email?.type === "required" && (
              <p>este campo es requerido</p>
            )}
            <p>password</p>
            <input
              type="password"
              name="password"
              {...register("password", { required: true, minLength:8})}
            ></input>
            {errors.password?.type === "required" && (
              <p>este campo es requerido</p>
            )}
            {errors.password?.type === "minLength" && (
              <p>minimo 8 caracteres</p>
            )}
            <p> confirmar password</p>
            <input
              type="password"
              name="confirmPassword"
              {...register("confirmPassword", { required: true, minLength:8})}
            ></input>
            {errors.confirmPassword?.type === "required" && (
              <p>este campo es requerido</p>
            )}
            {errors.confirmPassword?.type === "minLength" && (
              <p>minimo 8 caracteres</p>
            )}
            <div>
              <p>Direccion</p>
              <div>
                <p>seleccione region</p>
                <select {...register("region", { required: true })}>
                  <option value="">elige una opcion</option>
                  <option value="metropolitana">metropolitana</option>
                  <option value="los lagos">los lagos</option>
                  <option value="valparaiso">valparaiso</option>
                  <option value="del maule">del maule</option>
                </select>
                {errors.region?.type === "required" && (
                  <p>este campo es requerido</p>
                )}
              </div>
              <div>
                <p>seleccione comuna</p>
                <select {...register("comuna", { required: true })}>
                  <option value="">elige una opcion</option>
                  <option value="maipu">maipu</option>
                  <option value="puente alto">puente alto</option>
                  <option value="providencia">providencia</option>
                  <option value="las condes">las condes</option>
                  <option value="lo barnechea">lo barnechea</option>
                  <option value="lo prado">lo prado</option>
                </select>
                {errors.comuna?.type === "required" && (
                  <p>este campo es requerido</p>
                )}
              </div>
            </div>
            <p>telefono</p>
            <input
              type="text"
              name="fono"
              {...register("fono", { required: true,})}
            ></input>
            {errors.fono?.type === "required" && <p>este campo es requerido</p>}
            <p>redes sociales</p>
            <input
              type="text"
              name="rs"
              {...register("rs", { required: true })}
            ></input>
            {errors.rs?.type === "required" && <p>este campo es requerido</p>}
            <div className="tableEncabezado">
              <Button variant="success" type="submit">{tituloPag}</Button>
              <Button variant="danger"> <Link to={"/"}>cancelar</Link></Button >
            </div>
          </div>
          <div className="divInput">
            <p>descripcion</p>
            <textarea
              rows="10"
              cols="50"
              name="descripcion"
              {...register("descripcion", { required: true, minLength: 10 })}
            ></textarea>
            {errors.descripcion?.type === "required" && (
              <p>este campo es requerido</p>
            )}
            {errors.descripcion?.type === "minLength" && (
              <p>minimo 10 caracteres</p>
            )}
          </div>
          {id ? null : (
            <div>
              <p>disciplinas</p>
              <div>
                <p>seleccione una disciplina</p>
                <select {...register("nombreDisciplina", { required: true })}>
                  <option value="">elige una opcion</option>
                  <option value="tela">tela</option>
                  <option value="trapecio">trapecio</option>
                  <option value="lira">lira</option>
                  <option value="malabares">malabares</option>
                  <option value="mano a mano">mano a mano</option>
                  <option value="banquina">banquina</option>
                </select>
                {errors.nombreDisciplina?.type === "required" && (
                  <p>este campo es requerido</p>
                )}
              </div>
              <div>
                <p>seleccione nivel</p>
                <select {...register("nivel", { required: true })}>
                  <option value="">elige una opcion</option>
                  <option value="basico">basico</option>
                  <option value="medio">medio</option>
                  <option value="avanzado">avanzado</option>
                </select>
                {errors.nivel?.type === "required" && (
                  <p>este campo es requerido</p>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormIngresarArtista;
