exports.up = function (knex) {
  try {
    return knex.schema.createTable("messages", function (table) {
      table.string("messageId").primary();
      table.string("userId").notNullable();
      table.string("title").notNullable();
      table.string("message").notNullable();
      table.string("date").notNullable();
      table.string("time").notNullable();

      table.foreign("userId").references("userId").inTable("users");
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
