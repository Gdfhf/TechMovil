var DataTypes = require("sequelize").DataTypes;
var _productos = require("./productos");
var _proveedores = require("./proveedores");

function initModels(sequelize) {
  var productos = _productos(sequelize, DataTypes);
  var proveedores = _proveedores(sequelize, DataTypes);


  return {
    productos,
    proveedores,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
