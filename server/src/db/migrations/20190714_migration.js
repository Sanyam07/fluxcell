exports.up = (knex) =>
  knex.schema.alterTable('user', (table) => {
    table.unique('email');
    table.unique('username');
  });

exports.down = (knex) =>
  knex.schema.alterTable('user', (table) => {
    table.dropUnique('email');
    table.dropUnique('username');
  });
