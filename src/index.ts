import config from "../configLoader";
import { initializeApplication } from "./utils";
import { AppDataSource, AppDataSource2, chera, pastor } from "./data-source"

const PORT = config.port;
const startHour = config.startHour;
const startMinute = config.startMinute;
const finishHour = config.finishHour;
const finishMinute = config.finishMinute;
const executionInterval = config.executionInterval;

const cheraDir = config.cheraDir;
const sotDecheraDir = config.sotDecheraDir
const alvaroBenitoDir = config.alvaroBenitoDir
const pastorDir = config.pastorDir;
const pruebasDir = '../Distribuidoras/pruebas';

try {  
  
  initializeApplication(AppDataSource2, pruebasDir, startHour, startMinute, finishHour, finishMinute, executionInterval);

} catch(err) {
  console.error('Error al calcular los indices de lectura: ', err);
}

