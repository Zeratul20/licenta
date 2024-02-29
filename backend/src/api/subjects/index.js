const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

router.get("/subjects", async (req, res, next) => {
  try {
    const subjects = await knex("subjects");
    res.send(subjects);
  } catch (error) {
    next(error);
  }
});

router.get("/subjects/:subjectId", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const subjects = await knex("subjects").where({ subjectId });
    if (subjects.length === 0) {
      res.status(400);
      throw new Error("subject not found");
    }
    res.send(subjects);
  } catch (error) {
    next(error);
  }
});

router.put("/subjects/:subjectId", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const data = { ...req.body };
    const subjects = await knex("subjects").where({ subjectId });
    if (subjects.length === 0) {
      res.status(400);
      throw new Error("subject not found");
    }
    await knex("subjects")
      .where({ subjectId })
      .update({ ...data });
    res.send(subjects);
  } catch (error) {
    next(error);
  }
});

router.post("/subjects", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const subjectId = uuid.v4();
    const subjects = await knex("subjects").insert({ ...data, subjectId });
    res.send(subjects);
  } catch (error) {
    next(error);
  }
});

router.delete("/subjects/:subjectId", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const subjects = await knex("subjects").where({ subjectId });
    if (subjects.length === 0) {
      res.status(400);
      throw new Error("subject not found");
    }
    await knex("subjects").where({ subjectId }).del();
    res.send(subjects);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
