"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCncS02 = getCncS02;
exports.getCncS04 = getCncS04;
exports.getCncS05 = getCncS05;
exports.associateDatesS04 = associateDatesS04;
exports.associateDatesS05 = associateDatesS05;
exports.associateDatesS02 = associateDatesS02;
exports.getDatesBtwDates = getDatesBtwDates;
exports.getDatesBtwDatesS02 = getDatesBtwDatesS02;
exports.associateDates = associateDates;
const configLoader_1 = __importDefault(require("../configLoader"));
const T_READING_INDEX_S04_1 = require("./entities/T_READING_INDEX_S04");
const T_READING_INDEX_S05_1 = require("./entities/T_READING_INDEX_S05");
const T_S04_TEMP_1 = require("./entities/T_S04_TEMP");
const T_S05_TEMP_1 = require("./entities/T_S05_TEMP");
const T_READING_INDEX_S02_1 = require("./entities/T_READING_INDEX_S02");
const T_S02_TEMP_1 = require("./entities/T_S02_TEMP");
const s05Days = configLoader_1.default.numberDaysS05;
const s02Days = configLoader_1.default.numberDaysS02;
async function getCncS02(dataSource) {
    const s02Repository = dataSource.getRepository(T_S02_TEMP_1.T_S02_TEMP);
    try {
        //const s04s = (await s04Repository.createQueryBuilder('S04').select('DISTINCT S04.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s05 = (await s05Repository.createQueryBuilder('S05').select('DISTINCT S05.cnt_id').getRawMany()).map(item => item.cnt_id);
        const s02s = (await s02Repository.createQueryBuilder('S02').select('DISTINCT S02.cnt_id').getRawMany()).map(item => item.cnt_id);
        return s02s;
    }
    catch (err) {
        console.error(err);
    }
}
async function getCncS04(dataSource) {
    const s04Repository = dataSource.getRepository(T_S04_TEMP_1.T_S04_TEMP);
    try {
        const s04s = (await s04Repository.createQueryBuilder('S04').select('DISTINCT S04.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s05 = (await s05Repository.createQueryBuilder('S05').select('DISTINCT S05.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s02s = (await s02Repository.createQueryBuilder('S02').select('DISTINCT S02.cnt_id').getRawMany()).map(item => item.cnt_id);
        return s04s;
    }
    catch (err) {
        console.error(err);
    }
}
async function getCncS05(dataSource) {
    const s05Repository = dataSource.getRepository(T_S05_TEMP_1.T_S05_TEMP);
    try {
        //const s04s = (await s04Repository.createQueryBuilder('S04').select('DISTINCT S04.cnt_id').getRawMany()).map(item => item.cnt_id);
        const s05s = (await s05Repository.createQueryBuilder('S05').select('DISTINCT S05.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s02s = (await s02Repository.createQueryBuilder('S02').select('DISTINCT S02.cnt_id').getRawMany()).map(item => item.cnt_id);
        return s05s;
    }
    catch (err) {
        console.error(err);
    }
}
async function associateDatesS04(cnts, dataSource) {
    const f1 = new Date();
    const f2 = new Date();
    if (f1.getDate() == 1) {
        f2.setMonth(f1.getMonth() - 1);
    }
    else {
        f2.setMonth(f1.getMonth() - 2);
    }
    const fullDates = getDatesBtwDates(f2, f1);
    const dates = fullDates.filter(date => date.getDate() === 1 && date.getMonth() < new Date().getMonth());
    const s04ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S04_1.T_READING_INDEX_S04);
    const s04Repository = dataSource.getRepository(T_S04_TEMP_1.T_S04_TEMP);
    const batchSize = 1000; // Ajusta el tamaño del lote según sea necesario
    let s04ReadingIndices = [];
    const s04s = await s04Repository.createQueryBuilder('s04').where('s04.fh_i >= :fecha', { fecha: f2 }).getMany();
    const s04Map = new Map();
    for (const s04 of s04s) {
        if (!s04Map.has(s04.cnt_id)) {
            s04Map.set(s04.cnt_id, new Set());
        }
        s04Map.get(s04.cnt_id).add(s04.fh_i.getTime());
    }
    try {
        for (const cnt of cnts) {
            for (const date of dates) {
                let existingRecord = await s04ReadingIndexRepository.findOne({ where: { cnt_id: cnt, fh: date } });
                if (existingRecord) {
                    existingRecord.read = includeDate(s04Map, cnt, date) ? 1 : 0;
                    await s04ReadingIndexRepository.save(existingRecord);
                }
                else {
                    const s04ReadingIndex = new T_READING_INDEX_S04_1.T_READING_INDEX_S04();
                    s04ReadingIndex.cnt_id = cnt;
                    s04ReadingIndex.fh = date;
                    s04ReadingIndex.read = includeDate(s04Map, cnt, date) ? 1 : 0;
                    s04ReadingIndices.push(s04ReadingIndex);
                    if (s04ReadingIndices.length >= batchSize) {
                        await s04ReadingIndexRepository.save(s04ReadingIndices);
                        s04ReadingIndices = []; // Limpiar el array para el próximo lote
                    }
                }
            }
        }
        // Guardar cualquier lote restante
        if (s04ReadingIndices.length > 0) {
            await s04ReadingIndexRepository.save(s04ReadingIndices);
        }
    }
    catch (err) {
        console.error(err);
    }
}
async function associateDatesS05(cnts, dataSource) {
    const f1 = new Date();
    const f2 = new Date();
    f2.setDate(f1.getDate() - s05Days);
    const dates = getDatesBtwDates(f2, f1);
    const s05ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S05_1.T_READING_INDEX_S05);
    const s05Repository = dataSource.getRepository(T_S05_TEMP_1.T_S05_TEMP);
    const batchSize = 1000; // Ajusta el tamaño del lote según sea necesario
    let s05ReadingIndices = [];
    const s05s = await s05Repository.createQueryBuilder('s05').where('s05.fh >= :fecha', { fecha: f2 }).getMany();
    const s05Map = new Map();
    for (const s05 of s05s) {
        if (!s05Map.has(s05.cnt_id)) {
            s05Map.set(s05.cnt_id, new Set());
        }
        s05Map.get(s05.cnt_id).add(s05.fh.getTime());
    }
    try {
        for (const cnt of cnts) {
            for (const date of dates) {
                let existingRecord = await s05ReadingIndexRepository.findOne({ where: { cnt_id: cnt, fh: date } });
                if (existingRecord) {
                    existingRecord.read = includeDate(s05Map, cnt, date) ? 1 : 0;
                    await s05ReadingIndexRepository.save(existingRecord);
                }
                else {
                    const s05ReadingIndex = new T_READING_INDEX_S05_1.T_READING_INDEX_S05();
                    s05ReadingIndex.cnt_id = cnt;
                    s05ReadingIndex.fh = date;
                    s05ReadingIndex.read = includeDate(s05Map, cnt, date) ? 1 : 0;
                    s05ReadingIndices.push(s05ReadingIndex);
                    if (s05ReadingIndices.length >= batchSize) {
                        await s05ReadingIndexRepository.save(s05ReadingIndices);
                        s05ReadingIndices = []; // Limpiar el array para el próximo lote
                    }
                }
            }
        }
        // Guardar cualquier lote restante
        if (s05ReadingIndices.length > 0) {
            await s05ReadingIndexRepository.save(s05ReadingIndices);
        }
    }
    catch (err) {
        console.error(err);
    }
}
async function associateDatesS02(cnts, dataSource) {
    const f1 = new Date();
    const f2 = new Date();
    f2.setDate(f1.getDate() - s02Days);
    const fullDates = getDatesBtwDatesS02(f2, f1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dates = fullDates.filter(date => {
        const dateCopy = new Date(date);
        dateCopy.setHours(0, 0, 0, 0);
        return dateCopy.getTime() !== today.getTime();
    });
    const s02ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S02_1.T_READING_INDEX_S02);
    const s02Repository = dataSource.getRepository(T_S02_TEMP_1.T_S02_TEMP);
    const batchSize = 1000; // Ajusta el tamaño del lote según sea necesario
    let s02ReadingIndices = [];
    const s02s = await s02Repository.createQueryBuilder('s02').where('s02.fh >= :fecha', { fecha: f2 }).getMany();
    const s02Map = new Map();
    for (const s02 of s02s) {
        if (!s02Map.has(s02.cnt_id)) {
            s02Map.set(s02.cnt_id, new Set());
        }
        s02Map.get(s02.cnt_id).add(s02.fh.getTime());
    }
    try {
        for (const cnt of cnts) {
            for (let i = 0; i < dates.length; i += 24) {
                let existingRecord = await s02ReadingIndexRepository.findOne({ where: { cnt_id: cnt, fh: dates[i] } });
                let read = true;
                const dateRange = getDateRange(dates[i], 24);
                if (existingRecord) {
                    if (dates[i].getMonth() === 2 && dates[i].getDate() === 31) {
                        read = checkDateRange(s02Map, cnt, dateRange.slice(0, 23));
                    }
                    else if (dates[i].getMonth() === 9 && dates[i].getDate() === 27) {
                        read = checkDateRange(s02Map, cnt, dateRange.slice(0, 25));
                    }
                    else {
                        read = checkDateRange(s02Map, cnt, dateRange);
                    }
                    existingRecord.read = read ? 1 : 0;
                    await s02ReadingIndexRepository.save(existingRecord);
                }
                else {
                    const s02ReadingIndex = new T_READING_INDEX_S02_1.T_READING_INDEX_S02();
                    s02ReadingIndex.cnt_id = cnt;
                    s02ReadingIndex.fh = dates[i];
                    if (dates[i].getMonth() === 2 && dates[i].getDate() === 31) {
                        read = checkDateRange(s02Map, cnt, dateRange.slice(0, 23));
                    }
                    else if (dates[i].getMonth() === 9 && dates[i].getDate() === 27) {
                        read = checkDateRange(s02Map, cnt, dateRange.slice(0, 25));
                    }
                    else {
                        read = checkDateRange(s02Map, cnt, dateRange);
                    }
                    s02ReadingIndex.read = read ? 1 : 0;
                    s02ReadingIndices.push(s02ReadingIndex);
                    if (s02ReadingIndices.length >= batchSize) {
                        await s02ReadingIndexRepository.save(s02ReadingIndices);
                        s02ReadingIndices = []; // Limpiar el array para el próximo lote
                    }
                }
            }
        }
        // Guardar cualquier lote restante
        if (s02ReadingIndices.length > 0) {
            await s02ReadingIndexRepository.save(s02ReadingIndices);
        }
    }
    catch (err) {
        console.error(err);
    }
}
function getDateRange(startDate, hours) {
    const dates = [];
    for (let i = 0; i < hours; i++) {
        const date = new Date(startDate);
        date.setHours(startDate.getHours() + i);
        dates.push(date);
    }
    return dates;
}
function checkDateRange(s02Map, cnt, dateRange) {
    const dateSet = s02Map.get(cnt);
    if (!dateSet)
        return false;
    for (const date of dateRange) {
        if (!dateSet.has(date.getTime())) {
            return false;
        }
    }
    return true;
}
function getDatesBtwDates(fechaInicio, fechaFin) {
    const fechas = [];
    let fechaActual = new Date(fechaInicio);
    fechaActual.setHours(0, 0, 0, 0);
    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual));
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return fechas;
}
function getDatesBtwDatesS02(fechaInicio, fechaFin) {
    const fechas = [];
    let fechaActual = new Date(fechaInicio);
    fechaActual.setHours(0, 0, 0, 0);
    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual));
        fechaActual.setHours(fechaActual.getHours() + 1);
    }
    return fechas;
}
function includeDate(s05Map, cnt, date) {
    const dateSet = s05Map.get(cnt);
    if (!dateSet)
        return false;
    return dateSet.has(date.getTime());
}
async function associateDates(cncs02, cncs04, cncs05, dataSource) {
    await associateDatesS02(cncs02, dataSource);
    await associateDatesS04(cncs04, dataSource);
    await associateDatesS05(cncs05, dataSource);
    console.log('Read Index Calculated');
}
