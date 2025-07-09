"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configLoader_1 = __importDefault(require("../configLoader"));
const utils_1 = require("./utils");
const data_source_1 = require("./data-source");
const PORT = configLoader_1.default.port;
const startHour = configLoader_1.default.startHour;
const startMinute = configLoader_1.default.startMinute;
const finishHour = configLoader_1.default.finishHour;
const finishMinute = configLoader_1.default.finishMinute;
const executionInterval = configLoader_1.default.executionInterval;
const hidroelcarmenDir = configLoader_1.default.hidroelcarmenDir;
const chulillaDir = configLoader_1.default.chulillaDir;
try {
    (0, utils_1.initializeApplication)(data_source_1.AppDataSource, hidroelcarmenDir, startHour, startMinute, finishHour, finishMinute, executionInterval);
    (0, utils_1.initializeApplication)(data_source_1.Chulilla, chulillaDir, startHour, startMinute, finishHour, finishMinute, executionInterval);
}
catch (err) {
    console.error('Error al calcular los indices de lectura: ', err);
}
