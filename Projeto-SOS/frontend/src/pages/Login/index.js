import React, { useState } from 'react';

import { FiLogIn } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import cachorro from '../../assets/cachorro.svg';

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function logar(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { email,senha });

            localStorage.setItem('ongId', response.data.id);
            localStorage.setItem('ongNome', response.data.nome);
            history.push('/post')

        } catch (err) {
            alert('Dados incorretos! Tente novamente.')
        }

    }

    return (
        <div className="Login-container">
            <section className="form">
                <img id='cachorro' src={cachorro} alt="Cachorro" />
                <form onSubmit={logar}>
                    <h1>Faça seu login</h1>

                    <input
                        placeholder='Digite seu Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <input
                        type="password"
                        placeholder='Digite sua Senha'
                        value={senha}
                        onChange={e => setSenha(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="cadastro"><FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro</Link>
                </form>
            </section>
        </div>
    );

}