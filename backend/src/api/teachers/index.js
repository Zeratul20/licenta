const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

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
    const teachersData = await knex("teachers");
    const teachers = [];
    for (const teacher of teachersData) {
      const teacherResponse = await getTeacher(teacher);
      teachers.push(teacherResponse);
    }
    console.log(">>> teachers in get: ", teachers);
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.get("/teachers/:teacherId", async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teachersData = await knex("teachers").where({ teacherId });
    if (teachersData.length === 0) {
      res.status(400);
      throw new Error("Profesor not found");
    }
    const teacher = await getTeacher(teachersData[0]);
    console.log(`>>> professor in get by id ${teacherId}: `, teacher);
    res.send(teacher);
  } catch (error) {
    next(error);
  }
});

router.put("/teachers/:teacherId", async (req, res, next) => {
  try {
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
    console.log(`>>> professor in put by teacherId ${teacherId}: `, teachers);
    res.send(dataToUpdate);
  } catch (error) {
    next(error);
  }
});

router.post("/teachers", async (req, res, next) => {
  try {
    const { userId, subjectId } = req.body;
    const teacherId = uuid.v4();
    const data = { teacherId, userId, subjectId };
    if (req.body.classes) data.classes = req.body.classes;
    else data.classes = [];
    console.log(">>> data in post: ", data);
    const teachers = await knex("teachers").insert(data);
    await knex("users").where({ userId }).update({ role: "teacher" });
    console.log(`>>> profesor in post by teacherId ${teacherId}: `, teachers);
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.delete("/teachers/:teacherId", async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    console.log(">>> teacherId: ", teacherId);
    const teachers = await knex("teachers").where({ teacherId });
    console.log(">>> teachers: ", teachers);
    if (teachers.length === 0) {
      res.status(400);
      throw new Error("Professor not found");
    }
    const userIdData = await knex("teachers")
      .where({ teacherId })
      .select("userId");
    const { userId } = userIdData[0];
    console.log(">>>userId: ", userId);
    await knex("teachers").where({ teacherId }).del();
    await knex("users").where({ userId }).update({ role: "user" });
    console.log(
      `>>> professor in delete by teacherId ${teacherId}: `,
      teachers
    );
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.put("/teachers/:teacherId/classes", async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const { classes } = req.body;
    const teachers = await knex("teachers").where({ teacherId });
    if (teachers.length === 0) {
      res.status(400);
      throw new Error("Professor not found");
    }
    await knex("teachers").where({ teacherId }).update({ classes });
    console.log(`>>> professor in put by teacherId ${teacherId}: `, teachers);
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

//TODO: assign teachers to classes [put]

module.exports = router;
