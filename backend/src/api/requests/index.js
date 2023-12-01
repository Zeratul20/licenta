const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getRequestResponse = async (requestData) => {
  const { requestId, userId, status, role } = requestData;
  const userData = await knex("users")
    .where({ userId })
    .select("email", "firstName", "lastName");
  const user = userData[0];
  
  const studentData = await knex("students")
    .join("users", "students.userId", "users.userId")
    .where("students.studentId", "=", studentId)
    .select("users.email", "users.firstName", "users.lastName");
  const student = studentData[0];
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
  const teacher = teacherData[0];
  const classData = await knex("classes").where("classId", "=", classId);
  const classResponse = classData[0];
  const request = {
    student,
    teacher,
    class: classResponse,
    date,
    status,
  };
  console.log(`>>> request in get by requestId ${requestId}: `, request);
  return request;
};

router.get("/requests", async (req, res, next) => {
  try {
    const requests = await knex("requests");
    console.log(">>> requests in get: ", requests);
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.get("/requests/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const requests = await knex("requests").where({ requestId });
    if (requests.length === 0) {
      res.status(400);
      throw new Error("request not found");
    }
    console.log(`>>> request in get by requestId ${requestId}: `, requests);
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.put("/requests/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const data = { ...req.body };
    const requests = await knex("requests").where({ requestId });
    if (requests.length === 0) {
      res.status(400);
      throw new Error("request not found");
    }
    await knex("requests")
      .where({ requestId })
      .update({ ...data });
    console.log(`>>> request in put by requestId ${requestId}: `, requests);
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.post("/requests", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const requestId = uuid.v4();
    const requests = await knex("requests").insert({ ...data, requestId });
    console.log(`>>> request in post by requestId ${requestId}: `, requests);
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
