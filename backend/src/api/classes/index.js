const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getClassResponse = async (classData) => {
  const { classId, teacherId, name, subjects } = classData;
  const classResponse = { classId, teacherId, name, subjects };
  console.log(`>>> classResponse in get by id ${classId}: `, classResponse);
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

router.get("/classes/:classId", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classesData = await knex("classes").where({ classId });
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

router.put("/classes/:classId", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const data = { ...req.body };
    const classesData = await knex("classes").where({ classId });
    if (classesData.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    await knex("classes").where({ classId }).update(data);
    const newClassesData = await knex("classes").where({ classId });
    const newClassData = newClassesData[0];
    const newClassResponse = await getClassResponse(newClassData);
    console.log(`>>> class in put by id ${classId}: `, newClassResponse);
    res.send(newClassResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/classes", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { name, teacherId, subjects } = data;
    const existingClasses = await knex("classes").where({ name });
    if (existingClasses.length > 0) {
      res.status(400);
      throw new Error(`Class with name ${name} already exists`);
    }
    const newClass = {};
    newClass.name = name;
    newClass.classId = uuid.v4();
    newClass.teacherId = teacherId;
    newClass.subjects = subjects;
    console.log(">>> newClass in post: ", newClass);
    await knex("classes").insert(newClass);
    res.send(newClass);
  } catch (error) {
    next(error);
  }
});

router.delete("/classes/:classId", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classes = await knex("classes").where({ classId });
    if (classes.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    await knex("classes").where({ classId }).del();
    console.log(`>>> class in delete by classId ${classId}: `, classes);
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
