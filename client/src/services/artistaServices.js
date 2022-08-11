

const axios = require("axios");
// res.data.artista

export const login = (artista,setArtista,setAlertMsg,alertMsg) =>{
        axios
        .post("http://localhost:8080/api/login", artista , { withCredentials: true })
        .then((res) => (console.log(res) ) )  
        .catch ((err)=> {
                Object?.entries(err.data.msg).map((e) => {
                        console.log(e[1].message);
                        setAlertMsg([...alertMsg, e[1].message]); 
                        alert("todos los campos son obligatorios"+JSON.stringify([...alertMsg, e[1].message]))
                })         

        })
               
}

export const createNewArtista =  (artista,setAlertMsg,alertMsg) => {
       axios
        .post("http://localhost:8080/api/artista/new", artista )
        .then((res) => (console.log(res.data.artista) ) )  
        .catch ((err)=>{
                Object?.entries(err.response.data.error.errors).map((e) => {
                        console.log(e[1].message);
                        setAlertMsg([...alertMsg, e[1].message]); 
                        alert("todos los campos son obligatorios"+JSON.stringify([...alertMsg, e[1].message]))
                })         
        })
       
};


export const findAllArtistas = (setArtistas,setErrArtistas) =>{
        axios
        .get('http://localhost:8080/api/artista')
        .then((res) => (setArtistas( res.data.artista)))
        .catch(err => setErrArtistas(err.response.data.error));
}
       
       
export const findOneSingleArtista = (id,setArtista) => {
        axios
        .get(`http://localhost:8080/api/artista/${id}`)
        .then((res) => (setArtista( res.data.artista)))  
}

export const deleteAnExistingArtista = (id) => {
        axios
        .delete(`http://localhost:8080/api/artista/delete/${id}`, { withCredentials: true })
        .then((res) => (console.log(res.data.artista)))  
}

export const updateExistingArtista = (id,artistaForm,setAlertMsg,alertMsg) => {
        console.log("este es el artista form" + JSON.stringify(artistaForm))
        axios
        .put(`http://localhost:8080/api/artista/update/${id}`, artistaForm , { withCredentials: true })
        .then((res) => ((res.data.artista))) 
        .catch ((err)=>{
                Object?.entries(err.response.data.error.errors).map((e) => {
                        console.log(e[1].message);
                        setAlertMsg([...alertMsg, e[1].message]); 
                        alert("todos los campos son obligatorios"+JSON.stringify([...alertMsg, e[1].message]))
                })         
        }) 
}

export const updateExistingArtistaDisciplina =(id,artistaForm,setAlertMsg,alertMsg) =>{
        console.log("este es el artista form" + JSON.stringify(artistaForm))
        axios
        .put(`http://localhost:8080/api/artista/update/disciplina/${id}`, artistaForm , { withCredentials: true })
        .then((res) => ((res.data.artista))) 
        .catch ((err)=>{
                Object?.entries(err.response.data.error.errors).map((e) => {
                        console.log(e[1].message);
                        setAlertMsg([...alertMsg, e[1].message]); 
                        alert("todos los campos son obligatorios"+JSON.stringify([...alertMsg, e[1].message]))
                })         
        }) 
}


export const updateExistingArtistaDisciplinaDelete = (id,artistaForm,setAlertMsg,alertMsg) =>{
        console.log("este es el artista form" + JSON.stringify(artistaForm))
        axios
        .put(`http://localhost:8080/api/artista/update/disciplina/delete/${id}`, artistaForm , { withCredentials: true })
        .then((res) => ((res.data.artista))) 
        .catch ((err)=>{
                Object?.entries(err.response.data.error.errors).map((e) => {
                        console.log(e[1].message);
                        setAlertMsg([...alertMsg, e[1].message]); 
                        alert("todos los campos son obligatorios"+JSON.stringify([...alertMsg, e[1].message]))
                })         
        }) 
}


export const newComentarioExistingArtista =(id,artistaForm,setAlertMsg,alertMsg) =>{
        console.log("esta en comentarios este es el artista form" + JSON.stringify(artistaForm))
        axios
        .put(`http://localhost:8080/api/artista/new/comentarios/${id}`, artistaForm )
        .then((res) => ((res.data.artista))) 
        .catch ((err)=>{
                Object?.entries(err.response.data.error.errors).map((e) => {
                        console.log(e[1].message);
                        setAlertMsg([...alertMsg, e[1].message]); 
                        alert("todos los campos son obligatorios"+JSON.stringify([...alertMsg, e[1].message]))
                })         
        }) 
}


// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

// export default () => {
//     const [ artista, setArtista ] = useState()
//     useEffect(()=>{
//         axios.post("http://localhost:8080/api/artista/new")
//             .then(res=>setArtista(res.data.artista))
//     }, []);
// }
