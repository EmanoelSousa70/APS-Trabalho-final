const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pedido = sequelize.define('Pedido', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sabor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tamanho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0 
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Produção'
    }
});

module.exports = Pedido;

// Sincronizando a tabela com o banco de dados e garantindo a atualização correta
sequelize.sync({ alter: true })
    .then(() => console.log('📦 Banco de dados sincronizado!'))
    .catch(err => console.error('❌ Erro ao sincronizar o banco de dados:', err));

module.exports = Pedido;