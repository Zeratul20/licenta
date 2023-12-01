exports.up = function (knex) {
    try {
      return knex.schema.createTable("parents", function (table) {
        table.string("parentId").primary();
        table.string("userId").notNullable();
        table.specificType("students", "text ARRAY");
  
        table.foreign("userId").references("userId").inTable("users");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("parents");
  };
  