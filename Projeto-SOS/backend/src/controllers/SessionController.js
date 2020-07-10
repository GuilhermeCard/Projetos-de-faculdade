const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { email, senha } = request.body;

        const ong = await connection('ongs')
        .where('email', email)
        .andWhere('senha', senha)
        .select('id','nome')
        .first();

        if(!ong) {
            return response.status(400).json({ error: 'ONG não encontrada para esse ID'});
        }

        return response.json(ong);
    }
}