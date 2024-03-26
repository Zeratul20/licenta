const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");
const { checkToken } = require("../helpers/tokens");

const getStudentResponse = async (studentData) => {
  const { studentId, userId, classId, grades } = studentData;
  const student = { studentId, userId, classId };
  student.grades = [];
  for (let grade of grades) {
    const gradeList = grade.split(" ");
    const subjectId = gradeList[0];
    const gradeValue = gradeList[1];
    const gradeDate = gradeList[2];
    if (!student.grades.find((grade) => grade.subjectId === subjectId)) {
      student.grades.push({
        subjectId,
        grades: [{ value: gradeValue, date: gradeDate }],
      });
    } else {
      const subjectIndex = student.grades.findIndex(
        (grade) => grade.subjectId === subjectId
      );
      student.grades[subjectIndex].grades.push({
        value: gradeValue,
        date: gradeDate,
      });
    }
    // const gradeObj = { subjectId, value: gradeValue, date: gradeDate };
    // student.grades.push(gradeObj);
  }
  return student;
};

const getTeacherCatalogueResponse = async (studentData, teacherId) => {
  const { studentId, userId, classId, grades } = studentData;
  const student = { studentId, userId, classId };
  student.grades = [];
  const teacherSubjectIdData = await knex("teachers")
    .where({ teacherId })
    .select("subjectId");
  for (let grade of grades) {
    const gradeList = grade.split(" ");
    const subjectId = gradeList[0];
    const gradeValue = gradeList[1];
    const gradeDate = gradeList[2];
    const teacherSubjectId = teacherSubjectIdData[0].subjectId;
    if (teacherSubjectId === subjectId) {
      if (!student.grades.find((grade) => grade.subjectId === subjectId)) {
        student.grades.push({
          subjectId,
          grades: [{ value: gradeValue, date: gradeDate }],
        });
      } else {
        const subjectIndex = student.grades.findIndex(
          (grade) => grade.subjectId === subjectId
        );
        student.grades[subjectIndex].grades.push({
          value: gradeValue,
          date: gradeDate,
        });
      }
      // const gradeObj = { subjectId, value: gradeValue, date: gradeDate };
      // student.grades.push(gradeObj);
    }
  }
  const studentResponse = { ...student };
  return studentResponse;
};

router.get("/students", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const studentsData = await knex("students");
    const students = [];
    for (let studentData of studentsData) {
      const studentResponse = await getStudentResponse(studentData);
      students.push(studentResponse);
    }
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get("/students/catalogue/:classId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { classId } = req.params;
    const studentsData = await knex("students").where({ classId });
    const students = [];
    for (let studentData of studentsData) {
      const studentResponse = await getStudentResponse(studentData);
      students.push(studentResponse);
    }
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/students/catalogue/:teacherId/:classId",
  async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
      const { teacherId, classId } = req.params;
      const studentsData = await knex("students").where({ classId });
      const students = [];
      for (let studentData of studentsData) {
        const studentResponse = await getTeacherCatalogueResponse(
          studentData,
          teacherId
        );
        students.push(studentResponse);
      }
      res.send(students);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/students/:studentId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { studentId } = req.params;
    const studentsData = await knex("students").where({ studentId });

    if (studentsData.length === 0) {
      res.status(400);
      throw new Error("ent not found");
    }
    const studentData = studentsData[0];
    const studentResponse = await getStudentResponse(studentData);
    res.send(studentResponse);
  } catch (error) {
    next(error);
  }
});

router.put("/students/:studentId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { studentId } = req.params;
    const data = { ...req.body };
    const { classId, grades } = data;
    const studentsData = await knex("students").where({ studentId });
    if (studentsData.length === 0) {
      res.status(400);
      throw new Error("Student not found");
    }
    const studentToUpdate = {};
    if (classId) {
      studentToUpdate.classId = classId;
    }
    if (grades) {
      for (let grade of grades) {
        const { subjectId, value, date } = grade;
        const gradeString = `${subjectId} ${value} ${date}`;
        studentToUpdate.grades.push(gradeString);
      }
    }
    await knex("students").where({ studentId }).update(studentToUpdate);
    const updatedStudentData = await knex("students").where({ studentId });
    const updatedStudent = await getStudentResponse(updatedStudentData[0]);
    res.send(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.put("/students/:studentId/:teacherId/grades", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { studentId, teacherId } = req.params;
    const data = { ...req.body };
    const { value, date } = data;
    const subjectIdData = await knex("teachers")
      .where({ teacherId })
      .select("subjectId");
    const subjectId = subjectIdData[0].subjectId;
    const studentsData = await knex("students").where({ studentId });
    if (studentsData.length === 0) {
      res.status(400);
      throw new Error("Student not found");
    }
    const newGrades = [...studentsData[0].grades];
    const gradeString = `${subjectId} ${value} ${date}`;
    newGrades.push(gradeString);
    await knex("students").where({ studentId }).update({ grades: newGrades });
    // const updatedStudentData = await knex("students").where({ studentId });
    // const updatedStudent = await getTeacherCatalogueResponse(updatedStudentData[0], teacherId);
    res.send(newGrades);
  } catch (error) {
    next(error);
  }
});

router.post("/students", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const data = { ...req.body };
    const { userId, classId } = data;
    const newStudent = {};
    newStudent.studentId = uuid.v4();
    newStudent.grades = [];
    newStudent.userId = userId;
    newStudent.classId = classId;
    const students = await knex("students").insert(newStudent);
    await knex("users").where({ userId }).update({ role: "student" });
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.delete("/students/:studentId", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    };
    const { studentId } = req.params;
    const userIdData = await knex("students")
      .where({ studentId })
      .select("userId");
    const { userId } = userIdData[0];
    const students = await knex("students").where({ studentId }).del();
    const parent = await knex("parents").whereIn("studentId", "students");
    const parentStudents = parent[0].students;
    const parentId = parent[0].parentId;
    const newParentStudents = parentStudents.filter(
      (student) => student !== studentId
    );
    await knex("parents")
      .where({ parentId })
      .update({ students: newParentStudents });
    await knex("users").where({ userId }).update({ role: "user" });
    res.send(studentId);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
