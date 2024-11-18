/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('store', function (table) {
    table.increments('id').primary();
    table.integer('parts_id').unsigned().notNullable();
    table.integer('vendor_id').unsigned().notNullable();
    table.decimal('price').defaultTo(0);
    table.integer('count').unsigned().defaultTo(0);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
