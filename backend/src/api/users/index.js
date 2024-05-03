const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { checkToken } = require("../helpers/tokens");

const schema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ro"] },
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9_.!*()]{3,30}$")),

  phoneNumber: Joi.string(),
});

router.get("/users", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    }
    const users = await knex("users");
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    }
    const users = await knex("users").where({ userId });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const user = users[0];
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/users/signUp", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error);
    }
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
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    await knex("users").insert({ ...data });
    const usersData = await knex("users").where({ userId: data.userId });
    const user = usersData[0];
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/users/login/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    const users = await knex("users").where({ email });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const user = users[0];
    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      res.status(400);
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    user.token = token;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    }
    const data = { ...req.body };
    const users = await knex("users").where({ userId });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const updatedUser = await knex("users").where({ userId }).update(data);
    const userData = await knex("users").where({ userId });
    const user = userData[0];
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/users/director/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    }
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
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/users/director", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    }
    const users = await knex("users").where("role", "=", "director");
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
        email: "gabriel.stan@gmail.com",
        password: "GabrielStan(2023)",
        phoneNumber: "0761122334",
      },
      {
        firstName: "Cristina",
        lastName: "Radu",
        email: "cristina.radu@gmail.com",
        password: "CristinaRadu(2023)",
        phoneNumber: "0772233445",
      },
      {
        firstName: "Andrei",
        lastName: "Munteanu",
        email: "andrei.munteanu@gmail.com",
        password: "AndreiMunteanu(2023)",
        phoneNumber: "0783344556",
      },
      {
        firstName: "Elena",
        lastName: "Popa",
        email: "elena.popa@gmail.com",
        password: "ElenaPopa(2023)",
        phoneNumber: "0794455667",
      },
      {
        firstName: "Lucian",
        lastName: "Georgescu",
        email: "lucian.georgescu@gmail.com",
        password: "LucianGeorgescu(2023)",
        phoneNumber: "0805566778",
      },

      {
        firstName: "Ana",
        lastName: "Ionescu",
        email: "ana.ionescu@gmail.com",
        password: "AnaIonescu(2023)",
        phoneNumber: "0811122334",
      },
      {
        firstName: "Cătălin",
        lastName: "Dumitru",
        email: "catalin.dumitru@gmail.com",
        password: "CatalinDumitru(2023)",
        phoneNumber: "0822233445",
      },
      {
        firstName: "Andreea",
        lastName: "Popescu",
        email: "andreea.popescu@gmail.com",
        password: "AndreeaPopescu(2023)",
        phoneNumber: "0833344556",
      },
      {
        firstName: "Răzvan",
        lastName: "Matei",
        email: "razvan.matei@gmail.com",
        password: "RazvanMatei(2023)",
        phoneNumber: "0844455667",
      },
      {
        firstName: "Irina",
        lastName: "Negulescu",
        email: "irina.negulescu@gmail.com",
        password: "IrinaNegulescu(2023)",
        phoneNumber: "0855566778",
      },

      {
        firstName: "Cătălina",
        lastName: "Marin",
        email: "catalina.marin@gmail.com",
        password: "CatalinaMarin(2023)",
        phoneNumber: "0861122334",
      },
      {
        firstName: "Adrian",
        lastName: "Stoica",
        email: "adrian.stoica@gmail.com",
        password: "AdrianStoica(2023)",
        phoneNumber: "0872233445",
      },
      {
        firstName: "Andra",
        lastName: "Florea",
        email: "andra.florea@gmail.com",
        password: "AndraFlorea(2023)",
        phoneNumber: "0883344556",
      },
      {
        firstName: "Radu",
        lastName: "Iordache",
        email: "radu.iordache@gmail.com",
        password: "RaduIordache(2023)",
        phoneNumber: "0894455667",
      },
      {
        firstName: "Elena",
        lastName: "Barbu",
        email: "elena.barbu@gmail.com",
        password: "ElenaBarbu(2023)",
        phoneNumber: "0905566778",
      },

      {
        firstName: "Răzvan",
        lastName: "Pop",
        email: "razvan.pop@gmail.com",
        password: "RazvanPop(2023)",
        phoneNumber: "0911122334",
      },
      {
        firstName: "Ana-Maria",
        lastName: "Balan",
        email: "ana-maria.balan@gmail.com",
        password: "AnaMariaBalan(2023)",
        phoneNumber: "0922233445",
      },
      {
        firstName: "Andrei",
        lastName: "Petrica",
        email: "andrei.petrica@gmail.com",
        password: "AndreiPetrica(2023)",
        phoneNumber: "0933344556",
      },
      {
        firstName: "Elena",
        lastName: "Radulescu",
        email: "elena.radulescu@gmail.com",
        password: "ElenaRadulescu(2023)",
        phoneNumber: "0944455667",
      },
      {
        firstName: "Mihai",
        lastName: "Ionescu",
        email: "mihai.ionescu@gmail.com",
        password: "MihaiIonescu(2023)",
        phoneNumber: "0955566778",
      },

      {
        firstName: "Simona",
        lastName: "Georgescu",
        email: "simona.georgescu@gmail.com",
        password: "SimonaGeorgescu(2023)",
        phoneNumber: "0961122334",
      },
      {
        firstName: "Gabriel",
        lastName: "Popescu",
        email: "gabriel.popescu@gmail.com",
        password: "GabrielPopescu(2023)",
        phoneNumber: "0972233445",
      },
      {
        firstName: "Alexandra",
        lastName: "Dumitrascu",
        email: "alexandra.dumitrascu@gmail.com",
        password: "AlexandraDumitrascu(2023)",
        phoneNumber: "0983344556",
      },
      {
        firstName: "Costin",
        lastName: "Vasile",
        email: "costin.vasile@gmail.com",
        password: "CostinVasile(2023)",
        phoneNumber: "0994455667",
      },
      {
        firstName: "Roxana",
        lastName: "Iordache",
        email: "roxana.iordache@gmail.com",
        password: "RoxanaIordache(2023)",
        phoneNumber: "1005566778",
      },
    ];
    for (const user of users) {
      user.userId = uuid.v4();
      user.role = "user";
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      await knex("users").insert(user);
    }
    res.send(users);
  } catch (error) {
    next(error);
  }
});

//Delete all

router.delete("/users", async (req, res, next) => {
  try {
    await knex("users").del();
    res.send("All users deleted");
  } catch (error) {
    next(error);
  }
});

//Delete more than one
router.delete("/users/delete", async (req, res, next) => {
  try {
    const { userIds } = req.body;
    for (const userId of userIds) {
      await knex("users").where({ userId }).del();
    }
    res.send(userIds);
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    await knex("users").where({ userId }).del();
    res.send(userId);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
