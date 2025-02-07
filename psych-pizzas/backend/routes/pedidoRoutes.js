// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rota POST corrigida para incluir todos os campos necessários
router.post('/', pedidoController.criarPedido);

// Rota GET para listar pedidos
router.get('/', pedidoController.listarPedidos);

// Rota PUT para atualizar status
router.put('/:id', pedidoController.atualizarStatus);

//  rota para limpar pedidos
router.delete('/limpar', pedidoController.limparPedidos);

module.exports = router;