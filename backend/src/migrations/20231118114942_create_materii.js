exports.up = function (knex) {
  try {
    return knex.schema.createTable("materii", function (table) {
      table.string("materieId").primary();
      table.string("nume").notNullable();
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("materii");
};
