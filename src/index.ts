import { getData } from "./controllers/EventsController";
import { readFile } from "./utils";
import express from 'express';
import { AppDataSource } from "./data-source"
import { associateDatesS02, associateDatesS04, associateDatesS05, getCncS02, getCncS04, getCncS05 } from "./index-reading";


const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const app = express();
const PORT = 8080;
const interval = 5000;

const principalDir = '../public/resources';

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
  AppDataSource.initialize().then(async () => {
  await readFile(principalDir);
  const cncsS02 = await getCncS02();
  const cncsS04 = await getCncS04();
  const cncsS05 = await getCncS05();
  await associateDatesS04(cncsS04);
  await associateDatesS05(cncsS05);
  await associateDatesS02(cncsS02);


  setInterval(() => {
    readFile(principalDir); // Pasar el directorio como parámetro a readFile
  }, interval);
    
  }).catch(error => console.log(error))
} catch(err) {
  console.error('Error al leer los archivos: ', err);
}

