import * as fs from 'fs';
import * as ini from 'ini'; 
import { config } from './config';

const iniContent = ini.stringify(config);

fs.writeFileSync('config.ini', iniContent);

console.log('Archivo config.ini creado con exito');