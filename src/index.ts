import { getData } from "./controllers/EventsController";
import { getReadIndex } from "./utils";
import express from 'express';
import { AppDataSource, AppDataSource2, AppDataSource3 } from "./data-source"

const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const app = express();
const PORT = 8080;
const interval = 5000;

const principalDir = '../public/resources/database1';
const secondDir = '../public/resources/database2';
const thirdDir = '../public/resources/database3';

try {
  //Conexion con la base de datos
  AppDataSource.initialize().then(async () => {

  // Configurar body-parser-xml para manejar solicitudes XML
  bodyParserXml(bodyParser);
  app.use(bodyParser.xml());
    
  // Ruta de prueba para recibir solicitudes
  app.post('/WS_STGSoapService', getData);
  app.post('/WS_STG/WS_STG.asmx', getData);
  app.post('/WS_DC/WS_DC.asmx', getData);
  

  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  });
  
  }).catch(error => console.log(error))

} catch(error) {
  console.error('Error al conectar con la base de datos:' , error);
}

try {
  //DATABASE 1
  getReadIndex(principalDir, AppDataSource);

  //DATABASE 2
  getReadIndex(secondDir, AppDataSource2);

  //DATABASE 3  
  getReadIndex(thirdDir, AppDataSource3);

} catch(err) {
  console.error('Error al calcular los indices de lectura: ', err);
}

