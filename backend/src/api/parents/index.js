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
    res.send(parents);
  } catch (error) {
    next(error);
  }
});

router.get("/parents/:parentId", async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const parentsData = await knex("parents").where({ parentId });
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const parentData = parentsData[0];
    const parentResponse = await getParentResponse(parentData);
    res.send(parentResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/parents/:parentId", async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const data = { ...req.body };
    const parentsData = await knex("parents").where({ parentId });
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const parentToUpdate = {};
    parentToUpdate.students = parentsData[0].students || [];
    if (data.students) {
      for (let studentId of data.students) {
        const studentData = await knex("students").where({ studentId });
        if (studentData.length === 0) {
          res.status(400);
          throw new Error("student not found");
        }
        parentToUpdate.students.push(studentId);
      }
    }
    await knex("parents").where({ parentId }).update(parentToUpdate);
    res.send(parentToUpdate);
  } catch (error) {
    next(error);
  }
});

router.put("/parents/:parentId/students", async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const { students } = { ...req.body };
    const parentsData = await knex("parents").where({ parentId });
    if (parentsData.length === 0) {
      res.status(400);
      throw new Error("parent not found");
    }
    const parentData = parentsData[0];
    const prevStudents = parentData.students;
    for (let studentId of students) {
      const studentsData = await knex("students").where({ studentId });
      if (studentsData.length === 0) {
        res.status(400);
        throw new Error("Student not found");
      }
    }
    const newStudents = [...prevStudents, ...students];
    const parents = await knex("parents")
      .where({ parentId })
      .update({ students: newStudents });
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

    const users = await knex("users").where({ userId });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    newParent.userId = userId;
    await knex("parents").insert(newParent);
    await knex("users").where({ userId }).update({ role: "parent" });
    res.send(newParent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
