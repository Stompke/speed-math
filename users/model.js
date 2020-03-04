const db = require('../database/db-config');

module.exports = {
    all,
    add,
    findBy
}

function all() {
    return db('users');
}

function add(user){
    return db('users')
    .insert(user, "id");
}

function findBy(filter){
    return db('users')
        .where(filter)
}