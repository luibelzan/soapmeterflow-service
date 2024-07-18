import e from "express";
import { AppDataSource } from "./data-source";
import config from "../configLoader";
import { T_READING_INDEX_S04 } from "./entities/T_READING_INDEX_S04";
import { T_READING_INDEX_S05 } from "./entities/T_READING_INDEX_S05";
import { T_S04_TEMP } from "./entities/T_S04_TEMP"
import { T_S05_TEMP } from "./entities/T_S05_TEMP";
import { T_READING_INDEX_S02 } from "./entities/T_READING_INDEX_S02";
import { T_S02_TEMP } from "./entities/T_S02_TEMP";
import { DataSource } from "typeorm";

const s05Days = config.numberDaysS05;
const s02Days = config.numberDaysS02;


export async function getCncS02(dataSource: DataSource): Promise<string[]> {
    const s02Repository = dataSource.getRepository(T_S02_TEMP);
    try {
        //const s04s = (await s04Repository.createQueryBuilder('S04').select('DISTINCT S04.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s05 = (await s05Repository.createQueryBuilder('S05').select('DISTINCT S05.cnt_id').getRawMany()).map(item => item.cnt_id);
        const s02s = (await s02Repository.createQueryBuilder('S02').select('DISTINCT S02.cnt_id').getRawMany()).map(item => item.cnt_id);
        return s02s;
    } catch(err) {
        console.error(err);
    }
}

export async function getCncS04(dataSource: DataSource): Promise<string[]> {
    const s04Repository = dataSource.getRepository(T_S04_TEMP);
    try {
        const s04s = (await s04Repository.createQueryBuilder('S04').select('DISTINCT S04.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s05 = (await s05Repository.createQueryBuilder('S05').select('DISTINCT S05.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s02s = (await s02Repository.createQueryBuilder('S02').select('DISTINCT S02.cnt_id').getRawMany()).map(item => item.cnt_id);
        return s04s;
    } catch(err) {
        console.error(err);
    }
}

export async function getCncS05(dataSource: DataSource): Promise<string[]> {
    const s05Repository = dataSource.getRepository(T_S05_TEMP);
    try {
        //const s04s = (await s04Repository.createQueryBuilder('S04').select('DISTINCT S04.cnt_id').getRawMany()).map(item => item.cnt_id);
        const s05s = (await s05Repository.createQueryBuilder('S05').select('DISTINCT S05.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s02s = (await s02Repository.createQueryBuilder('S02').select('DISTINCT S02.cnt_id').getRawMany()).map(item => item.cnt_id);
        return s05s;
    } catch(err) {
        console.error(err);
    }
}

export async function associateDatesS04(cnts: string[], dataSource: DataSource): Promise<void> {
    const f1 = new Date();
    const f2 = new Date();
    if (f1.getDate() == 1) {
        f2.setMonth(f1.getMonth() - 1);
    } else {
        f2.setMonth(f1.getMonth() - 2);
    }
    const fullDates = getDatesBtwDates(f2, f1); 
    const dates = fullDates.filter(date => date.getDate() === 1 && date.getMonth() < new Date().getMonth());

    const s04ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S04);
    const s04Repository = dataSource.getRepository(T_S04_TEMP);

    const batchSize = 1000; // Ajusta el tamaño del lote según sea necesario
    let s04ReadingIndices: T_READING_INDEX_S04[] = [];
    
    const s04s = await s04Repository.find();
    const s04Map = new Map<string, Set<number>>();
    for (const s04 of s04s) {
        if (!s04Map.has(s04.cnt_id)) {
            s04Map.set(s04.cnt_id, new Set<number>());
        }
        s04Map.get(s04.cnt_id)!.add(s04.fh_i.getTime());
    }

    try {
        for (const cnt of cnts) {
            for (const date of dates) {
                let existingRecord = await s04ReadingIndexRepository.findOne({ where: { cnt_id: cnt, fh: date } });
                if (existingRecord) {
                    existingRecord.read = includeDate(s04Map, cnt, date) ? 1 : 0;
                    await s04ReadingIndexRepository.save(existingRecord);
                } else {
                    const s04ReadingIndex = new T_READING_INDEX_S04();
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
    } catch (err) {
        console.error(err);
    }
}

export async function associateDatesS05(cnts: string[], dataSource: DataSource): Promise<void> {
    const f1 = new Date();
    const f2 = new Date();
    f2.setDate(f1.getDate() - s05Days);
    const dates = getDatesBtwDates(f2, f1);

    const s05ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S05);
    const s05Repository = dataSource.getRepository(T_S05_TEMP);

    const batchSize = 1000; // Ajusta el tamaño del lote según sea necesario
    let s05ReadingIndices: T_READING_INDEX_S05[] = [];

    const s05s = await s05Repository.find();
    const s05Map = new Map<string, Set<number>>();
    for (const s05 of s05s) {
        if (!s05Map.has(s05.cnt_id)) {
            s05Map.set(s05.cnt_id, new Set<number>());
        }
        s05Map.get(s05.cnt_id)!.add(s05.fh.getTime());
    }

    try {
        for (const cnt of cnts) {
            for (const date of dates) {
                let existingRecord = await s05ReadingIndexRepository.findOne({ where: { cnt_id: cnt, fh: date } });
                if (existingRecord) {
                    existingRecord.read = includeDate(s05Map, cnt, date) ? 1 : 0;
                    await s05ReadingIndexRepository.save(existingRecord);
                } else {
                    const s05ReadingIndex = new T_READING_INDEX_S05();
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
    } catch (err) {
        console.error(err);
    }
}

export async function associateDatesS02(cnts: string[], dataSource: DataSource): Promise<void> {
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

    const s02ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S02);
    const s02Repository = dataSource.getRepository(T_S02_TEMP);

    const batchSize = 1000; // Ajusta el tamaño del lote según sea necesario
    let s02ReadingIndices: T_READING_INDEX_S02[] = [];

    const s02s = await s02Repository.find();
    const s02Map = new Map<string, Set<number>>();
    for (const s02 of s02s) {
        if (!s02Map.has(s02.cnt_id)) {
            s02Map.set(s02.cnt_id, new Set<number>());
        }
        s02Map.get(s02.cnt_id)!.add(s02.fh.getTime());
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
                    } else if (dates[i].getMonth() === 9 && dates[i].getDate() === 27) {
                        read = checkDateRange(s02Map, cnt, dateRange.slice(0, 25));
                    } else {
                        read = checkDateRange(s02Map, cnt, dateRange);
                    }
                    existingRecord.read = read ? 1 : 0;
                    await s02ReadingIndexRepository.save(existingRecord);
                } else {
                    const s02ReadingIndex = new T_READING_INDEX_S02();
                    s02ReadingIndex.cnt_id = cnt;
                    s02ReadingIndex.fh = dates[i];

                    if (dates[i].getMonth() === 2 && dates[i].getDate() === 31) {
                        read = checkDateRange(s02Map, cnt, dateRange.slice(0, 23));
                    } else if (dates[i].getMonth() === 9 && dates[i].getDate() === 27) {
                        read = checkDateRange(s02Map, cnt, dateRange.slice(0, 25));
                    } else {
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
    } catch (err) {
        console.error(err);
    }
}

function getDateRange(startDate: Date, hours: number): Date[] {
    const dates = [];
    for (let i = 0; i < hours; i++) {
        const date = new Date(startDate);
        date.setHours(startDate.getHours() + i);
        dates.push(date);
    }
    return dates;
}

function checkDateRange(s02Map: Map<string, Set<number>>, cnt: string, dateRange: Date[]): boolean {
    const dateSet = s02Map.get(cnt);
    if (!dateSet) return false;

    for (const date of dateRange) {
        if (!dateSet.has(date.getTime())) {
            return false;
        }
    }
    return true;
}

export function getDatesBtwDates(fechaInicio: Date, fechaFin: Date): Date[] {
    const fechas: Date[] = [];
    let fechaActual: Date = new Date(fechaInicio);
    fechaActual.setHours(0,0,0,0);
    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual));
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return fechas;
}


export function getDatesBtwDatesS02(fechaInicio: Date, fechaFin: Date): Date[] {
    const fechas: Date[] = [];
    let fechaActual: Date = new Date(fechaInicio);
    fechaActual.setHours(0, 0, 0, 0);
    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual));
        fechaActual.setHours(fechaActual.getHours() + 1);
    }
    return fechas;
}


function includeDate(s05Map: Map<string, Set<number>>, cnt: string, date: Date): boolean {
    const dateSet = s05Map.get(cnt);
    if (!dateSet) return false;
    return dateSet.has(date.getTime());
}


export async function associateDates(cncs02: string[], cncs04: string[], cncs05: string[], dataSource: DataSource): Promise<void> {
    await associateDatesS02(cncs02, dataSource);
    await associateDatesS04(cncs04, dataSource);
    await associateDatesS05(cncs05, dataSource);
    console.log('Read Index Calculated')
}





