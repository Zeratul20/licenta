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

router.get("/classes/:classId/teachers", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classesData = await knex("classes").where({ classId });
    if (classesData.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    const teachersData = await knex("teachers");
    const teachers = [];
    console.log(">>>TeachersData: ", teachersData);
    for (const teacherData of teachersData) {
      const { classes, teacherId } = teacherData;
      if (classes.includes(classId)) teachers.push(teacherId);
    }
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

router.get("/classes/:classId/nrOfStudents", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classesData = await knex("classes").where({ classId });
    if (classesData.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    const studentsData = await knex("students");
    const students = [];
    for (const studentData of studentsData) {
      if (studentData.classId === classId) students.push(studentData.studentId);
    }
    res.send(students.length);
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
    const classData = classesData[0];
    const { teacherId } = classData;
    const newTeacherId = data.teacherId;
    if (newTeacherId) {
      const classesTeachers = await knex("classes").where({
        teacherId: newTeacherId,
      });
      if (classesTeachers.length > 0) {
        res.status(400);
        res.send({
          message: `Profesorul este deja diriginte la clasa ${classesTeachers[0].name}`,
        });
        throw new Error("Profesorul este deja diriginte la o clasa");
      }
      const teachersData = await knex("teachers").where({ teacherId });
      const newTeachersData = await knex("teachers").where({
        teacherId: newTeacherId,
      });
      if (newTeachersData.length === 0) {
        res.status(400);
        res.send({ message: "Profesorul nu exista" });
        throw new Error("Profesorul nu exista");
      }
      const teacherData = teachersData[0];
      const newTeacherData = newTeachersData[0];
      if (teacherData.subjectId !== newTeacherData.subjectId) {
        if (!newTeacherData.classes.includes(classId)) {
          res.status(400);
          res.send({ message: "Profesorul nu preda la aceasta clasa" });
          throw new Error("Profesorul nu preda la aceasta clasa");
        }
      } else {
        console.log(
          ">>> teachers in classes put with teacehrID: ",
          (
            await knex("teachers").where({
              teacherId,
            })
          )[0]
        );
        const { classes: classesTeacher } = (
          await knex("teachers").where({
            teacherId,
          })
        )[0];
        const { classes: classesNewTeacher } = (
          await knex("teachers").where({
            teacherId: newTeacherId,
          })
        )[0];
        console.log(">>> classesTeacher: ", classesTeacher);
        console.log(">>> classesNewTeacher: ", classesNewTeacher);
        const newClassesTeacher = classesTeacher.filter(
          (classId) => classId !== classId
        );
        console.log(">>> newClassesTeacher: ", newClassesTeacher);
        classesNewTeacher.push(classId);
        console.log(">>> newClassesNewTeacher: ", newClassesNewTeacher);
        await knex("teachers").where({ teacherId }).update({
          classes: newClassesTeacher,
        });
        await knex("teachers").where({ teacherId: newTeacherId }).update({
          classes: classesNewTeacher,
        });
      }
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
      res.send({ message: "Clasa cu numele ${name} deja exista" });
      throw new Error(`Clasa cu numele ${name} deja exista`);
    }
    const newClass = {};
    newClass.name = name;
    newClass.classId = uuid.v4();
    newClass.teacherId = teacherId;
    newClass.subjects = subjects;
    const classesTeacher = await knex("classes").where({ teacherId });
    if (classesTeacher.length > 0) {
      res.status(400);
      res.send({ message: "Profesorul este deja diriginte la o clasa" });
      throw new Error("Profesorul este deja diriginte la o clasa");
    }
    const teachersData = await knex("teachers").where({ teacherId });
    if (teachersData.length === 0) {
      res.status(400);
      res.send({ message: "Profesorul nu exista" });
      throw new Error("Profesorul nu exista");
    }
    const teacherData = teachersData[0];
    const classes = teacherData.classes || [];
    classes.push(newClass.classId);
    console.log(">>> newClass in post: ", newClass);
    await knex("classes").insert(newClass);
    await knex("teachers").where({ teacherId }).update({ classes });
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
