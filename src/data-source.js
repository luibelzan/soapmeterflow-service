"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chulilla = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const S13_1 = require("./entities/S13");
const S15_1 = require("./entities/S15");
const S31_1 = require("./entities/S31");
const S63_1 = require("./entities/S63");
const S65_1 = require("./entities/S65");
const T_S02_TEMP_1 = require("./entities/T_S02_TEMP");
const T_S04_TEMP_1 = require("./entities/T_S04_TEMP");
const T_S09_TEMP_1 = require("./entities/T_S09_TEMP");
const T_S05_TEMP_1 = require("./entities/T_S05_TEMP");
const T_G01_TEMP_1 = require("./entities/T_G01_TEMP");
const T_G02_TEMP_1 = require("./entities/T_G02_TEMP");
const T_G03_TEMP_1 = require("./entities/T_G03_TEMP");
const T_G04_TEMP_1 = require("./entities/T_G04_TEMP");
const T_G05_TEMP_1 = require("./entities/T_G05_TEMP");
const T_G06_TEMP_1 = require("./entities/T_G06_TEMP");
const T_G07_TEMP_1 = require("./entities/T_G07_TEMP");
const T_G56_1 = require("./entities/T_G56");
const T_G57_1 = require("./entities/T_G57");
const T_G58_1 = require("./entities/T_G58");
const T_S93_1 = require("./entities/T_S93");
const T_S94_1 = require("./entities/T_S94");
const T_S96_1 = require("./entities/T_S96");
const T_S97_1 = require("./entities/T_S97");
const T_S06_1 = require("./entities/T_S06");
const T_S14_1 = require("./entities/T_S14");
const T_S17_1 = require("./entities/T_S17");
const T_S24_1 = require("./entities/T_S24");
const T_S12_1 = require("./entities/T_S12");
const T_G59_1 = require("./entities/T_G59");
const T_S52_1 = require("./entities/T_S52");
const T_S53_1 = require("./entities/T_S53");
const T_S59_1 = require("./entities/T_S59");
const T_S64_1 = require("./entities/T_S64");
const T_S82_1 = require("./entities/T_S82");
const T_S98_1 = require("./entities/T_S98");
const T_S95_1 = require("./entities/T_S95");
const T_S67_1 = require("./entities/T_S67");
const T_G53_1 = require("./entities/T_G53");
const T_S62_1 = require("./entities/T_S62");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Vosnos2013*",
    database: "Hidroelcarmen",
    schema: 'core',
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP_1.T_S02_TEMP, S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65, T_S04_TEMP_1.T_S04_TEMP, T_S09_TEMP_1.T_S09_TEMP, T_S05_TEMP_1.T_S05_TEMP, T_G01_TEMP_1.T_G01_TEMP, T_G02_TEMP_1.T_G02_TEMP, T_G03_TEMP_1.T_G03_TEMP, T_G04_TEMP_1.T_G04_TEMP, T_G05_TEMP_1.T_G05_TEMP, T_G06_TEMP_1.T_G06_TEMP, T_G07_TEMP_1.T_G07_TEMP,
        T_G56_1.T_G56, T_G57_1.T_G57, T_G58_1.T_G58, T_S93_1.T_S93, T_S94_1.T_S94, T_S96_1.T_S96, T_S97_1.T_S97, T_S06_1.T_S06, T_S12_1.T_S12, T_S14_1.T_S14, T_S17_1.T_S17, T_S24_1.T_S24, T_G59_1.T_G59, T_S52_1.T_S52, T_S53_1.T_S53, T_S59_1.T_S59, T_S64_1.T_S64, T_S82_1.T_S82, T_S98_1.T_S98, T_S95_1.T_S95, T_G53_1.T_G53, T_S67_1.T_S67, T_S62_1.T_S62
    ],
    migrations: [],
    subscribers: [],
});
exports.Chulilla = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Vosnos2013*",
    database: "Chulilla",
    schema: 'core',
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP_1.T_S02_TEMP, S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65, T_S04_TEMP_1.T_S04_TEMP, T_S09_TEMP_1.T_S09_TEMP, T_S05_TEMP_1.T_S05_TEMP, T_G01_TEMP_1.T_G01_TEMP, T_G02_TEMP_1.T_G02_TEMP, T_G03_TEMP_1.T_G03_TEMP, T_G04_TEMP_1.T_G04_TEMP, T_G05_TEMP_1.T_G05_TEMP, T_G06_TEMP_1.T_G06_TEMP, T_G07_TEMP_1.T_G07_TEMP,
        T_G56_1.T_G56, T_G57_1.T_G57, T_G58_1.T_G58, T_S93_1.T_S93, T_S94_1.T_S94, T_S96_1.T_S96, T_S97_1.T_S97, T_S06_1.T_S06, T_S12_1.T_S12, T_S14_1.T_S14, T_S17_1.T_S17, T_S24_1.T_S24, T_G59_1.T_G59, T_S52_1.T_S52, T_S53_1.T_S53, T_S59_1.T_S59, T_S64_1.T_S64, T_S82_1.T_S82, T_S98_1.T_S98, T_S95_1.T_S95, T_G53_1.T_G53, T_S67_1.T_S67, T_S62_1.T_S62
    ],
    migrations: [],
    subscribers: [],
});
