exports.up = function (knex) {
  try {
    return knex.schema.createTable("orare", function (table) {
      table.string("orarId").primary();
      table.string("classId").notNullable();
      table.specificType("materii", "text ARRAY");
      table.specificType("ore", "text ARRAY");

      table.foreign("classId").references("classId").inTable("clase");
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("orare");
};
