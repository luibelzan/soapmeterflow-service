import { parseString } from 'xml2js';
import fs from 'fs';
import { T_S02_TEMP } from '../entities/T_S02_TEMP';
import { AppDataSource } from '../data-source';
import { parseDate, isValidDate } from '../utils';
import { T_S04_TEMP } from '../entities/T_S04_TEMP';
import { T_S09_TEMP } from '../entities/T_S09_TEMP';
import { T_S05_TEMP } from '../entities/T_S05_TEMP';
import { T_G01_TEMP } from '../entities/T_G01_TEMP';
import { T_G02_TEMP } from '../entities/T_G02_TEMP';
import { T_G03_TEMP } from '../entities/T_G03_TEMP';
import { T_G04_TEMP } from '../entities/T_G04_TEMP';
import { T_G05_TEMP } from '../entities/T_G05_TEMP';
import { T_G06_TEMP } from '../entities/T_G06_TEMP';
import { T_G07_TEMP } from '../entities/T_G07_TEMP';
import { T_G56 } from '../entities/T_G56';
import { T_G57 } from '../entities/T_G57';
import { T_G58 } from '../entities/T_G58';
import { T_S93 } from '../entities/T_S93';
import { T_S94 } from '../entities/T_S94';


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

        const elements = result?.Report;
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
            await processG07(report, mag, reportDate);
            break;
        default:
            console.error(`Unknown report type: ${idRpt}`);
            break;
    }
}

async function processS04(report: any, mag: number, reportDate: string): Promise<void> {
    const s04Repository = AppDataSource.getRepository(T_S04_TEMP);
    for (const elem of report?.Cnc[0]?.Cnt) {
        if(elem.S04 != undefined) {
            for(let i=0; i<Object.keys(elem.S04).length; i++) {
                try {
                    var s04 = new T_S04_TEMP();
                    s04.cnt_id = elem.$.Id;
                    s04.fh_i = parseDate(elem.S04[i].$.Fhi);
                    s04.fh_f = parseDate(elem.S04[i].$.Fhf);
                    s04.ctr = elem.S04[i].$.Ctr;
                    s04.pt = elem.S04[i].$.Pt;
                    s04.mx = elem.S04[i].$.Mx;
                    if(isValidDate(elem.S04[i].$.Fx)) {
                        s04.fx = parseDate(elem.S04[i].$.Fx);
                    } else {
                        s04.fx = parseDate('20000101000000');
                    }
                    if(elem.S04[i].Value[0].$.AIa != undefined) {
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
                    } else {
                        s04.aia = elem.S04[i].Value[1].$.AIa;
                        s04.aea = elem.S04[i].Value[1].$.AEa;
                        s04.r1a = elem.S04[i].Value[1].$.R1a;
                        s04.r2a = elem.S04[i].Value[1].$.R2a;
                        s04.r3a = elem.S04[i].Value[1].$.R3a;
                        s04.r4a = elem.S04[i].Value[1].$.R4a;
                        s04.aii = elem.S04[i].Value[0].$.AIi;
                        s04.aei = elem.S04[i].Value[0].$.AEi;
                        s04.r1i = elem.S04[i].Value[0].$.R1i;
                        s04.r2i = elem.S04[i].Value[0].$.R2i;
                        s04.r3i = elem.S04[i].Value[0].$.R3i;
                        s04.r4i = elem.S04[i].Value[0].$.R4i;
                    }
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
    for (const elem of report?.Cnc[0]?.Cnt) {
        if(elem.S09 != undefined) {
            for(let i=0; i<Object.keys(elem.S09).length; i++) {
                try {
                    var s09 = new T_S09_TEMP();
                    s09.cnt_id = elem.$.Id;
                    s09.fh = parseDate(elem.S09[i].$.Fh);
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
    for (const elem of report?.Cnc[0]?.Cnt) {
        if(elem.S05 != undefined) {
            for(let i=0; i<Object.keys(elem.S05).length; i++) {
                try {
                    var s05 = new T_S05_TEMP();
                    s05.cnt_id = elem.$.Id;
                    s05.fh = parseDate(elem.S05[i].$.Fh);
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
    for (const elem of report?.Cnc[0]?.Cnt) {
        if(elem.S02 != undefined) {
            for(let i=0; i<Object.keys(elem.S02).length; i++) {
                try{
                    var s02 = new T_S02_TEMP();
                    s02.cnt_id = elem.$.Id;
                    s02.magn = parseInt(elem.$.Magn);
                    s02.fh = parseDate(elem.S02[i].$.Fh);
                    s02.bc = elem.S02[i].$.Bc;
                    s02.ai = parseInt(elem.S02[i].$.AI);
                    s02.ae = parseInt(elem.S02[i].$.AE);
                    s02.r1 = parseInt(elem.S02[i].$.R1);
                    s02.r2 = parseInt(elem.S02[i].$.R2);
                    s02.r3 = parseInt(elem.S02[i].$.R3);
                    s02.r4 = parseInt(elem.S02[i].$.R4);
                    s02.origen = 'STG';
                    await s02Repository.save(s02);
                } catch(err) {
                    console.error(err);
                }
            }
        } 
    };
}

async function processG01(report: any, mag: number, reportDate: string): Promise<void> {
    const g01Repository = AppDataSource.getRepository(T_G01_TEMP);
    for(const elem of report?.Cnc) {
        if(elem.G01 != undefined) {
            for(let i=0; i<Object.keys(elem.G01).length; i++) {
                try{
                    var g01 = new T_G01_TEMP();
                    g01.cnc_id = elem.$.Id;
                    g01.fh = parseDate(elem.G01[i].$.Fh);
                    g01.amed = elem.G01[i].$.Amed;
                    g01.amax = elem.G01[i].$.Amax;
                    g01.tot = elem.G01[i].$.Tot;
                    g01.aperc = elem.G01[i].$.Aperc;
                    await g01Repository.save(g01);
                    //console.log('G01 insertado')
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG02(report: any, mag: number, reportDate: string): Promise<void> {
    const g02Repository = AppDataSource.getRepository(T_G02_TEMP);
    for(const elem of report?.Cnc[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G02).length; i++) {
                try {
                var g02 = new T_G02_TEMP();
                g02.cnt_id = elem.$.Id;
                g02.fh = parseDate(elem.G02[i].$.Fh);
                g02.atime = elem.G02[i].$.Atime;
                g02.nchanges = elem.G02[i].$.Nchanges;
                g02.aconc = elem.G02[i].$.Aconc;
                g02.atimeperc = elem.G02[i].$.Atimeperc;
                await g02Repository.save(g02);
                //console.log('G02 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG03(report: any, mag: number, reportDate: string): Promise<void> {
    const g03Repository = AppDataSource.getRepository(T_G03_TEMP);
    for(const elem of report?.Cnc[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G03).length; i++) {
                try {
                    var g03 = new T_G03_TEMP;
                    g03.cnt_id = elem.$.Id;
                    g03.fh = parseDate(elem.G03[i].$.Fh);
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
                    //console.log('G03 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG04(report: any, mag: number, reportDate: string): Promise<void> {
    const g04Repository = AppDataSource.getRepository(T_G04_TEMP);
    for(const elem of report?.Cnc[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G04).length; i++) {
                try {
                    var g04 = new T_G04_TEMP();
                    g04.cnt_id = elem.$.Id;
                    g04.fh = parseDate(elem.G04[i].$.Fh);
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
                    //console.log('G04 insertado');
                } catch(err) {
                    console.error(err);
                }
                
            }
        }
    }
}

async function processG05(report: any, mag: number, reportDate: string): Promise<void> {
    const g05Repository = AppDataSource.getRepository(T_G05_TEMP);
    for(const elem of report?.Cnc[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G05).length; i++) {
                try {
                    var g05 = new T_G05_TEMP();
                    g05.cnt_id = elem.$.Id;
                    g05.fh = parseDate(elem.G05[i].$.Fh);
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
                    await g05Repository.save(g05);
                    //console.log('G05 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG06(report: any, mag: number, reportDate: string): Promise<void> {
    const g06Repository = AppDataSource.getRepository(T_G06_TEMP);
    for(const elem of report?.Cnc[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G06).length; i++) {
                try {
                    var g06 = new T_G06_TEMP();
                    g06.cnt_id = elem.$.Id;
                    g06.fh = parseDate(elem.G06[i].$.Fh);
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
                    await g06Repository.save(g06);
                    //console.log('G06 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG07(report: any, mag: number, reportDate: string): Promise<void> {
    const g07Repository = AppDataSource.getRepository(T_G07_TEMP);
    for(const elem of report?.Cnc[0].Cnt) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G07).length; i++) {
                try {
                    var g07 = new T_G07_TEMP();
                    g07.cnt_id = elem.$.Id;
                    g07.fh = parseDate(elem.G07[i].$.Fh);
                    g07.unbal = elem.G07[i].$.Unbal;
                    g07.harm3_ph1 = elem.G07[i].$.Harm3_ph1;
                    g07.harm3_ph2 = elem.G07[i].$.Harm3_ph2;
                    g07.harm3_ph3 = elem.G07[i].$.Harm3_ph3;
                    g07.harm5_ph1 = elem.G07[i].$.Harm5_ph1;
                    g07.harm5_ph2 = elem.G07[i].$.Harm5_ph2;
                    g07.harm5_ph3 = elem.G07[i].$.Harm5_ph3;
                    g07.harm7_ph1 = elem.G07[i].$.Harm7_ph1;
                    g07.harm7_ph2 = elem.G07[i].$.Harm7_ph2;
                    g07.harm7_ph3 = elem.G07[i].$.Harm7_ph3;
                    g07.thd_ph1 = elem.G07[i].$.Thd_ph1;
                    g07.thd_ph2 = elem.G07[i].$.Thd_ph2;
                    g07.thd_ph3 = elem.G07[i].$.Thd_ph3;
                    g07.bc = elem.G07[i].$.Bc;
                    await g07Repository.save(g07);
                    //console.log('G07 insertado');
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}


async function processG56(report: any, mag: number, reportDate: string): Promise<void> {
    const g56Repository = AppDataSource.getRepository(T_G56);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G56).length; i++) {
                try {
                    var g56 = new T_G56();
                    g56.rtu_id = report.Rtu[0].$.Id;
                    g56.lvs_id = elem.$.Id;
                    g56.lvs_pos = elem.$.Pos;
                    g56.fh = parseDate(elem.G56[i].$.Fh);
                    g56.avgcph1 = elem.G56[i].$.AvgCph1;
                    g56.avgvph1 = elem.G56[i].$.AvgVph1;
                    g56.avgpimph1 = elem.G56[i].$.AvgPimph1;
                    g56.avgpexph1 = elem.G56[i].$.AvgPexph1; 
                    g56.avgqimph1 = elem.G56[i].$.AvgQimph1;
                    g56.avgqexph1 = elem.G56[i].$.AvgQexph1;
                    g56.avgpf1 = elem.G56[i].$.AvgPF1;
                    g56.avgcph2 = elem.G56[i].$.AvgCph2;
                    g56.avgvph2 = elem.G56[i].$.AvgVph2;
                    g56.avgpimph2 = elem.G56[i].$.AvgPimph2;
                    g56.avgpexph2 = elem.G56[i].$.AvgPexph2;
                    g56.avgqimph2 = elem.G56[i].$.AvgQimph2;
                    g56.avgqexph2 = elem.G56[i].$.AvgQexph2;
                    g56.avgpf2 = elem.G56[i].$.AvgPF2;
                    g56.avgcph3 = elem.G56[i].$.AvgCph3;
                    g56.avgvph3 = elem.G56[i].$.AvgVph3;
                    g56.avgpimph3 = elem.G56[i].$.AvgPimph3;
                    g56.avgpexph3 = elem.G56[i].$.AvgPexph3;
                    g56.avgqimph3 = elem.G56[i].$.AvgQimph3;
                    g56.avgqexph3 = elem.G56[i].$.AvgQexph3;
                    g56.avgpf3 = elem.G56[i].$.AvgPF3;
                    g56.avgcn = elem.G56[i].$.AvgCn;
                    g56.temp = elem.G56[i].$.Temp;
                    g56.bc = elem.G56[i].$.Bc;
                    await g56Repository.save(g56);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG57(report: any, mag: number, reportDate: string): Promise<void> {
    const g57Repository = AppDataSource.getRepository(T_G57);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G57).length; i++) {
                try {
                    var g57 = new T_G57();
                    g57.rtu_id = report.Rtu[0].$.Id;
                    g57.lvs_id = elem.$.Id;
                    g57.lvs_pos = elem.$.Pos;
                    g57.fh = parseDate(elem.G57[i].$.Fh);
                    g57.maxcph1 = elem.G57[i].$.MaxCph1;
                    g57.maxvph1 = elem.G57[i].$.MaxVph1;
                    g57.maxpimph1 = elem.G57[i].$.MaxPimph1;
                    g57.maxpexph1 = elem.G57[i].$.MaxPexph1;
                    g57.maxqimph1 = elem.G57[i].$.MaxQimph1;
                    g57.maxqexph1 = elem.G57[i].$.MaxQexph1;
                    g57.maxpf1 = elem.G57[i].$.MaxPF1;
                    g57.maxcph2 = elem.G57[i].$.MaxCph2;
                    g57.maxvph2 = elem.G57[i].$.MaxVph2;
                    g57.maxpimph2 = elem.G57[i].$.MaxPimph2;
                    g57.maxpexph2 = elem.G57[i].$.MaxPexph2;
                    g57.maxqimph2 = elem.G57[i].$.MaxQimph2;
                    g57.maxqexph2 = elem.G57[i].$.MaxQexph2;
                    g57.maxpf2 = elem.G57[i].$.MaxPF2;
                    g57.maxcph3 = elem.G57[i].$.MaxCph3;
                    g57.maxvph3 = elem.G57[i].$.MaxVph3;
                    g57.maxpimph3 = elem.G57[i].$.MaxPimph3;
                    g57.maxpexph3 = elem.G57[i].$.MaxPexph3;
                    g57.maxqimph3 = elem.G57[i].$.MaxQimph3;
                    g57.maxqexph3 = elem.G57[i].$.MaxQexph3;
                    g57.maxpf3 = elem.G57[i].$.MaxPF3;
                    g57.maxcn = elem.G57[i].$.MaxCn;
                    g57.bc = elem.G57[i].$.Bc;
                    await g57Repository.save(g57);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG58(report: any, mag: number, reportDate: string): Promise<void> {
    const g58Repository = AppDataSource.getRepository(T_G58);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G58).length; i++) {
                try {
                    var g58 = new T_G58();
                    g58.rtu_id = report.Rtu[0].$.Id;
                    g58.lvs_id = elem.$.Id;
                    g58.lvs_pos = elem.$.Pos;
                    g58.fh = parseDate(elem.G58[i].$.Fh);
                    g58.mincph1 = elem.G58[i].$.MinCph1;
                    g58.minvph1 = elem.G58[i].$.MinVph1;
                    g58.minpimph1 = elem.G58[i].$.MinPimph1;
                    g58.minpexph1 = elem.G58[i].$.MinPexph1;
                    g58.minqimph1 = elem.G58[i].$.MinQimph1;
                    g58.minqexph1 = elem.G58[i].$.MinQexph1;
                    g58.minpf1 = elem.G58[i].$.MinPF1;
                    g58.mincph2 = elem.G58[i].$.MinCph2;
                    g58.minvph2 = elem.G58[i].$.MinVph2;
                    g58.minpimph2 = elem.G58[i].$.MinPimph2;
                    g58.minpexph2 = elem.G58[i].$.MinPexph2;
                    g58.minqimph2 = elem.G58[i].$.MinQimph2;
                    g58.minqexph2 = elem.G58[i].$.MinQexph2;
                    g58.minpf2 = elem.G58[i].$.MinPF2;
                    g58.mincph3 = elem.G58[i].$.MinCph3;
                    g58.minvph3 = elem.G58[i].$.MinVph3;
                    g58.minpimph3 = elem.G58[i].$.MinPimph3;
                    g58.minpexph3 = elem.G58[i].$.MinPexph3;
                    g58.minqimph3 = elem.G58[i].$.MinQimph3;
                    g58.minqexph3 = elem.G58[i].$.MinQexph3;
                    g58.minpf3 = elem.G58[i].$.MinPF3;
                    g58.mimcn = elem.G58[i].$.MimCn;
                    g58.bc = elem.G58[i].$.Bc;
                    await g58Repository.save(g58);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS93(report: any, mag: number, reportDate: string): Promise<void> {
    const s93Repository = AppDataSource.getRepository(T_S93);
    for(const elem of report?.Rtu) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S93).length; i++) {
                try {
                    var s93 = new T_S93();
                    s93.rtu_id = elem.$.Id;
                    s93.fh = parseDate(elem.S93[i].$.Fh);
                    s93.vr = elem.S93[i].$.Vr;
                    s93.vs = elem.S93[i].$.Vs;
                    s93.vt = elem.S93[i].$.Vt;
                    s93.bc = elem.S93[i].$.Bc;
                    await s93Repository.save(s93);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}


async function processS94(report: any, mag: number, reportDate: string): Promise<void> {
    const s94Repository = AppDataSource.getRepository(T_S94);
    for(const elem of report?.Rtu) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S94).length; i++) {
                try {
                    var s94 = new T_S94();
                    s94.rtu_id = elem.$.Id;
                    s94.tp = elem.S94[i].$.Tp;
                    s94.fh = parseDate(elem.S94[i].$.Fh);
                    s94.fr = elem.S94[i].$.Fr;
                    s94.fs = elem.S94[i].$.Fs;
                    s94.ft = elem.S94[i].$.Ft;
                    s94.bc = elem.S94[i].$.Bc;
                    await s94Repository.save(s94);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}