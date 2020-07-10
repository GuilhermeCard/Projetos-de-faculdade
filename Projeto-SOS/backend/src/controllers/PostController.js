const connection = require('../database/connection');

module.exports = {
    async getAllPosts(request, response) {
        const { page = 1, title = '' } = request.query;
        const [count] = await connection('posts').count();

        const posts = connection('posts')

        if (title) {
            posts
                .where({ titulo: title })
                .join('ongs', 'ongs.id', '=', 'posts.ong_id')
                .limit(6)
                .offset((page - 1) * 6)
                .select([
                    'posts.*',
                    'ongs.nome',
                    'ongs.email',
                    'ongs.telefone',
                    'ongs.cidade',
                    'ongs.estado'
                ])
                .orderBy('posts.id', "desc");

            response.header('X-Total-Count', count['count(*)'])
        }
        else {
            posts
                .join('ongs', 'ongs.id', '=', 'posts.ong_id')
                .limit(6)
                .offset((page - 1) * 6)
                .select([
                    'posts.*',
                    'ongs.nome',
                    'ongs.email',
                    'ongs.telefone',
                    'ongs.cidade',
                    'ongs.estado'
                ])
                .orderBy('posts.id', "desc");

            response.header('X-Total-Count', count['count(*)'])

        }

        const postagens = await posts

        return response.json(postagens);
    },
    async create(request, response, ) {

        const { titulo, descricao } = request.body;
        const ong_id = request.headers.authorization;

        if (request.file !== undefined) {
            const imagem = request.file.path;
            const [id] = await connection('posts').insert({
                titulo, descricao, imagem, ong_id
            });

            console.log(request.file)
            return response.json({ id });
        }
        else {
            const [id] = await connection('posts').insert({
                titulo, descricao, ong_id
            });

            return response.json({ id });
        }
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const post = await connection('posts').where('id', id).select('ong_id').first();

        if (post.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação não permitida !' });
        }

        await connection('posts').where('id', id).delete();

        return response.status(204).send();
    }
};








