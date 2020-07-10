import React, { useState } from 'react';

import './styles.css';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import sos from '../../assets/sos.png';
import api from '../../services/api';


export default function NewPost() {

    const [titulo, setTitulo] = useState('Adoção');
    const [descricao, setdescricao] = useState('');
    const [imagem, setImagem] = useState({ file: null })
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    function input(e) {
        let arquivo = e.target.files[0]
        setImagem({ file: arquivo })
    }

    async function novoPost(e) {
        e.preventDefault();

        let title = titulo;
        let desc = descricao;
        let file = imagem.file;

        let formdata = new FormData();

        formdata.set('titulo', title);
        formdata.set('descricao', desc);
        formdata.append('imagem', file);

        try {

            await api.post('posts',
                formdata,
                {
                    headers: {
                        Authorization: ongId,
                        'Content-Type': 'multipart/form-data',
                    },
                },

            );
            alert('Post cadastrado com sucesso !');
            history.push('post');

        } catch (err) {
            alert('Não foi possivel cadastrar o post' + err)
        }
    };

    return (
        <div className="new-post">
            <div className="content">
                <section>
                    <img id='sos' src={sos} alt="logo" />
                    <h1>Cadastrar novo post</h1>
                    <p>Descreva de forma detalhada as informações para evitar enganos </p>
                    <Link className="back-link" to="/post">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form encType="multipart/form-data" onSubmit={novoPost}>

                    <label>
                        Selecione o Título da Postagem:
                        <select onChange={(e)=> setTitulo(e.target.value)}>
                            <option value="Adoção" >Adoção</option>
                            <option value="Curiosidades" >Curiosidades</option>
                            <option value="Denúncia" >Denúncia</option>
                            <option value="Doação" >Doação</option>
                            <option value="Outros" >Outros</option>
                        </select>
                    </label>

                    <textarea
                        maxLength="255"
                        placeholder="Descreva em no máximo 255 caracteres"
                        value={descricao}
                        onChange={e => setdescricao(e.target.value)}
                    />

                    <input
                        type="file"
                        name="imagem"
                        onChange={(e) => input(e)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
