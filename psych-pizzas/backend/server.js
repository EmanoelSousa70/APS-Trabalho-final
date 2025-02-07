const express = require('express');
const cors = require('cors');
const pedidoRoutes = require('./routes/pedidoRoutes');
const loginRoutes = require('./routes/loginRoutes');
const sequelize = require('./config/db');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'  
}));

app.use(express.json());

// Rotas
app.use('/api/pedidos', pedidoRoutes);
app.use('/api', loginRoutes);


const PORT = 5000;
sequelize.sync({ alter: true }) // Atualiza a tabela conforme o modelo
    .then(() => {
        console.log('✅ Banco de dados sincronizado e atualizado!');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Erro ao sincronizar o banco de dados:', err);
    });