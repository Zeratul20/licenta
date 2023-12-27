const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getParentResponse = async (parentData) => {
  const { parentId, userId, students } = parentData;
  const parent = {};
  parent.parentId = parentId;
  parent.userId = userId;
  parent.students = [];
  for (let studentId of students) {
    parent.students.push(studentId);
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

router.get("/parents/:parentId", async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const parentsData = await knex("parents").where({parentId});
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const parentData = parentsData[0];
    const parentResponse = await getParentResponse(parentData);
    console.log(`>>> parent in get by id ${parentId}: `, parentResponse);
    res.send(parentResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/parents/:parentId", async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const data = { ...req.body };
    const parentsData = await knex("parents").where({parentId});
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const parentToUpdate = {};
    parentToUpdate.students = [];
    if (data.students) {
      for (let student of data.students) {
        const { studentId } = student;
        const studentData = await knex("students").where({studentId});
        if (studentData.length === 0) {
          res.status(400);
          throw new Error("student not found");
        }
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
    const { userId, students } = data;
    const newParent = {};
    newParent.parentId = uuid.v4();
    newParent.students = [];
    for (let studentId of students) {
      newParent.students.push(studentId);
    }

    const users = await knex("users").where({userId});
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    newParent.userId = userId;
    await knex("parents").insert(newParent);
    console.log(">>> parent in post: ", newParent);
    res.send(newParent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
