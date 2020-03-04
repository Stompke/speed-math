
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments()

            tbl.string('email', 128)
                .index()
                .notNullable()
                .unique()

            tbl.string('username', 128)
                .notNullable()
                .unique()
                
            tbl.string('password', 128)
                .notNullable()


        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users');
};
