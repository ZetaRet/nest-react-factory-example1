/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('vendors').insert([{ name: 'Thunderbolt' }, { name: 'Kron' }]);
};
