import axios from "axios";
import { makeApi } from "../../../utils";

export const initState: producer = ({
  updateCatalogue = update.catalogue.catalogue,
  updateIsStateInitiated = update.catalogue.isStateInitiated,
  updateAbsences = update.catalogue.absences,
  user = observe.user,
  catalogueClass = observe.catalogue.class,
  // getCatalogueTeacher = get.catalogue.teacher,
  // getCatalogueStudent = get.catalogue.student,
  catalogueTeacher = observe.catalogue.teacher,
  catalogueStudent = observe.catalogue.student,
}) => {
  // const catalogueTeacher = getCatalogueTeacher.value();
  // const catalogueStudent = getCatalogueStudent.value();

  if (!catalogueClass || !user) return;

  const api = makeApi();

  let cnt = 0;
  const cntMaxVal = 2;

  if (user.role === "teacher") {
    const getStudents = async () => {
      if (catalogueTeacher) {
        try {
          const { data: students } = await api.get(
            `/students/catalogue/${catalogueTeacher.teacherId}/${catalogueClass.classId}`
          );
          console.log("students in getStudents: ", students);
          updateCatalogue.set(students);
        } catch (e) {
          console.log("error", e);
          updateCatalogue.set([]);
        }
      }
      cnt++;
    };
    getStudents();
  }
  if (user.role === "director") {
    const getStudents = async () => {
      try {
        const { data: students } = await api.get(
          `/students/catalogue/${catalogueClass.classId}`
        );
        updateCatalogue.set(students);
        cnt++;
      } catch (e) {
        console.log("error", e);
        updateCatalogue.set([]);
      }
    };
    getStudents();
  }
  if (user.role === "student" || user.role === "parent") {
    const getStudents = async () => {
      if (catalogueStudent) {
        try {
          const { data: student } = await api.get(
            `/students/${catalogueStudent.studentId}`
          );
          const studentsList = [student];
          updateCatalogue.set(studentsList);
        } catch (e) {
          console.log("error", e);
          updateCatalogue.set([]);
        }
      }
      cnt++;
    };
    getStudents();
  }

  const getAbsences = async () => {
    try {
      const { data: absences } = await api.get(`/absences`);
      updateAbsences.set(absences);
      cnt++;
    } catch (e) {
      console.log("error", e);
      updateAbsences.set([]);
    }
  };
  getAbsences();

  if (cnt < cntMaxVal) {
    let retries = 5;
    while (retries--) {
      console.log("retires, cnt", retries, cnt);
      setTimeout(() => {
        if (cnt === cntMaxVal) {
          updateIsStateInitiated.set(true);
          retries = 0;
        }
      }, 1000 * (retries + 1));
    }
  } else updateIsStateInitiated.set(true);
  return;
};
