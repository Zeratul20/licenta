const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");
const { checkToken } = require("../helpers/tokens");

const getClassResponse = async (classData) => {
  const { classId, teacherId, name, subjects } = classData;
  const classResponse = { classId, teacherId, name, subjects };
  return classResponse;
};

router.get("/classes", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
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

router.get("/classes/nrOfStudents", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const classesData = await knex("classes");
    const studentsData = await knex("students");
    const students = [];
    const nrOfStudents = [];
    classesData.forEach((classData) => {
      const { classId } = classData;
      const students = studentsData.filter(
        (studentData) => studentData.classId === classId
      );
      nrOfStudents.push({ classId, value: students.length });
    });
    res.send(nrOfStudents);
  } catch (error) {
    next(error);
  }
});

router.get("/classes/:classId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
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
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { classId } = req.params;
    const classesData = await knex("classes").where({ classId });
    if (classesData.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    const teachersData = await knex("teachers");
    const teachers = [];
    for (const teacherData of teachersData) {
      const { classes, teacherId } = teacherData;
      if (classes.includes(classId)) {
        teachers.push(teacherId);
      }
    }
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

// router.get("/classes/:classId/nrOfStudents", async (req, res, next) => {
//   try {
//     const { classId } = req.params;
//     const classesData = await knex("classes").where({ classId });
//     if (classesData.length === 0) {
//       res.status(400);
//       throw new Error("Class not found");
//     }
//     const studentsData = await knex("students");
//     const students = [];
//     for (const studentData of studentsData) {
//       if (studentData.classId === classId) students.push(studentData.studentId);
//     }
//     res.send({ value: students.length });
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/classes/:classId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
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
      if (
        classesTeachers.length > 0 &&
        classesTeachers[0].classId !== classId
      ) {
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
      console.log(">>>>> teacherData: ", teacherData);
      console.log(">>>>> newTeacherData: ", newTeacherData);
      if (teacherData.subjectId !== newTeacherData.subjectId) {
        console.log(">>>>> teacherData different subjects: ", teacherData);
        if (!newTeacherData.classes.includes(classId)) {
          res.status(400);
          res.send({ message: "Profesorul nu preda la aceasta clasa" });
          throw new Error("Profesorul nu preda la aceasta clasa");
        }
      } else {
        console.log(">>>>> teacherData same subjects: ", teacherData);
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

        console.log(">>>>> classesTeacher: ", classesTeacher);

        const newClassesTeacher = classesTeacher.filter(
          (teacherClassId) => teacherClassId !== classId
        );

        console.log(">>>>> newClassesTeacher: ", newClassesTeacher);

        classesNewTeacher.push(classId);
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
    res.send(newClassResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/classes", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
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
    await knex("classes").insert(newClass);
    await knex("teachers").where({ teacherId }).update({ classes });
    await knex("schedules").insert({
      classId: newClass.classId,
      scheduleId: uuid.v4(),
      subjects: [],
    });
    res.send(newClass);
  } catch (error) {
    next(error);
  }
});

router.delete("/classes/:classId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { classId } = req.params;
    const classes = await knex("classes").where({ classId });
    if (classes.length === 0) {
      res.status(400);
      throw new Error("Class not found");
    }
    await knex("classes").where({ classId }).del();
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
