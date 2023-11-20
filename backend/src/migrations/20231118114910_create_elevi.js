exports.up = function (knex) {
  try {
    return knex.schema.createTable("elevi", function (table) {
      table.string("elevId").primary();
      table.string("userId").notNullable();
      table.string("classId").notNullable();
      table.specificType("note", "integer ARRAY");

      table.foreign("userId").references("userId").inTable("users");
      table.foreign("classId").references("classId").inTable("clase");
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("elevi");
};
