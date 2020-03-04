
exports.up = function(knex) {
    return knex.schema
        .createTable('leaderboard', tbl => {
            tbl.increments()

             //foreign key
             tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('RESTRICT')
                .onUpdate("CASCADE")

             //foreign key
             tbl.integer('game_type')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('game_types')
                .onDelete('RESTRICT')
                .onUpdate("CASCADE")

             tbl.datetime('posted_on')
                .notNullable()

            tbl.integer('score')
                .notNullable()
            
            tbl.boolean('share')
                .defaultTo(false)
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('leaderboard')
};  
