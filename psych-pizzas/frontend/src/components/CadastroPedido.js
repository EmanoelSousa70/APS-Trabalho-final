import React, { useState } from 'react';
import axios from 'axios';

const CadastroPedido = () => {
    const [pedido, setPedido] = useState({
        nome: '',
        endereco: '',
        telefone: '',
        bairro: '',
        sabor: '',
        tamanho: '',
        status: 'Pendente',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPedido({
            ...pedido,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/pedidos', pedido);
            alert('Pedido cadastrado com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar o pedido.');
        }
    };

    return (
        <div>
            <h2>Cadastrar Pedido</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={pedido.nome}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Endereço:</label>
                    <input
                        type="text"
                        name="endereco"
                        value={pedido.endereco}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="telefone"
                        value={pedido.telefone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Bairro:</label>
                    <input
                        type="text"
                        name="bairro"
                        value={pedido.bairro}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Sabor:</label>
                    <input
                        type="text"
                        name="sabor"
                        value={pedido.sabor}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tamanho:</label>
                    <input
                        type="text"
                        name="tamanho"
                        value={pedido.tamanho}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={pedido.status}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Cadastrar Pedido</button>
            </form>
        </div>
    );
};

export default CadastroPedido;