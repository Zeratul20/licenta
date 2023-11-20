exports.up = function (knex) {
  try {
    return knex.schema.createTable("profesori", function (table) {
      table.string("profesorId").primary();
      table.string("userId").notNullable();
      table.string("materieId").notNullable();
      table.specificType("clase", "text ARRAY");

      table.foreign("userId").references("userId").inTable("users");
      table.foreign("materieId").references("materieId").inTable("materii");
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("profesori");
};
