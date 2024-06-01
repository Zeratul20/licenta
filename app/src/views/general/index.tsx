import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { getUserData, modalOperation, capitalize } from "../../utils";
import { Modal } from "../../components/modals/modalForm";

import addMessageIcon from "../../assets/img/add.png";
import "../../style.css";

import * as producers from "./producers";
import { EditIcon } from "../../assets/icons/pen";
import { TrashIcon } from "../../assets/icons/trash";
import { Paginate } from "../../components/modules/pagination";
import { Forbidden } from "../../components/helpers/forbidden";

export const General: view = ({
  updateModalFormData = update.modal.formData,
  updateIsModalOpen = update.modal.isOpen,
  messages = observe.messages.content,
  currentPage = observe.messages.currentPage,
  updateCurrentPage = update.messages.currentPage,
  user = observe.user,
  getUsers = get.users,
}) => {
  const [modalType, setModalType] = useState("");
  if(!user || !user.userId) return <Forbidden />;
  if (!messages) return null;
  let fields: any = [];
  let modalTitle = "";
  if (modalType === "add" || modalType === "edit") {
    fields = [
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
    if (modalType === "edit") {
      modalTitle = "Modifică mesajul";
    } else {
      modalTitle = "Adaugă mesaj";
    }
  } else if (modalType === "delete") modalTitle = "Șterge mesajul";

  const initialValuesAdd = {
    title: "",
    message: "",
  };

  const users = getUsers.value();

  const handleEdit_AddButton = (initalValues: any, type: string) => {
    console.log(">>>initalValues: ", initalValues);
    initalValues.type = type;
    setModalType(type);
    updateModalFormData.set(initalValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  const sortedMessages = messages.sort(
    (a: any, b: any) =>
      dayjs(b.date + " " + b.time).unix() - dayjs(a.date + " " + a.time).unix()
  );

  const messagesPage = [];
  for (let i = currentPage * 5 - 5; i < currentPage * 5; i++) {
    if (sortedMessages[i]) messagesPage.push(sortedMessages[i]);
  }

  const calculateNrOfPages = () => {
    console.log("current page: ", currentPage);
    return (
      Math.floor(sortedMessages.length / 5) +
        (sortedMessages.length % 5 !== 0 ? 1 : 0) || 0
    );
  };

  const handlePageChange = (event: any, value: number) => {
    updateCurrentPage.set(value);
  };

  return (
    <div className="object-fit-cover" style={{ paddingLeft: "20px" }}>
      <h1 className="font-family">General</h1>
      <div>
        <Paginate
          nrOfPages={calculateNrOfPages()}
          onChange={(event: any, value: number) =>
            handlePageChange(event, value)
          }
          currentPage={currentPage}
        />
      </div>
      <div
        style={{
          paddingRight: "200px",
          paddingLeft: "200px",
          paddingTop: "20px",
        }}
      >
        {messagesPage.map((message: any) => {
          const { userId: messageUserId, messageId } = message;
          console.log(">>> message", message);
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

          const initialValuesEdit = {
            title,
            message: messageText,
            messageId,
          };

          const initialValuesDelete = { messageId };

          return (
            <div
              className="card mb-5"
              style={{
                marginLeft: "50px",
                zIndex: 1,
                width: "750px",
                border: "2px solid",
                boxShadow: "2px 2px 2px #898989",
                borderRadius: "10px",
              }}
            >
              <div
                className="card-header border-dark"
                style={{ backgroundColor: "#e7e8e9"}}
              >
                <div className="user-message">
                  {lastName} {firstName} - {capitalize(role)}
                </div>
                <div className="text-end">{timeString}</div>
              </div>
              <div className="card-body">
                <b className="card-title" style={{ fontSize: "20px" }}>
                  {title}
                </b>
                <p className="card-text" style={{ paddingTop: "15px" }}>
                  {messageText}
                </p>
              </div>
              {user.userId === messageUserId && (
                <div className="card-footer">
                  <div className="d-flex">
                    <button
                      className="btn btn-lg btn-outline-primary py-0 justify-content-start"
                      style={{ fontSize: "1.5rem", border: "none" }}
                      onClick={() =>
                        handleEdit_AddButton(initialValuesEdit, "edit")
                      }
                    >
                      Modifică
                    </button>
                    <div style={{ paddingLeft: "500px" }}>
                      <button
                        className="btn btn-lg btn-outline-danger py-0 "
                        style={{ fontSize: "1.75rem", border: "none" }}
                        onClick={() =>
                          handleEdit_AddButton(initialValuesDelete, "delete")
                        }
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "75px",
          right: "250px",
        }}
      >
        <button
          type="button"
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-title="Adaugati un mesaj"
          onClick={() => handleEdit_AddButton(initialValuesAdd, "add")}
        >
          <img
            src={addMessageIcon}
            style={{ width: "40px", position: "fixed" }}
          />
        </button>
        <Modal fields={fields} title={modalTitle} type={modalType} />
      </div>
    </div>
  );
};

General.producers(Object.values(producers));
