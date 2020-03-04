const db = require('../database/db-config');

module.exports = {
    all,
    add
}

function all() {
    return db('users');
}

function add(user){
    return db('users')
    .insert(user, "id");
}