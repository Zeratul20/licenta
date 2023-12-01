exports.up = function (knex) {
    try {
      return knex.schema.createTable("absences", function (table) {
        table.string("absenceId").primary();
        table.string("studentId").notNullable();
        table.string("subjectId").notNullable();
        table.date("date").notNullable();
        table.boolean("isMotivated").notNullable();
  
        table.foreign("studentId").references("studentId").inTable("students");
        table.foreign("subjectId").references("subjectId").inTable("subjects");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("absences");
  };
  