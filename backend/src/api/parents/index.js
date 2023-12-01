const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getParentResponse = async (parentData) => {
  const { userId, students } = parentData;
  const parentInfoData = await knex("users")
    .where({ userId })
    .select("email", "firstName", "lastName");
  const { email, firstName, lastName } = parentInfoData[0];
  const parent = {};
  parent.email = email;
  parent.firstName = firstName;
  parent.lastName = lastName;
  parent.students = [];
  for (let studentId of students) {
    const studentData = await knex("students")
      .join("users", "students.userId", "users.userId")
      .where("students.userId", "=", studentId)
      .select("users.email", "users.firstName", "users.lastName");
    const student = studentData[0];
    parent.students.push(student);
  }
  console.log(`>>> parent in get by parentId ${userId}: `, parent);
  return parent;
};

router.get("/parents", async (req, res, next) => {
  try {
    const parentsData = await knex("parents");
    const parents = [];
    for (let parentData of parentsData) {
      const parentResponse = await getParentResponse(parentData);
      parents.push(parentResponse);
    }
    console.log(">>> parents in get: ", parents);
    res.send(parents);
  } catch (error) {
    next(error);
  }
});

router.get("/parents/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const parentsData = await knex("parents")
      .join("users", "parents.userId", "users.userId")
      .where("users.email", "=", email);
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const parentData = parentsData[0];
    const parentResponse = await getParentResponse(parentData);
    console.log(`>>> parent in get by email ${email}: `, parentResponse);
    res.send(parentResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/parents/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const data = { ...req.body };
    const parentsData = await knex("parents")
      .join("users", "parents.userId", "users.userId")
      .where("users.email", "=", email);
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const parentToUpdate = {};
    parentToUpdate.students = [];
    if (data.students) {
      for (let student of data.students) {
        const { stuedntEmail } = student;
        const studentData = await knex("students")
          .join("users", "students.userId", "users.userId")
          .where("users.email", "=", stuedntEmail)
          .select("students.studentId");
        if (studentData.length === 0) {
          res.status(400);
          throw new Error("student not found");
        }
        const { studentId } = studentData[0];
        parentToUpdate.students.push(studentId);
      }
    }
    await knex("parents")
      .join("users", "parents.userId", "users.userId")
      .where("users.email", "=", email)
      .update(parentToUpdate);
    console.log(`>>> parent in put by email ${email}: `, parentToUpdate);
    res.send(parents);
  } catch (error) {
    next(error);
  }
});

router.put("/parents/:email/student/:studentEmail", async (req, res, next) => {
  try {
    const { email, studentEmail } = req.params;
    const data = { ...req.body };
    const parentsData = await knex("parents")
      .join("users", "parents.userId", "users.userId")
      .where("users.email", "=", email);
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const studentsData = await knex("students")
      .join("users", "students.userId", "users.userId")
      .where("users.email", "=", studentEmail);
    if (studentsData.length === 0) {
      res.status(400);
      throw new Error("Student not found");
    }
    const { studentId } = studentsData[0];
    const parent = getParentResponse(parentsData[0]);
    const { students } = parent;
    students.push(studentId);
    await knex("parents")
      .join("users", "parents.userId", "users.userId")
      .where("users.email", "=", email)
      .update({ students });
    console.log(
      `>>> parent in put elev by email ${email}, studentEmail ${studentEmail}: `,
      parents
    );
    res.send(parents);
  } catch (error) {
    next(error);
  }
});

router.post("/parents", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { email } = data;
    const newParent = {};
    newParent.parentId = uuid.v4();
    newParent.students = [];
    const users = await knex("users").where({ email }).select("userId");
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    const { userId } = users[0];
    newParent.userId = userId;
    const parents = await knex("parents").insert(newParent);
    console.log(">>> parent in post: ", parents);
    res.send(parents);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
