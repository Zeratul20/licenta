const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");
const uuid = require("uuid");

router.get("/users", async (req, res, next) => {
  try {
    const users = await knex("users");
    console.log(">>> user in get: ", users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const users = await knex("users").where({ userId });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    console.log(`>>> user in get by userId ${userId}: `, users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.post("/users/signUp", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const existingUsers = await knex("users").where({
      email: data.email,
    });
    if (existingUsers.length > 0) {
      res.status(400);
      throw new Error(`User with email ${data.email} already exists`);
    }
    data.userId = uuid.v4();
    data.role = "user";
    const users = await knex("users").insert({ ...data });
    console.log(">>> user in post: ", users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.post("/users/login/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const { password } = req.body;
    const users = await knex("users").where({ username, password });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    console.log(">>> user in login: ", users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.put("/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = { ...req.body };
    const users = await knex("users")
      .where({ userId })
      .update({ ...data });
    console.log(">>> user in put: ", users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
