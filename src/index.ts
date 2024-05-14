import { getData } from "./controllers/EventsController";
import { readFile } from "./utils";
import express from 'express';
import { AppDataSource, AppDataSource2, AppDataSource3 } from "./data-source"
import { associateDates, associateDatesS02, associateDatesS04, associateDatesS05, getCncS02, getCncS04, getCncS05 } from "./index-reading";


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
  AppDataSource.initialize().then(async () => {

  await readFile(principalDir, AppDataSource);
  const cncsS02 = await getCncS02(AppDataSource);
  const cncsS04 = await getCncS04(AppDataSource);
  const cncsS05 = await getCncS05(AppDataSource);
  await associateDates(cncsS02, cncsS04, cncsS05, AppDataSource);

  setInterval(async () => {
    await readFile(principalDir, AppDataSource); // Pasar el directorio como parámetro a readFile
  }, interval);
    
  }).catch(error => console.log(error))

  //DATABASE 2
  AppDataSource2.initialize().then(async () => {
    await readFile(secondDir, AppDataSource2);
    const cncsS02 = await getCncS02(AppDataSource2);
    const cncsS04 = await getCncS04(AppDataSource2);
    const cncsS05 = await getCncS05(AppDataSource3);

    await associateDates(cncsS02, cncsS04, cncsS05, AppDataSource2);

  }).catch(error => console.log(error))

  //DATABASE 3  
  AppDataSource3.initialize().then(async () => {
    await readFile(thirdDir, AppDataSource3);
    const cncsS02 = await getCncS02(AppDataSource3);
    const cncsS04 = await getCncS04(AppDataSource3);
    const cncsS05 = await getCncS05(AppDataSource3);

    await associateDates(cncsS02, cncsS04, cncsS05, AppDataSource3);

  }).catch(error => console.log(error))

} catch(err) {
  console.error('Error al leer los archivos: ', err);
}

