const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

// const getAbsenceResponse = async (absenceData) => {
//   const { studentId, subjectId, date, isMotivated } = absenceData;
//   const absence = { studentId, subjectId, date, isMotivated };
//   console.log(`>>> absence in get: `, absence);
//   return absence;
// };

router.get("/absences", async (req, res, next) => {
  try {
    const absencesData = await knex("absences");
    const absences = [];
    for (let absenceData of absencesData) {
      // const absenceResponse = await getAbsenceResponse(absenceData);
      absences.push(absenceData);
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
    const { date, studentId, subjectId } = req.body;
    const newAbsence = {};
    newAbsence.date = date;
    newAbsence.absenceId = uuid.v4();
    newAbsence.isMotivated = false;
    const studentIdData = await knex("students")
      .join("users", "students.userId", "users.userId")
      .where({ studentId });
    if (studentIdData.length === 0) {
      res.status(400);
      throw new Error("student not found");
    }
    newAbsence.studentId = studentId;
    const subjectIdData = await knex("subjects").where({ subjectId });
    if (subjectIdData.length === 0) {
      res.status(400);
      throw new Error("subject not found");
    }
    newAbsence.subjectId = subjectId;
    await knex("absences").insert(newAbsence);
    res.send(newAbsence);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
