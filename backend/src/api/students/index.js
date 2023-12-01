const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getStudentResponse = async (studentData) => {
  const { userId, classId, grades } = studentData;
  const studentInfoData = await knex("users")
    .where({ userId })
    .select("email", "firstName", "lastName");
  const classNameData = await knex("classes").where({ classId }).select("name");
  const { email, firstName, lastName } = studentInfoData[0];
  const { name: className } = classNameData[0];
  const student = { email, firstName, lastName, className, grades };
  console.log(`>>> student in get by studentId ${userId}: `, student);
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

router.get("/students/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const studentsData = await knex("students")
      .join("users", "students.userId", "users.userId")
      .where("users.email", "=", email);

    if (studentsData.length === 0) {
      res.status(400);
      throw new Error("Student not found");
    }
    const studentData = studentsData[0];
    const studentResponse = await getStudentResponse(studentData);
    console.log(
      `>>> student in get by email ${email}: `,
      studentResponse
    );
    res.send(studentResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/students/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const data = { ...req.body };
    const studentsData = await knex("students")
      .join("users", "students.userId", "users.userId")
      .where("users.email", "=", email);
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
    console.log(`>>> Student in put by studentId ${studentId}: `, students);
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.post("/students", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { email, className } = data;
    const newStudent = {};
    newStudent.studentId = uuid.v4();
    newStudent.grades = [];
    const userIdData = await knex("users").where({ email }).select("userId");
    const { userId } = userIdData[0];
    const classIdData = await knex("classes")
      .where({ name: className })
      .select("classId");
    const { classId } = classIdData[0];
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

module.exports = router;
