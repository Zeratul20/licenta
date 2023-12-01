exports.up = function (knex) {
    try {
      return knex.schema.createTable("requests", function (table) {
        table.string("requestId").primary();
        table.string("userId").notNullable();
        table.string("role").notNullable();
        table.string("status").notNullable();
        table.string("response");
        table.specificType("students", "text ARRAY");
        table.string("classId");
        table.string("type").notNullable();
  
        table.foreign("userId").references("userId").inTable("users");
        table.foreign("classId").references("classId").inTable("classes");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("requests");
  };
  