import { getData } from "./controllers/EventsController";
import { getReadIndex, getReadIndexAndSendRequests, run, readFile, scheduleDailyExecution } from "./utils";
import express from 'express';
import { AppDataSource, cela, chera, dielec, mercedes, pastor, staClara } from "./data-source"
import { T_READING_INDEX_S02 } from "./entities/T_READING_INDEX_S02";
import { T_S05_TEMP } from "./entities/T_S05_TEMP";
import { T_S02_TEMP } from "./entities/T_S02_TEMP";
import { loadRequests, getNonRead, groupByCT, buildXML, sendWebService, setDateInterval } from "./controllers/requestsController";
import { T_READING_INDEX_S05 } from "./entities/T_READING_INDEX_S05";
import { T_CUPS } from "./entities/T_CUPS";
import { REQUESTS } from "./entities/REQUESTS";

const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const app = express();
const PORT = 8080;
const interval = 5000;

const principalDir = '../public/resources/database1';
const secondDir = '../public/resources/dielec';
const thirdDir = '../public/resources/staclara';
const fourthDir = '../public/resources/mercedes';
const fiveDir = '../public/resources/chera';
const sixDir = '../public/resources/cela';
const sevenDir = '../public/resources/pastor';
const pruebaDir = '../public/resources/prueba';

/*
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
*/
try {
  //DATABASE 1
  //getReadIndex(principalDir, AppDataSource);

  //DATABASE 2
  //getReadIndex(secondDir, dielec);

  
  //getReadIndex(fiveDir, chera);
  //getReadIndexAndSendRequests(chera, fiveDir); //Funcion que calcula los indices y envia las peticiones

  //getReadIndexAndSendRequests(cela, sixDir);

  
  scheduleDailyExecution(pastor, sevenDir, 13, 14, 15000);
  setInterval(scheduleDailyExecution, 24 * 60 * 60 * 1000);
  
  //prueba(sevenDir, pastor);
  
  

  //DATABASE 3  
  //getReadIndex(thirdDir, staClara);

  //getReadIndex(fourthDir, mercedes);

} catch(err) {
  console.error('Error al calcular los indices de lectura: ', err);
}

