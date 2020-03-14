
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('game_types').insert([
        {id: 1, name: "Addition 1x1"},
        {id: 2, name: "Addition 1x2"},
        {id: 3, name: "Addition 2x2"},
        {id: 4, name: "Addition 2x3"},
        {id: 5, name: "Addition 3x3"},
        {id: 6, name: "Subtraction 1x1"},
        {id: 7, name: "Subtraction 1x2"},
        {id: 8, name: "Subtraction 2x2"},
        {id: 9, name: "Subtraction 2x3"},
        {id: 10, name: "Subtraction 3x3"},
        {id: 11, name: "Multiplication 1x1"},
        {id: 12, name: "Multiplication 1x2"},
        {id: 13, name: "Multiplication 2x2"},
        {id: 14, name: "Multiplication 2x3"},
        {id: 15, name: "Multiplication 3x3"},
        {id: 16, name: "Division 1x1"},
        {id: 17, name: "Division 1x2"},
        {id: 18, name: "Division 2x2"},
        {id: 19, name: "Division 2x3"},
        {id: 20, name: "Division 3x3"},
      ]);
    // });
};

