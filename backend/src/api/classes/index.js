const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getClassResponse = async (classData) => {
  const { teacherId, name } = classData;
  const teacherData = await knex("teachers")
    .join("users", "teachers.userId", "users.userId")
    .join("subjects", "teachers.subjectId", "subjects.subjectId")
    .where("teachers.teacherId", "=", teacherId)
    .select(
      "users.email",
      "users.firstName",
      "users.lastName",
      "subjects.name"
    );
  const teacher = { teacher: teacherData[0] };
  const classResponse = { ...teacher, name };
  console.log(
    `>>> classResponse in get by class name ${name}: `,
    classResponse
  );
  return classResponse;
};

router.get("/classes", async (req, res, next) => {
  try {
    const classesData = await knex("classes");
    const classes = [];
    for (let classData of classesData) {
      const classResponse = await getClassResponse(classData);
      classes.push(classResponse);
    }

    res.send(classes);
  } catch (error) {
    next(error);
  }
});

router.get("/classes/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const classesData = await knex("classes").where({ name });
    if (classesData.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    const classData = classesData[0];
    const classResponse = await getClassResponse(classData);
    res.send(classResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/classes/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const data = { ...req.body };
    const { teacherEmail } = data;
    const classesData = await knex("classes").where({ name });
    if (classesData.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    const teacherIdData = await knex("teachers")
      .where("email", "=", teacherEmail)
      .select("teacherId");
    const teacherId = teacherIdData[0].teacherId;
    data.teacherId = teacherId;
    await knex("classes").where({ name }).update(data);
    const newClassesData = await knex("classes").where({ name });
    const newClassData = newClassesData[0];
    const newClassResponse = await getClassResponse(newClassData);
    console.log(`>>> class in put by name ${name}: `, newClassResponse);
    res.send(newClassResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/classes", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { name, professorEmail } = data;
    const existingClasses = await knex("classes").where({ name });
    if (existingClasses.length > 0) {
      res.status(400);
      throw new Error(`Class with name ${name} already exists`);
    }
    const newClass = {};
    newClass.name = name;
    newClass.classId = uuid.v4();
    const teacherIdData = await knex("teachers")
      .join("users", "teachers.userId", "users.userId")
      .where("users.email", "=", professorEmail)
      .select("teachers.teacherId");
    const teacherId = teacherIdData[0].teacherId;
    console.log(">>> teacherId in post: ", teacherId);
    newClass.teacherId = teacherId;
    console.log(">>> newClass in post: ", newClass);
    const classes = await knex("classes").insert(newClass);
    res.send(newClass);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
