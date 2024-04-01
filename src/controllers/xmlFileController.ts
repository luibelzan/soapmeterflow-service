import { parseString } from 'xml2js';
import fs from 'fs';

// Ruta al archivo XML
const filePath = '../../public/resources/CIR4621429009_0_S04_0_20240201081248';

// Lee el archivo XML
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
    processReport(elements);
    //console.log(elements[0]?.S04)
    /*
    elements.forEach((elem: any) => {
        console.log(elem);
    });
    */

  });
});

async function processReport(report: any): Promise<void> {
    var idRpt = '';
    if(report[0]?.S04) {
        idRpt = 'S04';
    } else if(report[0]?.S09) {
        idRpt = 'S09';
    } else if(report[0]?.S05) {
        idRpt = 'S05';
    } else {
        idRpt ='S02';
    }

    switch (idRpt) {
        case 'S04':
            await processS04(report);
            break;
        default:
            console.error(`Unknown report type: ${idRpt}`);
            break;
    }
}

async function processS04(report: any): Promise<void> {
    report.forEach((elem: any) => {
        console.log(elem.$);
    })
    
}

async function processS09(report: any): Promise<void> {
    report.forEach((elem: any) => {
        console.log();
    })
}

async function processS05(report: any): Promise<void> {
    
}