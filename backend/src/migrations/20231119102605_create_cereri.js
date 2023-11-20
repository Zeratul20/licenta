exports.up = function (knex) {
    try {
      return knex.schema.createTable("cereri", function (table) {
        table.string("cerereId").primary();
        table.string("userId").notNullable();
        table.string("role").notNullable();
        table.string("status").notNullable();
        table.string("response").notNullable();
        table.specificType("elevi", "text ARRAY");
        table.string("classId");

        table.foreign("userId").references("userId").inTable("users");
        table.foreign("classId").references("classId").inTable("clase");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("cereri");
  };
  