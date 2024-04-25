import e from "express";
import { AppDataSource } from "./data-source";
import { T_READING_INDEX_S04 } from "./entities/T_READING_INDEX_S04";
import { T_READING_INDEX_S05 } from "./entities/T_READING_INDEX_S05";
import { T_S04_TEMP } from "./entities/T_S04_TEMP"
import { T_S05_TEMP } from "./entities/T_S05_TEMP";
import { T_READING_INDEX_S02 } from "./entities/T_READING_INDEX_S02";
import { T_S02_TEMP } from "./entities/T_S02_TEMP";


export async function getCnc(): Promise<string[]> {
    const s04Repository = AppDataSource.getRepository(T_S04_TEMP);
    const s05Repository = AppDataSource.getRepository(T_S05_TEMP);
    try {
        const s04s = (await s04Repository.createQueryBuilder('S04').select('DISTINCT S04.cnt_id').getRawMany()).map(item => item.cnt_id);
        //const s05 = (await s05Repository.createQueryBuilder('S05').select('DISTINCT S05.cnt_id').getRawMany()).map(item => item.cnt_id);
        return s04s;
    } catch(err) {
        console.error(err);
    }
}

export async function associateDatesS04(cnts: string[]): Promise<void> {
//Eejecutar esta funcion una vez al mes para que se inserten las nuevas fechas en la tabla de indices de lectura
    const f1 = new Date();
    const f2 = new Date();
    f2.setMonth(f1.getMonth()-1);
    const dates = getDatesBtwDates(f2, f1);
    const s04ReadingIndexRepository = AppDataSource.getRepository(T_READING_INDEX_S04);
    const s04Repository = AppDataSource.getRepository(T_S04_TEMP);
    const s04Fh = (await s04Repository.find()).map(s04 => s04.fh_i);
    //console.log(dates);
    try {
        for(const cnt of cnts) {
            for(let i=0; i<dates.length; i++) {
                var s04ReadingIndex = new T_READING_INDEX_S04();
                s04ReadingIndex.cnt_id = cnt;
                s04ReadingIndex.fh = dates[i];
                if(includeDate(s04Fh, dates[i])) {
                    s04ReadingIndex.read = 1;
                } else {
                    s04ReadingIndex.read = 0;
                }
                await s04ReadingIndexRepository.save(s04ReadingIndex);
                //console.log(cnt, ' - ', dates[i]);
            }
        }
    } catch(err) {
        console.error(err);
    } 
}

export async function associateDatesS05(cnts: string[]): Promise<void> {
    const f1 = new Date();
    const f2 = new Date();
    f2.setMonth(f1.getMonth()-1);
    const dates = getDatesBtwDates(f2, f1);
    const s05ReadingIndexRepository = AppDataSource.getRepository(T_READING_INDEX_S05);
    const s05Repository = AppDataSource.getRepository(T_S05_TEMP);
    const s05Fh = (await s05Repository.find()).map(s05 => s05.fh);
    try {
          for(const cnt of cnts) {
            for(let i=0; i<dates.length; i++) {
                var s05ReadingIndex = new T_READING_INDEX_S05();
                s05ReadingIndex.cnt_id = cnt;
                s05ReadingIndex.fh = dates[i];
                if(includeDate(s05Fh, dates[i])) {
                    s05ReadingIndex.read = 1;
                } else {
                    s05ReadingIndex.read = 0;
                }
                await s05ReadingIndexRepository.save(s05ReadingIndex);
            }
          }
    } catch(err) {
        console.error(err);
    }
}

export async function associateDatesS02(cnts: string[]): Promise<void> {
    const f1 = new Date();
    const f2 = new Date();
    f2.setMonth(f1.getMonth()-1);
    const dates = getDatesBtwDatesS02(f2, f1);
    const s02ReadingIndexRepository = AppDataSource.getRepository(T_READING_INDEX_S02);
    const s02Repository = AppDataSource.getRepository(T_S02_TEMP);
    const s02Fh = (await s02Repository.find()).map(s02 => s02.fh);
    try {
        for(const cnt of cnts) {
            for(let i=0; i<dates.length; i++) {
                var s02ReadingIndex = new T_READING_INDEX_S02();
                s02ReadingIndex.cnt_id = cnt;
                s02ReadingIndex.fh = dates[i];
                if(s02Fh.includes(dates[i])) {
                    s02ReadingIndex.read = 1;
                } else {
                    s02ReadingIndex.read = 0;
                }
                await s02ReadingIndexRepository.save(s02ReadingIndex);
            }
        }
    } catch(err) {
        console.error(err);
    }
}


export function getDatesBtwDates(fechaInicio: Date, fechaFin: Date): Date[] {
    const fechas: Date[] = [];
    let fechaActual: Date = new Date(fechaInicio);

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
        fechaActual.setHours(fechaActual.getHours()+1);
    }
    return fechas;
}



function includeDate(f1: Date[], f2: Date ): boolean {
    var res = false;
    for(const date of f1) {
        if(date.getDay()===f2.getDay() && date.getMonth()===f2.getMonth() && date.getFullYear()===f2.getFullYear()) {
            res = true;
            return res;
        }
    }
    return res;
}