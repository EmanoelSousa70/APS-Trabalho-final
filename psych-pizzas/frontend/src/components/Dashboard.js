import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [bairro, setBairro] = useState('');
    const [sabor, setSabor] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [pedidos, setPedidos] = useState([]);
    const [message, setMessage] = useState('');

    const sabores = [
        'Margarita', 'Calabresa', 'Portuguesa', 'Quatro Queijos', 
        'Frango com Catupiry', 'Pepperoni', 'Veggie'
    ];

    const tamanhos = ['Pequena', 'Média', 'Grande'];
    const precos = { Pequena: 25.00, Média: 35.00, Grande: 45.00 };

    const limparPedidosBackend = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/api/pedidos/limpar');
            setMessage(response.data.message);
            setPedidos([]);
        } catch (error) {
            setMessage('❌ Erro ao limpar pedidos: ' + error.message);
        }
    };

    const handleStatusChange = async (id, novoStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/pedidos/${id}`, {
                status: novoStatus
            });
            const updatedPedidos = pedidos.map(pedido => 
                pedido.id === id ? { ...pedido, status: novoStatus } : pedido
            );
            setPedidos(updatedPedidos);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pedidos');
                setPedidos(response.data);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            }
        };
        fetchPedidos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const novoPedido = {
                nome,
                endereco,
                telefone,
                bairro,
                sabor,
                tamanho,
                quantidade: Number(quantidade),
                preco: precos[tamanho] * Number(quantidade),
                status: 'Produção'
            };

            await axios.post('http://localhost:5000/api/pedidos', novoPedido);
            
            const response = await axios.get('http://localhost:5000/api/pedidos');
            setPedidos(response.data);
            
            setMessage('✅ Pedido criado com sucesso!');
            setNome('');
            setEndereco('');
            setTelefone('');
            setBairro('');
            setSabor('');
            setTamanho('');
            setQuantidade(1);
        } catch (error) {
            setMessage('❌ Erro ao criar pedido: ' + error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>🍕 Painel de Pedidos</h1>

            <button onClick={limparPedidosBackend} className="btn-limpar">
                Limpar Pedidos
            </button>

            <div className="formulario-pedido">
                <h2>🍕 Novo Pedido</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Cliente:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Endereço:</label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Telefone:</label>
                        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Bairro:</label>
                        <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Quantidade:</label>
                        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} min="1" required />
                    </div>

                    <div className="form-group">
                        <label>Sabor:</label>
                        <select value={sabor} onChange={(e) => setSabor(e.target.value)} required>
                            <option value="">Selecione um sabor</option>
                            {sabores.map((s, index) => (
                                <option key={index} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Tamanho:</label>
                        <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} required>
                            <option value="">Selecione um tamanho</option>
                            {tamanhos.map((t, index) => (
                                <option key={index} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn-criar">
                        Criar Pedido
                    </button>
                </form>
                {message && <p className="mensagem-status">{message}</p>}
            </div>

            <div className="tabela-pedidos">
                <h2>🍕 Pedidos Ativos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Sabor</th>
                            <th>Tamanho</th>
                            <th>Preço</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.nome}</td>
                                <td>{pedido.sabor}</td>
                                <td>{pedido.tamanho}</td>
                                <td>R$ {pedido.preco?.toFixed(2)}</td>
                                <td>
                                    <select value={pedido.status} onChange={(e) => handleStatusChange(pedido.id, e.target.value)}>
                                        <option value="Produção">Produção</option>
                                        <option value="A Caminho">A Caminho</option>
                                        <option value="Entregue">Entregue</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
