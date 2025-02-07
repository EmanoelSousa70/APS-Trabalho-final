import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pizzaBg from '../assets/images/pizza-bg.jpg';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                usuario: username,
                senha: password,
            });

            alert(response.data.message);
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage('Credenciais inválidas. Tente novamente!');
        }
    };

    return (
        <div 
            className="login-container" 
            style={{ backgroundImage: `url(${pizzaBg})` }}
        >
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Usuário:</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha:</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
