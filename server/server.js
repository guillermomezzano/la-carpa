const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

// Esto activará nuestra instrucción mongoose.connect para inicializar nuestra conexión a la base de datos.
app.use(cookieParser());
require("./config/mongoose.config");

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use (cors());
app.use(express.json(), express.urlencoded({ extended: true }));

// Aquí es donde importamos la función de rutas de usuarios desde nuestro archivo user.routes.js

const AllMyArtistaRoutes = require("./routes/artista.routes");
AllMyArtistaRoutes(app);

app.listen(8080, () => console.log("The server is all fired up on port 8080"));