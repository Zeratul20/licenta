exports.up = function (knex) {
    try {
      return knex.schema.createTable("classes", function (table) {
        table.string("classId").primary();
        table.string("name").notNullable();
        table.string("teacherId").notNullable();
        table.specificType("subjects", "text ARRAY");
  
        table.foreign("teacherId").references("teacherId").inTable("teachers");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("classes");
  };
  