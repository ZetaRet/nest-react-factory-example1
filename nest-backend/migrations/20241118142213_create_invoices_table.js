/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invoices', function (table) {
    table.increments('id').primary();
    table.string('client').notNullable();
    table.decimal('total').defaultTo(0);
    table.boolean('final').defaultTo(0);
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
