const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getTeacher = async (teacherData) => {
  const { userId, subjectId, classes } = teacherData;
  const usersData = await knex("users").where({ userId });
  const user = usersData[0];
  const { email, firstName, lastName } = user;
  const subjectsData = await knex("subjects").where({ subjectId });
  const subject = subjectsData[0];
  const { name: subjectName } = subject;
  const teacher = {
    email,
    firstName,
    lastName,
    subjectName,
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

router.get("/teachers/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    // const teachers = await knex("teachers").where({ teacherId });
    const teachersData = await knex("teachers")
      .join("users", "teachers.userId", "users.userId")
      .where("users.email", "=", email);
    if (teachersData.length === 0) {
      res.status(400);
      throw new Error("Profesor not found");
    }
    const teacher = await getTeacher(teachersData[0]);
    console.log(`>>> professor in get by email ${email}: `, teacher);
    res.send(teacher);
  } catch (error) {
    next(error);
  }
});

router.put("/teachers/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const teachers = await knex("teachers")
      .join("users", "teachers.userId", "users.userId")
      .where("users.email", "=", email);
    if (teachers.length === 0) {
      res.status(400);
      throw new Error("Professor not found");
    }
    const dataToUpdate = {};
    if (data.subjectName) {
      const subjectId = await knex("subjects").where({ subjectName });
      dataToUpdate.subjectId = subjectId;
    }
    if (data.classes) {
      dataToUpdate.classes = data.classes;
    }
    await knex("teachers").where({ teacherId }).update(dataToUpdate);
    console.log(`>>> professor in put by teacherId ${teacherId}: `, teachers);
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.post("/teachers", async (req, res, next) => {
  try {
    const { email, subjectName, classes } = req.body;
    const teacherId = uuid.v4();
    const userResponse = await knex("users").where({ email });
    const subjectResponse = await knex("subjects").where(
      "name",
      "=",
      subjectName
    );
    const user = userResponse[0];
    const subject = subjectResponse[0];
    const { userId } = user;
    const { subjectId } = subject;
    console.log(">>> userId: ", userId);
    console.log(">>> subjectId: ", subjectId);
    const data = { teacherId, userId, subjectId, classes };
    console.log(">>> data in post: ", data);
    const teachers = await knex("teachers").insert(data);
    await knex("users").where({ userId }).update({ role: "teacher" });
    console.log(`>>> profesor in post by teacherId ${teacherId}: `, teachers);
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
