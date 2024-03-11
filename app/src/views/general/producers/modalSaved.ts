import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const modalSaved: producer = async ({
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  getModalFormData = get.modal.formData,
  messages = observe.messages.content,
  updateMessages = update.messages.content,
  getUser = get.user,
  getUsers = get.users,
}) => {
  if (!isModalSavePressed) return;
  const modalFormData = getModalFormData.value();
  const user = getUser.value();
  const users = getUsers.value();

  updateIsModalSavePressed.set(false);

  console.log(">>>modalFormData: ", modalFormData);
  const { type, title, message } = modalFormData;
  if (type === "add") {
    const newMessage = {
      title,
      message,
      userId: user.userId,
      date: dayjs().format("DD.MMM.YYYY"),
      time: dayjs().format("HH:mm"),
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/messages",
        newMessage
      );
      updateMessages.set([...messages, data]);
      toast.success("Mesajul a fost adaugat cu succes!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Eroare la adaugarea mesajului!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  } else if (type === "edit") {
    const { title, message, messageId } = modalFormData;
    const messageForUpdate = {
      userId: user.userId,
      title,
      message,
      date: dayjs().format("DD.MMM.YYYY"),
      time: dayjs().format("HH:mm"),
    };
    const updatedMessage = { ...messageForUpdate, messageId };
    try {
      axios.put(
        `http://localhost:5000/api/messages/${messageId}`,
        messageForUpdate
      );
      const updatedMessages = messages.map((m: any) => {
        if (m.messageId === messageId) {
          return updatedMessage;
        }
        return m;
      });
      updateMessages.set(updatedMessages);
      toast.success("Mesajul a fost modificat cu succes!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Eroare la modificarea mesajului!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  } else if (type === "delete") {
    const { messageId } = modalFormData;
    try {
      await axios.delete(`http://localhost:5000/api/messages/${messageId}`);
      const updatedMessages = messages.filter(
        (m: any) => m.messageId !== messageId
      );
      updateMessages.set(updatedMessages);
      toast.success("Mesajul a fost sters cu succes!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(">>>error: ", error);
      toast.error("Eroare la stergerea mesajului!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }
};
