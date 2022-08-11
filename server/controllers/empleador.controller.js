const Empleador = require("../models/empleador.model");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

module.exports.createNewEmpleador = (req, res) => {
  console.log(req.body)
  Empleador.create(req.body)
    .then((newCreatedEmpleador) => res.json({ empleador: newCreatedEmpleador }))
    .catch((err) =>res.status(500).json({ message: "no hemos podido crear la empleador", error: err }));
};

module.exports.findOneSingleEmpleador = (req, res) => {
    Empleador.findOne({ _id: req.params.id })
      .then((oneSingleEmpleador) => res.json({ empleador: oneSingleEmpleador }))
      .catch((err) =>
        res.json({ message: "no hemos podido encontrar la empleador", error: err })
      );
  };

module.exports.updateExistingEmpleador = (req, res) => {
    console.log("entro a updateempleador")
    if (res.locals.user===req.params.id){
    Empleador.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((updatedEmpleador) => res.json({ empleador: updatedEmpleador }))
      .catch((err) =>res.json({ message: "no hemos podido ectualizar la empleador", error: err }));
    }
  };