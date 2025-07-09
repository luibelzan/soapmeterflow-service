"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNonRead = getNonRead;
exports.groupByCT = groupByCT;
exports.loadRequests = loadRequests;
exports.setDateInterval = setDateInterval;
exports.buildXML = buildXML;
exports.sendWebService = sendWebService;
const T_CUPS_1 = require("../entities/T_CUPS");
const T_CONCENTRADORES_1 = require("../entities/T_CONCENTRADORES");
const REQUESTS_1 = require("../entities/REQUESTS");
const axios_1 = __importDefault(require("axios"));
const REQUESTS2_1 = require("../entities/REQUESTS2");
const configLoader_1 = __importDefault(require("../../configLoader"));
const daysS05 = configLoader_1.default.numberDaysS05;
const daysS02 = configLoader_1.default.numberDaysS02;
const toleranceIndex = configLoader_1.default.toleranceIndex;
// Función para agregar valores a una clave
function addValueToMap(map, key, value) {
    if (!map.has(key)) {
        map.set(key, []);
    }
    map.get(key).push(value);
}
async function getNonRead(dataSource, entity) {
    const res = new Map();
    const indexRepository = dataSource.getRepository(entity);
    const today = new Date();
    let limitDate = new Date(today);
    if (entity.name.includes('S02')) {
        limitDate.setDate(today.getDate() - daysS02);
    }
    else if (entity.name.includes('S05')) {
        limitDate.setDate(today.getDate() - daysS05);
    }
    else {
        if (today.getDate() == 1) {
            limitDate.setMonth(today.getMonth() - 1);
        }
        else {
            limitDate.setMonth(today.getMonth() - 2);
            limitDate.setDate(1);
        }
    }
    const index = await indexRepository.createQueryBuilder('index').where('index.read = :read', { read: 0 }).andWhere('index.fh >= :date', { date: limitDate }).getMany();
    for (let i = 0; i < index.length; i++) {
        const dateKey = index[i].fh.toISOString();
        addValueToMap(res, dateKey, index[i].cnt_id);
    }
    return res;
}
async function groupByCT(map, dataSource) {
    let res = new Map();
    const cupsRepository = dataSource.getRepository(T_CUPS_1.T_CUPS);
    for (const [date, cupLists] of map) {
        for (const cups of cupLists) {
            var cup = await cupsRepository.createQueryBuilder('cup').where('cup.id_cnt = :id', { id: cups }).getOne();
            if (cup != undefined) {
                if (!res.has(cup.id_ct)) {
                    res.set(cup.id_ct, []);
                }
                res.get(cup.id_ct).push(cup.id_cnt);
            }
        }
    }
    return res;
}
async function loadRequests(map, dataSource, entity) {
    const groupedByCt = await groupByCT(map, dataSource);
    const requestRepository = dataSource.getRepository(REQUESTS_1.REQUESTS);
    const cncRepository = dataSource.getRepository(T_CONCENTRADORES_1.T_CONCENTRADORES);
    for (const [date, cntList] of map.entries()) {
        let dateGroup = new Map();
        for (const cnt of cntList) {
            for (const [ctId, cntIds] of groupedByCt.entries()) {
                if (cntIds.includes(cnt)) {
                    if (!dateGroup.has(ctId)) {
                        dateGroup.set(ctId, []);
                    }
                    dateGroup.get(ctId).push(cnt);
                }
            }
        }
        // Insertar en la base de datos antes de almacenar en el mapa resultado
        for (const [ctId, cntList] of dateGroup.entries()) {
            var request = new REQUESTS_1.REQUESTS();
            var cnc = await cncRepository.createQueryBuilder('cnc').where('cnc.id_ct = :id', { id: ctId }).getOne();
            if (cnc != undefined) {
                //request.url = cnc.ws_url;
                request.cnt_id = cntList;
                request.fh_i = new Date(date);
                request.url = cnc === null || cnc === void 0 ? void 0 : cnc.ws_url;
                if (entity.name.includes('S05')) {
                    request.report_type = 'S05';
                }
                else if (entity.name.includes('S04')) {
                    request.report_type = 'S04';
                }
                else {
                    request.report_type = 'S02';
                }
                request.priority = 1;
                request.source = 'MET';
                request.ct_id = ctId;
                await requestRepository.save(request);
            }
        }
    }
    console.log('Requests done');
}
async function setDateInterval(dataSource, entity) {
    const requestRepository = dataSource.getRepository(REQUESTS_1.REQUESTS);
    const request2Repository = dataSource.getRepository(REQUESTS2_1.REQUESTS2);
    const cncRepository = dataSource.getRepository(T_CONCENTRADORES_1.T_CONCENTRADORES);
    const cts = await cncRepository.createQueryBuilder('cnc').select('cnc.id_ct').getMany();
    if (entity.name.includes('S05')) {
        var type = 'S05';
    }
    else if (entity.name.includes('S04')) {
        var type = 'S04';
    }
    else {
        var type = 'S02';
    }
    for (const ct of cts) {
        const requests = await requestRepository.createQueryBuilder('req').where('req.ct_id = :id', { id: ct.id_ct }).andWhere('req.report_type LIKE :typ', { typ: type }).getMany();
        if (requests.length > 0) {
            var allCnts = [];
            var dates = [];
            for (const req of requests) {
                allCnts.push(...req.cnt_id);
                dates.push(req.fh_i);
            }
            var cnts = removeDuplicates(allCnts);
            const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
            const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
            if (type === 'S04' && maxDate.getTime() === minDate.getTime()) {
                const fecha = new Date(minDate);
                fecha.setMonth(minDate.getMonth() + 1);
                const request = new REQUESTS2_1.REQUESTS2();
                request.fh_i = minDate;
                request.fh_f = fecha;
                request.cnt_id = cnts;
                request.number_cnt = cnts.length;
                request.ct_id = ct.id_ct;
                request.url = requests[0].url;
                request.source = 'MET';
                request.priority = 3;
                request.report_type = type;
                await request2Repository.save(request);
            }
            else if (type === 'S02') {
                let startDate = new Date(minDate);
                let endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 10);
                while (startDate < maxDate) {
                    if (endDate > maxDate) {
                        endDate = new Date(maxDate);
                    }
                    const finishDate = new Date(endDate);
                    finishDate.setHours(23, 0, 0, 0);
                    const request = new REQUESTS2_1.REQUESTS2();
                    request.fh_i = new Date(startDate);
                    request.fh_f = new Date(finishDate);
                    request.cnt_id = cnts;
                    request.number_cnt = cnts.length;
                    request.ct_id = ct.id_ct;
                    request.url = requests[0].url;
                    request.source = 'MET';
                    request.priority = 3;
                    request.report_type = type;
                    await request2Repository.save(request);
                    // Avanzar al siguiente rango de 10 días
                    startDate = new Date(endDate);
                    startDate.setDate(startDate.getDate() + 1);
                    endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 10);
                }
            }
            else if (type == 'S05' && minDate.getTime() == maxDate.getTime()) {
                const request = new REQUESTS2_1.REQUESTS2();
                request.fh_i = minDate;
                //request.fh_f = '';
                request.cnt_id = cnts;
                request.number_cnt = cnts.length;
                request.ct_id = ct.id_ct;
                request.url = requests[0].url;
                request.source = 'MET';
                request.priority = 3;
                request.report_type = type;
                await request2Repository.save(request);
            }
            else {
                const request = new REQUESTS2_1.REQUESTS2();
                request.fh_i = minDate;
                request.fh_f = maxDate;
                request.cnt_id = cnts;
                request.number_cnt = cnts.length;
                request.ct_id = ct.id_ct;
                request.url = requests[0].url;
                request.source = 'MET';
                request.priority = 3;
                request.report_type = type;
                await request2Repository.save(request);
            }
        }
    }
}
async function buildXML(dataSource, entity) {
    const requestsRepository = dataSource.getRepository(REQUESTS2_1.REQUESTS2);
    const cupsRepository = dataSource.getRepository(T_CUPS_1.T_CUPS);
    if (entity.name.includes('S05')) {
        var type = 'S05';
    }
    else if (entity.name.includes('S04')) {
        var type = 'S04';
    }
    else {
        var type = 'S02';
    }
    const requests = await requestsRepository.createQueryBuilder('req').where('req.report_type = :typ', { typ: type }).getMany();
    const sentRequests = [];
    for (const req of requests) {
        var ct = req.ct_id;
        var url = req.url;
        const numCnt = (await cupsRepository.createQueryBuilder('cnt').where('cnt.id_ct = :ct', { ct: ct }).getMany()).length;
        if (req.cnt_id.length < numCnt * (toleranceIndex / 100)) {
            if (req.cnt_id.length <= 10) {
                var idPet = generateIdentifier();
                var xml = `<?xml version="1.0" encoding="utf-8"?>
                <s:Envelope 
                xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                <s:Body>
                <AsynchRequest
                    xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns="http://www.asais.fr/ns/Saturne/DC/ws">
                <IdPet>${idPet}</IdPet>
                <IdRpt>${req.report_type}</IdRpt>
                <tfStart>${formatDate(req.fh_i)}</tfStart>
                <tfEnd>${formatDate(req.fh_f)}</tfEnd>
                <IdMeters>${req.cnt_id}</IdMeters>
                <Priority>${req.priority}</Priority>
                <Source>${req.source}</Source>
                </AsynchRequest>
                </s:Body>
                </s:Envelope>`;
                //console.log(url);           
                sendWebService(xml, url, dataSource);
                sentRequests.push(req);
                await sleep(3000);
            }
            else {
                for (let i = 0; i < req.cnt_id.length; i += 10) {
                    var idPet = generateIdentifier();
                    var cntAux = req.cnt_id.slice(i, i + 10);
                    var xml = `<?xml version="1.0" encoding="utf-8"?>
                    <s:Envelope 
                    xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                    <s:Body>
                    <AsynchRequest
                        xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
                        xmlns="http://www.asais.fr/ns/Saturne/DC/ws">
                    <IdPet>${idPet}</IdPet>
                    <IdRpt>${req.report_type}</IdRpt>
                    <tfStart>${formatDate(req.fh_i)}</tfStart>
                    <tfEnd>${formatDate(req.fh_f)}</tfEnd>
                    <IdMeters>${cntAux}</IdMeters>
                    <Priority>${req.priority}</Priority>
                    <Source>${req.source}</Source>
                    </AsynchRequest>
                    </s:Body>
                    </s:Envelope>`;
                    //console.log(url);
                    //console.log(xml);
                    sendWebService(xml, url, dataSource);
                    sentRequests.push(req);
                    await sleep(3000);
                }
            }
        }
    }
    const batchSize = 1000;
    const request1Repository = dataSource.getRepository(REQUESTS_1.REQUESTS);
    for (let i = 0; i < sentRequests.length; i = +batchSize) {
        const batch = sentRequests.slice(i, i + batchSize);
        await requestsRepository.delete(batch);
    }
    await request1Repository.clear();
}
async function sendWebService(xml, url, dataSource) {
    try {
        const response = await axios_1.default.post(url, xml, {
            headers: {
                'Accept-Encoding': 'gzip,deflate',
                'Content-Type': 'text/xml;charset=UTF-8',
                'SOAPAction': 'http://www.asais.fr/ns/Saturne/DC/ws/Request',
                'Connection': 'Keep-Alive',
            }
        });
        console.log('Peticion enviada correctamente ', url, `${dataSource.options.database}`);
        return response.data;
    }
    catch (err) {
        console.error('Error al enviar el WebService: ', err.cause, `${dataSource.options.database}`);
        //throw err; // Vuelve a lanzar el error para que pueda ser manejado por el llamador de esta función
    }
}
function formatDate(date) {
    if (date != undefined) {
        const year = date.getFullYear().toString().padStart(4, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
        return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}W`;
    }
    else {
        return '';
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function generateIdentifier() {
    const randomNumbers = Math.floor(Math.random() * 1000); // Genera un número entre 0 y 999
    const paddedNumbers = String(randomNumbers).padStart(3, '0'); // Asegura que siempre tenga 3 dígitos
    return paddedNumbers;
}
function removeDuplicates(arr) {
    return arr.reduce((uniqueArray, item) => {
        if (!uniqueArray.includes(item)) {
            uniqueArray.push(item);
        }
        return uniqueArray;
    }, []);
}
