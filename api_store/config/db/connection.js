const { Sequelize } = require('sequelize');

// import { Sequelize } from '@sequelize/core';
// import { MsSqlDialect } from '@sequelize/mssql';

const database = process.env.SQL_DATABASE;
const user = process.env.SQL_USER;
const pass = process.env.SQL_PASSWORD;
const host = process.env.SQL_HOST;

console.log(database, user, pass, host)

const dbConnect = new Sequelize(database, user, pass, {
    dialect: 'mssql',
    host,
    dialectModule: require('tedious'),
    logging: false,
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    },
    port: 1434
  });



const dbConnnectonMySql = async () => {
  try {
    await  dbConnect.authenticate();
    console.log('Conexion DB Correcta.');
  } catch (error) {
      console.error('Error de conexion a DB:', error);
      process.exit(1);
  }
}

module.exports = { dbConnect, dbConnnectonMySql }