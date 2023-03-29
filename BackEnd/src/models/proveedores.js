const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proveedores', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CodigoProveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "CodigoProveedor_UNIQUE"
    },
    RazonSocial: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Rfc: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Rfc_UNIQUE"
    },
    Direccion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'proveedores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Rfc_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Rfc" },
        ]
      },
      {
        name: "CodigoProveedor_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CodigoProveedor" },
        ]
      },
      {
        name: "Id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
