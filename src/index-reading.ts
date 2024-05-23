import e from "express";
import { AppDataSource } from "./data-source";
import { T_READING_INDEX_S04 } from "./entities/T_READING_INDEX_S04";
import { T_READING_INDEX_S05 } from "./entities/T_READING_INDEX_S05";
import { T_S04_TEMP } from "./entities/T_S04_TEMP"
import { T_S05_TEMP } from "./entities/T_S05_TEMP";
import { T_READING_INDEX_S02 } from "./entities/T_READING_INDEX_S02";
import { T_S02_TEMP } from "./entities/T_S02_TEMP";
import { DataSource } from "typeorm";


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
//Eejecutar esta funcion una vez al mes para que se inserten las nuevas fechas en la tabla de indices de lectura
    const f1 = new Date();
    const f2 = new Date();
    f2.setMonth(f1.getMonth()-1);
    const dates = getDatesBtwDates(f2, f1);
    const s04ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S04);
    const s04Repository = dataSource.getRepository(T_S04_TEMP);
    const s04s = (await s04Repository.find());
    //console.log(s04Fh);
    try {
        for(const cnt of cnts) {
            for(let i=0; i<dates.length; i++) {
                var s04ReadingIndex = new T_READING_INDEX_S04();
                s04ReadingIndex.cnt_id = cnt;
                s04ReadingIndex.fh = dates[i];
                if(includeDate(s04s, dates[i], cnt)) {
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

export async function associateDatesS05(cnts: string[], dataSource: DataSource): Promise<void> {
    const f1 = new Date();
    const f2 = new Date();
    f2.setMonth(f1.getMonth()-3);
    const dates = getDatesBtwDates(f2, f1);
    const s05ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S05);
    const s05Repository = dataSource.getRepository(T_S05_TEMP);
    const s05s = (await s05Repository.find());
    try {
          for(const cnt of cnts) {
            for(let i=0; i<dates.length; i++) {
                var s05ReadingIndex = new T_READING_INDEX_S05();
                s05ReadingIndex.cnt_id = cnt;
                s05ReadingIndex.fh = dates[i];
                //console.log(dates[i], cnt, includeDate(s05s, dates[i], cnt))
                if(includeDate(s05s, dates[i], cnt)) {
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

export async function associateDatesS02(cnts: string[], dataSource: DataSource): Promise<void> {
    const f1 = new Date();
    const f2 = new Date();
    f2.setMonth(f1.getMonth()-3);
    const dates = getDatesBtwDatesS02(f2, f1);
    const s02ReadingIndexRepository = dataSource.getRepository(T_READING_INDEX_S02);
    const s02Repository = dataSource.getRepository(T_S02_TEMP);
    const s02s = (await s02Repository.find());
    try {
        for(const cnt of cnts) {
            for(let i=0; i<dates.length; i+=24) {
                var s02ReadingIndex = new T_READING_INDEX_S02();
                s02ReadingIndex.cnt_id = cnt;
                s02ReadingIndex.fh = dates[i];
                if(dates[i].getMonth()==2 && dates[i].getDate()===31) {
                    for(let j = 0; j<23; j++) {
                        //console.log(includeFullDate(s02s, dates[i+j], cnt), 'Indices: ', i, j, ' Fecha: ', dates[i+j]);
                        if(includeFullDate(s02s, dates[i+j], cnt)) {
                            s02ReadingIndex.read = 1;
                        } else {
                            s02ReadingIndex.read = 0;
                            break;
                        }
                    }
                } else if(dates[i].getMonth()===9 && dates[i].getDate()===27) {
                    for(let j = 0; j<25; j++) {
                        if(includeFullDate(s02s, dates[i+j], cnt)) {
                            s02ReadingIndex.read = 1;
                        } else {
                            s02ReadingIndex.read = 0;
                            break;
                        }
                    }
                } else {
                    for(let j = 0; j<24; j++) {
                        if(includeFullDate(s02s, dates[i+j], cnt)) {
                            s02ReadingIndex.read = 1;
                        } else {
                            s02ReadingIndex.read = 0;
                            break;
                        }
                    }
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
    fechaActual.setHours(0,0,0,0);
    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual));
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return fechas;
}

/*
export function getDatesBtwDatesS02(fechaInicio: Date, fechaFin: Date): Date[] {
    const fechas: Date[] = [];
    let fechaActual: Date = new Date(fechaInicio.getTime());
    fechaActual.setHours(0, 0, 0, 0); // Set local time zone hours, minutes, seconds, and milliseconds to 0
    fechaActual.setUTCHours(fechaActual.getUTCHours() + fechaActual.getTimezoneOffset() / 60); // Convert local time to UTC

    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual.getTime()));
        fechaActual.setUTCHours(fechaActual.getUTCHours() + 1);
    }

    return fechas;
}
*/

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


function includeDate(reports: any, f2: Date, cnt: string): boolean {
    var res = false;
    for(const s of reports) {
        var cntId = s.cnt_id;
        if(s.fh_i != undefined) {
            var fh = s.fh_i;
        } else {
            var fh = s.fh;
        }
        if(fh.getDate()===f2.getDate() && fh.getMonth()===f2.getMonth() && fh.getFullYear()===f2.getFullYear()  && cnt === cntId) {
            res = true;
            return res;
        }
    }
    return res;
}

function includeFullDate(reports: any, f2: Date, cnt: string): boolean {
    var res = false;
    for(const s of reports) {
        var cntId = s.cnt_id;
        if(s.fh_i != undefined) {
            var fh = s.fh_i;
        } else {
            var fh = s.fh;
        }
        if(fh.getUTCDate()===f2.getUTCDate() && fh.getUTCMonth()===f2.getUTCMonth() && fh.getUTCFullYear()===f2.getUTCFullYear() && fh.getUTCHours()===f2.getUTCHours() && fh.getUTCMinutes()===f2.getUTCMinutes() && cnt === cntId) {
            res = true;
            return res;
        }
    }
    return res;
}

/*
function includeFullDate(reports: any, f2: Date, cnt: string): boolean {
    var res = false;
    var f = new Date(Date.UTC(f2.getFullYear(), f2.getMonth(), f2.getDate(), f2.getHours(), f2.getMinutes(), f2.getSeconds(), f2.getMilliseconds()))
    for(const s of reports) {
        var cntId = s.cnt_id;
        if(s.fh_i != undefined) {
            var fh = new Date(Date.UTC(s.fh_i.getFullYear(), s.fh_i.getMonth(), s.fh_i.getDate(), s.fh_i.getHours(), s.fh_i.getMinutes(), s.fh_i.getSeconds(), s.fh_i.getMilliseconds()));
        } else {
            var fh = new Date(Date.UTC(s.fh.getFullYear(), s.fh.getMonth(), s.fh.getDate(), s.fh.getHours(), s.fh.getMinutes(), s.fh.getSeconds(), s.fh.getMilliseconds()));
        }
        if(fh.getDate()===f.getDate() && fh.getMonth()===f.getMonth() && fh.getFullYear()===f.getFullYear() && fh.getHours()===f.getHours() && fh.getMinutes===f.getMinutes && fh.getMilliseconds()===f.getMilliseconds() && cnt === cntId) {
            res = true;
            return res;
        }
    }
    return res;
}
*/

export async function associateDates(cncs02: string[], cncs04: string[], cncs05: string[], dataSource: DataSource) {
    await associateDatesS02(cncs02, dataSource);
    await associateDatesS04(cncs04, dataSource);
    await associateDatesS05(cncs05, dataSource);
    console.log('Read Index Calculated')
}

type MultiValueMap<K extends string | number | symbol, V> = {
    [key in K]: V[];
  };

function addValueToMap<K extends string | number | symbol, V>(map: MultiValueMap<K, V>, key: K, value: V): void {
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(value);
  }

export async function getNonRead(dataSource: DataSource, entity: any): Promise<MultiValueMap<string, Date>> {
    const res: MultiValueMap<string, Date> = {};
    const indexRepository = dataSource.getRepository(entity);
    const index = await indexRepository.createQueryBuilder('index').where('index.read = :read', { read: 0 }).getMany();
    for(let i=0; i<index.length; i++) {
        addValueToMap(res, index[i].cnt_id, index[i].fh);
    }
    return res;
}

