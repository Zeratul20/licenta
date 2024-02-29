import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { AddIcon, EditIcon, TrashIcon } from "../../../assets/icons";
import { Modal } from "../../../components/modals/modalForm";

import {
  getSubjectData,
  getTeacherData,
  getUserData,
  modalOperation,
} from "../../../utils";

import axios from "axios";
import { Loader } from "../../../components/helpers/loader";
import { toast } from "react-toastify";

const bootstrap = require("bootstrap");

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
  const modalFormData = getModalFormData.value();
  const teachersState = getTeachersState.value();
  const subjectsState = getSubjectsState.value();
  const schedules = getSchedules.value();
  console.log(">>>modalFormData: ", modalFormData);
  updateIsModalSavePressed.set(false);
  const { type } = modalFormData;
  if (type === "add") {
    console.log(">>>add hour");
    const subjectName = modalFormData.subject;
    const subjectFound = subjectsState.find((subject: any) => {
      return subject.name === subjectName;
    });
    const { subjectId } = subjectFound;
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
    try {
      axios.put(
        `http://localhost:5000/api/schedules/${schedule.scheduleId}`,
        updatedSchedule
      );
      updateSchedules.set(newSchedules);
      updateSchedule.set(newSchedule);
      toast.success("Ora adaugata cu succes", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Eroare la adaugarea orei", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  } else if (type === "edit") {
    console.log(">>>edit hour");
    const subjectName = modalFormData.subject;
    const subjectFound = subjectsState.find((subject: any) => {
      return subject.name === subjectName;
    });
    const { subjectId } = subjectFound;
    const { day, hour } = modalFormData;
    const subject = {
      subjectId,
      teacherId: "",
      day,
      hour,
    };
    const { teacherId: subjectTeacherId } = teachersState.find((teacher: any) => {
      return (
        teacher.subjectId === subjectId &&
        teacher.classes.includes(scheduleClass.classId)
      );
    });
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
    try {
      axios.put(
        `http://localhost:5000/api/schedules/${schedule.scheduleId}`,
        newSchedule
      );
      updateSchedules.set(newSchedules);
      updateSchedule.set(newSchedule);
      toast.success("Ora modificata cu succes", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(">>>error: ", error);
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
      axios.put(
        `http://localhost:5000/api/schedules/${schedule.scheduleId}`,
        newSchedule
      );
      updateSchedules.set(newSchedules);
      updateSchedule.set(newSchedule);
      toast.success("Ora stearsa cu succes", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Eroare la stergerea orei", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }
  updateModalFormData.set({});
};
