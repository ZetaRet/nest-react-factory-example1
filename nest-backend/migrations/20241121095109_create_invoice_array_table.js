/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invoice_array', function (table) {
    table.increments('id').primary();
    table.integer('invoices_id').unsigned().notNullable();
    table.integer('service_id').unsigned().notNullable();
    table.decimal('price').notNullable();
    table.integer('count').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
