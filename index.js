require("dotenv").config();

const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const http = require("http");
const StartupDB = require("./StartupDB");
const routes = require("./routes");
const { handleResponse, notFound404 } = require("./commons/middlewares");

const app = express();
// Log requests to the console.
app.use(logger("dev"));

app.use(cors());

//Directorio publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json()); //las peticiones json se van a procesar aqui

// Coloca un prefix global a todas las rutas en base a una variable de entorno.

app.use(process.env.REACT_APP_apiUrl, routes);

// middlewares
app.use(notFound404);
app.use(handleResponse); // send to response.

// Si la variable PORT no esta definida por default es 5000
const port = process.env.PORT || 5000;
app.set("port", port);

// Crea el server
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) console.log("Error in server setup");

  const host = server.address().address;

  if (host == "::")
    console.log(`http://localhost:${port}${process.env.REACT_APP_apiUrl}`);

  console.log("Server listening on Port", port);
});

// Levanta la bd
const startupDB = new StartupDB();
startupDB.start();

// Al habilitar esta línea se cargará la data inicial definida en el archivo data.js
startupDB.loadDataInitial();

module.exports = app;
