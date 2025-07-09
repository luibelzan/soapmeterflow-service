"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = readFile;
exports.parseDate = parseDate;
exports.isValidDate = isValidDate;
exports.getReadIndex = getReadIndex;
exports.getReadIndexAndSendRequests = getReadIndexAndSendRequests;
exports.stopFunction = stopFunction;
exports.scheduleDailyExecution = scheduleDailyExecution;
exports.run = run;
exports.initializeApplication = initializeApplication;
const xmlFileController_1 = require("./controllers/xmlFileController");
const index_reading_1 = require("./index-reading");
const requestsController_1 = require("./controllers/requestsController");
const T_READING_INDEX_S05_1 = require("./entities/T_READING_INDEX_S05");
const T_READING_INDEX_S04_1 = require("./entities/T_READING_INDEX_S04");
const T_READING_INDEX_S02_1 = require("./entities/T_READING_INDEX_S02");
const fs = require('fs');
const path = require('path');
async function moveFile(sourceFile, dataSource) {
    try {
        // Obtener el nombre base del archivo
        const fileName = path.basename(sourceFile);
        // Obtener nombre de la distribuidora desde el nombre de la base de datos
        const distribuidora = dataSource.options.database; // e.g. "Hidroelcarmen"
        // Construir la ruta destino dinámicamente
        const targetDir = path.join('C:\\GD\\Distribuidoras', distribuidora, 'Import', 'Procesados', 'SABT');
        // Crear el directorio de destino si no existe
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        // Construir la ruta completa del archivo de destino
        const targetFile = path.join(targetDir, fileName);
        // Mover el archivo utilizando fs.promises.rename
        await fs.promises.rename(sourceFile, targetFile);
        //console.log(`Archivo movido correctamente: ${sourceFile} -> ${targetFile}`);
    }
    catch (error) {
        console.error(`Error al mover el archivo: ${error.message}`);
    }
}
async function readFile(dir, dataSource) {
    try {
        const startDate = new Date();
        console.log('Parseo comenzado a ', startDate, `${dataSource.options.database}`);
        const files = await fs.promises.readdir(dir);
        for (const file of files) {
            const fileDir = path.join(dir, file);
            const stats = await fs.promises.stat(fileDir);
            if (stats.isDirectory() && !fileDir.includes('Procesados')) {
                await readFile(fileDir, dataSource);
            }
            else if (!fileDir.includes('Procesados')) {
                console.log('Nuevo archivo detectado: ', fileDir);
                await (0, xmlFileController_1.parseFile)(fileDir, dataSource);
                moveFile(fileDir, dataSource);
            }
        }
        var finishDate = new Date();
        const diff = finishDate.getTime() - startDate.getTime();
        console.log('Parseo terminado a ', finishDate, `(${dataSource.options.database})`);
        console.log('Tiempo empleado: ', diff / (1000 * 60), `${dataSource.options.database}`);
    }
    catch (err) {
        console.error('Error al leer la carpeta: ', err);
    }
}
function parseDate(fh) {
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
    }
    catch (err) {
        console.error('Error al parsear la fecha: ', err);
    }
}
function isValidDate(dateString) {
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
async function getReadIndex(dataSource) {
    //dataSource.initialize().then(async () => {
    //await readFile(dir, dataSource); //Podria situarse fuera de esta funcion para separar la funcionalidad
    const startDate = new Date();
    console.log('Calculo indices de lectura comenzado a ', startDate, `${dataSource.options.database}`);
    const cncsS02 = await (0, index_reading_1.getCncS02)(dataSource);
    const cncsS04 = await (0, index_reading_1.getCncS04)(dataSource);
    const cncsS05 = await (0, index_reading_1.getCncS05)(dataSource);
    await (0, index_reading_1.associateDates)(cncsS02, cncsS04, cncsS05, dataSource);
    const finishDate = new Date();
    const diff = (finishDate.getTime() - startDate.getTime()) / (1000 * 60);
    console.log('Calculo indices de lectura terminado a ', finishDate, `${dataSource.options.database}`);
    console.log('Tiempo empleado ', diff, `${dataSource.options.database}`);
    /*
        setInterval(async () => {
          await readFile(dir, dataSource); // Pasar el directorio como parámetro a readFile
        }, 5000);
        */
    //}).catch(error => console.log(error))
}
async function getReadIndexAndSendRequests(dataSource) {
    const entities = [T_READING_INDEX_S05_1.T_READING_INDEX_S05, T_READING_INDEX_S04_1.T_READING_INDEX_S04, T_READING_INDEX_S02_1.T_READING_INDEX_S02]; //A'adir las entidades de s02 y s04 cuando este listo
    //dataSource.initialize().then(async () => {
    await getReadIndex(dataSource);
    for (const entity of entities) {
        const nonRead = await (0, requestsController_1.getNonRead)(dataSource, entity);
        await (0, requestsController_1.loadRequests)(nonRead, dataSource, entity);
        await (0, requestsController_1.setDateInterval)(dataSource, entity);
        await (0, requestsController_1.buildXML)(dataSource, entity);
    }
    //})
}
function stopFunction(intervalId) {
    console.log('La funcion ha sido detenida');
    clearInterval(intervalId);
    //getReadIndexAndSendRequests(dataSource)
}
function calculateTimeUntil(horas, minutos) {
    const ahora = new Date();
    const proximaEjecucion = new Date();
    proximaEjecucion.setHours(horas, minutos, 0, 0);
    // Si la hora de inicio ya pasó hoy, programa para mañana
    if (proximaEjecucion.getTime() <= ahora.getTime()) {
        proximaEjecucion.setDate(proximaEjecucion.getDate() + 1);
    }
    return proximaEjecucion.getTime() - ahora.getTime();
}
async function scheduleDailyExecution(dataSource, dir, startHour, startMinute, endHour, endMinute, interval) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    if ((currentHours > startHour || (currentHours == startHour && currentMinutes >= startMinute)) &&
        (currentHours < endHour || (currentHours == endHour && currentMinutes < endMinute))) {
        // Estamos dentro del intervalo de ejecución
        await run(dir, dataSource);
        const intervalId = setInterval(async () => await run(dir, dataSource), interval); // Ejecuta myFunction con el parámetro cada segundo
        // Calcula el tiempo restante hasta el final del período de ejecución
        const timeUntilEnd = calculateTimeUntil(endHour, endMinute);
        setTimeout(() => stopFunction(intervalId), timeUntilEnd);
    }
    else {
        // Programa el inicio de la función para el próximo día a la hora y minuto especificados
        const timeUntilStart = calculateTimeUntil(startHour, startMinute);
        console.log('Faltan ', timeUntilStart, ' milisegundos para la siguiente ejecucion');
        setTimeout(async () => {
            await run(dir, dataSource);
            const intervalId = setInterval(async () => await run(dir, dataSource), interval); // Ejecuta myFunction con el parámetro cada segundo
            // Programa la detención de la función pasando intervalId como parámetro
            const timeUntilEnd = calculateTimeUntil(endHour, endMinute);
            setTimeout(() => stopFunction(intervalId), timeUntilEnd - timeUntilStart);
        }, timeUntilStart);
    }
}
async function run(dir, dataSource) {
    dataSource.initialize().then(async () => {
        await readFile(dir, dataSource);
        //await getReadIndexAndSendRequests(dataSource);
        closeConnection(dataSource);
    }).catch((err) => console.error(err));
}
async function initializeApplication(dataSource, dir, startHour, startMinute, finishHour, finishMinute, executionInterval) {
    scheduleDailyExecution(dataSource, dir, startHour, startMinute, finishHour, finishMinute, executionInterval);
    setInterval(() => {
        scheduleDailyExecution(dataSource, dir, startHour, startMinute, finishHour, finishMinute, executionInterval);
    }, 24 * 60 * 60 * 1000);
}
async function closeConnection(dataSource) {
    await dataSource.destroy();
}
