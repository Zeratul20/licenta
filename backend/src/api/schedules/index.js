const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");
const { checkToken } = require("../helpers/tokens");

const getScheduleForStudentResponse = async (studentId) => {
  const scheduleData = await knex("schedules")
    .join("students", "schedules.classId", "students.classId")
    .where("students.studentId", "=", studentId);
  const { scheduleId, classId, subjects } = scheduleData[0];
  const classData = await knex("classes")
    .where("classes.classId", "=", classId)
    .select("classes.name");
  const { name: className } = classData[0];
  const scheduleResponse = {};
  scheduleResponse.className = className;
  scheduleResponse.scheduleId = scheduleId;
  const parsedSubjects = [];

  for (let index = 0; index < subjects.length; index++) {
    const subject = subjects[index];
    const subjectList = subject.split(" ");
    const subjectId = subjectList[0];
    const hour = subjectList[1];
    const day = subjectList[2];

    const teacherIdData = await knex("teachers")
      .where({ subjectId })
      .select("teacherId", "classes");

    let subjTeacherId = null;

    for (let teacher of teacherIdData) {
      if (teacher.classes.includes(classId)) {
        subjTeacherId = teacher.teacherId;
      }
    }

    const parsedSubject = {
      subjectId,
      teacherId: subjTeacherId,
      hour,
      day,
    };
    parsedSubjects.push(parsedSubject);
  }

  scheduleResponse.subjects = parsedSubjects;
  return scheduleResponse;
};

const getScheduleForClassResponse = async (classId) => {
  const scheduleData = await knex("schedules").where({ classId });
  const { scheduleId, subjects } = scheduleData[0];
  const scheduleResponse = {};
  scheduleResponse.scheduleId = scheduleId;
  scheduleResponse.classId = classId;
  const parsedSubjects = [];
  if (subjects === null) return scheduleResponse;
  for (let index = 0; index < subjects.length; index++) {
    const subject = subjects[index];
    const subjectList = subject.split(" ");
    const subjectId = subjectList[0];
    const hour = subjectList[1];
    const day = subjectList[2];

    const teacherIdData = await knex("teachers")
      .where({ subjectId })
      .select("teacherId", "classes");

    let teacherId = null;

    for (let teacher of teacherIdData) {
      if (teacher.classes.includes(classId)) {
        teacherId = teacher.teacherId;
      }
    }

    const parsedSubject = {
      subjectId,
      teacherId,
      hour,
      day,
    };
    parsedSubjects.push(parsedSubject);
  }

  scheduleResponse.subjects = parsedSubjects;
  return scheduleResponse;
};

const getScheduleForTeacherResponse = async (teacherId) => {
  const teacherData = await knex("teachers")
    .where({ teacherId })
    .select("classes", "subjectId");
  const { classes, subjectId } = teacherData[0];
  const schedulesData = await knex("schedules")
    .whereIn("classId", classes)
    .select("subjects", "classId");
  const teacherSchedule = [];
  scheduleLabel: for (let scheduleData of schedulesData) {
    const { subjects, classId } = scheduleData;
    for (let subject of subjects) {
      const subjectList = subject.split(" ");
      const currentSubjectId = subjectList[0];
      if (subjectId === currentSubjectId) {
        const hour = subjectList[1];
        const day = subjectList[2];
        const teacherHour = {
          classId,
          hour,
          day,
        };
        teacherSchedule.push(teacherHour);
      }
    }
  }
  return teacherSchedule;
};

router.get("/schedules", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const schedulesData = await knex("schedules");
    const schedules = [];
    for (let scheduleData of schedulesData) {
      const scheduleResponse = await getScheduleForClassResponse(
        scheduleData.classId
      );
      schedules.push(scheduleResponse);
    }
    res.send(schedules);
  } catch (error) {
    next(error);
  }
});

router.get("/schedules/students/:studentId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { studentId } = req.params;
    const schedulesData = await knex("schedules")
      .join("students", "schedules.classId", "students.classId")
      .where("students.studentId", "=", studentId);
    if (schedulesData.length === 0) {
      res.status(400);
      throw new Error("schedule not found");
    }
    const scheduleData = schedulesData[0];
    const scheduleResponse = await getScheduleForStudentResponse(scheduleData);

    res.send(schedules);
  } catch (error) {
    next(error);
  }
});

router.get("/schedules/teachers/:teacherId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { teacherId } = req.params;
    const teacherResponse = await getScheduleForTeacherResponse(teacherId);
    res.send(teacherResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/schedules/:scheduleId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { scheduleId } = req.params;
    const data = { ...req.body };
    const schedules = await knex("schedules").where({ scheduleId });
    if (schedules.length === 0) {
      res.status(400);
      throw new Error("schedule not found");
    }

    const putSubjects = [];
    const { subjects } = data;

    for (let subject of subjects) {
      const { subjectId, hour, day } = subject;
      const putSubject = `${subjectId} ${hour} ${day}`;
      putSubjects.push(putSubject);
    }

    data.subjects = putSubjects;

    await knex("schedules")
      .where({ scheduleId })
      .update({ ...data });
    res.send(schedules);
  } catch (error) {
    next(error);
  }
});

router.post("/schedules", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const data = { ...req.body };
    const { classId } = data;
    const newSchedule = {};
    newSchedule.scheduleId = uuid.v4();
    newSchedule.classId = classId;
    newSchedule.subjects = [];

    const schedules = await knex("schedules").insert(newSchedule);
    res.send(newSchedule);
  } catch (error) {
    next(error);
  }
});

router.get("/schedules/classes/:classId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { classId } = req.params;
    const schedulesData = await knex("schedules").where({ classId });
    if (schedulesData.length === 0) {
      res.status(400);
      throw new Error("schedule not found");
    }
    const schedule = await getScheduleForClassResponse(classId);
    res.send(schedule);
  } catch (error) {
    next(error);
  }
});

router.delete("/schedules/:scheduleId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { scheduleId } = req.params;
    const schedules = await knex("schedules").where({ scheduleId });
    if (schedules.length === 0) {
      res.status(400);
      throw new Error("schedule not found");
    }
    await knex("schedules").where({ scheduleId }).del();
    res.send(schedules);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
