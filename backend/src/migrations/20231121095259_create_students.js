exports.up = function (knex) {
    try {
      return knex.schema.createTable("students", function (table) {
        table.string("studentId").primary();
        table.string("userId").notNullable();
        table.string("classId").notNullable();
        table.specificType("grades", "integer ARRAY");
  
        table.foreign("userId").references("userId").inTable("users");
        table.foreign("classId").references("classId").inTable("classes");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("students");
  };
  