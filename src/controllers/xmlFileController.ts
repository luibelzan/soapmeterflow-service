import { parseString } from 'xml2js';
import fs from 'fs';
import { T_S02_TEMP } from '../entities/T_S02_TEMP';
import { AppDataSource } from '../data-source';
import { T_S04_TEMP } from '../entities/T_S04_TEMP';
import { T_S09_TEMP } from '../entities/T_S09_TEMP';
import { T_S05_TEMP } from '../entities/T_S05_TEMP';


export async function parseFile(file: any): Promise<void> {
    try {
        const filePath = '../public/resources/' + file;
        const trozos = file.split('_');
        const idRpt = trozos[2];
        const mag = trozos[3];
        const reportDate = trozos[4];
        
        // Leer el archivo de forma asíncrona
        const data = await fs.promises.readFile(filePath, 'utf-8');
        
        // Parsear el XML
        const result = await parseXml(data);
        
        const elements = result?.Report?.Cnc[0]?.Cnt;
        if (elements !== undefined) {
            await processReport(elements, idRpt, mag, reportDate);
        }
    } catch (error) {
        console.error(`Error al leer o analizar el archivo XML: ${error}`);
    }
}

async function parseXml(data: string): Promise<any> {
    return new Promise((resolve, reject) => {
        parseString(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function processReport(report: any, idRpt: string, mag: number, reportDate: string): Promise<void> {

    switch (idRpt) {
        case 'S04':
            await processS04(report, mag, reportDate);
            break;
        case 'S09':
            await processS09(report, mag, reportDate);
            break;
        case 'S05':
            await processS05(report, mag, reportDate);
            break;
        case 'S02':
            await processS02(report, mag, reportDate);
            break;
        default:
            console.error(`Unknown report type: ${idRpt}`);
            break;
    }
}

async function processS04(report: any, mag: number, reportDate: string): Promise<void> {
    const s04Repository = AppDataSource.getRepository(T_S04_TEMP);
    for (const elem of report) {
        if(elem.S04 != undefined) {
            for(let i=0; i<Object.keys(elem.S04).length; i++) {
                try {
                    var s04 = new T_S04_TEMP();
                    s04.cnt_id = elem.$.Id;
                    s04.fh_i = elem.S04[i].$.Fhi;
                    s04.h_i = elem.S04[i].$.Fhi;
                    s04.fh_f = elem.S04[i].$.Fhf;
                    s04.h_f = elem.S04[i].$.Fhf;
                    s04.ctr = elem.S04[i].$.Ctr;
                    s04.pt = elem.S04[i].$.Pt;
                    s04.mx = elem.S04[i].$.Mx;
                    s04.fx = elem.S04[i].$.Fx;
                    s04.hx = elem.S04[i].$.Fx;
                    s04.aia = elem.S04[i].Value[0].$.AIa;
                    s04.aea = elem.S04[i].Value[0].$.AEa;
                    s04.r1a = elem.S04[i].Value[0].$.R1a;
                    s04.r2a = elem.S04[i].Value[0].$.R2a;
                    s04.r3a = elem.S04[i].Value[0].$.R3a;
                    s04.r4a = elem.S04[i].Value[0].$.R4a;
                    s04.aii = elem.S04[i].Value[1].$.AIi;
                    s04.aei = elem.S04[i].Value[1].$.AEi;
                    s04.r1i = elem.S04[i].Value[1].$.R1i;
                    s04.r2i = elem.S04[i].Value[1].$.R2i;
                    s04.r3i = elem.S04[i].Value[1].$.R3i;
                    s04.r4i = elem.S04[i].Value[1].$.R4i;
                    await s04Repository.save(s04);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS09(report: any, mag: number, reportDate: string): Promise<void> {
    const s09Repository = AppDataSource.getRepository(T_S09_TEMP);
    for (const elem of report) {
        if(elem.S09 != undefined) {
            for(let i=0; i<Object.keys(elem.S09).length; i++) {
                try {
                    var s09 = new T_S09_TEMP();
                    s09.cnt_id = elem.$.Id;
                    s09.fh = elem.S09[i].$.Fh;
                    s09.h = elem.S09[i].$.Fh;
                    s09.et = elem.S09[i].$.Et;
                    s09.c = elem.S09[i].$.C;
                    s09.d1 =  elem?.S09[i]?.D1
                    await s09Repository.save(s09);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS05(report: any, mag: number, reportDate: string): Promise<void> {
    const s05Repository = AppDataSource.getRepository(T_S05_TEMP);
    for (const elem of report) {
        if(elem.S05 != undefined) {
            for(let i=0; i<Object.keys(elem.S05).length; i++) {
                try {
                    var s05 = new T_S05_TEMP();
                    s05.cnt_id = elem.$.Id;
                    s05.fh = elem.S05[i].$.Fh;
                    s05.ctr = elem.S05[i].$.Ctr;
                    s05.pt = elem.S05[i].$.Pt;
                    s05.aia = elem.S05[i].Value[0].$.AIa;
                    s05.aea = elem.S05[i].Value[0].$.AEa;
                    s05.r1a = elem.S05[i].Value[0].$.R1a;
                    s05.r2a = elem.S05[i].Value[0].$.R2a;
                    s05.r3a = elem.S05[i].Value[0].$.R3a;
                    s05.r4a = elem.S05[i].Value[0].$.R4a;
                    await s05Repository.save(s05);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    };
}

async function processS02(report: any, mag: number, reportDate: string): Promise<void> {
    const s02Repository = AppDataSource.getRepository(T_S02_TEMP);
    const fechaHoraActual = new Date();
    for (const elem of report) {
        if(elem.S02 != undefined) {
            for(let i=0; i<Object.keys(elem.S02).length; i++) {
                try{
                    var s02 = new T_S02_TEMP();
                    s02.cnt_id = elem.$.Id;
                    s02.magn = parseInt(elem.$.Magn);
                    s02.fh = elem.S02[i].$.Fh;
                    s02.hor = elem.S02[i].$.Fh;
                    s02.bc = elem.S02[i].$.Bc;
                    s02.ai = parseInt(elem.S02[i].$.AI);
                    s02.ae = parseInt(elem.S02[i].$.AE);
                    s02.r1 = parseInt(elem.S02[i].$.R1);
                    s02.r2 = parseInt(elem.S02[i].$.R2);
                    s02.r3 = parseInt(elem.S02[i].$.R3);
                    s02.r4 = parseInt(elem.S02[i].$.R4);
                    s02.origen = 'STG';
                    const dia = fechaHoraActual.getDate();
                    const mes = fechaHoraActual.getMonth() + 1; // Sumamos 1 porque los meses se indexan desde 0
                    const año = fechaHoraActual.getFullYear();
                    const hora = fechaHoraActual.getHours();
                    const minutos = fechaHoraActual.getMinutes();
                    const segundos = fechaHoraActual.getSeconds();
                    const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;
                    await s02Repository.save(s02);
                    console.log('Evento insertado ', fechaFormateada);
                } catch(err) {
                    console.error(err);
                }
            }
        } 
    };
}