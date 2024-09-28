import { Sequelize } from "sequelize"
import { dbNAME, dbPASS, dbUSER, dbHOST } from "../config/config.js"

// * Crea la conexión a la BD
// ! Llenar los datos en el .env

const sequelize = new Sequelize(dbNAME, dbUSER, dbPASS, {
    host: dbHOST,
    dialect: 'postgres',
})

export { sequelize }