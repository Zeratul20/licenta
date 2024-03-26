import { toast } from "react-toastify";
import { makeApi } from "../../../../utils";

export const modalSaved: producer = async ({
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  getModalFormData = get.modal.formData,
  getUsers = get.users,
  getClasses = get.classes,
  getSubjects = get.subjects,
  getTeachers = get.teachers,
  updateClasses = update.classes,
  updateIsStateInitiated = update.isStateInitiated,
  user = observe.user,
}) => {
  if (!isModalSavePressed) return;
  const api = makeApi();
  const modalFormData = getModalFormData.value();
  const usersState = getUsers.value();
  const classesState = getClasses.value();
  const teachersState = getTeachers.value();
  const subjectsState = getSubjects.value();
  console.log(">>>modalFormData: ", modalFormData);
  updateIsModalSavePressed.set(false);
  const { type } = modalFormData;
  if (type === "edit") {
    console.log(">>>edit class");
    try {
      const { subjectName, teacherEmail, teacherId, classId } = modalFormData;
      const { subjectId } = subjectsState.find(
        (subject: any) => subject.name === subjectName
      );
      const teacherFound = teachersState.find(
        (teacher: any) => teacher.teacherId === teacherId
      );
      const newTeacherUserId = usersState.find(
        (user: any) => user.email === teacherEmail
      ).userId;
      const newTeacher = teachersState.find(
        (teacher: any) => teacher.userId === newTeacherUserId
      );
      if (!newTeacher?.teacherId) throw new Error("Profesorul nu exista");
      if (newTeacher.subjectId !== subjectId)
        throw new Error("Profesorul nu preda aceasta materie");
      const classesTeacher = teacherFound.classes.filter(
        (teacherClassId: any) => teacherClassId !== classId
      );
      const classesNewTeacher = newTeacher.classes;
      classesNewTeacher.push(classId);
      await api.put(`/teachers/${teacherId}`, {
        classes: classesTeacher,
      });
      await api.put(
        `/teachers/${newTeacher.teacherId}`,
        {
          classes: classesNewTeacher,
        }
      );
      updateIsStateInitiated.set(false);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Eroare la editarea profesorului", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } else if (type === "add") {
    console.log(">>>add class");
    try {
      const { subjectName, teacherEmail, classId } = modalFormData;
      const classFound = classesState.find(
        (cls: any) => cls.classId === classId
      );
      const subjectFound = subjectsState.find(
        (subject: any) => subject.name === subjectName
      );
      if (!subjectFound) {
        throw new Error("Materia nu exista");
      }
      const teacherUser = usersState.find(
        (user: any) => user.email === teacherEmail
      );
      if (!teacherUser) {
        throw new Error("Profesorul nu exista");
      }
      const teacherFound = teachersState.find(
        (teacher: any) => teacher.userId === teacherUser.userId
      );
      if (!teacherFound) {
        throw new Error("Profesorul nu exista");
      }
      const { subjectId } = subjectFound;
      const { teacherId } = teacherFound;
      if (classFound.subjects.includes(subjectId)) {
        throw new Error("Materia exista deja");
      }
      if(teacherFound.subjectId !== subjectId) {
        throw new Error("Profesorul nu preda aceasta materie");
      }
      const newClassSubjects = classFound.subjects;
      newClassSubjects.push(subjectId);
      const newTeacherClasses = teacherFound.classes;
      newTeacherClasses.push(classId);
      await api.put(`/classes/${classId}`, {
        subjects: newClassSubjects,
      });
      await api.put(`/teachers/${teacherId}`, {
        classes: newTeacherClasses,
      });
      updateIsStateInitiated.set(false);
    } catch (error: any) {
      console.log("error: ", error);
      toast.error(error?.message || "Eroare la adaugarea materiei", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }
};
