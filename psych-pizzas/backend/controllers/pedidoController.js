const Pedido = require('../models/pedidoModel');

// Função para calcular o preço com base no tamanho da pizza
const calcularPreco = (tamanho) => {
    const precos = {
        Pequena: 25.00,
        Média: 35.00,
        Grande: 45.00
    };
    return precos[tamanho] || 0; // Retorna o preço de acordo com o tamanho, ou 0 se não encontrado
};

// Criar novo pedido
const criarPedido = async (req, res) => {
    try {
        const { nome, endereco, telefone, bairro, sabor, tamanho, quantidade } = req.body;

        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!nome || !endereco || !telefone || !bairro || !sabor || !tamanho || !quantidade) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }

        // Calcula o preço com base no tamanho e quantidade
        const precoUnitario = calcularPreco(tamanho);
        const precoTotal = precoUnitario * quantidade;

        // Cria o pedido no banco de dados
        const novoPedido = await Pedido.create({
            nome,
            endereco,
            telefone,
            bairro,
            sabor,
            tamanho,
            quantidade,
            preco: precoTotal, // Salva o valor total do pedido
            status: 'Produção' // Status inicial padrão
        });

        res.status(201).json(novoPedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ message: 'Erro ao criar o pedido: ' + error.message });
    }
};

// Obter todos os pedidos
const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll(); // Busca todos os pedidos no banco de dados
        res.json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar pedidos: ' + error.message });
    }
};

// Atualizar o status de um pedido
const atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params; // Recupera o ID do pedido
        const { status } = req.body; // Novo status

        // Verifica se o status foi informado
        if (!status) {
            return res.status(400).json({ message: 'O status é obrigatório!' });
        }

        // Busca o pedido pelo ID
        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado!' });
        }

        // Atualiza o status do pedido
        pedido.status = status;
        await pedido.save(); // Salva as alterações no banco de dados

        res.status(200).json({ message: `Status do pedido ${id} atualizado para ${status}` });
    } catch (error) {
        console.error('Erro ao atualizar o status do pedido:', error);
        res.status(500).json({ message: 'Erro ao atualizar o status do pedido: ' + error.message });
    }
};
const limparPedidos = async (req, res) => {
    try {
        await Pedido.destroy({ where: {} }); // Exclui todos os registros da tabela
        res.status(200).json({ message: 'Todos os pedidos foram excluídos!' });
    } catch (error) {
        console.error('Erro ao limpar pedidos:', error);
        res.status(500).json({ message: 'Erro ao limpar pedidos: ' + error.message });
    }
};

module.exports = {
    criarPedido,
    listarPedidos,
    atualizarStatus,
    limparPedidos
};