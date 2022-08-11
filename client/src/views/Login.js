import "../App.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/artistaServices";
import {Form, Button} from 'react-bootstrap';


const Login = () => {
    // const [password, setPassword] = useState()
    // const [email, setEmail] = useState()
    const navigate = useNavigate();
    const [alertMsg, setAlertMsg] = useState([]);
    const [artista, setArtista] = useState({});

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

const onSubmit = (data,e) => {
  e.preventDefault()
  let artistaLog = {
    email:data.email,
    password:data.password,
  }
  
  const a = login(artistaLog,setAlertMsg,alertMsg)
  console.log(a)
  navigate(`/search`);
};
return (
<>

<Form onSubmit={handleSubmit(onSubmit)}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="color">Email address</Form.Label>
    <Form.Control 
      type="text"
      name="email"
      placeholder="email" 
     {...register("email", { required: true })}
    />
  </Form.Group>
  {errors.email?.type === "required" && <p>este campo es requerido</p>}
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label className="color">Password</Form.Label>
    <Form.Control 
    type="password"
    name="password"
    placeholder="Password" 
        {...register("password", { required: true })}
    />
  </Form.Group>
  {errors.password?.type === "required" && <p>este campo es requerido</p>}
  <Button variant="primary" type="submit">
    login
  </Button>
</Form>
</>
)
}

export default Login
