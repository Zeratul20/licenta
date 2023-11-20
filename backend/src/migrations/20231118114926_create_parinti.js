exports.up = function (knex) {
  try {
    return knex.schema.createTable("parinti", function (table) {
      table.string("parinteId").primary();
      table.string("userId").notNullable();
      table.specificType("elevi", "text ARRAY");

      table.foreign("userId").references("userId").inTable("users");
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("parinti");
};
