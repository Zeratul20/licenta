exports.up = function (knex) {
    try {
      return knex.schema.createTable("users", function (table) {
        table.string("userId").primary();
        table.string("firstName").notNullable();
        table.string("lastName").notNullable();
        table.string("cnp").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("phoneNumber").notNullable();
        table.string("role").notNullable();
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  