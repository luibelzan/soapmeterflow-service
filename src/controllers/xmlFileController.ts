import { parseString } from 'xml2js';
import fs from 'fs';
import { T_S02_TEMP } from '../entities/T_S02_TEMP';
import { AppDataSource } from '../data-source';


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
      const elements = result.Report.Cnc[0].Cnt;
      processReport(elements, idRpt, mag, reportDate);
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
        console.log(elem.$);
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
        //console.log(elem);
        const s02Repository = AppDataSource.getRepository(T_S02_TEMP);
        if(elem.S02 != undefined) {
            for(let i=0; i<Object.keys(elem.S02).length; i++) {
                var s02 = new T_S02_TEMP();
                s02.cntId = elem.$.Id;
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
            }
        }
        
        
    });
}