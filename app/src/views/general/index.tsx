import React, { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { getUserData, modalOperation, capitalize } from "../../utils";
import { Modal } from "../../components/modals/modalForm";

import addMessageIcon from "../../assets/img/add.png";
import "../../style.css"

import * as producers from "./producers";

export const General: view = ({
  updateModalFormData = update.modal.formData,
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  updateIsModalOpen = update.modal.isOpen,
  getModalFormData = get.modal.formData,
  messages = observe.messages.content,
  updateMessages = update.messages.content,
  getUser = get.user,
  getUsers = get.users,
}) => {
  if (!messages) return null;
  const fields = [
    {
      field: "title",
      label: "Titlu",
      className: "form-floating mb-3 col-md-12",
      placeholder: "Titlu",
      type: "text",
    },
    {
      field: "message",
      label: "Mesaj",
      className: "form-floating mb-3 col-md-12",
      placeholder: "Mesaj",
      type: "text",
    },
  ];

  const initialValuesAdd = {
    title: "",
    message: "",
  };

  const modalFormData = getModalFormData.value();
  const user = getUser.value();
  const users = getUsers.value();

  if (isModalSavePressed) {
    console.log(">>>modalFormData: ", modalFormData);
    const newMessage = modalFormData;
    newMessage.userId = user.userId;
    newMessage.date = dayjs().format("DD.MMM.YYYY");
    newMessage.time = dayjs().format("HH:mm");

    try {
      axios.post("http://localhost:5000/api/messages", newMessage);
      updateMessages.set([...messages, newMessage]);
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Eroare la adaugarea mesajului!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }

    updateIsModalSavePressed.set(false);
  }

  const handleAddButton = (initalValues: any) => {
    console.log(">>>initalValues: ", initalValues);
    updateModalFormData.set(initalValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  const sortedMessages = messages.sort(
    (a: any, b: any) =>
      dayjs(b.date + " " + b.time).unix() - dayjs(a.date + " " + a.time).unix()
  );

  return (
    <div className="object-fit-cover" style={{paddingLeft: "20px"}}>
      <h1 className="font-family">General</h1>
      <div
        style={{
          paddingRight: "200px",
          paddingLeft: "100px",
          paddingTop: "20px",
        }}
      >
        {sortedMessages.map((message: any) => {
          const { userId: messageUserId } = message;
          const messageUser = getUserData(users, messageUserId);
          if (messageUser.role === "teacher") messageUser.role = "profesor";
          const { firstName, lastName, role } = messageUser;
          const { date, time, title, message: messageText } = message;
          const now = dayjs();
          const messageDate = dayjs(date);
          const messageTime = dayjs(time);
          const messageDay = messageDate.format("DD");
          const messageMonth = messageDate.format("MMM");
          const messageYear = messageDate.format("YYYY");
          const messageHour = messageTime.format("HH");
          const messageMinute = messageTime.format("mm");

          let timeString = "";

          console.log(">>> messageDay", messageDay);
          console.log(">>> time", time);

          if (now.diff(messageDate, "day") === 0) {
            timeString = time;
          } else if (now.diff(messageDate, "day") === 1) {
            timeString = `Ieri, ${time}`;
          } else if (now.diff(messageDate, "day") <= 7) {
            timeString = `${messageDay} ${messageMonth}, ${time}`;
          } else {
            timeString = `${messageDay} ${messageMonth} ${messageYear}, ${time}`;
          }

          return (
            <div
              className="card border-dark mb-5 w-50"
              style={{ marginLeft: "200px", zIndex: 1 }}
            >
              <div
                className="card-header bg-transparent border-dark"
                // style={{ display: "flex" }}
              >
                <div className="user-message">
                  {lastName} {firstName} - {capitalize(role)}
                </div>
                <div className="text-end">{timeString}</div>
              </div>
              <div className="card-body">
                <b className="card-title" style={{fontSize: "20px"}}>{title}</b>
                <p className="card-text" style={{paddingTop: "15px"}}>{messageText}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "75px",
          right: "150px",
        }}
      >
        <button
          type="button"
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-title="Adaugati un mesaj"
          onClick={() => handleAddButton(initialValuesAdd)}
        >
          <img
            src={addMessageIcon}
            style={{ width: "40px", position: "fixed" }}
          />
        </button>
        <Modal fields={fields} title={"Adauga ora"} type={"add"} />
      </div>
    </div>
  );
};

General.producers(Object.values(producers));
