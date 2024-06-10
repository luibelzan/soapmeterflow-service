import { DataSource } from "typeorm";
import { T_CUPS } from "../entities/T_CUPS";
import { T_CONCENTRADORES } from "../entities/T_CONCENTRADORES";
import { REQUESTS } from "../entities/REQUESTS";
import axios, { AxiosResponse } from 'axios';


// Definir el tipo de la estructura
type MultiValueMap = Map<string, string[]>;

// Función para agregar valores a una clave
function addValueToMap(map: MultiValueMap, key: string, value: string): void {
    if (!map.has(key)) {
        map.set(key, []);
    }
    map.get(key)!.push(value);
}

export async function getNonRead(dataSource: DataSource , entity: any): Promise<MultiValueMap> {
    const res: MultiValueMap = new Map<string, string[]>();
    const indexRepository = dataSource.getRepository(entity);
    const index = await indexRepository.createQueryBuilder('index').where('index.read = :read', { read: 0 }).getMany();
    for(let i=0; i<index.length; i++) {
        const dateKey = index[i].fh.toISOString();
        addValueToMap(res, dateKey, index[i].cnt_id);
    }
    return res;
}

export async function groupByCT(map: MultiValueMap, dataSource: DataSource): Promise<Map<string, string[]>> {
    let res: Map<string, string[]> = new Map(); 
    const cupsRepository = dataSource.getRepository(T_CUPS);
    for (const [date, cupLists] of map) {
        for (const cups of cupLists) {
            var cup = await cupsRepository.createQueryBuilder('cup').where('cup.id_cnt = :id', { id: cups}).getOne();
            if(cup != undefined) {
                if(!res.has(cup.id_ct)) {
                    res.set(cup.id_ct, []);
                }
                res.get(cup.id_ct)!.push(cup.id_cnt);
            }
        }
    }
    return res;
}

export async function loadRequests(map: MultiValueMap, dataSource: DataSource, entity: any): Promise<void> {
    const groupedByCt = await groupByCT(map, dataSource);
    const requestRepository = dataSource.getRepository(REQUESTS);
    const cncRepository = dataSource.getRepository(T_CONCENTRADORES);
    
    for (const [date, cntList] of map.entries()) {
        let dateGroup: Map<string, string[]> = new Map();

        for (const cnt of cntList) {
            for (const [ctId, cntIds] of groupedByCt.entries()) {
                if (cntIds.includes(cnt)) {
                    if (!dateGroup.has(ctId)) {
                        dateGroup.set(ctId, []);
                    }
                    dateGroup.get(ctId)!.push(cnt);
                }
            }
        }
        // Insertar en la base de datos antes de almacenar en el mapa resultado
        for (const [ctId, cntList] of dateGroup.entries()) {
            var request = new REQUESTS();
            var cnc = await cncRepository.createQueryBuilder('cnc').where('cnc.id_ct = :id', { id: ctId}).getOne();
            request.url = cnc.ws_url;
            request.cnt_id = cntList;
            request.fh_i = formatDate(date);
            request.url = cnc?.ws_url;
            if(entity.name.includes('S05')) {
                request.report_type = 'S05';
            } else if(entity.name.includes('S04')) {
                request.report_type = 'S04';
            } else {
                request.report_type = 'S02';
            }
            request.priority = 1;
            request.source = 'MET';
            await requestRepository.save(request);
        }
    }
    console.log('Requests done')

}

export async function buildXML(dataSource: DataSource, entity: any) {
    const requestsRepository = dataSource.getRepository(REQUESTS);
    if(entity.name.includes('S05')) {
        var type = 'S05';
    } else if(entity.name.includes('S04')) {
        var type = 'S04';
    } else { 
        var type = 'S02';
    }
    const requests = await requestsRepository.createQueryBuilder('req').where('req.report_type = :typ', { typ: type}).getMany();
    for(const req of requests) {
        var url = req.url;
        if(req.cnt_id.length <= 10) {
            var idPet = Math.floor(Math.random() * 900) + 100;
            var xml = `<?xml version="1.0" encoding="utf-8"?>
            <s:Envelope 
            xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body>
            <AsynchRequest
                xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
                xmlns="http://www.asais.fr/ns/Saturne/DC/ws">
            <IdPet>${idPet}</IdPet>
            <IdRpt>${req.report_type}</IdRpt>
            <tfStart>${req.fh_i}</tfStart>>
            <tfEnd></tfEnd>
            <IdMeters>${req.cnt_id}</IdMeters>
            <Priority>${req.priority}</Priority>
            <Source>${req.source}</Source>
            </AsynchRequest>
            </s:Body>
            </s:Envelope>`
            console.log(url);
            sendWebService(xml, url);
            //console.log(xml);
        } else {
            for(let i=0; i<req.cnt_id.length; i+=10) {
                var idPet = Math.floor(Math.random() * 900) + 100;
                var cntAux = req.cnt_id.slice(i, i+10);
                var xml = `<?xml version="1.0" encoding="utf-8"?>
                <s:Envelope 
                xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                <s:Body>
                <AsynchRequest
                    xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns="http://www.asais.fr/ns/Saturne/DC/ws">
                <IdPet>${idPet}</IdPet>
                <IdRpt>${req.report_type}</IdRpt>
                <tfStart>${req.fh_i}</tfStart>>
                <tfEnd></tfEnd>
                <IdMeters>${cntAux}</IdMeters>
                <Priority>${req.priority}</Priority>
                <Source>${req.source}</Source>
                </AsynchRequest>
                </s:Body>
                </s:Envelope>`
                console.log(url);
                //console.log(xml);
                sendWebService(xml, url);
            }
        }
        
    }
}

export async function sendWebService(xml: string, url: string): Promise<string> {
    try {
        const response: AxiosResponse<string> = await axios.post(url, xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            }
        });
        return response.data;
    } catch (err) {
        console.error('Error al enviar el WebService: ', err);
        //throw err; // Vuelve a lanzar el error para que pueda ser manejado por el llamador de esta función
    }
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Ajustar la fecha a la medianoche UTC
    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    
    // Las horas, minutos, segundos y milisegundos en UTC se establecen a cero
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
    const milliseconds = '000';
    
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}W`;
}

