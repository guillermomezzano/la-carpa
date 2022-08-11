import "../App.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  findOneSingleArtista,
  updateExistingArtistaDisciplina
} from "../services/artistaServices";
import { useNavigate, Link, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';

const AgregarDicsiplina = () => {
  const { id } = useParams();
  const [artista, setArtista] = useState();
  const [alertMsg, setAlertMsg] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    let artistaForm;
    artistaForm = {
      nombre: artista.nombre,
      email:artista.email,
      password:artista.password,
      edad: artista.edad,
      region: artista.region,
      comuna: artista.comuna,
      fono: artista.fono,
      rs: artista.rs,
      descripcion: artista.descripcion,
      disciplinas: {
        nombreDisciplina: data.nombreDisciplina,
        nivel: data.nivel,
      },
      comnetarios: artista.comentarios,
    };

    id && updateExistingArtistaDisciplina (id, artistaForm , setAlertMsg, alertMsg)
   
    navigate(`/detalle/${artista._id}`);
  };

  useEffect(() => {
    console.log(id);
  }, []);
  useEffect(() => {
    console.log(artista);
  }, [artista]);

  useEffect(() => {
    findOneSingleArtista(id, setArtista);
  }, []);

  return (
    <div>
       <h4>
          <Link to={"/search"}><p>inicio</p></Link>
      </h4>
      <form className="tableIngreso" onSubmit={handleSubmit(onSubmit)}>
        <div className="divTableIngreso">
          <div className="divInput">
            <p>agregue disciplinas</p>
            <div>
              <p>seleccione una disciplina</p>
              <select {...register("nombreDisciplina", { required: true })}>
                <option value="">elija una opcion</option>
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
                <option value="">elija una opcion</option>
                <option value="basico">basico</option>
                <option value="medio">medio</option>
                <option value="avanzado">avanzado</option>
              </select>
              {errors.nivel?.type === "required" && (
                <p>este campo es requerido</p>
              )}
            </div>
          </div>
        </div>
        <div className="tableEncabezado">
          <Button variant="success" type="submit">agregar</Button>
          <Button variant="danger"><Link to={`/detalle/${id}`}> cancelar </Link></Button>
        </div>
      </form>
    </div>
  )
};

export default AgregarDicsiplina;
