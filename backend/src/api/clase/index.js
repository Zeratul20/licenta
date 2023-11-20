const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");
const uuid = require("uuid");

router.get("/clase", async (req, res, next) => {
  try {
    const classes = await knex("clase");
    console.log(">>> classes in get: ", classes);
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

router.get("/clase/:classId", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classes = await knex("clase").where({ classId });
    if (classes.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    console.log(`>>> class in get by classId ${classId}: `, classes);
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

router.put("/clase/:classId", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const data = { ...req.body };
    const classes = await knex("clase").where({ classId });
    if (classes.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    await knex("clase")
      .where({ classId })
      .update({ ...data });
    console.log(`>>> class in put by classId ${classId}: `, classes);
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

router.put("/clase/:classId/profesor/:profesorId", async (req, res, next) => {
  try {
    const { classId, profesorId } = req.params;
    const data = { ...req.body };
    const classes = await knex("clase").where({ classId });
    if (classes.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    await knex("clase").where({ classId }).update({ profesorId });
    console.log(`>>> class in put by classId ${classId}: `, classes);
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

router.post("/clase", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const existingClasses = await knex("clase").where({
      name: data.name,
    });
    if (existingClasses.length > 0) {
      res.status(400);
      throw new Error(`Class with name ${data.name} already exists`);
    }
    data.classId = uuid.v4();
    const classes = await knex("clase").insert({ ...data });
    console.log(">>> class in post: ", classes);
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
