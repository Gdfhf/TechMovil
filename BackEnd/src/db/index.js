const {  Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const config = require("./config");

const sequelize = new Sequelize(
    config.databases,
    config.username,
    config.password,
    config
);

sequelize.authenticate().then(()=>{
    console.log("Conexion a la base de datos completada");
}).catch(err=>{
    console.log("Error en la conexion a la base de datos ");
});

let models = initModels(sequelize);
module.exports =  {sequelize, models};