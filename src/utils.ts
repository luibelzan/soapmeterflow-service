import { DataSource } from "typeorm";
import { parseFile } from "./controllers/xmlFileController";
import { associateDates, getCncS02, getCncS04, getCncS05 } from "./index-reading";
import { buildXML, getNonRead, loadRequests, sendWebService, setDateInterval } from "./controllers/requestsController";
import { T_READING_INDEX_S05 } from "./entities/T_READING_INDEX_S05";
const fs = require('fs');
const path = require('path');
var readFiles = [];

export async function readFile(dir: string, dataSource: DataSource) {
    try {
      const files = await fs.promises.readdir(dir);
      
      for (const file of files) {
        const fileDir = path.join(dir, file);
        const stats = await fs.promises.stat(fileDir);
        if(stats.isDirectory()) {
          await readFile(fileDir, dataSource);
        } else {
          if (!readFiles.includes(fileDir)) {
            console.log('Nuevo archivo detectado: ', fileDir);
            await parseFile(fileDir, dataSource);
            readFiles.push(fileDir);
          }
        }
      }
    } catch (err) {
      console.error('Error al leer la carpeta: ', err);
    }
  }

export function parseDate(fh: string): Date {
    try {
        const year = Number(fh.substring(0, 4));
        const month = Number(fh.substring(4, 6)) - 1; // Restamos 1 porque en JavaScript los meses van de 0 a 11
        const day = Number(fh.substring(6, 8));
        const hours = Number(fh.substring(8, 10));
        const minutes = Number(fh.substring(10, 12));
        const seconds = Number(fh.substring(12, 14));
        
        // Crear la instancia de Date
        const res = new Date(year, month, day, hours, minutes, seconds);

        return res;
    } catch(err) {
        console.error('Error al parsear la fecha: ', err);
    }
}

export function isValidDate(dateString: string): boolean {
    // Extraer las partes relevantes de la cadena
    const year = Number(dateString.substring(0, 4));
    const month = Number(dateString.substring(4, 6)) - 1; // Restamos 1 porque en JavaScript los meses van de 0 a 11
    const day = Number(dateString.substring(6, 8));
    const hours = Number(dateString.substring(8, 10));
    const minutes = Number(dateString.substring(10, 12));
    const seconds = Number(dateString.substring(12, 14));

    // Crear la instancia de Date
    const date = new Date(year, month, day, hours, minutes, seconds);

    // Verificar si la fecha es válida
    return !isNaN(date.getTime());
}


export async function getReadIndex(dataSource: DataSource) {
  //dataSource.initialize().then(async () => {
    //await readFile(dir, dataSource); //Podria situarse fuera de esta funcion para separar la funcionalidad
    const cncsS02 = await getCncS02(dataSource);
    const cncsS04 = await getCncS04(dataSource);
    const cncsS05 = await getCncS05(dataSource);

    await associateDates(cncsS02, cncsS04, cncsS05, dataSource);
/*
    setInterval(async () => {
      await readFile(dir, dataSource); // Pasar el directorio como parámetro a readFile
    }, 5000);
    */
    
  //}).catch(error => console.log(error))
}

export async function getReadIndexAndSendRequests(dataSource: DataSource) {
  const entities = [T_READING_INDEX_S05]; //A'adir las entidades de s02 y s04 cuando este listo
  //dataSource.initialize().then(async () => {
    await getReadIndex(dataSource);
    for(const entity of entities) {
      const nonRead = await getNonRead(dataSource, entity);
      await loadRequests(nonRead, dataSource, entity);
      await setDateInterval(dataSource, entity);
      await buildXML(dataSource, entity);
    }
  //})
}

export function stopFunction(intervalId: NodeJS.Timeout, dataSource: DataSource, dir: string) {
  console.log('La funcion ha sido detenida');
  clearInterval(intervalId);
  getReadIndexAndSendRequests(dataSource)
}

function calculateTimeUntil(horas: number, minutos: number): number {
  const ahora = new Date();
  const proximaEjecucion = new Date();
  proximaEjecucion.setHours(horas, minutos, 0, 0);

  // Si la hora de inicio ya pasó hoy, programa para mañana
  if (proximaEjecucion.getTime() <= ahora.getTime()) {
      proximaEjecucion.setDate(proximaEjecucion.getDate() + 1);
  }

  return proximaEjecucion.getTime() - ahora.getTime();
}

export async function scheduleDailyExecution(dataSource: DataSource, dir: string, startHour: number, endHour: number) {
  dataSource.initialize().then(async () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (currentHours >= startHour && currentHours < endHour) {
        // Estamos dentro del intervalo de ejecución
        await readFile(dir, dataSource);
        const intervalId = setInterval(async () => 
          await readFile(dir, dataSource), 5000); // Ejecuta myFunction con el parámetro cada segundo

        // Calcula el tiempo restante hasta el final del período de ejecución
        const timeUntilEnd = calculateTimeUntil(endHour, 0);
        setTimeout(() => stopFunction(intervalId, dataSource, dir), timeUntilEnd);
    } 
      // Programa el inicio de la función para el próximo día a las 9:00 a.m.
      const timeUntilStart = calculateTimeUntil(startHour, 0);
      setTimeout(() => {
          const intervalId = setInterval(async () => await readFile(dir, dataSource), 5000); // Ejecuta myFunction con el parámetro cada segundo

          // Programa la detención de la función pasando intervalId como parámetro
          const timeUntilEnd = calculateTimeUntil(endHour, 0);
          setTimeout(() => stopFunction(intervalId, dataSource, dir), timeUntilEnd - timeUntilStart);
      }, timeUntilStart);
  }).catch((err) => console.error(err)); 
}

export async function prueba(dir: string, dataSource: DataSource) {
  dataSource.initialize().then(async () => {
    //await readFile(dir, dataSource);
    getReadIndexAndSendRequests(dataSource);
  }).catch((err) => console.error(err));
  
}