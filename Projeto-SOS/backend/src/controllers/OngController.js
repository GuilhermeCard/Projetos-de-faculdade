const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
    async getAllOngs(request, response) {

        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    async create(request, response) {
        const { id, nome, email, senha, telefone, cidade, estado } = request.body;

        // const id = crypto.randomBytes(8).toString('HEX');

        await connection('ongs').insert({ id, nome, email, senha, telefone, cidade, estado })

        return response.json({ id });
    }
};