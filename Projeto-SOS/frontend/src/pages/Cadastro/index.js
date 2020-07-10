import React, { useState } from 'react';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import sos from '../../assets/sos.png';

export default function Cadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const history = useHistory();

    async function cadastrarUsuario(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            senha,
            telefone,
            cidade,
            estado
        };

        try {
            await api.post('ongs', data);

            alert(`Cadastro realizado com sucesso !`);
            history.push('/');

        } catch (err) {
            alert(`Erro ao realizar o cadastro: ` + err);
        }
    }

    return (
        <div className="cadastro-container">
            <div className="content">
                <section>
                    <img id='sos' src={sos} alt="logo" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma para interagir com pessoas ou ONGs que tem o mesmo propósito que o nosso, ajudar animais !</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o Login
                    </Link>
                </section>
                <form onSubmit={cadastrarUsuario}>
                    <input
                        placeholder="Seu nome ou nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)} />
                    <input
                        placeholder="Telefone"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)} />


                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={estado}
                            onChange={e => setEstado(e.target.value)} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );

}