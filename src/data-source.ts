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

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Lu1smigu3l",
    database: "pruebas",
    synchronize: true,
    logging: false,
    entities: [T_S02_TEMP, S13, S15, S31, S63, S65, T_S04_TEMP, T_S09_TEMP, T_S05_TEMP, T_G01_TEMP],
    migrations: [],
    subscribers: [],
})