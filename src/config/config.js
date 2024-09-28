import { config } from "dotenv"
// Configuraciones del dotenv, para usar los datos del archivo dotenv en el proyecto
config()

export const PORT = process.env.PORT
export const dbUSER = process.env.dbUSER
export const dbPASS = process.env.dbPASS
export const dbNAME = process.env.dbNAME
export const dbHOST = process.env.dbHOST