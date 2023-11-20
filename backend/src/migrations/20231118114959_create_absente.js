exports.up = function (knex) {
  try {
    return knex.schema.createTable("absente", function (table) {
      table.string("absentaId").primary();
      table.string("elevId").notNullable();
      table.string("materieId").notNullable();
      table.date("data").notNullable();

      table.foreign("elevId").references("elevId").inTable("elevi");
      table.foreign("materieId").references("materieId").inTable("materii");
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("absente");
};
