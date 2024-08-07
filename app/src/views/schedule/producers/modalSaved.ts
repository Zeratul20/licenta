import { makeApi } from "../../../utils";
import { toast } from "react-toastify";

export const modalSaved: producer = ({
  scheduleClass = observe.schedule.class,
  schedule = observe.schedule.schedule,
  updateSchedule = update.schedule.schedule,
  updateSchedules = update.schedules,
  getSchedules = get.schedules,
  updateModalFormData = update.modal.formData,
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  getModalFormData = get.modal.formData,
  getTeachersState = get.teachers,
  getSubjectsState = get.subjects,
}) => {
  if (!isModalSavePressed) return;
  const api = makeApi();
  const modalFormData = getModalFormData.value();
  const teachersState = getTeachersState.value();
  const subjectsState = getSubjectsState.value();
  const schedules = getSchedules.value();
  console.log(">>>Schedules: ", schedules);
  console.log(">>>modalFormData: ", modalFormData);
  updateIsModalSavePressed.set(false);
  const { type } = modalFormData;
  const teacherAlreadyHasHour = (
    teacherId: string,
    day: string,
    hour: string
  ) => {
    const teacherFound = teachersState.find((teacher: any) => {
      return teacher.teacherId === teacherId;
    });
    const teacherSchedules = schedules.filter((schedule: any) => {
      return teacherFound.classes.includes(schedule.classId);
    });
    const subjectDayHour = teacherSchedules.find((s: any) => {
      if (s.scheduleId === schedule.scheduleId) return false;
      return s.subjects.find((subject: any) => {
        return (
          subject.day === day &&
          subject.hour === hour &&
          subject.teacherId === teacherId
        );
      });
    });
    if (subjectDayHour) return true;
    return false;
  };
  if (type === "add") {
    console.log(">>>add hour");
    let errorInAdd = "";
    try {
      let subjectName = modalFormData.subject;
      const prevSubjectName = subjectName;
      if (subjectName === "Psihologie" && scheduleClass.name.startsWith("10"))
        subjectName = "Logica";
      let subjectFound = subjectsState.find((subject: any) => {
        return subject.name === subjectName;
      });
      if (scheduleClass.name.startsWith("10") && prevSubjectName == "Logica")
        subjectFound = undefined;
      if(!subjectFound) {
        errorInAdd = "Materia nu există";
        throw new Error(errorInAdd);
      }
      const { subjectId } = subjectFound;
      console.log(">>>subjectFound: ", subjectFound);
      console.log(">>>scheduleClass: ", scheduleClass);
      const scheduleClassSubjects = scheduleClass.subjects;
      if (
        !scheduleClassSubjects.find((subject: any) => subject === subjectId)
      ) {
        errorInAdd = "Materia nu este alocată clasei";
        throw new Error(errorInAdd);
      }
      const { day, hour } = modalFormData;
      const subject = {
        subjectId,
        teacherId: "",
        day,
        hour,
      };
      const { teacherId: subjectTeacherId } = teachersState.find(
        (teacher: any) => {
          return (
            teacher.subjectId === subjectId &&
            teacher.classes.includes(scheduleClass.classId)
          );
        }
      );
      if(teacherAlreadyHasHour(subjectTeacherId, day, hour)) {
        errorInAdd = "Profesorul are deja o oră în calendar la altă clasă!";
        throw new Error(errorInAdd);
      }
      subject.teacherId = subjectTeacherId;
      const newSubjects = [...schedule.subjects, subject];
      const newSchedule = { ...schedule, subjects: newSubjects };
      const newSchedules = schedules.map((scheduleEl: any) => {
        if (scheduleEl.scheduleId === schedule.scheduleId) {
          return newSchedule;
        }
        return scheduleEl;
      });
      const updatedSchedule: any = {};
      updatedSchedule.subjects = newSubjects;
      api.put(`/schedules/${schedule.scheduleId}`, updatedSchedule);
      updateSchedules.set(newSchedules);
      updateSchedule.set(newSchedule);
      toast.success("Oră adăugată cu succes", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error: any) {
      console.log(">>>error: ", error);
      if (error?.message === errorInAdd) {
        toast.error(errorInAdd, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      }
      toast.error("Eroare la adaugarea orei", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  } else if (type === "edit") {
    console.log(">>>edit hour");
    let errorInEdit = "";
    try {
      let subjectName = modalFormData.subject;
      const prevSubjectName = subjectName;
      if (subjectName === "Psihologie" && scheduleClass.name.startsWith("10"))
        subjectName = "Logica";
      let subjectFound = subjectsState.find((subject: any) => {
        return subject.name === subjectName;
      });
      if (scheduleClass.name.startsWith("10") && prevSubjectName == "Logica")
        subjectFound = undefined;
      if(!subjectFound) {
        errorInEdit = "Materia nu există";
        throw new Error(errorInEdit);
      }
      const { subjectId } = subjectFound;
      if (
        !scheduleClass.subjects.find((subject: any) => subject === subjectId)
      ) {
        errorInEdit = "Materia nu este alocată clasei";
        throw new Error(errorInEdit);
      }
      const { day, hour } = modalFormData;
      const subject = {
        subjectId,
        teacherId: "",
        day,
        hour,
      };
      const { teacherId: subjectTeacherId } = teachersState.find(
        (teacher: any) => {
          return (
            teacher.subjectId === subjectId &&
            teacher.classes.includes(scheduleClass.classId)
          );
        }
      );
      if(teacherAlreadyHasHour(subjectTeacherId, day, hour)) {
        errorInEdit = "Profesorul are deja o oră în calendar la altă clasă!";
        throw new Error(errorInEdit);
      }
      subject.teacherId = subjectTeacherId;
      const newSubjects = schedule.subjects.map((subjectEl: any) => {
        if (subjectEl.day === day && subjectEl.hour === hour.toString()) {
          return subject;
        }
        return subjectEl;
      });
      const newSchedule = { ...schedule, subjects: newSubjects };
      const newSchedules = schedules.map((scheduleEl: any) => {
        if (scheduleEl.scheduleId === schedule.scheduleId) {
          return newSchedule;
        }
        return scheduleEl;
      });
      api.put(`/schedules/${schedule.scheduleId}`, newSchedule);
      updateSchedules.set(newSchedules);
      updateSchedule.set(newSchedule);
      toast.success("Oră modificată cu succes", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error: any) {
      console.log(">>>error: ", error);
      if (error?.message === errorInEdit) {
        toast.error(errorInEdit, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      }
      toast.error("Eroare la modificarea orei", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  } else if (type === "delete") {
    console.log(">>>delete hour");
    const { day, hour } = modalFormData;
    const newSubjects = schedule.subjects.filter((subject: any) => {
      return !(subject.day === day && subject.hour === hour);
    });
    const newSchedule = { ...schedule, subjects: newSubjects };
    const newSchedules = schedules.map((scheduleEl: any) => {
      if (scheduleEl.scheduleId === schedule.scheduleId) {
        return newSchedule;
      }
      return scheduleEl;
    });
    try {
      api.put(`/schedules/${schedule.scheduleId}`, newSchedule);
      updateSchedules.set(newSchedules);
      updateSchedule.set(newSchedule);
      toast.success("Ora ștearsă cu succes", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Eroare la ștergerea orei", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }
  updateModalFormData.set({});
};
