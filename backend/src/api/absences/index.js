const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getAbsenceResponse = async (absenceData) => {
  const { studentId, subjectId, date, isMotivated } = absenceData;
  const studentData = await knex("students")
    .join("users", "students.userId", "users.userId")
    .join("classes", "students.classId", "classes.classId")
    .where("students.studentId", "=", studentId)
    .select("users.email", "users.firstName", "users.lastName", "classes.name");
  const student = studentData[0];
  const subjectData = await knex("subjects")
    .where({ subjectId })
    .select("name");
  const { name: subjectName } = subjectData[0];
  const absence = { student, subjectName, date, isMotivated };
  console.log(`>>> absence in get: `, absence);
  return absence;
};

router.get("/absences", async (req, res, next) => {
  try {
    const absencesData = await knex("absences");
    const absences = [];
    for (let absenceData of absencesData) {
      const absenceResponse = await getAbsenceResponse(absenceData);
      absences.push(absenceResponse);
    }
    console.log(">>> absences in get: ", absences);
    res.send(absences);
  } catch (error) {
    next(error);
  }
});

router.get("/absences/:absenceId", async (req, res, next) => {
  try {
    const { absenceId } = req.params;
    const absences = await knex("absences").where({ absenceId });
    if (absences.length === 0) {
      res.status(400);
      throw new Error("absence not found");
    }
    console.log(`>>> absence in get by absenceId ${absenceId}: `, absences);
    res.send(absences);
  } catch (error) {
    next(error);
  }
});

router.put("/absences/:absenceId", async (req, res, next) => {
  try {
    const { absenceId } = req.params;
    const data = { ...req.body };
    const absences = await knex("absences").where({ absenceId });
    if (absences.length === 0) {
      res.status(400);
      throw new Error("absence not found");
    }
    await knex("absences")
      .where({ absenceId })
      .update({ ...data });
    console.log(`>>> absence in put by absenceId ${absenceId}: `, absences);
    res.send(absences);
  } catch (error) {
    next(error);
  }
});

router.post("/absences", async (req, res, next) => {
  try {
    const { date, studentEmail, subjectName } = req.body;
    const newAbsence = {};
    newAbsence.date = date;
    newAbsence.absenceId = uuid.v4();
    newAbsence.isMotivated = false;
    const studentIdData = await knex("students")
      .join("users", "students.userId", "users.userId")
      .where("users.email", "=", studentEmail)
      .select("students.studentId");
    if (studentIdData.length === 0) {
      res.status(400);
      throw new Error("student not found");
    }
    const { studentId } = studentIdData[0];
    newAbsence.studentId = studentId;
    const subjectIdData = await knex("subjects")
      .where({ name: subjectName })
      .select("subjects.subjectId");
    if (subjectIdData.length === 0) {
      res.status(400);
      throw new Error("subject not found");
    }
    const { subjectId } = subjectIdData[0];
    newAbsence.subjectId = subjectId;
    const absences = await knex("absences").insert(newAbsence);
    res.send(newAbsence);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
