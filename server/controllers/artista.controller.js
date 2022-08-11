const Artista = require("../models/artista.model");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

module.exports.createNewArtista = (req, res) => {
  console.log(req.body)
  Artista.create(req.body)
    .then((newCreatedArtista) => res.json({ artista: newCreatedArtista }))
    .catch((err) =>res.status(500).json({ message: "no hemos podido crear la artista", error: err }));
};

module.exports.findAllArtistas = (req, res) => {
  Artista.find()
    .then((allArtistas) => res.json({ artista: allArtistas }))
    .catch((err) =>
      res.json({ message: "no hemos podido motrar las artistas", error: err })
    );
};

module.exports.findOneSingleArtista = (req, res) => {
  Artista.findOne({ _id: req.params.id })
    .then((oneSingleArtista) => res.json({ artista: oneSingleArtista }))
    .catch((err) =>
      res.json({ message: "no hemos podido encontrar la artista", error: err })
    );
};

module.exports.newComentarioExistingArtista = (req, res) => {
  console.log("entro a newComentarioExistingArtista")
  Artista.findOneAndUpdate({ _id: req.params.id },  { $push: { comentarios: req.body.comentarios } })
    .then((updatedArtista) => res.json({ artista: updatedArtista }))
    .catch((err) =>res.json({ message: "no hemos podido ectualizar la artista", error: err }));
};

module.exports.updateExistingArtista = (req, res) => {
  console.log("entro a updateartista")
  if (res.locals.user===req.params.id){
  Artista.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedArtista) => res.json({ artista: updatedArtista }))
    .catch((err) =>res.json({ message: "no hemos podido ectualizar la artista", error: err }));
  }
};

module.exports.updateExistingArtistaDisciplina = (req, res) => {
  console.log("entro a updatedisciplina")
  console.log("hola este es el req.locals.user", res.locals.user)
  console.log("hola este es el req.params.id",req.params.id)
  if (res.locals.user===req.params.id){
    Artista.findOneAndUpdate({ _id: req.params.id },  { $push: { disciplinas: req.body.disciplinas } })
    .then((updatedArtista) => res.json({ artista: updatedArtista }))
    .catch((err) =>res.json({ message: "no hemos podido ectualizar la artista", error: err }));
  }
};
// res 401 no tiende autorizacion 
module.exports.updateExistingArtistaDisciplinaDelete = (req, res) => {
  console.log("entro a updatedisciplina")
  if (res.locals.user===req.params.id){
  Artista.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedArtista) => res.json({ artista: updatedArtista }))
    .catch((err) =>res.json({ message: "no hemos podido ectualizar la artista", error: err }));
  }
};

module.exports.deleteAnExistingArtista = (req, res) => {
  if (res.locals.user===req.params.id){
  Artista.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) =>
      res.json({ message: "no hemos podido borrar la artista", error: err })
    );
  }
};
module.exports.logout = (_, res) => {
  try {
      return res.clearCookie("usertoken").json({msg:"token eliminado"})
  } catch (err){
      return res.status(403).json({msg:"usuario sin token", err})
  }
}

module.exports.login = (req, res) => {
  console.log(req.body)
  const {email,password} = req.body
  Artista.findOne({ email })
      .then(artista => {
          if (!artista) {
              res.json({ msg: "No encontró usuario" });
          } else {
              bcrypt
                  .compare(password, artista.password)
                  .then(passwordIsValid => {
                      if (passwordIsValid) {
                          console.log("Password Válido")
                          const secretKey = "cazuela";
                          const payload = {
                              _id: artista._id
                          };
                          const myJWT = jwt.sign(payload, secretKey);
                          res.cookie("usertoken", myJWT, secretKey, { httpOnly: true }).json({ msg: "userToken creado" });
                          // res.status(666)
                          console.log("hola este es myJWT" ,myJWT)
                      } else {
                          console.log("Usuario inválido")
                          res.json({ msg: "password incorrecta" });
                      }
                  })
                  .catch(err => {
                      console.log("error invalido")
                      res.json({ msg: "invalid login attempt" })
                  });
          }
      })
      .catch(err => res.json(err));
};

