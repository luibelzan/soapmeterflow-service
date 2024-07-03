import { getData } from "./controllers/EventsController";
import config from "../configLoader";
import { scheduleDailyExecution } from "./utils";
import express from 'express';
import { AppDataSource, cela, chera, dielec, mercedes, pastor, staClara } from "./data-source"


const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const app = express();
const PORT = config.port;
const startDate = config.startDate;
const finishDate = config.finishDate;
const executionInterval = config.executionInterval;

const cheraDir = config.cheraDir;
const sotDecheraDir = config.sotDecheraDir
const alvaroBenitoDir = config.alvaroBenitoDir
const pastorDir = config.pastorDir;


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
  //getReadIndex(principalDir, AppDataSource);

  //DATABASE 2
  //getReadIndex(secondDir, dielec);

  
  //getReadIndex(fiveDir, chera);
  //getReadIndexAndSendRequests(chera, fiveDir); //Funcion que calcula los indices y envia las peticiones

  //getReadIndexAndSendRequests(cela, sixDir);

  
  scheduleDailyExecution(pastor, pastorDir, startDate, finishDate, executionInterval);
  setInterval(scheduleDailyExecution, 24 * 60 * 60 * 1000);
  
  //prueba(sevenDir, pastor);
  
  

  //DATABASE 3  
  //getReadIndex(thirdDir, staClara);

  //getReadIndex(fourthDir, mercedes);

} catch(err) {
  console.error('Error al calcular los indices de lectura: ', err);
}

