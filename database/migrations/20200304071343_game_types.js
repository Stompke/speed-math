
exports.up = function(knex) {
    return knex.schema
        .createTable('game_types', tbl => {
            tbl.increments()

            tbl.string('name', 128)
                .unique()
                .notNullable()
        })
};

exports.down = function(knex) {
    return knex.schema 
        .dropTableIfExists('game_types');
};
