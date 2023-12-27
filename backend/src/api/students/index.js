const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getStudentResponse = async (studentData) => {
  const { studentId, userId, classId, grades } = studentData;
  const student = { studentId, userId, classId };
  student.grades = [];
  for (let grade of grades) {
    student.grades.push(grade);
  }
  console.log(`>>> student in get by id ${studentId}: `, student);
  return student;
};

router.get("/students", async (req, res, next) => {
  try {
    const studentsData = await knex("students");
    const students = [];
    for (let studentData of studentsData) {
      const studentResponse = await getStudentResponse(studentData);
      students.push(studentResponse);
    }
    console.log(">>> students in get: ", students);
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get("/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const studentsData = await knex("students").where({ studentId });

    if (studentsData.length === 0) {
      res.status(400);
      throw new Error("Student not found");
    }
    const studentData = studentsData[0];
    const studentResponse = await getStudentResponse(studentData);
    console.log(`>>> student in get by id ${studentId}: `, studentResponse);
    res.send(studentResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const data = { ...req.body };
    const studentsData = await knex("students").where({ studentId });
    if (studentsData.length === 0) {
      res.status(400);
      throw new Error("Student not found");
    }
    const studentToUpdate = {};
    if (data.className) {
      const classIdData = await knex("classes")
        .where({ name: data.className })
        .select("classId");
      const { classId } = classIdData[0];
      studentToUpdate.classId = classId;
    }
    if (data.grades) studentToUpdate.grades = data.grades;
    await knex("students").where({ studentId }).update(studentToUpdate);
    console.log(
      `>>> Student in put by studentId ${studentId}: `,
      studentToUpdate
    );
    res.send(studentToUpdate);
  } catch (error) {
    next(error);
  }
});

router.post("/students", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { userId, classId } = data;
    const newStudent = {};
    newStudent.studentId = uuid.v4();
    newStudent.grades = [];
    newStudent.userId = userId;
    newStudent.classId = classId;
    const students = await knex("students").insert(newStudent);
    await knex("users").where({ userId }).update({ role: "student" });
    console.log(">>> student in post: ", students);
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.delete("/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const userIdData = await knex("students")
      .where({ studentId })
      .select("userId");
    console.log("userIdData: ", userIdData);
    const { userId } = userIdData[0];
    const students = await knex("students").where({ studentId }).del();
    await knex("users").where({ userId }).update({ role: "user" });
    console.log(`>>> student in delete by studentId ${studentId}: `, students);
    res.send(students);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
