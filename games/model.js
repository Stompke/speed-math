const db = require('../database/db-config');

module.exports = {
    games,
    filterGames,
    leaderboard,
    postLeaderboard,
    filterLeaderboard
}

function games() {
    return db('game_types');
}

function filterGames(filter) {
    return db('game_types')
    .where(filter)
    .first()
}

function leaderboard() { 
    return db('leaderboard as l')
    .select('l.id as id','l.user_id','u.username','g.name','l.posted_on','l.score','l.share')
    .join('game_types as g','g.id','l.game_type')
    .join('users as u', 'u.id','l.user_id')
}

function postLeaderboard(addGameScore) {
    console.log(addGameScore)
    return db('leaderboard')
        .insert(addGameScore, "id")
}

function filterLeaderboard(filter) {
    return db('leaderboard as l')
        .where(filter)
        .select('l.id as id','l.user_id','u.username','g.name','l.posted_on','l.score','l.share')
        .join('game_types as g','g.id','l.game_type')
        .join('users as u', 'u.id','l.user_id')
        
}