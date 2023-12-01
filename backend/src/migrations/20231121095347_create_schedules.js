exports.up = function (knex) {
    try {
      return knex.schema.createTable("schedules", function (table) {
        table.string("scheduleId").primary();
        table.string("classId").notNullable();
        table.specificType("subjects", "text ARRAY");
        table.specificType("hours", "text ARRAY");
  
        table.foreign("classId").references("classId").inTable("classes");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("schedules");
  };
  