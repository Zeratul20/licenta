exports.up = function (knex) {
    try {
      return knex.schema.createTable("teachers", function (table) {
        table.string("teacherId").primary();
        table.string("userId").notNullable();
        table.string("subjectId").notNullable();
        table.specificType("classes", "text ARRAY");
  
        table.foreign("userId").references("userId").inTable("users");
        table.foreign("subjectId").references("subjectId").inTable("subjects");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("teachers");
  };
  