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
  //DATABASE 1
  AppDataSource.initialize().then(async () => {
    await readFile(principalDir);
    const cncsS02 = await getCncS02();
    const cncsS04 = await getCncS04();
    const cncsS05 = await getCncS05();
    await associateDates(cncsS02, cncsS04, cncsS05, AppDataSource);

    const intervalHandler = async () => {
      await readFile(principalDir); // Pasar el directorio como parámetro a readFile
    };

    setInterval(async () => {
      await intervalHandler();
    }, interval);

    //DATABASE 2
    await AppDataSource2.initialize();
    const cncsS02_2 = await getCncS02();
    const cncsS04_2 = await getCncS04();
    const cncsS05_2 = await getCncS05();
    await associateDates(cncsS02_2, cncsS04_2, cncsS05_2, AppDataSource2);

    //DATABASE 3  
    await AppDataSource3.initialize();
    const cncsS02_3 = await getCncS02();
    const cncsS04_3 = await getCncS04();
    const cncsS05_3 = await getCncS05();
    await associateDates(cncsS02_3, cncsS04_3, cncsS05_3, AppDataSource3);

  }).catch(error => console.log(error));

} catch(err) {
  console.error('Error al leer los archivos: ', err);
}

