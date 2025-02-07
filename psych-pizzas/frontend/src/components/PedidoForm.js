import React, { useState } from 'react';
import axios from 'axios';

const PedidoForm = () => {
    const [formData, setFormData] = useState({
        nome_cliente: '',
        endereco: '',
        telefone: '',
        bairro: '',
        sabor: '',
        tamanho: '',
        quantidade: 1
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/pedidos', formData)
            .then(response => alert('Pedido registrado com sucesso!'))
            .catch(error => alert('Erro ao registrar pedido'));
    };

    return (
        <div>
            <h2>Registrar Novo Pedido</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome_cliente" value={formData.nome_cliente} onChange={handleChange} placeholder="Nome do Cliente" required />
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Endereço" required />
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" required />
                <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Bairro" required />
                <select name="sabor" value={formData.sabor} onChange={handleChange}>
                    <option value="Margherita">Margherita</option>
                    <option value="Pepperoni">Pepperoni</option>
                    <option value="Calabresa">Calabresa</option>
                    {/* Adicione outros sabores */}
                </select>
                <select name="tamanho" value={formData.tamanho} onChange={handleChange}>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                </select>
                <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} min="1" required />
                <button type="submit">Registrar Pedido</button>
            </form>
        </div>
    );
};

export default PedidoForm;
