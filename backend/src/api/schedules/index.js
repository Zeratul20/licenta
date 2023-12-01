const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

const getScheduleResponse = async (scheduleData) => {
  const { scheduleId, classId, subjects, hours } = scheduleData;
  const classData = await knex("classes")
    .where("classes.classId", "=", classId)
    .select("classes.name");
  const { name: className } = classData[0];
  const scheduleResponse = {};
  scheduleResponse.className = className;
  scheduleResponse.scheduleId = scheduleId;
  const schedule = [];
  for (let index = 0; index < subjects.length; index++) {
    const subjectId = subjects[index];
    const subjectData = await knex("subjects")
      .where("subjects.subjectId", "=", subjectId)
      .select("subjects.name");
    const { name: subjectName } = subjectData[0];
    const hour = hours[index];
    const teachersClassesData = await knex("teachers")
      .join("users", "teachers.userId", "users.userId")
      .where({ subjectId })
      .where("classes", "@>", `{${classId}}`)
      .select("users.firstName", "users.lastName");
    const { firstName, lastName } = teachersClassesData[0];
    const teacherName = `${firstName} ${lastName}`;
    const scheduleItem = { subjectName, hour, teacherName };
    schedule.push(scheduleItem);
  }

  scheduleResponse.schedule = schedule;
  return scheduleResponse;
};

router.get("/schedules", async (req, res, next) => {
  try {
    const schedulesData = await knex("schedules");
    const schedules = [];
    for (let scheduleData of schedulesData) {
      const scheduleResponse = await getScheduleResponse(scheduleData);
      schedules.push(scheduleResponse);
    }
    console.log(">>> schedules in get: ", schedules);
    res.send(schedules);
  } catch (error) {
    next(error);
  }
});

router.get("/schedules/:className", async (req, res, next) => {
  try {
    const { className } = req.params;
    const schedulesData = await knex("schedules")
      .join("classes", "schedules.classId", "classes.classId")
      .where("classes.name", "=", className);
    if (schedulesData.length === 0) {
      res.status(400);
      throw new Error("schedule not found");
    }
    const scheduleData = schedulesData[0];
    const scheduleResponse = await getScheduleResponse(scheduleData);
    console.log(
      `>>> schedule in get by className ${className}: `,
      scheduleResponse
    );
    res.send(schedules);
  } catch (error) {
    next(error);
  }
});

router.put("/schedules/:scheduleId", async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const data = { ...req.body };
    const schedules = await knex("schedules").where({ scheduleId });
    if (schedules.length === 0) {
      res.status(400);
      throw new Error("schedule not found");
    }
    await knex("schedules")
      .where({ scheduleId })
      .update({ ...data });
    console.log(`>>> schedule in put by scheduleId ${scheduleId}: `, schedules);
    res.send(schedules);
  } catch (error) {
    next(error);
  }
});

router.post("/schedules", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { className, subjects, hours } = data;
    const newSchedule = {};
    newSchedule.scheduleId = uuid.v4();
    const classIdData = await knex("classes")
      .where({ name: className })
      .select("classId");
    const { classId } = classIdData[0];
    newSchedule.classId = classId;

    for (let subject of subjects) {
      const subjectIdData = await knex("subjects")
        .where({ name: subject })
        .select("subjectId");
      const { subjectId } = subjectIdData[0];
      subjects.push(subjectId);
    }
    newSchedule.subjects = subjects;
    newSchedule.hours = hours;

    const schedules = await knex("schedules").insert(newSchedule);
    res.send(newSchedule);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
