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

      {
        firstName: 'Ana',
        lastName: 'Ionescu',
        cnp: '1980215123456',
        email: 'ana.ionescu@gmail.com',
        password: 'AnaIonescu(2023)',
        phoneNumber: '0811122334'
      },
      {
        firstName: 'Cătălin',
        lastName: 'Dumitru',
        cnp: '2870616123456',
        email: 'catalin.dumitru@gmail.com',
        password: 'CatalinDumitru(2023)',
        phoneNumber: '0822233445'
      },
      {
        firstName: 'Andreea',
        lastName: 'Popescu',
        cnp: '1960827123456',
        email: 'andreea.popescu@gmail.com',
        password: 'AndreeaPopescu(2023)',
        phoneNumber: '0833344556'
      },
      {
        firstName: 'Răzvan',
        lastName: 'Matei',
        cnp: '2950318123456',
        email: 'razvan.matei@gmail.com',
        password: 'RazvanMatei(2023)',
        phoneNumber: '0844455667'
      },
      {
        firstName: 'Irina',
        lastName: 'Negulescu',
        cnp: '1840112123456',
        email: 'irina.negulescu@gmail.com',
        password: 'IrinaNegulescu(2023)',
        phoneNumber: '0855566778'
      },

      {
        firstName: 'Cătălina',
        lastName: 'Marin',
        cnp: '1980305123456',
        email: 'catalina.marin@gmail.com',
        password: 'CatalinaMarin(2023)',
        phoneNumber: '0861122334'
      },
      {
        firstName: 'Adrian',
        lastName: 'Stoica',
        cnp: '2870206123456',
        email: 'adrian.stoica@gmail.com',
        password: 'AdrianStoica(2023)',
        phoneNumber: '0872233445'
      },
      {
        firstName: 'Andra',
        lastName: 'Florea',
        cnp: '1960927123456',
        email: 'andra.florea@gmail.com',
        password: 'AndraFlorea(2023)',
        phoneNumber: '0883344556'
      },
      {
        firstName: 'Radu',
        lastName: 'Iordache',
        cnp: '2950618123456',
        email: 'radu.iordache@gmail.com',
        password: 'RaduIordache(2023)',
        phoneNumber: '0894455667'
      },
      {
        firstName: 'Elena',
        lastName: 'Barbu',
        cnp: '1840312123456',
        email: 'elena.barbu@gmail.com',
        password: 'ElenaBarbu(2023)',
        phoneNumber: '0905566778'
      },

      {
        firstName: 'Răzvan',
        lastName: 'Pop',
        cnp: '1980405123456',
        email: 'razvan.pop@gmail.com',
        password: 'RazvanPop(2023)',
        phoneNumber: '0911122334'
      },
      {
        firstName: 'Ana-Maria',
        lastName: 'Balan',
        cnp: '2870106123456',
        email: 'ana-maria.balan@gmail.com',
        password: 'AnaMariaBalan(2023)',
        phoneNumber: '0922233445'
      },
      {
        firstName: 'Andrei',
        lastName: 'Petrica',
        cnp: '1960917123456',
        email: 'andrei.petrica@gmail.com',
        password: 'AndreiPetrica(2023)',
        phoneNumber: '0933344556'
      },
      {
        firstName: 'Elena',
        lastName: 'Radulescu',
        cnp: '2950518123456',
        email: 'elena.radulescu@gmail.com',
        password: 'ElenaRadulescu(2023)',
        phoneNumber: '0944455667'
      },
      {
        firstName: 'Mihai',
        lastName: 'Ionescu',
        cnp: '1840212123456',
        email: 'mihai.ionescu@gmail.com',
        password: 'MihaiIonescu(2023)',
        phoneNumber: '0955566778'
      },

      {
        firstName: 'Simona',
        lastName: 'Georgescu',
        cnp: '1980605123456',
        email: 'simona.georgescu@gmail.com',
        password: 'SimonaGeorgescu(2023)',
        phoneNumber: '0961122334'
      },
      {
        firstName: 'Gabriel',
        lastName: 'Popescu',
        cnp: '2870306123456',
        email: 'gabriel.popescu@gmail.com',
        password: 'GabrielPopescu(2023)',
        phoneNumber: '0972233445'
      },
      {
        firstName: 'Alexandra',
        lastName: 'Dumitrascu',
        cnp: '1961017123456',
        email: 'alexandra.dumitrascu@gmail.com',
        password: 'AlexandraDumitrascu(2023)',
        phoneNumber: '0983344556'
      },
      {
        firstName: 'Costin',
        lastName: 'Vasile',
        cnp: '2950708123456',
        email: 'costin.vasile@gmail.com',
        password: 'CostinVasile(2023)',
        phoneNumber: '0994455667'
      },
      {
        firstName: 'Roxana',
        lastName: 'Iordache',
        cnp: '1840401123456',
        email: 'roxana.iordache@gmail.com',
        password: 'RoxanaIordache(2023)',
        phoneNumber: '1005566778'
      }

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
      console.log(`>>> user in delete by userId ${userId}: `, userId);
    }
    res.send(userIds);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
