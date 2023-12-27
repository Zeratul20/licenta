const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
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
    const user = users[0];
    console.log(`>>> user in get by userId ${userId}: `, user);
    res.send(user);
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
    await knex("users").insert({ ...data });
    const usersData = await knex("users").where({ userId: data.userId });
    const user = usersData[0];
    console.log(">>> user in post: ", user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/users/login/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    console.log(">>> email: ", email);
    console.log(">>> password: ", password);
    const users = await knex("users").where({ email, password });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const user = users[0];
    console.log(">>> user in login: ", user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = { ...req.body };
    const users = await knex("users").where({ userId });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const updatedUser = await knex("users").where({ userId }).update(data);
    const userData = await knex("users").where({ userId });
    const user = userData[0];
    console.log(">>> user in put: ", user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/users/director/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const users = await knex("users").where({ userId });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const updatedUser = await knex("users")
      .where({ userId })
      .update({ role: "director" });
    const userData = await knex("users").where({ userId });
    const user = userData[0];
    console.log(">>> user in put: ", user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/users/director", async (req, res, next) => {
  try {
    const users = await knex("users").where("role", "=", "director");
    console.log(">>> user in get director: ", users[0]);
    res.send(users[0]);
  } catch (error) {
    next(error);
  }
});

// >>>>> Population purposes >>>>>

router.post("/users/population", async (req, res, next) => {
  try {
    const users = [
      {
        firstName: "Gabriel",
        lastName: "Stan",
        cnp: "1990915123456",
        email: "gabriel.stan@gmail.com",
        password: "GabrielStan(2023)",
        phoneNumber: "0761122334",
      },
      {
        firstName: "Cristina",
        lastName: "Radu",
        cnp: "2880516123456",
        email: "cristina.radu@gmail.com",
        password: "CristinaRadu(2023)",
        phoneNumber: "0772233445",
      },
      {
        firstName: "Andrei",
        lastName: "Munteanu",
        cnp: "1970327123456",
        email: "andrei.munteanu@gmail.com",
        password: "AndreiMunteanu(2023)",
        phoneNumber: "0783344556",
      },
      {
        firstName: "Elena",
        lastName: "Popa",
        cnp: "2960728123456",
        email: "elena.popa@gmail.com",
        password: "ElenaPopa(2023)",
        phoneNumber: "0794455667",
      },
      {
        firstName: "Lucian",
        lastName: "Georgescu",
        cnp: "1850411123456",
        email: "lucian.georgescu@gmail.com",
        password: "LucianGeorgescu(2023)",
        phoneNumber: "0805566778",
      },
    ];
    for (const user of users) {
      user.userId = uuid.v4();
      user.role = "user";
      await knex("users").insert(user);
      console.log(`>>> user in post by userId ${user.userId}: `, user);
    }
    res.send(users);
  } catch (error) {
    console.log(">>>Error: ", error);
    next(error);
  }
});

module.exports = router;
