import config from "../configLoader";
import { initializeApplication } from "./utils";
import { AppDataSource, Chulilla } from "./data-source"

const PORT = config.port;
const startHour = config.startHour;
const startMinute = config.startMinute;
const finishHour = config.finishHour;
const finishMinute = config.finishMinute;
const executionInterval = config.executionInterval;

const hidroelcarmenDir = config.hidroelcarmenDir;
const chulillaDir = config.chulillaDir;


try {  
  
  initializeApplication(AppDataSource, hidroelcarmenDir, startHour, startMinute, finishHour, finishMinute, executionInterval);
  initializeApplication(Chulilla, chulillaDir, startHour, startMinute, finishHour, finishMinute, executionInterval);

} catch(err) {
  console.error('Error al calcular los indices de lectura: ', err);
}

