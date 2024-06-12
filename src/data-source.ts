import "reflect-metadata"
import { DataSource } from "typeorm"
import { S13 } from "./entities/S13"
import { S15 } from "./entities/S15"
import { S31 } from "./entities/S31"
import { S63 } from "./entities/S63"
import { S65 } from "./entities/S65"
import { T_S02_TEMP } from "./entities/T_S02_TEMP"
import { T_S04_TEMP } from "./entities/T_S04_TEMP"
import { T_S09_TEMP } from "./entities/T_S09_TEMP"
import { T_S05_TEMP } from "./entities/T_S05_TEMP"
import { T_G01_TEMP } from "./entities/T_G01_TEMP"
import { T_G02_TEMP } from "./entities/T_G02_TEMP"
import { T_G03_TEMP } from "./entities/T_G03_TEMP"
import { T_G04_TEMP } from "./entities/T_G04_TEMP"
import { T_G05_TEMP } from "./entities/T_G05_TEMP"
import { T_G06_TEMP } from "./entities/T_G06_TEMP"
import { T_G07_TEMP } from "./entities/T_G07_TEMP"
import { T_G56 } from "./entities/T_G56"
import { T_G57 } from "./entities/T_G57"
import { T_G58 } from "./entities/T_G58"
import { T_S93 } from "./entities/T_S93"
import { T_S94 } from "./entities/T_S94"
import { T_S96 } from "./entities/T_S96"
import { T_S97 } from "./entities/T_S97"
import { T_S06 } from "./entities/T_S06"
import { T_S14 } from "./entities/T_S14"
import { T_S17 } from "./entities/T_S17"
import { T_S24 } from "./entities/T_S24"
import { T_S12 } from "./entities/T_S12"
import { T_READING_INDEX_S04 } from "./entities/T_READING_INDEX_S04"
import { T_READING_INDEX_S05 } from "./entities/T_READING_INDEX_S05"
import { T_READING_INDEX_S02 } from "./entities/T_READING_INDEX_S02"
import { T_CUPS } from "./entities/T_CUPS"
import { T_CT } from "./entities/T_CT"
import { REQUESTS } from "./entities/REQUESTS"
import { T_CONCENTRADORES } from "./entities/T_CONCENTRADORES"
import { REQUESTS2 } from "./entities/REQUESTS2"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "pruebas",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP, T_G02_TEMP, T_G03_TEMP, T_G04_TEMP, T_G05_TEMP, T_G06_TEMP, T_G07_TEMP,
        T_G56, T_G57, T_G58, T_S93, T_S94, T_S96, T_S97, T_S06, T_S12, T_S14, T_S17, T_S24, T_READING_INDEX_S04, T_READING_INDEX_S05, T_READING_INDEX_S02
    ],
    migrations: [],
    subscribers: [],
})

export const staClara = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "staclara",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP, T_G02_TEMP, T_G03_TEMP, T_G04_TEMP, T_G05_TEMP, T_G06_TEMP, T_G07_TEMP,
        T_G56, T_G57, T_G58, T_S93, T_S94, T_S96, T_S97, T_S06, T_S12, T_S14, T_S17, T_S24, T_READING_INDEX_S04, T_READING_INDEX_S05, T_READING_INDEX_S02
    ],
    migrations: [],
    subscribers: [],
})

export const dielec = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "dielec",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP, T_G02_TEMP, T_G03_TEMP, T_G04_TEMP, T_G05_TEMP, T_G06_TEMP, T_G07_TEMP,
        T_G56, T_G57, T_G58, T_S93, T_S94, T_S96, T_S97, T_S06, T_S12, T_S14, T_S17, T_S24, T_READING_INDEX_S04, T_READING_INDEX_S05, T_READING_INDEX_S02, T_CUPS, T_CT, REQUESTS, T_CONCENTRADORES
    ],
    migrations: [],
    subscribers: [],
})

export const mercedes = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "mercedes",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP, T_G02_TEMP, T_G03_TEMP, T_G04_TEMP, T_G05_TEMP, T_G06_TEMP, T_G07_TEMP,
        T_G56, T_G57, T_G58, T_S93, T_S94, T_S96, T_S97, T_S06, T_S12, T_S14, T_S17, T_S24, T_READING_INDEX_S04, T_READING_INDEX_S05, T_READING_INDEX_S02
    ],
    migrations: [],
    subscribers: [],
})

export const chera = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "chera",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP, T_G02_TEMP, T_G03_TEMP, T_G04_TEMP, T_G05_TEMP, T_G06_TEMP, T_G07_TEMP,
        T_G56, T_G57, T_G58, T_S93, T_S94, T_S96, T_S97, T_S06, T_S12, T_S14, T_S17, T_S24, T_READING_INDEX_S04, T_READING_INDEX_S05, T_READING_INDEX_S02, T_CUPS, T_CT, REQUESTS, T_CONCENTRADORES
    ],
    migrations: [],
    subscribers: [],
})

export const cela = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "cela",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP, T_G02_TEMP, T_G03_TEMP, T_G04_TEMP, T_G05_TEMP, T_G06_TEMP, T_G07_TEMP,
        T_G56, T_G57, T_G58, T_S93, T_S94, T_S96, T_S97, T_S06, T_S12, T_S14, T_S17, T_S24, T_READING_INDEX_S04, T_READING_INDEX_S05, T_READING_INDEX_S02, T_CUPS, T_CT, REQUESTS, T_CONCENTRADORES
    ],
    migrations: [],
    subscribers: [],
})

export const pastor = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "pastor",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP, T_G02_TEMP, T_G03_TEMP, T_G04_TEMP, T_G05_TEMP, T_G06_TEMP, T_G07_TEMP,
        T_G56, T_G57, T_G58, T_S93, T_S94, T_S96, T_S97, T_S06, T_S12, T_S14, T_S17, T_S24, T_READING_INDEX_S04, T_READING_INDEX_S05, T_READING_INDEX_S02, T_CUPS, T_CT, REQUESTS, T_CONCENTRADORES, REQUESTS2
    ],
    migrations: [],
    subscribers: [],
})