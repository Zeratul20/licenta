/**
 * Structure the type of the application's state.
 */
export type State = {
  user: any;
  isLogoutPressed: boolean;
  schedule: {
    class: any;
    schedule: any;
    teacher: any;
    isStateInitiated: boolean;
  };
  catalogue: {
    class: any;
    catalogue: any;
    teacher: any;
    student: any;
  };
  modal: {
    isOpen: boolean;
    formData: any;
    isSavePressed: boolean;
  };
  teachers: any;
  subjects: any;
  classes: any;
  students: any;
  schedules: any;
  users: any;
  isStateInitiated: boolean;
  messages: {
    content: any;
    isStateInitiated: boolean;
  },
  requests: {
    content: any;
    isStateInitiated: boolean;
  }
};
