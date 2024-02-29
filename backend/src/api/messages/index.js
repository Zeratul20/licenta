const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

router.get("/messages", async (req, res, next) => {
  try {
    const messages = await knex("messages");
    res.send(messages);
  } catch (error) {
    next(error);
  }
});

router.get("/messages/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const messages = await knex("messages").where({ messageId });
    if (messages.length === 0) {
      res.status(400);
      throw new Error("message not found");
    }
    res.send(messages[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/messages/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const data = { ...req.body };
    const messages = await knex("messages").where({ messageId });
    if (messages.length === 0) {
      res.status(400);
      throw new Error("message not found");
    }
    await knex("messages")
      .where({ messageId })
      .update({ ...data });
    res.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/messages", async (req, res, next) => {
  try {
    const { userId, title, message, date, time } = req.body;
    const newMessage = {
      messageId: uuid.v4(),
      userId,
      title,
      message,
      date,
      time,
    };
    await knex("messages").insert(newMessage);
    res.send(newMessage);
  } catch (error) {
    next(error);
  }
});

router.delete("/messages/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const messages = await knex("messages").where({ messageId });
    if (messages.length === 0) {
      res.status(400);
      throw new Error("message not found");
    }
    await knex("messages").where({ messageId }).del();
    res.send(messages[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
