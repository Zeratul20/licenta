import axios from "axios";
import { toast } from "react-toastify";

export const modalSaved: producer = ({
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  getModalFormData = get.modal.formData,
  getStudents = get.students,
  //   updateStudents = update.students,
  getUsers = get.users,
  getClasses = get.classes,
  getParents = get.parents,
  getSubjects = get.subjects,
  requests = observe.requests.content,
  updateRequests = update.requests.content,
  user = observe.user,
}) => {
  if (!isModalSavePressed) return;
  const modalFormData = getModalFormData.value();
  const studentsState = getStudents.value();
  const usersState = getUsers.value();
  const classesState = getClasses.value();
  const parentsState = getParents.value();
  const subjectsState = getSubjects.value();
  console.log(">>>modalFormData: ", modalFormData);
  updateIsModalSavePressed.set(false);
  if (user.role !== "director") {
    if (modalFormData.requestType === 1) {
      const newRequest: any = {};
      newRequest.type = "1";
      newRequest.students = [];
      const userId1 = usersState.find(
        (user: any) => user.email === modalFormData.email1
      )?.userId;
      if (!userId1) {
        toast.error("Elevul 1 nu a fost gasit", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const studentId1 = studentsState.find(
        (student: any) => student.userId === userId1
      )?.studentId;
      if (!studentId1) {
        toast.error("Elevul 1 nu a fost gasit", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      newRequest.students.push(studentId1);
      if (modalFormData.email2) {
        const userId2 = usersState.find(
          (user: any) => user.email === modalFormData.email2
        )?.userId;
        if (!userId2) {
          toast.error("Elevul 2 nu a fost gasit", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        const studentId2 = studentsState.find(
          (student: any) => student.userId === userId2
        )?.studentId;
        if (!studentId2) {
          toast.error("Elevul 2 nu a fost gasit", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        newRequest.students.push(studentId2);
      }
      newRequest.userId = user.userId;
      newRequest.status = "pending";
      try {
        axios.post("http://localhost:5000/api/requests", newRequest);
        updateRequests.set([...requests, newRequest]);
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Cerere invalida", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      return;
    }
    const newRequest: any = {};
    newRequest.type = modalFormData.requestType.toString();
    newRequest.userId = user.userId;
    newRequest.status = "pending";
    console.log(">>>newRequest: ", newRequest);
    try {
      axios.post("http://localhost:5000/api/requests", newRequest);
      toast.success("Cererea a fost salvata", {
        position: "top-right",
        autoClose: 3000,
      });
      updateRequests.set([...requests, newRequest]);
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Cerere invalida", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    return;
  }
  const { userId, requestId, status } = modalFormData;
  if (status === "rejected") {
    const { response } = modalFormData;
    axios.put(`http://localhost:5000/api/requests/${requestId}`, {
      status,
      response,
    });
    toast.success("Cerere respinsa cu succes", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }
  console.log(">>>modalFormData: ", modalFormData);
  if (modalFormData.requestType === 1) {
    try {
      const { students } = modalFormData;
      console.log(">>>students: ", students);
      const parent = parentsState.find(
        (parent: any) => parent.userId === userId
      );
      if (!parent) {
        axios.post("http://localhost:5000/api/parents", { userId, students });
        toast.success("Parintele a fost adaugat", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        axios.put(`http://localhost:5000/api/parents${parent.parentId}`, {
          userId,
          students,
        });
        toast.success("Parintele a fost actualizat", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      axios.put(`http://localhost:5000/api/requests/${requestId}`, {
        status: "accepted",
      });
    } catch (e) {
      console.log(">>>error: ", e);
      toast.error("Parinte invalid", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } else if (modalFormData.requestType === 2) {
    try {
      console.log(">>>saved modalFormData: ", modalFormData);
      const { className: formClassName } = modalFormData;
      console.log(">>>formClassName: ", formClassName);
      const { classId } = classesState.find(
        (cls: any) => cls.name === formClassName
      );
      axios.post("http://localhost:5000/api/students", { userId, classId });
      axios.put(`http://localhost:5000/api/requests/${requestId}`, {
        status: "accepted",
      });
      toast.success("Clasa a fost salvata", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (e) {
      console.log(">>>error: ", e);
      toast.error("Clasa invalida", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } else if (modalFormData.requestType === 3) {
    try {
      const { subjectName, classes: classesString } = modalFormData;
      const classes = classesString.split(/(?:,| )+/);
      console.log(">>>modalForm classes: ", classes)
      console.log(">>>modalForm subjectName: ", subjectName)
      const classIds = classes.map(
        (cls: any) => classesState.find((c: any) => c.name === cls).classId
      );
      const { subjectId } = subjectsState.find(
        (subject: any) => subject.name === subjectName
      );
      axios.post("http://localhost:5000/api/teachers", {
        userId,
        subjectId,
        classes: classIds,
      });
      axios.put(`http://localhost:5000/api/requests/${requestId}`, {
        status: "accepted",
      });
      toast.success("Profesorul a fost salvat", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (e) {
      console.log(">>>error: ", e);
      toast.error("Profesor invalid", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }
};
