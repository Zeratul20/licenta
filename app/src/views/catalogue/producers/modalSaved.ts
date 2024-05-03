import axios from "axios";
import { toast } from "react-toastify";
import { makeApi } from "../../../utils";

const isGrade = (grade: string) => {
  // if(grade < "1" || grade > "9") return false;
  // cannot accept anything unless 1-10
  const reg = new RegExp("^[1-9]$");
  if(!grade.match(reg)) return false;
  const parsedGrade = parseFloat(grade);
  console.log(">>>parsedGrade: ", parsedGrade);
  if (Number.isNaN(parsedGrade) || parsedGrade < 1 || parsedGrade > 10 || !Number.isInteger(parsedGrade)) {
    return false;
  }
  return true;
}

export const modalSaved: producer = async ({
  catalogue = observe.catalogue.catalogue,
  updateCatalogue = update.catalogue.catalogue,
  isModalSavePressed = observe.modal.isSavePressed,
  absences = observe.catalogue.absences,
  updateAbsences = update.catalogue.absences,
  updateIsModalSavePressed = update.modal.isSavePressed,
  getModalFormData = get.modal.formData,
  getCatalogueTeacher = get.catalogue.teacher,
  getUser = get.user,
  getUsers = get.users,
  getSubjectsState = get.subjects,
  getParents = get.parents,
  getStudents = get.students,
}) => {
  if (!isModalSavePressed) return;
  const user = getUser.value();

  const modalFormData = getModalFormData.value();
  const catalogueTeacher = getCatalogueTeacher.value();
  const subjectsState = getSubjectsState.value();
  const parentsState = getParents.value();
  const studentsState = getStudents.value();
  const users = getUsers.value();
  updateIsModalSavePressed.set(false);

  const api = makeApi();

  const getSubject = (subjectId: string) => {
    const subject = subjectsState.find(
      (subject: any) => subject.subjectId === subjectId
    );
    return subject;
  };

  if (user.role === "teacher") {
    const { type } = modalFormData;
    const { date, studentId } = modalFormData;
    const parentsFound = parentsState.filter((parent: any) =>
      parent.students.includes(studentId)
    );
    const userParents = parentsFound.map((parent: any) =>
      users.find((user: any) => user.userId === parent.userId)
    );
    const emails = userParents.map((user: any) => user.email);
    const studentFound = studentsState.find(
      (student: any) => student.studentId === studentId
    );
    const userStudent = users.find(
      (user: any) => user.userId === studentFound.userId
    );
    if (type === "addGrade") {
      const newGrade: any = {};
      const { grade } = modalFormData;
      if(!isGrade(grade)) {
        toast.error("Nota invalida!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      }
      console.log(">>>modalSaved modalFormData: ", modalFormData);
      let newCatalogue = catalogue;
      for (let i = 0; i < catalogue.length; i++) {
        let student = catalogue[i];
        if (student.studentId === studentId) {
          newGrade.value = grade;
          newGrade.date = date;
          if (!student.grades[0])
            student.grades.push({
              subjectId: catalogueTeacher.subjectId,
              grades: [],
            });
          student.grades[0].grades.push(newGrade);
          newCatalogue[i] = student;
        }
      }

      try {
        api.put(
          `/students/${studentId}/${catalogueTeacher.teacherId}/grades`,
          newGrade
        );
        console.log(">>>newCatalogue: ", newCatalogue);

        updateCatalogue.set(newCatalogue);
        console.log(">>>Email obj: ", {
          emailsTo: emails,
          ccEmail: userStudent.email,
          studentName: `${userStudent.lastName} ${userStudent.firstName}`,
          grade: newGrade.value,
          subjectName: getSubject(catalogueTeacher.subjectId).name,
        })
        api.post(`/email/grade`, {
          emailsTo: emails,
          ccEmail: userStudent.email,
          studentName: `${userStudent.lastName} ${userStudent.firstName}`,
          grade: newGrade.value,
          subjectName: getSubject(catalogueTeacher.subjectId).name,
        });
        toast.success("Nota adaugata cu succes", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Eroare la adaugarea notei", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } else if (type === "addAbsence") {
      try {
        const { date, studentId } = modalFormData;
        const { data: newAbsence } = await api.post(
          `/absences`,
          {
            date,
            studentId,
            subjectId: catalogueTeacher.subjectId,
          }
        );
        updateAbsences.set([...absences, newAbsence]);
        api.post(`/email/absence`, {
          emailsTo: emails,
          ccEmail: userStudent.email,
          studentName: `${userStudent.lastName} ${userStudent.firstName}`,
          date,
          subjectName: getSubject(catalogueTeacher.subjectId).name,
        });
        toast.success("Absenta adaugata cu succes", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Eroare la adaugarea absentei", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } else if (type === "editAbsence") {
      try {
        const { absenceId } = modalFormData;
        await api.put(`/absences/${absenceId}`, {
          isMotivated: true,
        });
        const newAbsences = absences.map((absence: any) => {
          if (absence.absenceId === absenceId) {
            absence.isMotivated = true;
          }
          return absence;
        });
        updateAbsences.set(newAbsences);
        toast.success("Absenta motivata cu succes", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Eroare la motivarea absentei", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  }
};
