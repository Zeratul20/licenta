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

router.get("/users/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const users = await knex("users").where({ email });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    console.log(`>>> user in get by email ${email}: `, users);
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

router.put("/users/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const data = { ...req.body };
    const users = await knex("users").where({ email });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const updatedUser = await knex("users").where({ email }).update(data);
    console.log(">>> user in put: ", updatedUser);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// >>>>> Population purposes >>>>>

router.post("/users/population", async (req, res, next) => {
  try {
    const users = [
      {
        firstName: "Ioana",
        lastName: "Popescu",
        cnp: "1980715123456",
        email: "ioana.popescu@student.com",
        password: "IoanaPopescu(2023)",
        phoneNumber: "0712233445",
      },
      {
        firstName: "Alex",
        lastName: "Ionescu",
        cnp: "2870416123456",
        email: "alex.ionescu@student.com",
        password: "AlexIonescu(2023)",
        phoneNumber: "0723344556",
      },
      {
        firstName: "Andreea",
        lastName: "Dumitrescu",
        cnp: "1961127123456",
        email: "andreea.dumitrescu@student.com",
        password: "AndreeaDumitrescu(2023)",
        phoneNumber: "0734455667",
      },
      {
        firstName: "Ion",
        lastName: "Vasilescu",
        cnp: "2950828123456",
        email: "ion.vasilescu@student.com",
        password: "IonVasilescu(2023)",
        phoneNumber: "0745566778",
      },
      {
        firstName: "Raluca",
        lastName: "Gheorghescu",
        cnp: "1840101123456",
        email: "raluca.gheorghescu@student.com",
        password: "RalucaGheorghescu(2023)",
        phoneNumber: "0756677889",
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
