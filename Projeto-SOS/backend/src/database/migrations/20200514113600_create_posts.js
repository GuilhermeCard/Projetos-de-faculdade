exports.up = function (knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments();
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.string('imagem').defaultTo(knex.value = 'uploads/null.png');
        table.timestamp('data').notNullable().defaultTo(knex.fn.now());

        table.integer('ong_id').unsigned().notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};