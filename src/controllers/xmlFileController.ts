import { parseString } from 'xml2js';
import fs from 'fs';
import { T_S02_TEMP } from '../entities/T_S02_TEMP';
import { AppDataSource } from '../data-source';
import { T_S04_TEMP } from '../entities/T_S04_TEMP';


// Ruta al archivo XML
//const filePath = '../../public/resources/CIR4622104025_3FD_S05_0_20231031103802';
export async function parseFile(file: any): Promise<void> {
    const filePath = '../public/resources/' + file;
    const trozos = file.split('_');
    const idRpt = trozos[2];
    const mag = trozos[3];
    const reportDate = trozos[4];
    fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo XML: ${err}`);
      return;
    }
  
    // Parsea el XML
    parseString(data, (err, result) => {
      if (err) {
        console.error(`Error al analizar el XML: ${err}`);
        return;
      }
      const elements = result?.Report?.Cnc[0]?.Cnt;
      if(elements != undefined) {
        processReport(elements, idRpt, mag, reportDate);
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
    report.forEach((elem: any) => {
        const s04Repository = AppDataSource.getRepository(T_S04_TEMP);
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
                    s04Repository.save(s04);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    })
    
}

async function processS09(report: any, mag: number, reportDate: string): Promise<void> {
    report.forEach((elem: any) => {
        console.log('Event S09');
    })
}

async function processS05(report: any, mag: number, reportDate: string): Promise<void> {
    report.forEach(elem => {
        console.log(elem);
    });
}

async function processS02(report: any, mag: number, reportDate: string): Promise<void> {
    report.forEach(elem => {
        const s02Repository = AppDataSource.getRepository(T_S02_TEMP);
        if(elem.S02 != undefined) {
            for(let i=0; i<Object.keys(elem.S02).length; i++) {
                try{
                    var s02 = new T_S02_TEMP();
                    s02.cnt_id = elem.$.Id;
                    s02.magn = parseInt(elem.$.Magn);
                    s02.fh = elem.S02[i].$.Fh;
                    s02.hor = elem.S02[i].$.Fh;
                    s02.bc = parseInt(elem.S02[i].$.Bc);
                    s02.ai = parseInt(elem.S02[i].$.AI);
                    s02.ae = parseInt(elem.S02[i].$.AE);
                    s02.r1 = parseInt(elem.S02[i].$.R1);
                    s02.r2 = parseInt(elem.S02[i].$.R2);
                    s02.r3 = parseInt(elem.S02[i].$.R3);
                    s02.r4 = parseInt(elem.S02[i].$.R4);
                    s02.origen = 'STG';
                    s02Repository.save(s02);
                } catch(err) {
                    console.error(err);
                }
            }
        } 
    });
}