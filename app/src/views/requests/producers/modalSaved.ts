import { toast } from "react-toastify";
import { makeApi } from "../../../utils";

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
  updateIsStateInitiated = update.isStateInitiated,
  user = observe.user,
}) => {
  if (!isModalSavePressed) return;
  const api = makeApi();
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
        api.post("/requests", newRequest);
        updateRequests.set([...requests, newRequest]);
        toast.success("Cererea a fost salvata", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Cerere invalida", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      return;
    }
    if (modalFormData.requestType === 5) {
      const newRequest: any = {};
      newRequest.type = "5";
      const { className } = modalFormData;
      const classId = classesState.find(
        (cls: any) => cls.name === className
      )?.classId;
      if (!classId) {
        toast.error("Clasa nu a fost gasita", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      newRequest.classId = classId;
      newRequest.userId = user.userId;
      newRequest.status = "pending";
      try {
        api.post("/requests", newRequest);
        updateRequests.set([...requests, newRequest]);
        toast.success("Cererea a fost salvata", {
          position: "top-right",
          autoClose: 3000,
        });
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
      api.post("/requests", newRequest);
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
    api.put(`/requests/${requestId}`, {
      status,
      response,
    });
    const newRequests = requests.filter(
      (request: any) => request.requestId !== requestId
    );
    updateRequests.set(newRequests);
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
        api.post("/parents", { userId, students });
        toast.success("Parintele a fost adaugat", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        api.put(`/parents/${parent.parentId}`, {
          userId,
          students,
        });
        toast.success("Parintele a fost actualizat", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      api.put(`/requests/${requestId}`, {
        status: "accepted",
      });
      updateIsStateInitiated.set(false);
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
      api.post("/students", { userId, classId });
      api.put(`/requests/${requestId}`, {
        status: "accepted",
      });
      updateIsStateInitiated.set(false);
      toast.success("Elevul a fost adaugat", {
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
      const { subjectName} = modalFormData;
      const { subjectId } = subjectsState.find(
        (subject: any) => subject.name === subjectName
      );
      api.post("/teachers", {
        userId,
        subjectId,
        classes: [],
      });
      api.put(`/requests/${requestId}`, {
        status: "accepted",
      });
      updateIsStateInitiated.set(false);
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
  } else if (modalFormData.requestType === 4) {
    try {
      const { studentId } = studentsState.find(
        (student: any) => student.userId === userId
      );
      api.delete(`/students/${studentId}`);
      api.put(`/requests/${requestId}`, {
        status: "accepted",
      });
      updateIsStateInitiated.set(false);
      toast.success("Elevul a fost sters", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (e) {
      console.log(">>>error: ", e);
      toast.error("Elev invalid", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } else if (modalFormData.requestType === 5) {
    try {
      const { classId } = modalFormData;
      const studentId = studentsState.find(
        (student: any) => student.userId === userId
      )?.studentId;
      api.put(`/students/${studentId}`, { classId });
      api.put(`/requests/${requestId}`, {
        status: "accepted",
      });
      updateIsStateInitiated.set(false);
      toast.success("Elevul a fost mutat", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (e) {
      console.log(">>>error: ", e);
      toast.error("Elev invalid", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }
};
