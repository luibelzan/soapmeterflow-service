import { parseString } from 'xml2js';
import fs from 'fs';
import { T_S02_TEMP } from '../entities/T_S02_TEMP';
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
import { T_S96 } from '../entities/T_S96';
import { T_S97 } from '../entities/T_S97';
import { T_S06 } from '../entities/T_S06';
import { T_S14 } from '../entities/T_S14';
import { T_S17 } from '../entities/T_S17';
import { T_S24 } from '../entities/T_S24';
import { T_S12 } from '../entities/T_S12';
import { DataSource } from 'typeorm';
import { T_G59 } from '../entities/T_G59';
import { T_S52 } from '../entities/T_S52';
import { T_S53 } from '../entities/T_S53';
import { T_S59 } from '../entities/T_S59';
import { T_S64 } from '../entities/T_S64';
import { T_S82 } from '../entities/T_S82';
import { T_S98 } from '../entities/T_S98';
import { T_S95 } from '../entities/T_S95';
import { T_S67 } from '../entities/T_S67';


export async function parseFile(filePath: any, dataSource: DataSource): Promise<void> {
    try {
        const trozosDir = filePath.split('/');
        const file = trozosDir[trozosDir.length-1];
        const trozos = file.split('_');
        const origen = trozos[1];
        const idRpt = trozos[2];
        const mag = trozos[3];
        const reportDate = trozos[4];
        
        // Leer el archivo de forma asíncrona
        const data = await fs.promises.readFile(filePath, 'utf-8');
        
        // Parsear el XML
        const result = await parseXml(data);

        const elements = result?.Report;
        if (elements !== undefined) {
            await processReport(elements, idRpt, mag, reportDate, dataSource);
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

async function processReport(report: any, idRpt: string, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {

    switch (idRpt.trim()) {
        case 'S04':
            await processS04(report, mag, reportDate, dataSource);
            break;
        case 'S09':
            await processS09(report, mag, reportDate, dataSource);
            break;
        case 'S05':
            await processS05(report, mag, reportDate, dataSource);
            break;
        case 'S02':
            await processS02(report, mag, reportDate, dataSource);
            break;
        case 'G01':
            await processG01(report, mag, reportDate, dataSource);
            break;
        case 'G02':
            await processG02(report, mag, reportDate, dataSource);
            break;
        case 'G03':
            await processG03(report, mag, reportDate, dataSource);
            break;
        case 'G04':
            await processG04(report, mag, reportDate, dataSource);
            break;
        case 'G05':
            await processG05(report, mag, reportDate, dataSource);
            break;
        case 'G06':
            await processG06(report, mag, reportDate, dataSource);
            break;
        case 'G07':
            await processG07(report, mag, reportDate, dataSource);
            break;
        case 'G56':
            await processG56(report, mag, reportDate, dataSource);
            break;
        case 'G57':
            await processG57(report, mag, reportDate, dataSource);
            break;
        case 'G58':
            await processG58(report, mag, reportDate, dataSource);
            break;
        case 'S93':
            await processS93(report, mag, reportDate, dataSource);
            break;
        case 'S94':
            await processS94(report, mag, reportDate, dataSource);
            break;
        case 'S96':
            await processS96(report, mag, reportDate, dataSource);
            break;
        case 'S97':
            await processS97(report, mag, reportDate, dataSource);
            break;
        case 'S06':
            await processS06(report, mag, reportDate, dataSource);
            break;
        case 'S12':
            await processS12(report, mag, reportDate, dataSource);
            break;
        case 'S14': 
            await processS14(report, mag, reportDate, dataSource);
            break;
        case 'S17':
            await processS17(report, mag, reportDate, dataSource);
            break;
        case 'S24':
            await processS24(report, mag, reportDate, dataSource);
            break;
        case 'G59':
            await processG59(report, mag, reportDate, dataSource);
            break;
        case 'S52':
            await processS52(report, mag, reportDate, dataSource);
            break;
        case 'S53':
            await processS53(report, mag, reportDate, dataSource);
            break;
        case 'S59':
            await processS59(report, mag, reportDate, dataSource);
            break;
        case 'S64':
            await processS64(report, mag, reportDate, dataSource);
            break;
        case 'S82':
            await processS82(report, mag, reportDate, dataSource);
            break;
        case 'S98':
            await processS98(report, mag, reportDate, dataSource);
            break;
        case 'S95':
            await processS95(report, mag, reportDate, dataSource);
            break;
        case 'S67':
            await processS67(report, mag, reportDate, dataSource);
            break;
        default:
            console.error(`Unknown report type: ${idRpt}`);
            break;
    }
}

async function processS04(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    let res = [];
    const s04Repository = dataSource.getRepository(T_S04_TEMP);
    const batchSize = 5000;
    try {
        for (const elem of report?.Cnc[0]?.Cnt) {
            if(elem.S04 != undefined) {
                for(let i=0; i<Object.keys(elem.S04).length; i++) {
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
                    res.push(s04);
                    if (res.length >= batchSize) {
                        await s04Repository.save(res);
                        res = []; // Limpiar el array para el próximo lote
                    }
                } 
            }
        }
        if(res.length > 0) {
            await s04Repository.save(res);
        }
    } catch(err) {
        console.error(err);
    }
    
}


async function processS09(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s09Repository = dataSource.getRepository(T_S09_TEMP);
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

async function processS05(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s05Repository = dataSource.getRepository(T_S05_TEMP);
    let res = [];
    const batchSize = 5000;
    try {
        for (const elem of report?.Cnc[0]?.Cnt) {
            if(elem.S05 != undefined) {
                for(let i=0; i<Object.keys(elem.S05).length; i++) {
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
                    res.push(s05);
                    if (res.length >= batchSize) {
                        await s05Repository.save(res);
                        res = []; // Limpiar el array para el próximo lote
                    }
                } 
            }
        }
        if(res.length > 0) {
            await s05Repository.save(res);
        }
    } catch(err) {
        console.error(err);
    }
}


async function processS02(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s02Repository = dataSource.getRepository(T_S02_TEMP);
    let res = [];
    const batchSize = 5000;
    try {
        for (const elem of report?.Cnc[0]?.Cnt) {
            if(elem.S02 != undefined) {
                for(let i=0; i<Object.keys(elem.S02).length; i++) {
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
                    res.push(s02);
                    if (res.length >= batchSize) {
                        await s02Repository.save(res);
                        res = []; // Limpiar el array para el próximo lote
                    }
                } 
            }
        } 
        if(res.length > 0) {
            await s02Repository.save(res);
        }
    } catch(err) {
        console.error(err);
    }
}


async function processG01(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g01Repository = dataSource.getRepository(T_G01_TEMP);
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

async function processG02(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g02Repository = dataSource.getRepository(T_G02_TEMP);
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

async function processG03(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g03Repository = dataSource.getRepository(T_G03_TEMP);
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

async function processG04(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g04Repository = dataSource.getRepository(T_G04_TEMP);
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

async function processG05(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g05Repository = dataSource.getRepository(T_G05_TEMP);
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

async function processG06(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g06Repository = dataSource.getRepository(T_G06_TEMP);
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

async function processG07(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g07Repository = dataSource.getRepository(T_G07_TEMP);
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


async function processG56(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g56Repository = dataSource.getRepository(T_G56);
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

async function processG57(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g57Repository = dataSource.getRepository(T_G57);
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

async function processG58(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const g58Repository = dataSource.getRepository(T_G58);
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

async function processS93(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s93Repository = dataSource.getRepository(T_S93);
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


async function processS94(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s94Repository = dataSource.getRepository(T_S94);
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

async function processS96(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s96Repository = dataSource.getRepository(T_S96);
    for(const elem of report?.Rtu) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S96).length; i++) {
                try {
                    var s96 = new T_S96;
                    s96.rtu_id = elem.$.Id;
                    s96.fh = parseDate(elem.S96[i].$.Fh);
                    s96.hr_h1 = elem.S96[i].Hr[0].$.h1;
                    s96.hr_h2 = elem.S96[i].Hr[0].$.h2;
                    s96.hr_h3 = elem.S96[i].Hr[0].$.h3;
                    s96.hr_h4 = elem.S96[i].Hr[0].$.h4;
                    s96.hr_h5 = elem.S96[i].Hr[0].$.h5;
                    s96.hr_h5 = elem.S96[i].Hr[0].$.h5;
                    s96.hr_h6 = elem.S96[i].Hr[0].$.h6;
                    s96.hr_h7 = elem.S96[i].Hr[0].$.h7;
                    s96.hr_h8 = elem.S96[i].Hr[0].$.h8;
                    s96.hr_h9 = elem.S96[i].Hr[0].$.h9;
                    s96.hr_h10 = elem.S96[i].Hr[0].$.h10;
                    s96.hr_h11 = elem.S96[i].Hr[0].$.h11;
                    s96.hr_h12 = elem.S96[i].Hr[0].$.h12;
                    s96.hr_h13 = elem.S96[i].Hr[0].$.h13;
                    s96.hr_h14 = elem.S96[i].Hr[0].$.h14;
                    s96.hr_h15 = elem.S96[i].Hr[0].$.h15;
                    s96.hr_h16 = elem.S96[i].Hr[0].$.h16;
                    s96.hr_h17 = elem.S96[i].Hr[0].$.h17;
                    s96.hr_h18 = elem.S96[i].Hr[0].$.h18;
                    s96.hr_h19 = elem.S96[i].Hr[0].$.h19;
                    s96.hr_h20 = elem.S96[i].Hr[0].$.h20;
                    s96.hr_h21 = elem.S96[i].Hr[0].$.h21;
                    s96.hr_h22 = elem.S96[i].Hr[0].$.h22;
                    s96.hr_h23 = elem.S96[i].Hr[0].$.h23;
                    s96.hr_h24 = elem.S96[i].Hr[0].$.h24;
                    s96.hr_h25 = elem.S96[i].Hr[0].$.h25;
                    s96.hr_thd = elem.S96[i].Hr[0].$.thd;
                    s96.hr_bc = elem.S96[i].Hr[0].$.Bc;

                    s96.hs_h1 = elem.S96[i].Hs[0].$.h1;
                    s96.hs_h2 = elem.S96[i].Hs[0].$.h2;
                    s96.hs_h3 = elem.S96[i].Hs[0].$.h3;
                    s96.hs_h4 = elem.S96[i].Hs[0].$.h4;
                    s96.hs_h5 = elem.S96[i].Hs[0].$.h5;
                    s96.hs_h5 = elem.S96[i].Hs[0].$.h5;
                    s96.hs_h6 = elem.S96[i].Hs[0].$.h6;
                    s96.hs_h7 = elem.S96[i].Hs[0].$.h7;
                    s96.hs_h8 = elem.S96[i].Hs[0].$.h8;
                    s96.hs_h9 = elem.S96[i].Hs[0].$.h9;
                    s96.hs_h10 = elem.S96[i].Hs[0].$.h10;
                    s96.hs_h11 = elem.S96[i].Hs[0].$.h11;
                    s96.hs_h12 = elem.S96[i].Hs[0].$.h12;
                    s96.hs_h13 = elem.S96[i].Hs[0].$.h13;
                    s96.hs_h14 = elem.S96[i].Hs[0].$.h14;
                    s96.hs_h15 = elem.S96[i].Hs[0].$.h15;
                    s96.hs_h16 = elem.S96[i].Hs[0].$.h16;
                    s96.hs_h17 = elem.S96[i].Hs[0].$.h17;
                    s96.hs_h18 = elem.S96[i].Hs[0].$.h18;
                    s96.hs_h19 = elem.S96[i].Hs[0].$.h19;
                    s96.hs_h20 = elem.S96[i].Hs[0].$.h20;
                    s96.hs_h21 = elem.S96[i].Hs[0].$.h21;
                    s96.hs_h22 = elem.S96[i].Hs[0].$.h22;
                    s96.hs_h23 = elem.S96[i].Hs[0].$.h23;
                    s96.hs_h24 = elem.S96[i].Hs[0].$.h24;
                    s96.hs_h25 = elem.S96[i].Hs[0].$.h25;
                    s96.hs_thd = elem.S96[i].Hs[0].$.thd;
                    s96.hs_bc = elem.S96[i].Hs[0].$.Bc;

                    s96.ht_h1 = elem.S96[i].Ht[0].$.h1;
                    s96.ht_h2 = elem.S96[i].Ht[0].$.h2;
                    s96.ht_h3 = elem.S96[i].Ht[0].$.h3;
                    s96.ht_h4 = elem.S96[i].Ht[0].$.h4;
                    s96.ht_h5 = elem.S96[i].Ht[0].$.h5;
                    s96.ht_h5 = elem.S96[i].Ht[0].$.h5;
                    s96.ht_h6 = elem.S96[i].Ht[0].$.h6;
                    s96.ht_h7 = elem.S96[i].Ht[0].$.h7;
                    s96.ht_h8 = elem.S96[i].Ht[0].$.h8;
                    s96.ht_h9 = elem.S96[i].Ht[0].$.h9;
                    s96.ht_h10 = elem.S96[i].Ht[0].$.h10;
                    s96.ht_h11 = elem.S96[i].Ht[0].$.h11;
                    s96.ht_h12 = elem.S96[i].Ht[0].$.h12;
                    s96.ht_h13 = elem.S96[i].Ht[0].$.h13;
                    s96.ht_h14 = elem.S96[i].Ht[0].$.h14;
                    s96.ht_h15 = elem.S96[i].Ht[0].$.h15;
                    s96.ht_h16 = elem.S96[i].Ht[0].$.h16;
                    s96.ht_h17 = elem.S96[i].Ht[0].$.h17;
                    s96.ht_h18 = elem.S96[i].Ht[0].$.h18;
                    s96.ht_h19 = elem.S96[i].Ht[0].$.h19;
                    s96.ht_h20 = elem.S96[i].Ht[0].$.h20;
                    s96.ht_h21 = elem.S96[i].Ht[0].$.h21;
                    s96.ht_h22 = elem.S96[i].Ht[0].$.h22;
                    s96.ht_h23 = elem.S96[i].Ht[0].$.h23;
                    s96.ht_h24 = elem.S96[i].Ht[0].$.h24;
                    s96.ht_h25 = elem.S96[i].Ht[0].$.h25;
                    s96.ht_thd = elem.S96[i].Ht[0].$.thd;
                    s96.ht_bc = elem.S96[i].Ht[0].$.Bc;
                    await s96Repository.save(s96);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS97(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s97Repository = dataSource.getRepository(T_S97);
    for(const elem of report?.Rtu) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S97).length; i++) {
                try {
                    var s97 = new T_S97();
                    s97.rtu_id = elem.$.Id;
                    s97.fh = parseDate(elem.S97[i].$.Fh);
                    s97.nr = elem.S97[i].$.Nr;
                    s97.ns = elem.S97[i].$.Ns;
                    s97.nt = elem.S97[i].$.Nt;
                    s97.bc = elem.S97[i].$.Bc;
                    await s97Repository.save(s97);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS06(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s06Repository = dataSource.getRepository(T_S06);
    for(const elem of report.Cnc[0].Cnt) {
        if(elem.S06 != undefined) {
            for(let i=0; i<Object.keys(elem.S06).length; i++) {
                try{
                    var s06 = new T_S06();
                    s06.cnt_id = report.Cnc[0].$.Id;
                    s06.cnc_id = elem.$.Id;
                    s06.fh = parseDate(elem.S06[i].$.Fh);
                    s06.ns = elem.S06[i].$.NS;
                    s06.fab = elem.S06[i].$.Fab;
                    s06.mod = elem.S06[i].$.Mod;
					s06.af = elem.S06[i].$.Af;
					s06.te = elem.S06[i].$.Te;
					s06.vf = elem.S06[i].$.Vf;
					s06.vprime = elem.S06[i].$.VPrime;
					s06.pro = elem.S06[i].$.Pro;
					s06.idm = elem.S06[i].$.Idm;
					s06.mac = elem.S06[i].$.Mac;
					s06.tp = elem.S06[i].$.Tp;
					s06.ts = elem.S06[i].$.Ts;
					s06.ip = elem.S06[i].$.Ip;
					s06.is = elem.S06[i].$.Is;
					s06.usag = elem.S06[i].$.Usag;
					s06.uswell = elem.S06[i].$.Uswell;
					s06.per = elem.S06[i].$.Per;
					s06.dctcp = elem.S06[i].$.Dctcp;
					s06.vr = elem.S06[i].$.Vr;
					s06.ut = elem.S06[i].$.Ut;
					s06.usubt = elem.S06[i].$.UsubT;
					s06.usobt = elem.S06[i].$.UsobT;
					s06.ucortet = elem.S06[i].$.UcorteT;
					s06.autmothbill = elem.S06[i].$.AutMothBill;
					s06.scrolldispmode = elem.S06[i].$.ScrollDispMode;
					s06.scrolldisptime = elem.S06[i].$.ScrollDispTime;
                    await s06Repository.save(s06);
                    //console.log('S06 insertado')
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}


async function processS12(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s12Repository = dataSource.getRepository(T_S12);
    const elem = report.Cnc[0];
                try {
                    var s12 = new T_S12();
                    s12.cnc_id = elem.$.Id;
                    s12.fh = parseDate(elem.S12[0].$.Fh);
                    s12.mod = elem.S12[0].$.Mod;
                    s12.af = elem.S12[0].$.Af;
                    s12.te = elem.S12[0].$.Te;
                    s12.vf = elem.S12[0].$.Vf;
                    s12.vfcomm = elem.S12[0].$.VfComm;
                    s12.pro = elem.S12[0].$.Pro;
                    s12.com = elem.S12[0].$.Com;
                    s12.ipcom = elem.S12[0].$.ipCom;
                    s12.portws = elem.S12[0].$.PortWS;
                    s12.ipmask = elem.S12[0].$.ipMask;
                    s12.ipgtw = elem.S12[0].$.ipGtw;
                    s12.ipdhcp = elem.S12[0].$.ipDhcp;
                    s12.macplc = elem.S12[0].$.Macplc;
                    s12.pse = elem.S12[0].$.Pse;
                    s12.priority = elem.S12[0].$.Priority;
                    s12.ipstg = elem.S12[0].$.IPstg;
                    s12.ipntp = elem.S12[0].$.IPNTP;
                    s12.ntpmaxdeviation = elem.S12[0].$.NTPMaxDeviation;
                    s12.ipftp = elem.S12[0].$.IPftp;
                    s12.ftpuserreport = elem.S12[0].$.FTPUserReport;
                    s12.ipftpdcupg = elem.S12[0].$.IPftpDCUpg;
                    s12.userftpdcupg = elem.S12[0].$.UserftpDCUpg;
                    s12.ipftpmeterupg = elem.S12[0].$.IPftpMeterUpg;
                    s12.userftpmeterupg = elem.S12[0].$.UserftpMeterUpg;
                    s12.retryftp = elem.S12[0].$.RetryFtp;
                    s12.timebetwftp = elem.S12[0].$.TimeBetwFtp;
                    s12.timedev = elem.S12[0].$.TimeDev;
                    s12.timedevover = elem.S12[0].$.TimeDevOver;
                    s12.resetmsg = elem.S12[0].$.ResetMsg;
                    s12.nummeters = elem.S12[0].$.NumMeters;
                    s12.timesendreq = elem.S12[0].$.TimeSendReq;
                    s12.timedisconmeter = elem.S12[0].$.TimeDisconMeter;
                    s12.retrydisconmeter = elem.S12[0].$.RetryDisconMeter;
                    s12.timeretryinterval = elem.S12[0].$.TimeRetryInterval;
                    s12.ipftpCycles = elem.S12[0].$.IPftpCycles;
                    s12.userftpcycles = elem.S12[0].$.UserftpCycles;
                    s12.destdircycles = elem.S12[0].$.DestDirCycles;
                    s12.meterregdata = elem.S12[0].$.MeterRegData;
                    s12.timeoutmeterfwu = elem.S12[0].$.TimeOutMeterFwU;
                    s12.valuescheckdelay = elem.S12[0].$.ValuesCheckDelay;
                    s12.maxorderoutdate = elem.S12[0].$.MaxOrderOutdate;
                    s12.timedelayrestart = elem.S12[0].$.TimeDelayRestart;
                    s12.reportformat = elem.S12[0].$.ReportFormat;
                    s12.slave1 = elem.S12[0].$.Slave1;
                    s12.slave2 = elem.S12[0].$.Slave2;
                    s12.slave3 = elem.S12[0].$.Slave3;
                    s12.iploc = elem.S12[0].$.ipLoc;
                    s12.ipmaskloc = elem.S12[0].$.ipMaskLoc;
                    s12.accinactimeout = elem.S12[0].$.AccInacTimeout;
                    s12.accsimulmax = elem.S12[0].$.AccSimulMax;
                    s12.syncmeter = elem.S12[0].$.SyncMeter;
                    s12.plctimeoutrm = elem.S12[0].$.PLCTimeoutRM;
                    s12.plctimeoutf = elem.S12[0].$.PLCTimeoutF;
                    s12.s26content = elem.S12[0].$.S26Content;
                    await s12Repository.save(s12);
                } catch(err) {
                    console.error(err);
                }
            }
    

async function processS14(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s14Repository = dataSource.getRepository(T_S14);
    for(const elem of report.Cnc[0].Cnt) {
        if(elem.S14 != undefined) {
            for(let i=0; i<Object.keys(elem.S14).length; i++) {
                try{
                    var s14 = new T_S14();
                    s14.cnc_id = report.Cnc[0].$.Id;
                    s14.cnt_id = elem.$.Id;					
                    s14.fh = parseDate(elem.S14[i].$.Fh);
                    s14.bc = elem.S14[i].$.Bc;
                    s14.v1 = elem.S14[i].$.V1;
                    s14.v2 = elem.S14[i].$.V2;
					s14.v3 = elem.S14[i].$.V3;
					s14.i1 = elem.S14[i].$.I1;
					s14.i2 = elem.S14[i].$.I2;
					s14.i3 = elem.S14[i].$.I3;
					s14.in = elem.S14[i].$.In;
					s14.simp = elem.S14[i].$.Simp;
					s14.sexp = elem.S14[i].$.Sexp;					
                    await s14Repository.save(s14);
                    //console.log('S14 insertado')
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS17(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const s17Repository = dataSource.getRepository(T_S17);
    for(const elem of report.Cnc) {
        if(elem.S17 != undefined) {
            for(let i=0; i<Object.keys(elem.S17).length; i++) {
                try{
                    var s17 = new T_S17();
                    s17.cnc_id = elem.$.Id;					
                    s17.fh = parseDate(elem.S17[i].$.Fh);
                    s17.et = elem.S17[i].$.Et;
                    s17.c = elem.S17[i].$.C;
                    s17.d1 = elem.S17[i].D1;
					s17.d2 = elem.S17[i].D2;								
                    await s17Repository.save(s17);
                    //console.log('S17 insertado')
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS24(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    //console.log(report.Cnc[0].S24[0].Meter);
    const S24Repository = dataSource.getRepository(T_S24);
    for(const elem of report.Cnc[0].S24[0].Meter) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem).length; i++) {
                try{
                    var S24 = new T_S24();
                    S24.cnc_id = report.Cnc[0].$.Id;					
                    S24.fh = parseDate(report.Cnc[0].S24[0].$.Fh);
                    S24.meter_id = elem.$.MeterId;
                    S24.comstatus = elem.$.ComStatus;
                    S24.date = parseDate(elem.$.Date);
					S24.active = elem.$.Active;										
                    await S24Repository.save(S24);
                    //console.log('S24 insertado')
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processG59(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const G59Repository = dataSource.getRepository(T_G59);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.G59).length; i++) {
                try {
                    var G59 = new T_G59();
                    G59.rtu_id = report.Rtu[0].$.Id;
                    G59.lvs_id = elem.$.Id;
                    G59.lvs_pos = elem.$.Pos;
                    G59.fh = parseDate(elem.G59[i].$.Fh);
                    G59.momCph1 = elem.G59[i].$.MomCph1;
                    G59.momVph1 = elem.G59[i].$.MomVph1;
                    G59.momPimph1 = elem.G59[i].$.MomPimph1;
                    G59.MomPexph1 = elem.G59[i].$.MomPexph1;
                    G59.momQimph1 = elem.G59[i].$.MomQimph1;
                    G59.momQexph1 = elem.G59[i].$.MomQexph1;
                    G59.momPF1 = elem.G59[i].$.MomPF1;
                    G59.momCph2 = elem.G59[i].$.MomCph2;
                    G59.momVph2 = elem.G59[i].$.MomVph2;
                    G59.momPimph2 = elem.G59[i].$.MomPimph2;
                    G59.momPexph2 = elem.G59[i].$.MomPexph2;
                    G59.momQimph2 = elem.G59[i].$.MomQimph2;
                    G59.momQexph2 = elem.G59[i].$.MomQexph2;
                    G59.momPF2 = elem.G59[i].$.MomPF2;
                    G59.momCph3 = elem.G59[i].$.MomCph3;
                    G59.momVph3 = elem.G59[i].$.MomVph3;
                    G59.momPimph3 = elem.G59[i].$.MomPimph3;
                    G59.momPexph3 = elem.G59[i].$.MomPexph3;
                    G59.momQimph3 = elem.G59[i].$.MomQimph3;
                    G59.momQexph3 = elem.G59[i].$.MomQexph3;
                    G59.momPF3 = elem.G59[i].$.MomPF3;
                    G59.momCn = elem.G59[i].$.MomCn;
                    G59.bc = elem.G59[i].$.Bc;
                    await G59Repository.save(G59);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS52(report:any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const S52Repository = dataSource.getRepository(T_S52);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S52).length; i++) {
                try {
                    var S52 = new T_S52();
                    S52.rtu_id = report.Rtu[0].$.Id;
                    S52.lvs_id = elem.$.Id;
                    S52.lvs_pos = elem.$.Pos;
                    S52.lvs_magn = elem.$.Magn;
                    S52.fh = parseDate(elem.S52[i].$.Fh);
                    S52.ai = elem.S52[i].$.AI;
                    S52.ae = elem.S52[i].$.AE;
                    S52.r1 = elem.S52[i].$.R1;
                    S52.r2 = elem.S52[i].$.R2;
                    S52.r3 = elem.S52[i].$.R3;
                    S52.r4 = elem.S52[i].$.R4;
                    S52.bc = elem.S52[i].$.Bc;
                    await S52Repository.save(S52);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS53(report: any, mag: number, reportDate: string, dataSoure: DataSource): Promise<void> {
    const S53Repository = dataSoure.getRepository(T_S53);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S53).length; i++) {
                try {
                    var S53 = new T_S53();
                    S53.rtu_id = report.Rtu[0].$.Id;
                    S53.lvs_id = elem.$.Id;
                    S53.lvs_pos = elem.$.Pos;
                    S53.lvs_magn = elem.$.Magn;
                    S53.fh = parseDate(elem.S53[i].$.Fh);
                    S53.ai1 = elem.S53[i].$.AI1;
                    S53.ai2 = elem.S53[i].$.AI2;
                    S53.ai3 = elem.S53[i].$.AI3;
                    S53.ae1 = elem.S53[i].$.AE1;
                    S53.ae2 = elem.S53[i].$.AE2;
                    S53.ae3 = elem.S53[i].$.AE3;
                    S53.r11 = elem.S53[i].$.R11;
                    S53.r12 = elem.S53[i].$.R12;
                    S53.r13 = elem.S53[i].$.R13;
                    S53.r21 = elem.S53[i].$.R21;
                    S53.r22 = elem.S53[i].$.R22;
                    S53.r23 = elem.S53[i].$.R23;
                    S53.r31 = elem.S53[i].$.R31;
                    S53.r32 = elem.S53[i].$.R32;
                    S53.r33 = elem.S53[i].$.R33;
                    S53.r41 = elem.S53[i].$.R41;
                    S53.r42 = elem.S53[i].$.R42;
                    S53.r43 = elem.S53[i].$.R43;
                    S53.bc = elem.S53[i].$.Bc;
                    await S53Repository.save(S53);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS59(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const S59Repository = dataSource.getRepository(T_S59);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S59).length; i++) {
                try {
                    var S59 = new T_S59();
                    S59.rtu_id = report.Rtu[0].$.Id;
                    S59.lvs_id = elem.$.Id;
                    S59.lvs_pos = elem.$.Pos;
                    S59.fh = parseDate(elem.S59[i].$.Fh);
                    S59.et = elem.S59[i].$.Et;
                    S59.c = elem.S59[i].$.C;
                    await S59Repository.save(S59);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS64(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const S64Repository = dataSource.getRepository(T_S64);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S64).length; i++) {
                try {
                    var S64 = new T_S64();
                    S64.rtu_id = report.Rtu[0].$.Id;
                    S64.lvs_id = elem.$.Id;
                    S64.lvs_pos = elem.$.Pos;
                    S64.fh = parseDate(elem.S64[i].$.Fh);
                    S64.v1 = elem.S64[i].$.V1;
                    S64.v2 = elem.S64[i].$.V2;
                    S64.v3 = elem.S64[i].$.V3;
                    S64.i1 = elem.S64[i].$.I1;
                    S64.i2 = elem.S64[i].$.I2;
                    S64.i3 = elem.S64[i].$.I3;
                    S64.in = elem.S64[i].$.In;
                    S64.simp = elem.S64[i].$.Simp;
                    S64.sexp = elem.S64[i].$.Sexp;
                    S64.bc = elem.S64[i].$.Bc;
                    await S64Repository.save(S64);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS82(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const S82Repository = dataSource.getRepository(T_S82);
    for(const elem of report?.Rtu[0].LVSLine) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S82).length; i++) {
                try {
                    var S82 = new T_S82();
                    S82.rtu_id = report.Rtu[0].$.Id;
                    S82.lvs_id = elem.$.Id;
                    S82.lvs_pos = elem.$.Pos;
                    S82.fh = parseDate(elem.S82[i].$.Fh);

                    S82.i1max_fh = parseDate(elem.S82[i].I1max[0].$.Fh);
                    S82.i1max_v1 = elem.S82[i].I1max[0].$.V1;
                    S82.i1max_v2 = elem.S82[i].I1max[0].$.V2;
                    S82.i1max_v3 = elem.S82[i].I1max[0].$.V3;
                    S82.i1max_i1 = elem.S82[i].I1max[0].$.I1;
                    S82.i1max_i2 = elem.S82[i].I1max[0].$.I2;
                    S82.i1max_i3 = elem.S82[i].I1max[0].$.I3;
                    S82.i1max_in = elem.S82[i].I1max[0].$.In;
                    S82.i1max_simp = elem.S82[i].I1max[0].$.Simp;
                    S82.i1max_sexp = elem.S82[i].I1max[0].$.Sexp;
                    S82.i1max_bc = elem.S82[i].I1max[0].$.Bc;

                    S82.i2max_fh = parseDate(elem.S82[i].I2max[0].$.Fh);
                    S82.i2max_v1 = elem.S82[i].I2max[0].$.V1;
                    S82.i2max_v2 = elem.S82[i].I2max[0].$.V2;
                    S82.i2max_v3 = elem.S82[i].I2max[0].$.V3;
                    S82.i2max_i1 = elem.S82[i].I2max[0].$.I1;
                    S82.i2max_i2 = elem.S82[i].I2max[0].$.I2;
                    S82.i2max_i3 = elem.S82[i].I2max[0].$.I3;
                    S82.i2max_in = elem.S82[i].I2max[0].$.In;
                    S82.i2max_simp = elem.S82[i].I2max[0].$.Simp;
                    S82.i2max_sexp = elem.S82[i].I2max[0].$.Sexp;
                    S82.i2max_bc = elem.S82[i].I2max[0].$.Bc;

                    S82.i3max_fh = parseDate(elem.S82[i].I3max[0].$.Fh);
                    S82.i3max_v1 = elem.S82[i].I3max[0].$.V1;
                    S82.i3max_v2 = elem.S82[i].I3max[0].$.V2;
                    S82.i3max_v3 = elem.S82[i].I3max[0].$.V3;
                    S82.i3max_i1 = elem.S82[i].I3max[0].$.I1;
                    S82.i3max_i2 = elem.S82[i].I3max[0].$.I2;
                    S82.i3max_i3 = elem.S82[i].I3max[0].$.I3;
                    S82.i3max_in = elem.S82[i].I3max[0].$.In;
                    S82.i3max_simp = elem.S82[i].I3max[0].$.Simp;
                    S82.i3max_sexp = elem.S82[i].I3max[0].$.Sexp;
                    S82.i3max_bc = elem.S82[i].I3max[0].$.Bc;

                    S82.inmax_fh = parseDate(elem.S82[i].Inmax[0].$.Fh);
                    S82.inmax_v1 = elem.S82[i].Inmax[0].$.V1;
                    S82.inmax_v2 = elem.S82[i].Inmax[0].$.V2;
                    S82.inmax_v3 = elem.S82[i].Inmax[0].$.V3;
                    S82.inmax_i1 = elem.S82[i].Inmax[0].$.I1;
                    S82.inmax_i2 = elem.S82[i].Inmax[0].$.I2;
                    S82.inmax_i3 = elem.S82[i].Inmax[0].$.I3;
                    S82.inmax_in = elem.S82[i].Inmax[0].$.In;
                    S82.inmax_simp = elem.S82[i].Inmax[0].$.Simp;
                    S82.inmax_sexp = elem.S82[i].Inmax[0].$.Sexp;
                    S82.inmax_bc = elem.S82[i].Inmax[0].$.Bc;

                    S82.v1max_fh = parseDate(elem.S82[i].V1max[0].$.Fh);
                    S82.v1max_v1 = elem.S82[i].V1max[0].$.V1;
                    S82.v1max_v2 = elem.S82[i].V1max[0].$.V2;
                    S82.v1max_v3 = elem.S82[i].V1max[0].$.V3;
                    S82.v1max_i1 = elem.S82[i].V1max[0].$.I1;
                    S82.v1max_i2 = elem.S82[i].V1max[0].$.I2;
                    S82.v1max_i3 = elem.S82[i].V1max[0].$.I3;
                    S82.v1max_in = elem.S82[i].V1max[0].$.In;
                    S82.v1max_simp = elem.S82[i].V1max[0].$.Simp;
                    S82.v1max_sexp = elem.S82[i].V1max[0].$.Sexp;
                    S82.v1max_bc = elem.S82[i].V1max[0].$.Bc;

                    S82.v2max_fh = parseDate(elem.S82[i].V2max[0].$.Fh);
                    S82.v2max_v1 = elem.S82[i].V2max[0].$.V1;
                    S82.v2max_v2 = elem.S82[i].V2max[0].$.V2;
                    S82.v2max_v3 = elem.S82[i].V2max[0].$.V3;
                    S82.v2max_i1 = elem.S82[i].V2max[0].$.I1;
                    S82.v2max_i2 = elem.S82[i].V2max[0].$.I2;
                    S82.v2max_i3 = elem.S82[i].V2max[0].$.I3;
                    S82.v2max_in = elem.S82[i].V2max[0].$.In;
                    S82.v2max_simp = elem.S82[i].V2max[0].$.Simp;
                    S82.v2max_sexp = elem.S82[i].V2max[0].$.Sexp;
                    S82.v2max_bc = elem.S82[i].V2max[0].$.Bc;

                    S82.v3max_fh = parseDate(elem.S82[i].V3max[0].$.Fh);
                    S82.v3max_v1 = elem.S82[i].V3max[0].$.V1;
                    S82.v3max_v2 = elem.S82[i].V3max[0].$.V2;
                    S82.v3max_v3 = elem.S82[i].V3max[0].$.V3;
                    S82.v3max_i1 = elem.S82[i].V3max[0].$.I1;
                    S82.v3max_i2 = elem.S82[i].V3max[0].$.I2;
                    S82.v3max_i3 = elem.S82[i].V3max[0].$.I3;
                    S82.v3max_in = elem.S82[i].V3max[0].$.In;
                    S82.v3max_simp = elem.S82[i].V3max[0].$.Simp;
                    S82.v3max_sexp = elem.S82[i].V3max[0].$.Sexp;
                    S82.v3max_bc = elem.S82[i].V3max[0].$.Bc;

                    await S82Repository.save(S82);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS98(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const S98Repository = dataSource.getRepository(T_S98);
    for(const elem of report?.Rtu) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S98).length; i++) {
                try {
                    var S98 = new T_S98();
                    S98.rtu_id = elem.$.Id;
                    S98.fh = parseDate(elem.S98[i].$.Fh);
                    S98.ift1 = elem.S98[i].$.Ift1;
                    S98.ift2 = elem.S98[i].$.Ift2;
                    S98.ift3 = elem.S98[i].$.Ift3;
                    S98.bc = elem.S98[i].$.Bc;
                    await S98Repository.save(S98);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }

}

async function processS95(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const S95Repository = dataSource.getRepository(T_S95);
    for(const elem of report?.Rtu) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S95).length; i++) {
                try {
                    var S95 = new T_S95();
                    S95.rtu_id = elem.$.Id;
                    S95.fh = parseDate(elem.S95[i].$.Fh);
                    S95.vu = elem.S95[i].$.Vu;
                    S95.pi = elem.S95[i].$.Pi;
                    S95.bc = elem.S95[i].$Bc;
                    await S95Repository.save(S95);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}

async function processS67(report: any, mag: number, reportDate: string, dataSource: DataSource): Promise<void> {
    const S67Repository = dataSource.getRepository(T_S67);
    for(const elem of report?.Rtu) {
        if(elem != undefined) {
            for(let i=0; i<Object.keys(elem.S67).length; i++) {
                try {
                    var S67 = new T_S67();
                    S67.rtu_id = elem.$.Id;
                    S67.fh = parseDate(elem.S67[i].$.Fh);
                    S67.et = elem.S67[i].$.Et;
                    S67.c = elem.S67[i].$.C;
                    S67.d1 = elem.S67[i].D1;
                    await S67Repository.save(S67);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
}