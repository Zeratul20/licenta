exports.up = function (knex) {
  try {
    return knex.schema.createTable("clase", function (table) {
      table.string("classId").primary();
      table.string("nume").notNullable();
      table.string("profesorId").notNullable();

      table.foreign("profesorId").references("profesorId").inTable("profesori");
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("clase");
};
