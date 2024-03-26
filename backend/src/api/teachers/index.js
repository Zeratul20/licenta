const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");
const { checkToken } = require("../helpers/tokens");

const getTeacher = async (teacherData) => {
  const { teacherId, userId, subjectId, classes } = teacherData;
  const teacher = {
    teacherId,
    userId,
    subjectId,
    classes,
  };
  return teacher;
};

router.get("/teachers", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const teachersData = await knex("teachers");
    const teachers = [];
    for (const teacher of teachersData) {
      const teacherResponse = await getTeacher(teacher);
      teachers.push(teacherResponse);
    }
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.get("/teachers/:teacherId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { teacherId } = req.params;
    const teachersData = await knex("teachers").where({ teacherId });
    if (teachersData.length === 0) {
      res.status(400);
      throw new Error("Profesor not found");
    }
    const teacher = await getTeacher(teachersData[0]);
    res.send(teacher);
  } catch (error) {
    next(error);
  }
});

router.put("/teachers/:teacherId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { teacherId } = req.params;
    const data = { ...req.body };
    const teachers = await knex("teachers").where({ teacherId });
    if (teachers.length === 0) {
      res.status(400);
      throw new Error("Professor not found");
    }
    const dataToUpdate = {};
    if (data.subjectId) {
      dataToUpdate.subjectId = subjectId;
    }
    if (data.classes) {
      dataToUpdate.classes = data.classes;
    }
    await knex("teachers").where({ teacherId }).update(dataToUpdate);
    res.send(dataToUpdate);
  } catch (error) {
    next(error);
  }
});

router.post("/teachers", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { userId, subjectId } = req.body;
    const teacherId = uuid.v4();
    const data = { teacherId, userId, subjectId };
    if (req.body.classes) data.classes = req.body.classes;
    else data.classes = [];
    const teachers = await knex("teachers").insert(data);
    await knex("users").where({ userId }).update({ role: "teacher" });
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.delete("/teachers/:teacherId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { teacherId } = req.params;
    const teachers = await knex("teachers").where({ teacherId });
    if (teachers.length === 0) {
      res.status(400);
      throw new Error("Professor not found");
    }
    const userIdData = await knex("teachers")
      .where({ teacherId })
      .select("userId");
    const { userId } = userIdData[0];
    await knex("teachers").where({ teacherId }).del();
    await knex("users").where({ userId }).update({ role: "user" });
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.put("/teachers/:teacherId/classes", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { teacherId } = req.params;
    const { classes } = req.body;
    const teachers = await knex("teachers").where({ teacherId });
    if (teachers.length === 0) {
      res.status(400);
      throw new Error("Professor not found");
    }
    await knex("teachers").where({ teacherId }).update({ classes });
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
