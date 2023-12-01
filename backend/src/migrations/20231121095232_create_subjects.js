exports.up = function (knex) {
    try {
      return knex.schema.createTable("subjects", function (table) {
        table.string("subjectId").primary();
        table.string("name").notNullable();
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("subjects");
  };
  