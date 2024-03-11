/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("absences", function (table) {
    table.dropForeign("studentId");
    table
      .foreign("studentId")
      .references("studentId")
      .inTable("students")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("absences", function (table) {
    return;
  });
};
