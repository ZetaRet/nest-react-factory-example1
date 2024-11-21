/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const now = new Date();
  await knex('invoice_services').insert([
    { name: 'working hour type A', price: 30, created_at: now, updated_at: now },
    { name: 'service hour type A', price: 40, created_at: now, updated_at: now },
    { name: 'diagnostics', price: 250, created_at: now, updated_at: now },
    { name: 'change of part', price: 100, created_at: now, updated_at: now },
    { name: 'assemble vehicle', price: 7000, created_at: now, updated_at: now },
    { name: 'repair', price: 50, created_at: now, updated_at: now },
  ]);
};
