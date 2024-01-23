exports.up = function (knex) {
    try {
      return knex.schema.createTable("requests", function (table) {
        table.string("requestId").primary();
        table.string("userId").notNullable();
        table.string("status").notNullable();
        table.string("type").notNullable();
        table.specificType("students", "text ARRAY");
        table.string("response");
  
        table.foreign("userId").references("userId").inTable("users");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("requests");
  };
  