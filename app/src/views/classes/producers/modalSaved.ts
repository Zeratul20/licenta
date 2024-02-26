import axios from "axios";
import { toast } from "react-toastify";

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
  const modalFormData = getModalFormData.value();
  const usersState = getUsers.value();
  const classesState = getClasses.value();
  const teachersState = getTeachers.value();
  // const subjectsState = getSubjects.value();
  console.log(">>>modalFormData: ", modalFormData);
  updateIsModalSavePressed.set(false);
  const { type } = modalFormData;
  if (type === "edit") {
    console.log(">>>edit class");
    const { classId, className, teacherEmail } = modalFormData;
    try {
      const teacherUserId = usersState.find(
        (user: any) => user.email === teacherEmail
      )?.userId;
      if (!teacherUserId) throw new Error("Profesorul nu exista");
      const { teacherId } = teachersState.find(
        (teacher: any) => teacher.userId === teacherUserId
      );
      if (!teacherId) throw new Error("Profesorul nu exista");
      const updatedClass = {
        name: className,
        teacherId,
      };
      await axios.put(
        `http://localhost:5000/api/classes/${classId}`,
        updatedClass
      );
      const updatedClasses = classesState.map((classEl: any) => {
        if (classEl.classId === classId) {
          return { ...classEl, ...updatedClass };
        }
        return classEl;
      });
      updateClasses.set(updatedClasses);
      updateIsStateInitiated.set(false);
    } catch (error: any) {
      console.log(">>>error: ", error);
      toast.error(
        error?.response?.data?.message || "Eroare la modificarea clasei",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }
  } else if (type === "add") {
    console.log(">>>add class");
    try {
      const { className, teacherEmail } = modalFormData;
      const teacherUser = usersState.find(
        (user: any) => user.email === teacherEmail
      );
      if (!teacherUser) throw new Error("Profesorul nu exista");
      const { userId: teacherUserId } = teacherUser;
      const teacher = teachersState.find(
        (teacher: any) => teacher.userId === teacherUserId
      );
      if (!teacher) throw new Error("Profesorul nu exista");
      const newClass = {
        name: className,
        teacherId: teacher.teacherId,
        subjects: [teacher.subjectId],
      };
      await axios.post("http://localhost:5000/api/classes", newClass);
      updateIsStateInitiated.set(false);
    } catch (error: any) {
      console.log(">>>error: ", error);
      toast.error(
        error?.response?.data?.message || "Eroare la adaugarea clasei",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }
  }
};
