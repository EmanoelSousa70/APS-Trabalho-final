const { Sequelize } = require('sequelize');

// aqui criar a conexão com o banco SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


module.exports = sequelize;




