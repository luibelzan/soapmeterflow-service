import { getData } from "./controllers/EventsController";
import { parseFile } from "./controllers/xmlFileController";
import express from 'express';
import { AppDataSource } from "./data-source"


const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

const principalDir = '../public/resources';
var readFiles = [];

async function readFile(dir: string) {
  try {
    const files = await fs.promises.readdir(dir);
    
    for (const file of files) {
      const fileDir = path.join(dir, file);
      const stats = await fs.promises.stat(fileDir);
      if(stats.isDirectory()) {
        await readFile(fileDir);
      } else {
        if (!readFiles.includes(fileDir)) {
          console.log('Nuevo archivo detectado: ', fileDir);
          await parseFile(fileDir);
          readFiles.push(fileDir);
        }
      }
    }
    
  } catch (err) {
    console.error('Error al leer la carpeta: ', err);
  }
}

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
  setInterval(() => {
    readFile(principalDir); // Pasar el directorio como parámetro a readFile
  }, 5000);
  
  }).catch(error => console.log(error))
} catch(err) {
  console.error('Error al leer los archivos: ', err);
}

