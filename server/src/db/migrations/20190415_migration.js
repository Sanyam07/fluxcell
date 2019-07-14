exports.up = (knex) =>
  knex.schema
    .createTable('space', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
    })
    .createTable('channel', (table) => {
      table.increments('id').primary();
      table
        .integer('space_id')
        .unsigned()
        .references('id')
        .inTable('space')
        .onDelete('CASCADE');
      table.string('title');
      table.string('topic');
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
    })
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('username');
      table.string('email');
      table
        .integer('space_id')
        .unsigned()
        .references('id')
        .inTable('space')
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
        .inTable('space')
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
    .dropTableIfExists('space')
    .dropTableIfExists('channel')
    .dropTableIfExists('user')
    .dropTableIfExists('message')
    .dropTableIfExists('attachment');
