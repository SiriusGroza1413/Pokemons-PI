const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
    //si no se agrega id, sequelize lo hace por defecto
        name: {
            type: DataTypes.STRING
        }    
    })
}