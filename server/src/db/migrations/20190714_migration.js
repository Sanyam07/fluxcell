exports.up = (knex) =>
  knex.schema
    .createTable('station', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
    })
    .createTable('channel', (table) => {
      table.increments('id').primary();
      table
        .integer('station_id')
        .unsigned()
        .references('id')
        .inTable('station')
        .onDelete('CASCADE');
      table.string('title');
      table.string('topic');
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
    })
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('email').unique();
      table
        .integer('station_id')
        .unsigned()
        .references('id')
        .inTable('station')
        .onDelete('CASCADE');
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
    })
    .createTable('message', (table) => {
      table.increments('id').primary();
      table.string('body');
      table
        .integer('channel_id')
        .unsigned()
        .references('id')
        .inTable('station')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
    })
    .createTable('attachment', (table) => {
      table.increments('id').primary();
      table.string('type');
      table
        .integer('message_id')
        .unsigned()
        .references('id')
        .inTable('message')
        .onDelete('CASCADE');
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
    });

exports.down = (knex) =>
  knex.schema
    .dropTableIfExists('station')
    .dropTableIfExists('channel')
    .dropTableIfExists('user')
    .dropTableIfExists('message')
    .dropTableIfExists('attachment');
