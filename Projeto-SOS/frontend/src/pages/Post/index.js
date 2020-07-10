import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import './styles.css';
import api from '../../services/api';
import sos from '../../assets/sos.png';

export default function Post() {
    const [posts, setPosts] = useState([]);
    let [page, setPage] = useState(1);
    const [title, setTitle] = useState('');
    const ongNome = localStorage.getItem('ongNome');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('posts', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setPosts(response.data);

        })
    }, [ongId]);


    async function deletePost(id) {
        try {
            await api.delete(`posts/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            alert('Post deletado com sucesso !');
            window.location.reload();
        } catch (err) {
            alert('Você não tem permissão para deletar esta postagem \n \n' + err);
        }
    };

    async function filter() {

        await api.get(`/posts?title=${title}`, {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            if (response.data < [1]) {
                alert("Não há registros com esse título !");
            }
            else {
                setPosts(response.data)
            }
        });
    }

    function nextPage() {

        setPage(page += 1);
        api.get(`/posts?page=${page}&title=${title}`, {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            if (response.data < [1]) {
                alert("Não há mais registros !");
                setPage(page -= 1);
            }
            else {
                setPosts(response.data)
            }
        });
            window.scrollTo(0, 0);      
    };

    function previousPage() {

        if (page === 1) {
            return alert("Esta é a página inicial !");
        }
        setPage(page -= 1);
        api.get(`/posts?page=${page}&title=${title}`, {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setPosts(response.data);
        });
        window.scrollTo(0, 0); 
    };

    function logOut() {
        localStorage.clear();
        history.push('/')
    };


    return (
        <div className="post-container">
            <header>
                <img id='sos' src={sos} alt="logo" />
                <span>Bem vindo, {ongNome} !</span>
                <a className="back-link" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=5534993072257&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20uma%20den%C3%BAncia%20!%20"
                    target="_blank"> <FaWhatsapp color="#34af23"></FaWhatsapp>Denúncia</a>

                <Link className="button" to="/new">Cadastrar novo post</Link>

                <button type="button" onClick={logOut}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>Posts cadastrados</h1>

            <label>
                Filtrar por Título:
                        <select onChange={(e) => setTitle(e.target.value)}>
                        <option value="" >Sem Filtro</option>
                    <option value="Adoção" >Adoção</option>
                    <option value="Curiosidades" >Curiosidades</option>
                    <option value="Denúncia" >Denúncia</option>
                    <option value="Doação" >Doação</option>
                    <option value="Outros" >Outros</option>
                </select>

                <button onClick={filter}>Filtrar</button>
            </label>

            <ul>
                {posts.map(post =>
                    (

                        <li key={post.id}>

                            <strong>Título</strong>
                            <p>{post.titulo}</p>

                            <strong>Descrição</strong>
                            <p>{post.descricao}</p>

                            <strong>Cidade</strong>
                            <p>{post.cidade}</p>

                            <a href={`http://localhost:3333/${post.imagem}`} rel="noopener noreferrer" target="_blank">
                                <img src={`http://localhost:3333/${post.imagem}`} alt="img" />
                            </a>

                            <button type="button" onClick={() => { deletePost(post.id) }}>
                                <FiTrash2 size={20} color="a8a8b3" />
                            </button>
                        </li>
                    ))}
            </ul>
            <div className="pagination">
                <button type="button" onClick={previousPage}>Anterior</button>
                <button type="button" onClick={nextPage}>Próxima</button>
            </div>
        </div>

    );

}

