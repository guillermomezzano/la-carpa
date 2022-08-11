const ArtistaController = require("../controllers/artista.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  // app.post("/api/register", ArtistaController.createNewArtista)
  app.get("/api/artista/", ArtistaController.findAllArtistas);
  app.get("/api/artista/:id", ArtistaController.findOneSingleArtista);
  app.put("/api/artista/new/comentarios/:id/", ArtistaController.newComentarioExistingArtista);
  app.post("/api/artista/new", ArtistaController.createNewArtista);
  app.post("/api/login", ArtistaController.login);

  // artistas
  app.put("/api/artista/update/:id",authenticate,ArtistaController.updateExistingArtista);
  app.put("/api/artista/update/disciplina/:id",  authenticate, ArtistaController.updateExistingArtistaDisciplina)
  app.put("/api/artista/update/disciplina/delete/:id", authenticate, ArtistaController.updateExistingArtistaDisciplinaDelete)
  app.delete("/api/artista/delete/:id",  authenticate, ArtistaController.deleteAnExistingArtista);
  app.get("/api/logout",authenticate,ArtistaController.logout);

};

