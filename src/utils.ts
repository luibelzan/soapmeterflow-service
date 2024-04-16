import { parseFile } from "./controllers/xmlFileController";
const fs = require('fs');
const path = require('path');
var readFiles = [];

export async function readFile(dir: string) {
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


