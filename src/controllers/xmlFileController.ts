import { parseString } from 'xml2js';
import fs from 'fs';
import { T_S02_TEMP } from '../entities/T_S02_TEMP';
import { AppDataSource } from '../data-source';
import { T_S04_TEMP } from '../entities/T_S04_TEMP';
import { T_S09_TEMP } from '../entities/T_S09_TEMP';
import { T_S05_TEMP } from '../entities/T_S05_TEMP';
import { T_G01_TEMP } from '../entities/T_G01_TEMP';
import { T_G02_TEMP } from '../entities/T_G02_TEMP';
import { T_G03_TEMP } from '../entities/T_G03_TEMP';
import { T_G04_TEMP } from '../entities/T_G04_TEMP';
import { T_G05_TEMP } from '../entities/T_G05_TEMP';
import { T_G06_TEMP } from '../entities/T_G06_TEMP';


export async function parseFile(filePath: any): Promise<void> {
    try {
        const trozosDir = filePath.split('/');
        const file = trozosDir[trozosDir.length-1];
        const trozos = file.split('_');
        const idRpt = trozos[2];
        const mag = trozos[3];
        const reportDate = trozos[4];
        
        // Leer el archivo de forma asíncrona
        const data = await fs.promises.readFile(filePath, 'utf-8');
        
        // Parsear el XML
        const result = await parseXml(data);

        // Procesamos el reporte dependiendo de si es un SXX o un GXX
        if(idRpt.toLowerCase().startsWith("s")) {
            const elements = result?.Report?.Cnc[0]?.Cnt;
            if (elements !== undefined) {
                await processReport(elements, idRpt, mag, reportDate);
            }
        } else {
            const elements = result?.Report?.Cnc;
            if (elements !== undefined) {
                await processReport(elements, idRpt, mag, reportDate);
            }
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
        case 'G01':
            await processG01(report, mag, reportDate);
            break;
        case 'G02':
            await processG02(report, mag, reportDate);
            break;
        case 'G03':
            await processG03(report, mag, reportDate);
            break;
        case 'G04':
            await processG04(report, mag, reportDate);
            break;
        case 'G05':
            await processG05(report, mag, reportDate);
            break;
        case 'G06':
            await processG06(report, mag, reportDate);
            break;
        case 'G07':
            //await processG07(report, mag, reportDate);
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

async function processG01(report: any, mag: number, reportDate: string): Promise<void> {
    const g01Repository = AppDataSource.getRepository(T_G01_TEMP);
    for(const elem of report) {
        if(elem.G01 != undefined) {
            for(let i=0; i<Object.keys(elem.G01).length; i++) {
                try{
                    var g01 = new T_G01_TEMP();
                    g01.cnc_id = elem.$.Id;
                    g01.fh = elem.G01[i].$.Fh;
                    g01.h = elem.G01[i].$.Fh;
                    g01.amed = elem.G01[i].$.Amed;
                    g01.amax = elem.G01[i].$.Amax;
                    g01.tot = elem.G01[i].$.Tot;
                    g01.aperc = elem.G01[i].$.Aperc;
                    await g01Repository.save(g01);
                    console.log('G01 insertado')
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG02(report: any, mag: number, reportDate: string): Promise<void> {
    const g02Repository = AppDataSource.getRepository(T_G02_TEMP);
    for(const elem of report[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G02).length; i++) {
                try {
                var g02 = new T_G02_TEMP();
                g02.cnt_id = elem.$.Id;
                g02.fh = elem.G02[i].$.Fh;
                g02.h = elem.G02[i].$.Fh;
                g02.atime = elem.G02[i].$.Atime;
                g02.nchanges = elem.G02[i].$.Nchanges;
                g02.aconc = elem.G02[i].$.Aconc;
                g02.atimeperc = elem.G02[i].$.Atimeperc;
                await g02Repository.save(g02);
                console.log('G02 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG03(report: any, mag: number, reportDate: string): Promise<void> {
    const g03Repository = AppDataSource.getRepository(T_G03_TEMP);
    for(const elem of report[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G03).length; i++) {
                try {
                    var g03 = new T_G03_TEMP;
                    g03.cnt_id = elem.$.Id;
                    g03.fh = elem.G03[i].$.Fh;
                    g03.h = elem.G03[i].$.Fh;
                    g03.avvph1_lv = elem.G03[i].$.AvVph1_lv;
                    g03.avvph2_lv = elem.G03[i].$.AvVph2_lv;
                    g03.avvph3_lv = elem.G03[i].$.AvVph3_lv;
                    g03.aviph1_lv = elem.G03[i].$.AvIph1_lv;
                    g03.aviph2_lv = elem.G03[i].$.AvIph2_lv;
                    g03.aviph3_lv = elem.G03[i].$.AvIph3_lv;
                    g03.avpplus_triph = elem.G03[i].$.AvPplus_triph;
                    g03.avpminus_triph = elem.G03[i].$.AvPminus_triph;
                    g03.avqplus_triph = elem.G03[i].$.AvQplus_triph;
                    g03.avqminus_triph = elem.G03[i].$.AvQminus_triph;
                    g03.avvph1_mv = elem.G03[i].$.AvVph1_mv;
                    g03.avvph2_mv = elem.G03[i].$.AvVph2_mv;
                    g03.avvph3_mv = elem.G03[i].$.AvVph3_mv;
                    g03.avineutral = elem.G03[i].$.AvIneutral;
                    g03.avv0_comp = elem.G03[i].$.AvVo_comp;
                    g03.avv1_comp = elem.G03[i].$.AvV1_comp;
                    g03.avv2_comp = elem.G03[i].$.AvV2_comp;
                    g03.avvhs = elem.G03[i].$.AvVhs;
                    g03.bc = elem.G03[i].$.Bc;
                    await g03Repository.save(g03);
                    console.log('G03 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG04(report: any, mag: number, reportDate: string): Promise<void> {
    const g04Repository = AppDataSource.getRepository(T_G04_TEMP);
    for(const elem of report[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G04).length; i++) {
                try {
                    var g04 = new T_G04_TEMP();
                    g04.cnt_id = elem.$.Id;
                    g04.fh = elem.G04[i].$.Fh;
                    g04.h = elem.G04[i].$.Fh;
                    g04.maxvph1_lv = elem.G04[i].$.MaxVph1_lv;
                    g04.maxvph2_lv = elem.G04[i].$.MaxVph2_lv;
                    g04.maxvph3_lv = elem.G04[i].$.MaxVph3_lv;
                    g04.maxiph1_lv = elem.G04[i].$.MaxIph1_lv;
                    g04.maxiph2_lv = elem.G04[i].$.MaxIph2_lv;
                    g04.maxiph3_lv = elem.G04[i].$.MaxIph3_lv;
                    g04.maxpplus_triph = elem.G04[i].$.MaxPplus_triph;
                    g04.maxpminus_triph = elem.G04[i].$.MaxPminus_triph;
                    g04.maxqplus_triph = elem.G04[i].$.MaxQplus_triph;
                    g04.maxqminus_triph = elem.G04[i].$.MaxQminus_triph;
                    g04.maxvph1_mv = elem.G04[i].$.MaxVph1_mv;
                    g04.maxvph2_mv = elem.G04[i].$.MaxVph2_mv;
                    g04.maxvph3_mv = elem.G04[i].$.MaxVph3_mv;
                    g04.maxineutral = elem.G04[i].$.MaxIneutral;
                    g04.maxv0_comp = elem.G04[i].$.MaxVo_comp;
                    g04.maxv1_comp = elem.G04[i].$.MaxV1_comp;
                    g04.maxv2_comp = elem.G04[i].$.MaxV2_comp;
                    g04.maxvhs = elem.G04[i].$.MaxVhs;
                    g04.bc = elem.G04[i].$.Bc;
                    await g04Repository.save(g04);
                    console.log('G04 insertado');
                } catch(err) {
                    console.error(err);
                }
                
            }
        }
    }
}

async function processG05(report: any, mag: number, reportDate: string): Promise<void> {
    const g05Repository = AppDataSource.getRepository(T_G05_TEMP);
    for(const elem of report[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G05).length; i++) {
                try {
                    var g05 = new T_G05_TEMP();
                    g05.cnt_id = elem.$.Id;
                    g05.fh = elem.G05[i].$.Fh;
                    g05.h = elem.G05[i].$.Fh;
                    g05.minvph1_lv = elem.G05[i].$.MinVph1_lv;
                    g05.minvph2_lv = elem.G05[i].$.MinVph2_lv;
                    g05.minvph3_lv = elem.G05[i].$.MinVph3_lv;
                    g05.miniph1_lv = elem.G05[i].$.MinIph1_lv;
                    g05.miniph2_lv = elem.G05[i].$.MinIph2_lv;
                    g05.miniph3_lv = elem.G05[i].$.MinIph3_lv;
                    g05.minpplus_triph = elem.G05[i].$.MinPplus_triph;
                    g05.minpminus_triph = elem.G05[i].$.MinPminus_triph;
                    g05.minqplus_triph = elem.G05[i].$.MinQplus_triph;
                    g05.minqminus_triph = elem.G05[i].$.MinQminus_triph;
                    g05.minvph1_mv = elem.G05[i].$.MinVph1_mv;
                    g05.minvph2_mv = elem.G05[i].$.MinVph2_mv;
                    g05.minvph3_mv = elem.G05[i].$.MinVph3_mv;
                    g05.minineutral = elem.G05[i].$.MinIneutral;
                    g05.minv0_comp = elem.G05[i].$.MinVo_comp;
                    g05.minv1_comp = elem.G05[i].$.MinV1_comp;
                    g05.minv2_comp = elem.G05[i].$.MinV2_comp;
                    g05.minvhs = elem.G05[i].$.MinVhs;
                    g05.bc = elem.G05[i].$.Bc;
                    g05Repository.save(g05);
                    console.log('G05 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG06(report: any, mag: number, reportDate: string): Promise<void> {
    const g06Repository = AppDataSource.getRepository(T_G06_TEMP);
    for(const elem of report[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G06).length; i++) {
                try {
                    var g06 = new T_G06_TEMP();
                    g06.cnt_id = elem.$.Id;
                    g06.fh = elem.G06[i].$.Fh;
                    g06.h = elem.G06[i].$.Fh;
                    g06.momvph1_lv = elem.G06[i].$.MomVph1_lv;
                    g06.momvph2_lv = elem.G06[i].$.MomVph2_lv;
                    g06.momvph3_lv = elem.G06[i].$.MomVph3_lv;
                    g06.momiph1_lv = elem.G06[i].$.MomIph1_lv;
                    g06.momiph2_lv = elem.G06[i].$.MomIph2_lv;
                    g06.momiph3_lv = elem.G06[i].$.MomIph3_lv;
                    g06.mompplus_triph = elem.G06[i].$.MomPplus_triph;
                    g06.mompminus_triph = elem.G06[i].$.MomPminus_triph;
                    g06.momqplus_triph = elem.G06[i].$.MomQplus_triph;
                    g06.momqminus_triph = elem.G06[i].$.MomQminus_triph;
                    g06.momvph1_mv = elem.G06[i].$.MomVph1_mv;
                    g06.momvph2_mv = elem.G06[i].$.MomVph2_mv;
                    g06.momvph3_mv = elem.G06[i].$.MomVph3_mv;
                    g06.momineutral = elem.G06[i].$.MomIneutral;
                    g06.momv0_comp = elem.G06[i].$.MomVo_comp;
                    g06.momv1_comp = elem.G06[i].$.MomV1_comp;
                    g06.momv2_comp = elem.G06[i].$.MomV2_comp;
                    g06.momvhs = elem.G06[i].$.MomVhs;
                    g06.bc = elem.G06[i].$.Bc;
                    g06Repository.save(g06);
                    console.log('G06 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}
